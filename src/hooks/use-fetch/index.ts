import { useState, useEffect } from "react";
import sleep from "../../utils/sleep";

type Nullable<T> = T | null;

type TFetchResponse<T> = {
  result: 1 | 0;
  data: T[];
};

function useFetch<T>(
  url: string,
  delay: number = 1000
): [Nullable<TFetchResponse<T>>, boolean, Nullable<string>] {
  const [data, setData] = useState<Nullable<TFetchResponse<T>>>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setData(null);
    setError(null);
    fetch(url)
      .then((res) => res.json())
      .then((res) =>
        sleep(delay).then(() => ({
          result: 1 as const,
          data: res,
        }))
      )
      .then((respData) => {
        if (!cancelled) setData(respData);
      })
      .catch((e) => {
        if (!cancelled) setError(e);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [url, delay]);

  return [data, isLoading, error];
}

export default useFetch;
