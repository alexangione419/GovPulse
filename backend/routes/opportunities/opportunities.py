from flask import (Blueprint, jsonify)
from services.sam_service import SAMService

opportunities_bp = Blueprint('opportunities', __name__) 

@opportunities_bp.route('/', methods=['GET'])
def get_opportunities():
    sam_service = SAMService()

    try:
        opportunities = sam_service.get_opportunities(size=1)
        return jsonify(opportunities), 200
    except Exception as e:
        print(f"ERROR - get_opportunities route : {e}") 
        return jsonify({"error": "Failed to fetch opportunities"}), 500