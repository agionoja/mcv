import { FormEncType } from "@remix-run/react";

type FetchArgs = {
  endpoint: `${END_POINT}`;
  token?: string;
  init?: RequestInit & { method: "POST" | "PATCH" | "DELETE" | "GET" } & {
    headers?: { "Content-Type"?: FormEncType } & Record<string, unknown>;
  };
};

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;
export type ApiFailure = {
  error: { statusCode: number; message: string };
  data: null;
};
export type ApiSuccess<T> = {
  error: null;
  data: T;
};

export const API = "https://mcv-server.onrender.com";

export default async function fetchClient<T>({
  endpoint,
  token,
  init,
}: FetchArgs): Promise<ApiResult<T>> {
  const headers = { ...init?.headers };
  delete init?.headers;

  try {
    const response = await fetch(`${API}${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      ...init,
    });
    if (!response.ok) {
      // Attempt to extract a custom error message from JSON, if provided
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.message || "An unexpected error occurred";

      console.log(errorData);
      return {
        error: {
          statusCode: response.status,
          message: errorMessage,
        },
        data: null,
      };
    }

    // Parse and return data if the response is OK
    const jsonResponse: T = await response.json();
    return { error: null, data: jsonResponse };
  } catch (e) {
    console.log(e);
    return {
      error: {
        statusCode: 500,
        message: "Network error",
      },
      data: null,
    };
  }
}

// Enum for predefined endpoints
export enum END_POINT {
  LOGIN = "/auth/login",
  FORGOT_PASSWORD = "/auth/forgot-password",
  RESET_PASSWORD = "/auth/reset-password",
  PRODUCT = "/product",
  PRODUCT_WITH_ID = "/product/:id",
  PRODUCT_FIND_ALL = "/product/findAll",
  SUPPLIER_All = "/supplier/findAll",
  SUPPLIER = "/supplier",
  DASHBOARD = "/dashboard",
}
