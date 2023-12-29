"use client";

import { AppConfig } from "@config/config";
import RequestServices from "@services/apis_service";
import { createContext, useContext, useState, useEffect } from "react";

interface ContextProps {
  fieldNames: any[];
}

const GlobalContext = createContext<ContextProps>({
  fieldNames: [],
});

export const GlobalContextProvider = ({ children }: any) => {
  const [fieldNames, setFieldNames] = useState<[] | any[]>([]);
  useEffect(() => {
    const appendData = async () => {
      const service = new RequestServices();
      const response: any = await service.getRequest(AppConfig.fieldName);
      setFieldNames(response.data.data[0]["attributes"]["home"]);
    };
    appendData();
  }, []);

  return (
    <GlobalContext.Provider value={{ fieldNames: fieldNames }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
