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
  endDate: string;
  awardMaxAmount: string;
  awardMinAmount: string;
}