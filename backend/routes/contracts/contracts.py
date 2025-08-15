from flask import (Blueprint, jsonify, request, current_app)
from services.usaspending_service import USASpendingService
import requests

contracts_bp = Blueprint('contracts', __name__) 
usaSpending_service = USASpendingService()

@contracts_bp.route('', methods=['POST'])
def get_contracts():
    current_app.logger.info("DEBUG - GET CONTRACTS ROUTE")
    page = int(request.args.get("page", 1))

    try:
        filters = request.get_json()
        lower_bound = filters.get("awardMinAmount", 0)
        upper_bound = filters.get("awardMaxAmount", 400000)
        contracts = usaSpending_service.get_contracts(page=page, lower_bound=lower_bound, upper_bound=upper_bound)

        return jsonify(contracts), 200
    except Exception as e:
        current_app.logger.error(f"ERROR - get_contracts route : {e}")
        return jsonify({"error": "Failed to fetch contracts"}), 500