# GovPulse
## Personalizable Feed for Defense & Government News


A Twitter-style infinite feed where “posts” are pulled from external data sources (e.g., grants, contracts, and opportunities) rather than user submissions. Items are merged, lightly randomized, and shown in a single scrollable timeline with filters.


### High level arcitecture
Front End -> React + Typescript (Vite)

Back End -> Python (Flask)


### Local Development 
- Backend

```
# in backend directory
python3 app.py
```

- Frontend

```
# in frontend directory
npm i
npm run dev
```


### Future Improvements
- More robust filtering
- Personalized cards per "post" with more in-depth information