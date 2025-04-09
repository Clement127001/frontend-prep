import LoginForm from "@/components/login/LoginForm";
import RegisterForm from "@/components/register/RegisterForm";
import { useToast } from "@/context/ToastProvider";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Register() {
  const router = useRouter();
  const { showToast } = useToast();

  const { query } = router;
  const path = router.pathname;

  const isUnAuthorised = (Array.isArray(query) ? query[0] : query).ua;

  useEffect(() => {
    if (!router.isReady) return;

    if (isUnAuthorised) {
      showToast({
        title: "Unauthorised",
        description: "Please login to visit jobs",
        type: "warning",
      });
    }

    delete query.ua;
    router.replace(path, undefined, { shallow: true });
  }, [router.isReady, isUnAuthorised]);

  return (
    <>
      <Head>
        <title>Demo app 2</title>
        <meta name="description" content="Login page for user" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="centerContainer">
        <section className="outlineContainer">
          <h2>Login</h2>
          <LoginForm />

          <p style={{ display: "flex" }}>
            Don't have account? <Link href={"/register"}>register</Link>
          </p>
        </section>
      </main>
    </>
  );
}
