"""
Interactive Games Web App
A collection of fun, engaging mini-games with multilingual support
"""

from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    """Display the games menu"""
    return render_template('home.html')

@app.route('/games')
def games():
    """Redirect to home (games menu)"""
    return redirect(url_for('home'))

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
