import { createContext, useState } from "react";

interface ITokenContext {
  token: string;
  addToken: (newToken: string) => void;
}

const defaultState = {
  token: "",
  addToken: () => {},
};

const TokenContext = createContext<ITokenContext>(defaultState);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string>("");
  const addToken = (newToken: string) => {
    setToken(newToken);
  };
  return (
    <TokenContext.Provider value={{ token, addToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContext;
