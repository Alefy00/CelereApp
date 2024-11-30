/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useRef } from 'react';

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const scrollViewRef = useRef(null);

  const scrollToElement = (key, positions) => {
    const element = positions[key];
    if (element && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: element.y - 50, // Ajuste o deslocamento
        animated: true,
      });
    }
  };

  return (
    <ScrollContext.Provider value={{ scrollViewRef, scrollToElement }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
