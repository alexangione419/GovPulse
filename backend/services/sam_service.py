import os
import requests
from dotenv import load_dotenv

load_dotenv()

# a service to interact with the SAM.gov API
class SAMService:
    OPPORTUNITIES_BASE_URL = "https://api.sam.gov/prod/opportunities/v2/search"

    def __init__(self):
        self.api_key = os.getenv('SAM_GOV_API_KEY')
        if not self.api_key:
            raise ValueError("SAM_GOV_API_KEY not found in environment variables")


    def get_opportunities(self, size=1, postedFrom="07/01/2025", postedTo="08/01/2025"):
        params = {
            "api_key": self.api_key,
            "limit": size,
            "postedFrom": postedFrom,
            "postedTo": postedTo
        }

        try:
            response = requests.get(self.OPPORTUNITIES_BASE_URL, params=params)
            response.raise_for_status()
            return response.json()   
        except requests.RequestException as e:
            print(f"ERROR - Sam Service : get_opportunities {e}")
            return None     

