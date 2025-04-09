import RegisterForm from "@/components/register/RegisterForm";
import Head from "next/head";
import Link from "next/link";

export default function Register() {
  return (
    <>
      <Head>
        <title>Demo app 2</title>
        <meta name="description" content="Register page for user" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="centerContainer">
        <section className="outlineContainer">
          <h2>Register</h2>
          <RegisterForm />

          <p style={{ display: "flex" }}>
            Already had account? <Link href={"/login"}>Login</Link>
          </p>
        </section>
      </main>
    </>
  );
}
