import { createContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

const HistoryProvider = (props) => {
  const viewHistory = () => {};
  return (
    <HistoryContext.Provider
      value={{
        viewHistory: viewHistory,
      }}
    >
      {props.children}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;

export const HistoryContext = createContext();
