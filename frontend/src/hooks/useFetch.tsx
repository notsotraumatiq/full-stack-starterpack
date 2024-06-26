import { useState, useEffect, useCallback } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import axiosInstance from "../api/axios-config";

export interface UseFetchProps<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  refetch: () => void;
}

const useFetch = <T,>(url: string): UseFetchProps<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const cancelTokenSource = axios.CancelToken.source();

    try {
      const response: AxiosResponse<T> = await axiosInstance.get(url, {
        cancelToken: cancelTokenSource.token,
      });
      setData(response.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Fetch cancelled", err.message);
      } else if (err instanceof AxiosError) {
        console.error(err);
        setError(err);
      }
    } finally {
      setLoading(false);
    }

    return () => {
      cancelTokenSource.cancel("Component unmounted: fetch aborted");
    };
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
