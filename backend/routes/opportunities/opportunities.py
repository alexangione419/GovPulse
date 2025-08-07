from flask import (Blueprint, jsonify, current_app)
from services.sam_service import SAMService

opportunities_bp = Blueprint('opportunities', __name__) 

@opportunities_bp.route('/', methods=['GET'])
def get_opportunities():
    current_app.logger.info("DEBUG - GET_OPPORTUNITIES ROUTE")
    sam_service = SAMService()

    try:
        opportunities = sam_service.get_opportunities(size=1)
        print(opportunities)

        return jsonify(opportunities["opportunitiesData"]), 200
    except Exception as e:
        current_app.logger.error(f"ERROR - get_opportunities route : {e}")
        return jsonify({"error": "Failed to fetch opportunities"}), 500