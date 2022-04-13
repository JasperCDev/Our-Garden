import axios from "axios";

type FetcherResponse<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      error: any;
    };

export async function getClicks(): Promise<string> {
  return axios.get<string>("/api/clicks").then((response) => response.data);
}

export async function updateClicks(
  clicks: number
): Promise<FetcherResponse<null>> {
  return axios
    .put<null>("/api/clicks", {
      clicks,
    })
    .then((response) => ({
      ok: true as true,
      data: response.data,
    }))
    .catch((error) => ({
      ok: false,
      error,
    }));
}
