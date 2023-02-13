import { createContext, useContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface IRefresh {
  refresh: boolean;
  setRefresh: (refres: boolean) => void;
}

// @ts-ignore
const RefreshContext = createContext<IRefresh>();

export function RefreshProvider({ children }: Props) {
  const [refresh, setRefresh] = useState<boolean>(false);

  return <RefreshContext.Provider value={{ refresh, setRefresh }}>
    {children}
  </RefreshContext.Provider>;
}

export function useRefreshValue() {
  return useContext(RefreshContext);
}