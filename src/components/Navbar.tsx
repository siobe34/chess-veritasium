import { useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faChessQueen } from "@fortawesome/free-solid-svg-icons";

import Button from "./Button";

function Navbar() {
  const location = useLocation();
  const [showMobileMenu, setMobileMenu] = useState<boolean>(false);

  useEffect(() => {
    setMobileMenu(false);
  }, [location]);

  return (
    <>
      <nav className="relative flex items-center content-center justify-between bg-blue-500">
        <div className="flex items-center text-white ml-6 mr-12">
          <Link to="/">
            <FontAwesomeIcon className="mr-2" icon={faChessQueen} />
            <span className="font-semibold text-xl tracking-tight">
              10K-Chess
            </span>
          </Link>
        </div>
        <div
          className={`
                absolute
                ${showMobileMenu ? "flex" : "hidden"}
                flex-col
                items-center
                gap-2
                pb-2
                w-full
                bg-blue-500
                text-sm
                sm:static
                sm:flex
                sm:flex-row
                sm:w-auto
                sm:pb-0`}
          style={{ top: "100%" }}
        >
          <Link className="text-blue-200 hover:text-white mr-4" to="/practice">
            Practice
          </Link>
          <Link className="text-blue-200 hover:text-white mr-4" to="/about">
            About
          </Link>
        </div>
        <div className="flex mr-6 sm:hidden">
          <Button
            buttonStyle="primary"
            customUtils="border-blue-400 hover:text-white hover:border-white"
            onClick={() => setMobileMenu(!showMobileMenu)}
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
