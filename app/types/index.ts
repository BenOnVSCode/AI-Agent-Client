interface Token {
	token: string;
	user: {
		id: string;
	};
}
interface RequestWithToken {
	token: string
}
interface LoginResponse {
	result: {
		data: {
			token: string;
		};
	};
}
type FilterOption = 'Verification' | 'WG Sales' | 'PCP Sales'
type FilterOptionIds = 1 | 2 | 3;

interface StoreState {
	id: number | null;
	name: string | null;
	email: string | null;
	role: string | null;
	callsPage: number;
	callsFilter: number[];
}

interface StoreType {
	state: StoreState;
}

interface ProfileResponse {
	result: {
		data: {
			name: string;
			email: string;
			role: string;
			id: number; 
		};
	};
}

type CallStatus = "Completed" | "Missed" | "In Progress" | "Scheduled";
type CallType = "Verification" | "Customer Support" | "Sales";

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
	address: string;
	split: boolean;
	isDD: boolean;
	price: number;
}


interface CallResponse {
	result: {
		data: {
			calls: Array<Call>;
			totalCount: number;
			totalPages: number;
			currentPage: number;
		};
	};
}

interface StatusesResponse {
	result: {
		data: {
			statuses: {
				id: number;
				name: string;
				color: string;
			}[];
		};
	};
}

interface VerificationCallRequest extends RequestWithToken {
	name: string;
	address: string;
	id: string;
	number: string;
	split: boolean;
	price: number;
	bank: string;
	isDD: boolean;
	initiatedBy: number;
	postCode: string
}
 

interface SaleCallRequest extends RequestWithToken {
	name: string,
	address: string,
	postCode: string,
	number: string,
	userId: number,
}


interface SaleCallExcelRequest {
	calls: Array<{
		name: string, 
		address: string,
		postCode: string,
		number: string,
	}>,
	initiatedBy: number,
	token: string
}

interface User {
	id: number;
	name: string;
	email: string;
	role: string;
	createdAt: string
}

interface UsersResponse {
	result: {
		data: {
			users: Array<User>
		}
	}
}

interface UserRequest extends RequestWithToken {
	name: string,
	email: string,
	role: string,
	password: string,
}


interface UserUpdateRequest extends RequestWithToken {
	id: number,
	name?: string,
	email?: string,
	role?: string,
	password?: string,
}