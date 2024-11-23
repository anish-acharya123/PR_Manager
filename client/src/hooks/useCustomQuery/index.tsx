import { QueryKey, useQuery } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

export const API = async <T,>(
  api: string,
  options: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const response = await axios.get(api, options);
    return response.data;
  } catch (error) {
    throw new Error("user cannot fetch");
  }
};

export const useCustomQuery = <TData,>(
  querykey: QueryKey,
  url: string,
  options: AxiosRequestConfig = {}
) => {
  const { data, isLoading, isFetching, error } = useQuery<TData>({
    queryKey: querykey,
    queryFn: () => API<TData>(url, options),
  });
  return { data, isLoading, isFetching, error };
};
