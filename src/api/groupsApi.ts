import { GetGroupsResponse } from "./groupsApi.types";

async function getGroups(): Promise<GetGroupsResponse> {
  return await fetch('src/server/db.json', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.ok) {
        const groupsData = {
          result: 1,
          data: res,
        }
        return groupsData;
      } else {
        return {
          result: 0,
          data: undefined,
        }
      }
    })
    // .then((data) => data.json())
    .catch(() => {
      throw new Error()
    });
}

export default getGroups;
