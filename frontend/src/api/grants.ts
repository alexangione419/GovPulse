const base_url = import.meta.env.VITE_BACKEND_URL as string;


async function getGrants(page: number): Promise<Grant[]> {
    const api_url = `${base_url}/grants?page=${page}`;

    const response = await fetch (
        api_url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    if (!response.ok) {
        throw new Error(`API ERROR - status: ${response.status}`);
    }

    console.log("ok well we're getting here")
    const rawText = await response.clone().text();
console.log(rawText)
    const data: Grant[] = await response.json();
    return data;
}

export { getGrants }