type FetchArgs = {
  endpoint: `${END_POINT}`;
  token?: string;
  init?: RequestInit & { method: "POST" | "PATCH" | "DELETE" | "GET" };
};

type FetchReturn<T> = Success<T> | Failure;
type Failure = {
  error: { statusCode: number; message: string };
  data: null;
};
type Success<T> = {
  error: null;
  data: T;
};

const API = "https://apata-inventory.onrender.com";

export default async function fetchClient<T>({
  endpoint,
  token,
  init,
}: FetchArgs): Promise<FetchReturn<T>> {
  // console.log(`${API}${endpoint}`);
  try {
    const response = await fetch(`${API}${endpoint}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...init?.headers,
      },
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
        message: "Network error or unexpected server response",
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
}
