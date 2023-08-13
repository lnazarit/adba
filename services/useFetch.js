import {useState, useEffect} from 'react';

export const useFetch = (url, refresh, id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [urlFetch, setUrlFetch] = useState(url)

  useEffect(() => {
    if(id === 0) setUrlFetch(url);
    if(id) setUrlFetch(`${url}?category=${id}`);
  }, [id]);

  useEffect(() => {
    fetch(urlFetch)
    .then(res => res.json())
    .then(dataItems => setData(dataItems))
    .catch(err => setError(true))
    .finally(() => setLoading(false))
  }, [url, refresh, urlFetch]);

  return {loading, error, data}
}