from flask import (Blueprint, jsonify, request, current_app)
from services.grants_service import GrantsService
import requests

grants_bp = Blueprint('grants', __name__) 
grants_service = GrantsService()

@grants_bp.route('', methods=['GET'])
def get_grants():
    current_app.logger.info("DEBUG - GET_GRANTS ROUTE")
    page = int(request.args.get("page", 1))

    try:
        grants = grants_service.get_grants(page=page)
        current_app.logger.info(grants)

        return jsonify(grants), 200
    except Exception as e:
        current_app.logger.error(f"ERROR - get_grants route : {e}")
        return jsonify({"error": "Failed to fetch grants"}), 500