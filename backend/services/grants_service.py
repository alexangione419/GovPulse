import os
import requests
from dotenv import load_dotenv
from flask import current_app

load_dotenv()

# a service to interact with the grants.gov API
class GrantsService:
    GRANTS_BASE_URL = "https://api.grants.gov/v1/api/search2"

    def get_grants(self, size = 10):
        body = { 
            "rows": size,
            "keyword": "",
            "oppNum": "",
            "eligibilities": "",
            "agencies": "DOD*",
            "oppStatuses": "forecasted|posted",
            "aln": "",
            "fundingCategories": ""
        } 

        try:
            response = requests.post(self.GRANTS_BASE_URL, json = body)
            response.raise_for_status()
            return response.json()   
        except requests.RequestException as e:
            current_app.logger.error(f"ERROR - Sam Service : get_opportunities {e}")
            return None  
