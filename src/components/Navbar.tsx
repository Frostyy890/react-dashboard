import React from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface LinkData {
  name: string;
  path: string;
}

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  otherClasses?: string;
  activeClasses?: string;
  [key: string]: any;
}

const NavLink: React.FC<NavLinkProps> = ({
  to,
  children,
  otherClasses = "",
  activeClasses = "",
  ...props
}) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  const classes = `${otherClasses} ${isActive ? activeClasses : ""}`.trim();
  return (
    <Link to={to} className={classes} {...props}>
      {children}
    </Link>
  );
};

const Navbar = () => {
  const navbarData: LinkData[] = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contacts", path: "/contacts" },
    { name: "Services", path: "/services" },
  ];
  const [isAdmin, setIsAdmin] = React.useState<boolean>(true);
  isAdmin && navbarData.push({ name: "Dashboard", path: "/dashboard" });
  const { isLoggedIn, handleLogout } = useAuth();
  return (
    <nav className="fixed top-0 w-full bg-indigo-800 text-white border border-black py-4 px-8">
      <ul className="flex w-full font-medium justify-between items-center">
        <li>
          <Link to="/" className="text-2xl">
            Logo
          </Link>
        </li>
        <li className="flex gap-6">
          {navbarData.map(({ name, path }) => (
            <NavLink to={path} key={name} activeClasses="text-emerald-400">
              {name}
            </NavLink>
          ))}
        </li>
        <li className="flex gap-4">
          {!isLoggedIn ? (
            <>
              <NavLink
                otherClasses="outline-none transition-all ease-in-out duration-300 py-1 px-2 border rounded-full border-transparent hover:border-emerald-400"
                activeClasses="bg-emerald-400"
                to="/sign-in"
              >
                Sign In
              </NavLink>
              <NavLink
                otherClasses="outline-none transition-all ease-in-out duration-300 py-1 px-2 border rounded-full border-transparent hover:border-emerald-400"
                activeClasses="bg-emerald-400"
                to="/sign-up"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink onClick={handleLogout} to="/sign-out">
                Sign Out
              </NavLink>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
