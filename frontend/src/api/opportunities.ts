const base_url = import.meta.env.VITE_BACKEND_URL as string;

async function getOpportunities(page: number, oppFilters: OpportunityFilters): Promise<Opportunity[]> {
    const api_url = `${base_url}/opportunities?page=${page}`;

    const response = await fetch (
        api_url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(oppFilters),
        }
    );

    if (!response.ok) {
        if (response.status === 429) {
            console.log("Rate limit exceeded. Please try again later.");
            return []
        } else {
            throw new Error(`API ERROR - status: ${response.status}`);
        }

    }

    const data: Opportunity[] = await response.json();
    console.log(data)
    return data;
}

export { getOpportunities }