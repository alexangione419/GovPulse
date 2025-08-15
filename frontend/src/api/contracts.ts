const base_url = import.meta.env.VITE_BACKEND_URL as string;


async function getContracts(page: number, contractFilters: ContractFilters): Promise<Contract[]> {
    const api_url = `${base_url}/contracts?page=${page}`;

    const response = await fetch (
        api_url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contractFilters),
        }
    );

    if (!response.ok) {
        throw new Error(`API ERROR - status: ${response.status}`);
    }

    const data: Contract[] = await response.json() as Contract[];
    return data;
}

export { getContracts }