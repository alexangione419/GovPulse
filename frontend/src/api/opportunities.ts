const base_url = import.meta.env.VITE_BACKEND_URL as string;

interface Opportunity {
  noticeId: string;
  title: string;
}

async function getOpportunities(): Promise<Opportunity[]> {
    const api_url = `${base_url}/opportunities/`;

    const response = await fetch (
        api_url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );

    if (!response.ok) {
        throw new Error(`API ERROR - status: ${response.status}`);
    }

    console.log("ok well were getting here")
    const data: Opportunity[] = await response.json();
    console.log(data)
    return data;
}

export { getOpportunities, type Opportunity }