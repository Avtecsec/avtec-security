import os
from flask import Flask, render_template

app = Flask(__name__, 
    template_folder='templates',  # Explicitly set template folder
    static_folder='static'        # Explicitly set static folder
)
app.secret_key = os.environ.get("SESSION_SECRET")

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