import Link from "next/link";
import { useRouter } from "next/router";
import { twMerge } from "tailwind-merge";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const router = useRouter();
  const activeLinkStyle = `${
    router.asPath === href ? "text-primary bg-border border-b-primary" : ""
  }`;

  const handleClick = (event: any) => {
    event.preventDefault();
    router.push(href);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={twMerge(
        "hover:bg-border my-1 mr-2 block h-full w-full rounded border-b-4 border-b-transparent py-2 pl-3 pr-2 hover:text-primary hover:no-underline",
        activeLinkStyle
      )}
    >
      {children}
    </Link>
  );
};

const Nav: React.FC = () => {
  return (
    <nav className="">
      <ul className=" flex list-none items-center p-0">
        <li>
          <NavLink href="/">Reading List</NavLink>
        </li>
        <li>
          <NavLink href="/finished">Finished Books</NavLink>
        </li>
        <li>
          <NavLink href="/discover">Discover</NavLink>
        </li>
        <li>
          <NavLink href="/book/create">Add Book</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
