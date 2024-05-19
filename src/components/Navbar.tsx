import React from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";

interface LinkData {
  name: string;
  path: string;
}

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  [key: string]: any;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, ...props }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={`${isActive ? "text-blue-500" : ""}`}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};

const Navbar = () => {
  const navbarData: LinkData[] = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Sign In", path: "/sign-in" },
    { name: "Sign Up", path: "/sign-up" },
  ];
  return (
    <nav>
      <ul className="flex gap-3">
        {navbarData.map(({ name, path }) => (
          <NavLink to={path} key={name}>
            {name}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
