export interface Message {
    FullName: string;
    Email: string;
    Mess?: string;  // Optional for GET requests
    Message?: string;  // Optional for POST requests
}
