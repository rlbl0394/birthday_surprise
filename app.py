"""
Birthday Surprise Web App for Michelle
An elegant, interactive birthday experience with seasonal themes
"""

from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

# Disable caching for static files during development
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.after_request
def add_header(response):
    """Add headers to prevent caching"""
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '-1'
    return response

# Birthday messages with their corresponding themes
MESSAGES = [
    {
        'id': 1,
        'sender': 'Narsimlu',
        'theme': 'summer',
        'message': 'Happy Birthday!\nMay your year ahead be filled with exciting opportunities!'
    },
    {
        'id': 2,
        'sender': 'Matt',
        'theme': 'autumn',
        'message': 'Happy Birthday!\nThanks for being a supportive manager. Hope you get some time to relax.'
    },
    {
        'id': 3,
        'sender': 'Heather',
        'theme': 'winter',
        'message': 'Happy Birthday, Michelle!!\nThank you for being a supportive and inclusive manager, it makes a big impact on team dynamics and morale, and we all appreciate it. I hope you have a fun and relaxing birthday weekend! '
    },
    {
        'id': 4,
        'sender': 'Becca',
        'theme': 'spring',
        'message': 'Happy Birthday, Michelle!\nThis surprise is a bit late, but it is still Michelle Day all November. Thank you for your guidance and support. I have grown so much under your leadership. Wishing you a year ahead filled with health, success, and blessings!'
    }
]

@app.route('/')
def home():
    """Display the welcome page"""
    return render_template('home.html')

@app.route('/message/<int:message_id>')
def message(message_id):
    """Display a specific birthday message"""
    if message_id < 1 or message_id > len(MESSAGES):
        return redirect(url_for('home'))
    
    current_message = MESSAGES[message_id - 1]
    has_prev = message_id > 1
    has_next = message_id < len(MESSAGES)
    
    return render_template('message.html', 
                         message=current_message,
                         has_prev=has_prev,
                         has_next=has_next,
                         total=len(MESSAGES))

@app.route('/ending')
def ending():
    """Display the final birthday message"""
    return render_template('ending.html')

@app.route('/games')
def games():
    """Display the games menu"""
    return render_template('games_menu.html')

@app.route('/fortune_cookie')
def fortune_cookie():
    """Display the Fortune Cookie game"""
    return render_template('fortune_cookie.html')

@app.route('/emoji_pop')
def emoji_pop():
    """Display the Emoji Pop game"""
    return render_template('emoji_pop.html')

@app.route('/emoji_catch')
def emoji_catch():
    """Display the Emoji Catch game"""
    return render_template('emoji_catch.html')

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
