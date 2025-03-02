import os
import shutil
from flask_frozen import Freezer
from app import app

# Configure Frozen-Flask
app.config['FREEZER_BASE_URL'] = 'https://avtecsec.github.io/avtec-security/'
app.config['FREEZER_DESTINATION'] = 'build'
app.config['FREEZER_RELATIVE_URLS'] = True
freezer = Freezer(app)

# URL generator for all routes
@freezer.register_generator
def url_generator():
    # Generate URLs for all routes
    yield '/'
    yield '/about'
    yield '/services'
    yield '/products'
    yield '/contact'

if __name__ == '__main__':
    # Create necessary directories
    os.makedirs('build', exist_ok=True)
    os.makedirs('build/static', exist_ok=True)
    os.makedirs('build/static/videos', exist_ok=True)

    # Create .nojekyll file to disable Jekyll processing
    with open(os.path.join('build', '.nojekyll'), 'w') as f:
        pass

    # Generate static site
    freezer.freeze()

    print("Static site generated in 'build' directory")