interface Grant {
    agency: string;
    agencyCode: string
    id: string;
    title: string; 
    openDate: string;
    closeDate: string;
    oppStatus: string;
    cdfaList: string[];
    docType: string;
    number: string;
}

interface GrantFilters {
  agency: string;
}