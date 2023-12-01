import React, { createContext, useContext, FC, ReactNode } from 'react';

export interface CurrencyData {
  rateSell: string;
  rateBuy: string;
}

interface CurrencyContextProps {
  children: ReactNode;
  value: {
    usdData: CurrencyData | null;
    eurData: CurrencyData | null;
  };
}

const CurrencyContext = createContext({} as CurrencyContextProps);

export const useCurrencyContext = () => {
  return useContext(CurrencyContext);
};

export const CurrencyProvider: FC<CurrencyContextProps> = ({ children, value }) => {
  return (
    <CurrencyContext.Provider value={{ children, value }}>
      {children}
    </CurrencyContext.Provider>
  );
};
