import { createContext, useState, useContext } from "react";

const LinkContext = createContext();

export const LinkProvider = ({ children }) => {
  const [savedLinks, setSavedLinks] = useState([]);

  return (
    <LinkContext.Provider value={{ savedLinks, setSavedLinks }}>
      {children}
    </LinkContext.Provider>
  );
};

export const useLinkContext = () => useContext(LinkContext);
