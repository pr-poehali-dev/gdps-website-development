import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    '''
    Business: Fetches levels list from database for GDPS
    Args: event with httpMethod, queryStringParameters (search, limit)
    Returns: HTTP response with levels array
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        search = params.get('search', '')
        limit = int(params.get('limit', '50'))
        
        dsn = os.environ.get('DATABASE_URL')
        
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        if search:
            safe_search = search.replace("'", "''")
            cur.execute(
                f"SELECT l.id, l.title, u.username, l.difficulty, l.downloads, l.created_at FROM levels l JOIN users u ON l.author_id = u.id WHERE l.title ILIKE '%{safe_search}%' ORDER BY l.downloads DESC LIMIT {limit}"
            )
        else:
            cur.execute(
                f"SELECT l.id, l.title, u.username, l.difficulty, l.downloads, l.created_at FROM levels l JOIN users u ON l.author_id = u.id ORDER BY l.downloads DESC LIMIT {limit}"
            )
        
        rows = cur.fetchall()
        cur.close()
        conn.close()
        
        levels = []
        for row in rows:
            levels.append({
                'id': row[0],
                'title': row[1],
                'author': row[2],
                'difficulty': row[3],
                'downloads': row[4],
                'createdAt': row[5].isoformat() if row[5] else None
            })
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'levels': levels}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }