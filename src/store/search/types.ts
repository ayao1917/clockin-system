export interface Company {
  domain: string;
  logo: string;
  name: string;
}

export interface SearchCompanyRequest {
  searchKey: string;
}

export interface State {
  companies: Company[];
  searchError: string | null;
  searchPending: boolean;
}
