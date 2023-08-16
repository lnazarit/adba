import {useState, useEffect} from 'react';



export const useFetch = (url, params, refresh) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const urlFetch = new URL(url);

  const fetching = () => {
    if(params) {
      Object.entries(params).forEach(e => {
        urlFetch.searchParams.set([e[0]], e[1]);
      })
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