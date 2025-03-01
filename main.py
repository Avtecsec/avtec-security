import os
from app import app

app.secret_key = os.environ.get("SESSION_SECRET")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)