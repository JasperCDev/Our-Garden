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

interface ClickMap {
  [key: string]: {
    clicks: number;
  };
}

export async function getClicks(): Promise<ClickMap> {
  return axios.get<ClickMap>("/api/clicks").then((response) => response.data);
}

export async function updateClicks(
  clickMap: ClickMap
): Promise<FetcherResponse<ClickMap>> {
  return axios
    .put<ClickMap>("/api/clicks", {
      clickMap: JSON.stringify(clickMap),
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
