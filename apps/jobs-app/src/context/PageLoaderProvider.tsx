import { createContext, ReactElement, useContext, useState } from "react";
import PageLoader from "@/components/PageLoader";
import { PageLoaderType } from "@/types/common";

const PageLoaderContext = createContext<PageLoaderType>({
  message: null,
  showPageLoader: () => {},
  hidepageLoader: () => {},
});

const PageLoaderProvider = ({ children }: { children: ReactElement }) => {
  const [message, setMessage] = useState<string | null>(null);

  const showPageLoader = (message: string) => {
    setMessage(message);
  };

  const hidepageLoader = () => {
    setMessage(null);
  };

  return (
    <PageLoaderContext.Provider
      value={{ message, showPageLoader, hidepageLoader }}
    >
      {message && <PageLoader message={message} />}
      {children}
    </PageLoaderContext.Provider>
  );
};

export default PageLoaderProvider;

export const usePageLoader = () => useContext(PageLoaderContext);
