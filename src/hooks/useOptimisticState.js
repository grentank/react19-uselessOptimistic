import { useState } from 'react';

export default function useOptimisticState(initialState) {
  const [state, setState] = useState(initialState);

  const optimisticSetState = (newStateOrPromise, optimisticState) => {
    if (newStateOrPromise instanceof Promise) {
      const prevState = state;
      if (optimisticState) setState(optimisticState);
      return newStateOrPromise
        .then((newState) => (newState === undefined ? undefined : setState(newState)))
        .catch((error) => {
          setState(prevState);
          throw error;
        });
    } else {
      return setState(newStateOrPromise);
    }
  };
  return [state, optimisticSetState];
}
