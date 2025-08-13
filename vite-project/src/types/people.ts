export type PersonRegister ={
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phone?: string; // Optional field
    address?: string; // Optional field
    createdAt: Date;
}

export type PersonLogin={
    email: string;
    password: string;
}