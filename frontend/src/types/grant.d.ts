interface Grant {
    agency: string;
    agencyCode: string
    id: string;
    title: string; 
    openDate: string;
    closeDate: string;
    oppStatus: string;
}

interface GrantFilters {
  agency: string;
}