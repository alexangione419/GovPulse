from flask import Flask
from routes.opportunities.opportunities import opportunities_bp


app = Flask(__name__)

app.register_blueprint(opportunities_bp, url_prefix='/opportunities')

if __name__ == "__main__":
    app.run(debug=True)