import { useQuery } from "@tanstack/react-query";

const fetchAndConvertToJson = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw response;
  }

  return response.json();
};

export const fetchData = (url) => {
  const { data, isLoading, error } = useQuery([url], () =>
    fetchAndConvertToJson(url)
  );

  return [data, isLoading, error];
};
