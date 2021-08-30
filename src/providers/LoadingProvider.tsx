import { useState, ReactNode } from 'react';
import { LoadingContext } from '../hooks/useLoadingContext';

interface Props {
  children: ReactNode;
}

const LoadingProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
