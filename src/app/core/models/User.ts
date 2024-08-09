export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;  // Password should be optional for profile fetching, but required for updating
    phoneNumber: string;
    faculty: string;
    locality: string;
    status: string;
}
