import { useState, ReactNode } from 'react';
import { LoadingContext } from '../hooks/useLoadingContext';

interface Props {
  children: ReactNode;
}

const LoadingProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showNav, setShowNav] = useState(false);

  return (
    <LoadingContext.Provider
      value={{ isLoading, setIsLoading, showNav, setShowNav }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
