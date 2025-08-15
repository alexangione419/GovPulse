# GovPulse
## Personalizable Feed for Defense & Government News

A Twitter-style infinite feed where “posts” are pulled from external data sources (e.g., grants, contracts, and opportunities) rather than user submissions. Items are merged, lightly randomized, and shown in a single scrollable timeline with filters.


### High level arcitecture
Front End -> React + Typescript (Vite)

Back End -> Python (Flask)


### Local Development 
#### Back End

Create an account and register for an API Key with Sam.gov

Create a .env file in the backend directory
```
SAM_GOV_API_KEY='{YOUR_KEY}'
```

Execute the following in the backend directory, installing dependencies as needed
```
python3 app.py
```

#### Frontend


Create a .env file in the frontend directory
```
VITE_BACKEND_URL = http://127.0.0.1:5000
```

Execute the following in the frontend directory
```
npm i
npm run dev
```


### Future Improvements
- More robust filtering
- Personalized cards per "post" with more in-depth information