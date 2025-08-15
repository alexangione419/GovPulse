from flask import (Blueprint, jsonify, request, current_app)
from services.sam_service import SAMService

opportunities_bp = Blueprint('opportunities', __name__) 

@opportunities_bp.route('', methods=['POST'])
def get_opportunities():
    current_app.logger.info("DEBUG - GET_OPPORTUNITIES ROUTE")
    page = int(request.args.get("page", 1))
    sam_service = SAMService()

    try:
        filters = request.get_json()
        opportunities = sam_service.get_opportunities(page=page, filters=filters)
        return opportunities
        
    except Exception as e:
        current_app.logger.error(f"ERROR - get_opportunities route : {e}")
        return jsonify({"error": "Failed to fetch opportunities"}), 500