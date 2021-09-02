import { createContext, useContext } from 'react';

type LoadingState = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  showNav: boolean;
  setShowNav: (value: boolean) => void;
};

export const LoadingContext = createContext<LoadingState>({
  isLoading: true,
  setIsLoading: () => {},
  showNav: true,
  setShowNav: () => {},
});

const useLoadingContext = () => useContext(LoadingContext);

export default useLoadingContext;
