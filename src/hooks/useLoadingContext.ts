import { createContext, useContext } from 'react';

type LoadingState = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

export const LoadingContext = createContext<LoadingState>({
  isLoading: true,
  setIsLoading: () => {},
});

const useLoadingContext = () => useContext(LoadingContext);

export default useLoadingContext;
