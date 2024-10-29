/* eslint-disable prettier/prettier */
// TourContext.js
import React, { createContext, useContext, useState } from 'react';

const TourContext = createContext();

export const TourProvider = ({ children }) => {
  const [isTourActive, setIsTourActive] = useState(true);

  return (
    <TourContext.Provider value={{ isTourActive, setIsTourActive }}>
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => useContext(TourContext);
