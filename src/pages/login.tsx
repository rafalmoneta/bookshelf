import type { NextPage } from "next";
import AuthShowcase from "../components/AuthShowcase";

const LoginPage: NextPage = () => {
  return (
    <section className="grid min-h-screen place-items-center py-8">
      <div className="w-full">
        <h1 className="text-center text-4xl font-bold tracking-tight text-white sm:text-6xl sm:tracking-tight lg:text-[4rem] xl:text-[6rem] xl:tracking-tight 2xl:text-[6.5rem]">
          <div className="astro-7RII5PLW text-primary">Login</div>
          <div> Form</div>
        </h1>
        <AuthShowcase />
      </div>
    </section>
  );
};

export default LoginPage;
