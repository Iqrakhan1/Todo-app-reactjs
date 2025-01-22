import React from "react";

const Navbar = () => {
  return (
    <>
      <div className=" bg-blue-900 text-white py-2">
        <nav className="text-center mx-2">
          <h1 className="text-2xl font-bold">QuickTask</h1>
          {/* <ul className=" md:flex md:gap-9 text-gl font-semibold hidden">
            <li>Home</li>

            <li>About</li>
            <li>Contact</li>
          </ul> */}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
