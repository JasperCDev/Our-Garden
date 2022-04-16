import useSWR from "swr";
import { getClicks } from "../api/fetchers";
import { GET_CLICKS_SWR_KEY, MILLISECONDS_SERVER_INTERVAL } from "./constants";

export default function GetClicks() {
  const swrResponse = useSWR(GET_CLICKS_SWR_KEY, getClicks, {
    refreshInterval: MILLISECONDS_SERVER_INTERVAL,
  });

  return {
    ...swrResponse,
    // ensure data is always a number, and is never undefined
    data: Number(swrResponse.data) || 0,
  };
}
