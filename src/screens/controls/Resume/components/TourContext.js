/* eslint-disable prettier/prettier */
import React, { createContext, useState, useContext } from 'react';

const TourContext = createContext();

export const TourProvider = ({ children }) => {
  const [elementPositions, setElementPositions] = useState({});
  const [isTourVisible, setIsTourVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <TourContext.Provider
      value={{
        elementPositions,
        setElementPositions,
        isTourVisible,
        setIsTourVisible,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => useContext(TourContext);
