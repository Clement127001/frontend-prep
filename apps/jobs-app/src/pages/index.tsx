import LinkComponent from "@/components/LinkComponent";
import Head from "next/head";

export default function Home() {
  // const {}=useLogin();
  const isLoggedIn = false;

  return (
    <>
      <Head>
        <title>Demo app 2</title>
        <meta
          name="description"
          content="This is the demo app for the practising the react"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="centerContainer">
        {isLoggedIn ? (
          <div className="outlineContainer">
            <p>Check out all the jobs</p>

            <LinkComponent href="/jobs">Jobs</LinkComponent>
          </div>
        ) : (
          <div className="outlineContainer">
            <p>Please login or register to get started with your job hunt</p>
            <div className="outlineContainer">
              <LinkComponent href="/login">Login</LinkComponent>
              <LinkComponent href="/register">Register</LinkComponent>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
