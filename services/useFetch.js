import {useState, useEffect} from 'react';

export const useFetch = (url, params, refresh) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const urlFetch = new URL(url);

  const fetching = () => {
    if(params) {
      params.forEach((value, key) => {
        urlFetch.searchParams.set(key, value);
      });
    }
    fetch(urlFetch)
    .then(res => res.json())
    .then(dataItems => setData(dataItems))
    .catch(() => setError(true))
    .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetching();
  }, [url, refresh, params]);


  return {loading, error, data}
}