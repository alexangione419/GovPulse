const base_url = import.meta.env.VITE_BACKEND_URL as string;


async function getGrants(): Promise<Grant[]> {
    const api_url = `${base_url}/grants/`;

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

    console.log("ok well we're getting here")
    console.log(response)
    const data: Grant[] = await response.json();
    console.log(data)
    return data;
}

export { getGrants }