interface Contract {
    internal_id: number;
    "Recipient Name": string;
    "State Date": string;
    "End Date": string;
    "Award Amount": string;
    "Awarding Agency": string;
    "Funding Agency": string;
}

type ContractFilters = {
  awardMaxAmount: string;
  awardMinAmount: string;
}