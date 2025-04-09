import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { loginPages, loginRestrictedPages } from "@/utils/common";
import { LoginContextType } from "@/types/common";

const LoginContext = createContext<LoginContextType>({
  isLoggedIn: false,
  refreshLoginState: () => {},
});

const LoginProvider = ({ children }: { children: ReactElement }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoggedInChecked, setIsLoggedInChecked] = useState<boolean>(false);
  const router = useRouter();

  const path = router.asPath.split("?")[0];

  const refreshLoginState = () => {
    const token = Cookies.get("userToken");
    const isValidToken = typeof token === "string" && token.length > 0;

    setIsLoggedIn(isValidToken);
    setIsLoggedInChecked(true);
  };

  useEffect(() => {
    const token = Cookies.get("userToken");

    if (!router.isReady) return;

    if (!token && loginRestrictedPages.includes(path)) {
      setIsLoggedInChecked(true);
      router.push("/login/?ua=" + true);
      return;
    } else if (token && loginPages.includes(path)) {
      router.push("/jobs");
    } else {
      refreshLoginState();
    }
  }, [router.isReady, path]);

  if (!isLoggedInChecked) return <p>Checking login status...</p>;

  return (
    <LoginContext.Provider value={{ isLoggedIn, refreshLoginState }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;

export const useLogin = () => useContext(LoginContext);
