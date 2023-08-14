import {useState, useEffect} from 'react';

export const useFetch = (url, refresh, id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(dataItems => setData(dataItems))
    .catch(err => setError(true))
    .finally(() => setLoading(false))
  }, [url, refresh]);

  return {loading, error, data}
}