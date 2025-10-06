import json
import os
import smtplib
import secrets
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import psycopg2

def handler(event: dict, context) -> dict:
    '''
    Business: Handles password reset requests and sends beautiful reset emails
    Args: event with httpMethod, body (email for reset request)
    Returns: HTTP response with success or error message
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
        email = body_data.get('email')
        
        if not email:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Email обязателен'}),
                'isBase64Encoded': False
            }
        
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        cur.execute(
            "SELECT username FROM users WHERE email = '" + email.replace("'", "''") + "'"
        )
        row = cur.fetchone()
        
        if not row:
            cur.close()
            conn.close()
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Пользователь с таким email не найден'}),
                'isBase64Encoded': False
            }
        
        username = row[0]
        reset_token = secrets.token_urlsafe(32)
        
        cur.execute(
            "UPDATE users SET reset_token = '" + reset_token + "' WHERE email = '" + email.replace("'", "''") + "'"
        )
        conn.commit()
        cur.close()
        conn.close()
        
        smtp_host = os.environ.get('SMTP_HOST')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = 'Восстановление пароля GDPS fin0'
        msg['From'] = smtp_user
        msg['To'] = email
        
        html = f'''
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {{
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }}
        .container {{
            max-width: 600px;
            margin: 40px auto;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }}
        .header {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px;
            text-align: center;
        }}
        .logo {{
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }}
        .header h1 {{
            color: white;
            margin: 0;
            font-size: 32px;
            text-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }}
        .illustration {{
            width: 100%;
            height: 200px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            position: relative;
            overflow: hidden;
        }}
        .cube {{
            position: absolute;
            width: 60px;
            height: 60px;
            background: rgba(255,255,255,0.2);
            border: 2px solid rgba(255,255,255,0.4);
            transform: rotate(45deg);
        }}
        .cube1 {{ top: 20px; left: 50px; }}
        .cube2 {{ top: 80px; right: 80px; animation: float 3s ease-in-out infinite; }}
        .cube3 {{ bottom: 30px; left: 100px; animation: float 4s ease-in-out infinite; }}
        @keyframes float {{
            0%, 100% {{ transform: rotate(45deg) translateY(0px); }}
            50% {{ transform: rotate(45deg) translateY(-20px); }}
        }}
        .content {{
            padding: 40px;
            text-align: center;
        }}
        .content h2 {{
            color: #333;
            margin-bottom: 20px;
        }}
        .content p {{
            color: #666;
            line-height: 1.6;
            margin-bottom: 30px;
        }}
        .reset-button {{
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 40px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            box-shadow: 0 10px 30px rgba(102,126,234,0.4);
            transition: transform 0.3s;
        }}
        .reset-button:hover {{
            transform: translateY(-2px);
        }}
        .footer {{
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #eee;
        }}
        .social-links {{
            margin-top: 20px;
        }}
        .social-links a {{
            display: inline-block;
            margin: 0 10px;
            color: #667eea;
            text-decoration: none;
            font-size: 24px;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🎮</div>
            <h1>GDPS FIN0</h1>
        </div>
        
        <div class="illustration">
            <div class="cube cube1"></div>
            <div class="cube cube2"></div>
            <div class="cube cube3"></div>
        </div>
        
        <div class="content">
            <h2>Восстановление пароля</h2>
            <p>Привет, <strong>{username}</strong>!</p>
            <p>Мы получили запрос на восстановление пароля для вашего аккаунта. Если это были не вы, просто проигнорируйте это письмо.</p>
            <p>Ваш код восстановления:</p>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; font-size: 24px; font-weight: bold; color: #667eea; letter-spacing: 3px; margin: 20px 0;">
                {reset_token[:8].upper()}
            </div>
            <p style="font-size: 12px; color: #999;">Код действителен в течение 24 часов</p>
        </div>
        
        <div class="footer">
            <p style="color: #999; margin: 0;">© 2025 GDPS fin0. Приватный сервер Geometry Dash</p>
            <div class="social-links">
                <a href="https://t.me/+WpNBih78jjAxMTBi" style="color: #667eea;">📱 Telegram</a>
            </div>
        </div>
    </div>
</body>
</html>
        '''
        
        part = MIMEText(html, 'html')
        msg.attach(part)
        
        server = smtplib.SMTP(smtp_host, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True, 'message': 'Письмо отправлено'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
