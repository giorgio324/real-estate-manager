import { useEffect, useState } from 'react';

const BASE_API_URL =
  'https://api.real-estate-manager.redberryinternship.ge/api';

const TOKEN = '9cfee65c-3590-420c-8e46-7914f73113b5';

export const useFetch = <T,>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let waitingRequestToFinish = false;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_API_URL}${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: T = await response.json(); // Cast response to generic type

        if (!waitingRequestToFinish) {
          setData(result);
        }
      } catch (err: any) {
        if (!waitingRequestToFinish) {
          setError(err.message);
        }
      } finally {
        if (!waitingRequestToFinish) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      waitingRequestToFinish = true;
    };
  }, [endpoint]);

  return { data, isLoading, error };
};
