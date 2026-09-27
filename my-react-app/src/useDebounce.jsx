import React, { useEffect, useState } from "react";

export const useDebounce = (query, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(query);
    }, delay);

    // console.log(query,delay);
    return () => {
      clearTimeout(timer);
    };
  }, [query, delay]);

  return debounceValue;
};
