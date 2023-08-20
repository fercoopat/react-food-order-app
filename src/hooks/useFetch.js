import { useCallback, useState } from 'react';

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = useCallback(async (url) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(url);

      if (!response.ok) throw new Error('Something went wrong!');

      const responseData = await response.json();
      setData(responseData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addData = useCallback(async (url, data) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Something went wrong!');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, getData, addData };
};

export default useFetch;
