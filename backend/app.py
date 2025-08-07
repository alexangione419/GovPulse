import os
import logging
from flask import Flask
from flask_cors import CORS
from routes.opportunities.opportunities import opportunities_bp
from routes.grants.grants import grants_bp 


def setup_logging(app):
    if not os.path.exists('logs'):
        os.mkdir('logs')

    console_handler = logging.StreamHandler()
    console_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s'
    ))

    console_handler.setLevel(logging.DEBUG)
    app.logger.addHandler(console_handler)

    app.logger.setLevel(logging.DEBUG)
    app.logger.info('Begin logging')



app = Flask(__name__)
CORS(app)
setup_logging(app)



app.register_blueprint(opportunities_bp, url_prefix='/opportunities')
app.register_blueprint(grants_bp, url_prefix='/grants')

if __name__ == "__main__":
    app.run(debug=True)




