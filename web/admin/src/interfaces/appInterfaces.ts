export interface Admin {
	address: string;
	age: number;
	avatar: string;
	banReason?: string;
	birthDate: string;
	createdAt: string;
	dni: string;
	email: string;
	id: string;
	isActive: boolean;
	isBanned: boolean;
	name: string;
	phone: string;
	updatedAt: string;
}

export interface User {
	id: string;
	name: string;
	email?: string;
	phone?: string;
	dni?: string;
	avatar: string;
	facebookId: string;
	isBanned: boolean;
	banReason?: string;
	createdAt: Date;
	updatedAt: Date;
}
