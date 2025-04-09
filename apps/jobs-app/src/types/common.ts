export type LoginContextType = {
  isLoggedIn: boolean;
  refreshLoginState: () => void;
};

export type PageLoaderType = {
  message: string | null;
  showPageLoader: (val: string) => void;
  hidepageLoader: () => void;
};
