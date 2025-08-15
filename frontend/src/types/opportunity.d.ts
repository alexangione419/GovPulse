interface Opportunity {
  noticeId: string;
  title: string;
  postedDate: string;
  active: string;
  naicsCode: string;
  baseType: string;
  type: string;
}

interface OpportunityFilters  {
  postedFrom: string;
  postedTo: string;
  state: string;
  status: string;
} 