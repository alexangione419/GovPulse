const base_url = import.meta.env.VITE_BACKEND_URL as string;


async function getGrants(page: number, grantfilters: GrantFilters): Promise<Grant[]> {
    const api_url = `${base_url}/grants?page=${page}`;

    const response = await fetch (
        api_url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(grantfilters),
        }
    );

    if (!response.ok) {
        throw new Error(`API ERROR - status: ${response.status}`);
    }

    const data: Grant[] = await response.json();
    return data;
}

export { getGrants }