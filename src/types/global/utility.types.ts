export type Nullable<T> = T | null;
export type Maybe<T> = T | undefined;

export type ApiResponse<T> = {
	data: T;
	status: number;
	message: string;
};
