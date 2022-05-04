import useSWR from "swr";
import { getClicks } from "../api/fetchers";
import { GET_CLICKS_SWR_KEY } from "./constants";
import defaultClickMap from "./defaultClickMap";

export function GetClicks() {
  const swrResponse = useSWR(GET_CLICKS_SWR_KEY, getClicks);
  return { ...swrResponse, data: swrResponse.data || defaultClickMap };
}
