import os
from flask import Flask, render_template, url_for, send_from_directory, make_response
from flask_compress import Compress

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET")

# Enable Flask-Compress
Compress(app)

# Add static folder configuration
app.static_folder = 'static'

# Enable file compression
app.config['COMPRESS_MIMETYPES'] = ['text/html', 'text/css', 'text/xml', 'application/json', 'application/javascript', 'text/javascript']

@app.after_request
def add_header(response):
    # Cache static assets
    if 'Cache-Control' not in response.headers:
        response.headers['Cache-Control'] = 'public, max-age=3600'
    return response

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

# Updated video serving route with proper mime type and byte range support
@app.route('/static/videos/<path:filename>')
def serve_video(filename):
    video_dir = os.path.join(app.root_path, 'static', 'videos')
    response = make_response(send_from_directory(video_dir, filename))
    response.headers['Content-Type'] = 'video/mp4'
    response.headers['Accept-Ranges'] = 'bytes'
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)