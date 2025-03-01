import os
from flask import Flask, render_template, url_for, send_from_directory, make_response, jsonify, request
from flask_compress import Compress
from urllib.parse import quote

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET")

# Enable Flask-Compress
Compress(app)

# Add static folder configuration
app.static_folder = 'static'

# Enable file compression and caching
app.config['COMPRESS_MIMETYPES'] = ['text/html', 'text/css', 'text/xml', 'application/json', 'application/javascript', 'text/javascript']
app.config['COMPRESS_BR_LEVEL'] = 11  # Maximum compression for Brotli
app.config['COMPRESS_ALGORITHM'] = ['br', 'gzip']  # Prefer Brotli, fallback to gzip

@app.after_request
def add_header(response):
    # Cache static assets
    if 'Cache-Control' not in response.headers:
        response.headers['Cache-Control'] = 'public, max-age=3600'
    return response

@app.route('/')
def index():
    response = make_response(render_template('index.html'))
    # Add preload headers for optimal video loading
    response.headers['Link'] = '</static/videos/advanced_security_surveillance.mp4>; rel=preload; as=video'
    return response

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

# New route for generating shareable video links
@app.route('/share/<path:filename>')
def share_video(filename):
    video_url = url_for('serve_video', filename=filename, _external=True)
    title = "Avtec Security - Professional Security Solutions"
    description = "Experience cutting-edge security solutions from Avtec Security"

    share_links = {
        'facebook': f"https://www.facebook.com/sharer/sharer.php?u={quote(video_url)}",
        'twitter': f"https://twitter.com/intent/tweet?url={quote(video_url)}&text={quote(title)}",
        'linkedin': f"https://www.linkedin.com/sharing/share-offsite/?url={quote(video_url)}",
        'whatsapp': f"https://wa.me/?text={quote(f'{title} - {video_url}')}",
        'direct': video_url
    }

    return jsonify(share_links)

# Updated video serving route with proper mime type and byte range support
@app.route('/static/videos/<path:filename>')
def serve_video(filename):
    video_dir = os.path.join(app.root_path, 'static', 'videos')
    response = make_response(send_from_directory(video_dir, filename))
    response.headers['Content-Type'] = 'video/mp4'
    response.headers['Accept-Ranges'] = 'bytes'
    # Add video caching headers
    response.headers['Cache-Control'] = 'public, max-age=31536000'
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)