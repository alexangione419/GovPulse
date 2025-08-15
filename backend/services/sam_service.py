import os
import requests
from dotenv import load_dotenv
from flask import current_app, jsonify

load_dotenv()

# a service to interact with the SAM.gov API
class SAMService:
    OPPORTUNITIES_BASE_URL = "https://api.sam.gov/prod/opportunities/v2/search"

    def __init__(self):
        self.api_key = os.getenv('SAM_GOV_API_KEY')
        if not self.api_key:
            raise ValueError("SAM_GOV_API_KEY not found in environment variables")


    def get_opportunities(self, page, filters):
        params = {
            "api_key": self.api_key,
            "limit": 10,
            "offset": page,
            "postedFrom": filters["postedFrom"],
            "postedTo": filters["postedTo"],
            "state": filters["state"],
            "status": filters["status"],
        }

        try:
            response = requests.get(self.OPPORTUNITIES_BASE_URL, params=params)
            response.raise_for_status()
            return response.json()["opportunitiesData"]   
        
        except requests.RequestException as e:
            if e.response.status_code == 429:
                current_app.logger.error("Rate limit exceeded. Please try again later.")
                return jsonify({"error": "Rate limit exceeded. Please try again later."}), 429

            current_app.logger.error(f"ERROR - Sam Service : get_opportunities {e}")
            return None     

