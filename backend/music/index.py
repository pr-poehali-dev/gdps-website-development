import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    '''
    Business: Manages music uploads and retrieval for GDPS
    Args: event with httpMethod, body (action, userId, title, artist, url for upload)
    Returns: HTTP response with music list or upload confirmation
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    dsn = os.environ.get('DATABASE_URL')
    
    if method == 'GET':
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        cur.execute(
            "SELECT m.id, m.title, m.artist, m.url, u.username, m.created_at FROM music m JOIN users u ON m.uploader_id = u.id ORDER BY m.created_at DESC LIMIT 50"
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()
        
        music = []
        for row in rows:
            music.append({
                'id': row[0],
                'title': row[1],
                'artist': row[2],
                'url': row[3],
                'uploader': row[4],
                'createdAt': row[5].isoformat() if row[5] else None
            })
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'music': music}),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        action = body_data.get('action')
        
        if action == 'upload':
            user_id = body_data.get('userId')
            title = body_data.get('title')
            artist = body_data.get('artist')
            url = body_data.get('url')
            
            if not user_id or not title or not artist or not url:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing required fields'}),
                    'isBase64Encoded': False
                }
            
            conn = psycopg2.connect(dsn)
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO music (title, artist, url, uploader_id) VALUES ('" + title.replace("'", "''") + "', '" + artist.replace("'", "''") + "', '" + url.replace("'", "''") + "', " + str(user_id) + ") RETURNING id"
            )
            music_id = cur.fetchone()[0]
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True, 'musicId': music_id}),
                'isBase64Encoded': False
            }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
