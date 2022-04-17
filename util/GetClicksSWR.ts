import useSWR from "swr";
import { getClicks, getClicks2 } from "../api/fetchers";
import { GET_CLICKS_SWR_KEY, GET_CLICKS_SWR_KEY2 } from "./constants";

export default function GetClicks() {
  const swrResponse = useSWR(GET_CLICKS_SWR_KEY, getClicks);

  return {
    ...swrResponse,
    // ensure data is always a number, and is never undefined
    data: Number(swrResponse.data) || 0,
  };
}

export function GetClicks2() {
  const swrResponse = useSWR(GET_CLICKS_SWR_KEY2, getClicks2);
  return swrResponse;
}
