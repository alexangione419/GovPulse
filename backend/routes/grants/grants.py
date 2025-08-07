from flask import (Blueprint, jsonify, current_app)
from services.grants_service import GrantsService

grants_bp = Blueprint('grants', __name__) 

@grants_bp.route('/', methods=['GET'])
def get_opportunities():
    current_app.logger.info("DEBUG - GET_OPPORTUNITIES ROUTE")
    grants_service = GrantsService()

    try:
        grants = grants_service.get_grants(size=10)
        print(grants)

        return jsonify(grants["data"]["oppHits"]), 200
    except Exception as e:
        current_app.logger.error(f"ERROR - get_opportunities route : {e}")
        return jsonify({"error": "Failed to fetch opportunities"}), 500