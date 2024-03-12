import sleep from "../../utils/sleep";
import { GetGroupsResponse } from "./groups.types";

async function getGroups(): Promise<GetGroupsResponse> {
  const res = await fetch('http://localhost:8000/groups');
  if (!res.ok) {
    throw new Error('Error when fetching groups data');
  }
  const groups = await res.json();
  await sleep(1500);
  return {
    result: 1,
    data: groups,
  };
}

export default getGroups;
