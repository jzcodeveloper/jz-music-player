import { useEffect, useRef } from "react";

//Prevents useEffect upon initial render
export const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return isMounted.current;
};

//Stores old state to compare to the new state
//Allows checks like prevState.prop === state.prop
export const usePrevious = value => {
  const prevState = useRef();

  useEffect(() => {
    prevState.current = value;
  }, [value]);

  return prevState.current;
};

//Uses setinterval
export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (delay !== null) {
      const interval = setInterval(tick, delay);
      return () => clearInterval(interval);
    }
  }, [delay]);
};
