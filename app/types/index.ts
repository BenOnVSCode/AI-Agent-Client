interface Token {
  token: string;
  user: {
    id: string; 
  };
}

interface LoginResponse {
    result: {
      data: {
        token: string,
      }
    }
}

interface StoreState {
  name: string|null,
  email: string|null,
  role: string|null,
  callsPage: number
}

interface StoreType {
  state: StoreState
}


interface ProfileResponse {
  result: {
    data: {
      name: string,
      email: string,
      role: string
    }
  }
}

type CallStatus = 'Completed' | 'Missed' | 'In Progress' | 'Scheduled';
type CallType = 'Verification' | 'Customer Support' | 'Sales'

interface Call {
  id: string;
  type: string;
  date: string;
  transcript: string;
  number: string;
  status: string;
  statusColor: string;
  recordingUrl: string;
  clientName: string;
  postCode: string;
  poa: string;
  initiatedBy: string;
  duration: string;
  summary: string;
}
interface CallResponse {
  result: {
    data: {
      calls: Array<Call>;
      totalCount: number;
      totalPages: number;
      currentPage: number;
    }
  }
}

interface StatusesResponse {
  result: {
    data: {
      statuses: {
        id: number,
        name: string,
        color: string
      }[]
    }
  }
}

