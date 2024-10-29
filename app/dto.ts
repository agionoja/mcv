export type SuccessResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
  error: null;
};

export type User = SuccessResponse<{
  user: { name: string; email: string };
  token: string;
}>;
