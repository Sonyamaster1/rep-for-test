import { useState, useEffect } from "react";
import sleep from "../../utils/sleep";
import { IFetchParams } from "../../api/groups";
import api from "../../api";
import { GetGroupsResponse } from "../../api/groups/groups.types";

type Nullable<T> = T | null;

function useGetGroups(
  params?: IFetchParams,
  delay: number = 1000
): [GetGroupsResponse, boolean, Nullable<string>] {
  const [groups, setGroups] = useState<GetGroupsResponse>({
    result: 1,
    data: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Nullable<string>>(null);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setGroups({ result: 1, data: [] });
    setError(null);
    api
      .getGroups({ ...params })
      .then((res) => sleep(delay).then(() => res))
      .then((respData) => {
        if (!cancelled) setGroups(respData);
      })
      .catch(() => {
        if (!cancelled) setError("Ошибка получения данных групп");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [params, delay]);

  return [groups, isLoading, error];
}

export default useGetGroups;
