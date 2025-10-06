import json
import os
import hashlib
import psycopg2

def handler(event: dict, context) -> dict:
    '''
    Business: Handles user registration and login for GDPS
    Args: event with httpMethod, body (username, email, password for register; username, password for login)
    Returns: HTTP response with user data or error
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        action = body_data.get('action')
        
        dsn = os.environ.get('DATABASE_URL')
        
        if action == 'register':
            username = body_data.get('username')
            email = body_data.get('email')
            password = body_data.get('password')
            
            if not username or not email or not password:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing required fields'}),
                    'isBase64Encoded': False
                }
            
            password_hash = hashlib.sha256(password.encode()).hexdigest()
            
            conn = psycopg2.connect(dsn)
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO users (username, email, password_hash) VALUES ('" + username.replace("'", "''") + "', '" + email.replace("'", "''") + "', '" + password_hash + "') RETURNING id, username, stars, completed_levels, achievements"
            )
            row = cur.fetchone()
            conn.commit()
            cur.close()
            conn.close()
            
            user = {
                'id': row[0],
                'username': row[1],
                'stars': row[2],
                'completedLevels': row[3],
                'achievements': row[4]
            }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'user': user}),
                'isBase64Encoded': False
            }
        
        elif action == 'login':
            username = body_data.get('username')
            password = body_data.get('password')
            
            if not username or not password:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing credentials'}),
                    'isBase64Encoded': False
                }
            
            password_hash = hashlib.sha256(password.encode()).hexdigest()
            
            conn = psycopg2.connect(dsn)
            cur = conn.cursor()
            cur.execute(
                "SELECT id, username, stars, completed_levels, achievements FROM users WHERE username = '" + username.replace("'", "''") + "' AND password_hash = '" + password_hash + "'"
            )
            row = cur.fetchone()
            cur.close()
            conn.close()
            
            if not row:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Invalid credentials'}),
                    'isBase64Encoded': False
                }
            
            user = {
                'id': row[0],
                'username': row[1],
                'stars': row[2],
                'completedLevels': row[3],
                'achievements': row[4]
            }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'user': user}),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }