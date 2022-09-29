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
	createdAt: string;
	updatedAt: string;
}

export type UserAddressTag =
	| 'CASA'
	| 'AMIGO'
	| 'PAREJA'
	| 'TRABAJO'
	| 'UNIVERSIDAD'
	| 'OTRO';

export type UserAddress = {
	id: string;
	name: string;
	street: string;
	instructions: string;
	zip: string;
	city: string;
	tag: UserAddressTag;
	latitude: number;
	longitude: number;
	createdAt: string;
	updatedAt: string;
	// userId: string | null;
};

export type Product = {
	id: string;
	name: string;
	description: string | null;
	price: number;
	image: string;
	blurHash: string;
	couponId: string | null;
	createdAt: string;
	updatedAt: string;
	storeId: string;
};

export type OrderStatus =
	| 'CANCELLED'
	| 'PROBLEM'
	| 'PENDING'
	| 'SENT'
	| 'DELIVERED';

export interface Order {
	id: string;
	address: UserAddress;
	createdAt: string;
	updatedAt: string;
	arrivalTime?: string;
	deliveryPrice: number;
	message?: string;
	product: Product;
	quantity: number;
	status: OrderStatus;
	productId: string;
	dealerId?: string;
	userId: string;
	userAddressId: string;
}

export interface Coordinates {
	latitude: number;
	longitude: number;
}

export interface OrderClass {
	id: string;
	order: Order;
	coordinates: Coordinates;
}
