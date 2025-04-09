import LoginProvider from "@/context/LoginProvider";
import PageLoaderProvider from "@/context/PageLoaderProvider";
import ToastProvider from "@/context/ToastProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoginProvider>
      <ToastProvider>
        <PageLoaderProvider>
          <Component {...pageProps} />
        </PageLoaderProvider>
      </ToastProvider>
    </LoginProvider>
  );
}
