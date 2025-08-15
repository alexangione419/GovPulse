import os
import requests
from dotenv import load_dotenv
from flask import current_app

load_dotenv()

# a service to interact with the usa spending API
class USASpendingService:
    BASE_URL = "https://api.usaspending.gov/api/v2"

    def get_contracts(self, size=10, page=1, lower_bound=0, upper_bound=400000):
        current_app.logger.info(f"DEBUG - GET_CONTRACTS SERVICE with size: {size}, page: {page}, lower_bound: {lower_bound}, upper_bound: {upper_bound}")
        api_url = f"{self.BASE_URL}/search/spending_by_award"
        body = {
            "subawards": False,
            "limit": size,
            "page": page,
            "filters": {
                "award_type_codes": ["A", "B", "C", "D"],
                "award_amounts": [{
                    "lower_bound": lower_bound,
                    "upper_bound": upper_bound 
                }]
            },
            "fields": [
                "Award ID",
                "Start Date",
                "End Date",
                "Recipient Name",
                "Award Amount",
                "Contract Award Type",
                "Awarding Agency",
                "Funding Agency",
                "Award Description"
            ]
        }

        try:
            response = requests.post(api_url, json=body)
            response.raise_for_status()
            return response.json()["results"]   
        except requests.RequestException as e:
            current_app.logger.error(f"ERROR - USA Spending : get_contracts {e}")
            current_app.logger.error(f"Response: {response.json()}")
            return []
