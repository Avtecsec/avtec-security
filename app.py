import os
from flask import Flask, render_template, url_for, send_from_directory, make_response

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET")

# Add static folder configuration
app.static_folder = 'static'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/products')
def products():
    return render_template('products.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

# Add route for serving video files with caching
@app.route('/static/videos/<path:filename>')
def serve_video(filename):
    response = make_response(send_from_directory('static/videos', filename))
    response.headers['Content-Type'] = 'video/mp4'
    response.headers['Accept-Ranges'] = 'bytes'
    # Cache for 1 hour
    response.headers['Cache-Control'] = 'public, max-age=3600'
    return response