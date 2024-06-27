import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, params, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          params,
          headers: {
            Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`, // use the environment variable
          },
          ...options,
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Use JSON.stringify to stabilize the dependencies
  }, [url, JSON.stringify(params), JSON.stringify(options)]);

  return { data, loading, error };
};

export default useFetch;
