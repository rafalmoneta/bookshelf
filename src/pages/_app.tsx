import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { trpc } from "../utils/trpc";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
