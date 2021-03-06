import { useState, useCallback } from "react";
const useHttp = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsloading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });
      if (!response.ok) {
        throw new Error("Request Failed");
      }
      const data = await response.json();
      applyData(data);
    } catch (error) {
      setError(error.message || "Something went worng");
    }
    setIsloading(false);
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};
export default useHttp;
