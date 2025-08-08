import os
import requests
from dotenv import load_dotenv
from flask import current_app

load_dotenv()

# a service to interact with the usa spending API
class USASpendingService:
    BASE_URL = "https://api.usaspending.gov/api/v2/"

    def get_contracts(self, size=10, page=1):
        api_url = f"{self.BASE_URL}/search/spending_by_award"
        body = {
            "subawards": False,
            "limit": size,
            "page": page,
            "filters": {
                "award_type_codes": ['A', 'B', 'C', 'D'],
                "time_period": [
                    {
                    "start_date": "2025-07-01",
                    "end_date": "2025-08-01"
                    }
                ]
            },
            "fields": [
                "Award ID",
                "Recipient Name",
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
            return response.json()   
        except requests.RequestException as e:
            current_app.logger.error(f"ERROR - Sam Service : get_opportunities {e}")
            return None     

