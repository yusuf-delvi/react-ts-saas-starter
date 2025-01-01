export enum AuthType {
	GOOGLE = 'GOOGLE',
	EMAIL = 'EMAIL',
}

export interface User {
	_id: string;
	name: string;
	email: string;
	authType: AuthType;
	isGuideCompleted: boolean;
	isSubscribed: boolean;
}
