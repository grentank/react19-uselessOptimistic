export default function useFulOptimistic(state, setState) {
  return function makeOptimistic(callback) {
    return function optimisticCallback(...args) {
      const prevState = state;
      const result = callback(...args);
      if (result instanceof Promise) {
        return result.catch((error) => {
          setState(prevState);
          throw error;
        });
      }
    };
  };
}
