from flask import (Blueprint, jsonify, request, current_app)
from services.usaspending_service import USASpendingService
import requests

contracts_bp = Blueprint('contracts', __name__) 
usaSpending_service = USASpendingService()

@contracts_bp.route('', methods=['GET'])
def get_contracts():
    current_app.logger.info("DEBUG - GET CONTRACTS ROUTE")
    # page = int(request.args.get("page", 1))

    try:
        contracts = usaSpending_service.get_contracts()
        current_app.logger.info(contracts)

        return jsonify(contracts), 200
    except Exception as e:
        current_app.logger.error(f"ERROR - get_contracts route : {e}")
        return jsonify({"error": "Failed to fetch contracts"}), 500