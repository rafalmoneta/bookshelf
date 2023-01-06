import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Nav from "./Nav";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <header className="fixed top-0 z-50 mx-auto w-[calc(100%-2rem)] bg-white py-10 dark:bg-ourblack sm:w-[calc(100%-3rem)]">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex w-full items-center justify-between">
          <div>
            <Link aria-label="Bookshelf - created by @rafalmoneta" href="/">
              <div className="mr-3 text-base font-medium text-gray-900 dark:text-gray-100 sm:p-4">
                Bookshelf
              </div>
            </Link>
          </div>
          <nav className="relative">
            <div className="flex items-center text-base leading-5">
              <div className="hidden sm:block">
                <Nav />
              </div>
              <ThemeSwitch />
              <button
                type="button"
                className="hover:bg-border my-1 mr-2 cursor-pointer rounded border-b-4 border-b-transparent py-2 pl-3 pr-2 text-primary hover:text-primary hover:underline"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
