import os
import requests
from dotenv import load_dotenv
from flask import current_app, jsonify

load_dotenv()

# a service to interact with the grants.gov API
class GrantsService:
    GRANTS_BASE_URL = "https://api.grants.gov/v1/api/search2"


    def get_grants(self, page, filters):
        current_app.logger.info(f"DEBUG - GET_GRANTS SERVICE with filters: {filters}")
        body = { 
            "rows": 999,
            "keyword": "",
            "oppNum": "",
            "eligibilities": "",
            "agencies": filters.get("agency", ""),
            "oppStatuses": "forecasted|posted",
            "aln": "",
            "fundingCategories": ""
        } 

        try:
            response = requests.post(self.GRANTS_BASE_URL, json = body)
            response.raise_for_status()
            data = response.json()["data"]["oppHits"]

            page_size = 10
            paginated_data = data[(page*page_size): page*page_size+page_size]

            return paginated_data


        except requests.RequestException as e:
            current_app.logger.error(f"ERROR - Sam Service : get_opportunities {e}")
            return None  
