import { GetGroupsResponse, IGroup } from "./groups.types";

export interface IFetchParams {
  isHaveFriends?: boolean;
  isClosed?: boolean;
  color?: string;
}

async function getGroups(params?: IFetchParams): Promise<GetGroupsResponse> {
  const res = await fetch('./src/mocks/db.json');
  if (!res.ok) {
    throw new Error('Error when fetching groups data');
  }
  let groups: IGroup[] = await res.json();

  if (params && Object.prototype.hasOwnProperty.call(params, 'isClosed')) {
    groups = groups.filter((group) => group.closed === params.isClosed);
  }

  if (params && Object.prototype.hasOwnProperty.call(params, 'isHaveFriends')) {
    groups = groups.filter((group) => Boolean(group.friends?.length) === params.isHaveFriends);
  }

  if (params && Object.prototype.hasOwnProperty.call(params, 'color')) {
    groups = groups.filter((group) => group.avatar_color === params.color);
  }
  return {
    result: 1,
    data: groups,
  };
}

export default getGroups;
