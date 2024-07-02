import React from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default function Header() {
  const navigator = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const [check, setcheck] = useState("Sign In");
  function checkLocation(route) {
    if (route === location.pathname) return true;
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setcheck("Profile");
      else setcheck("Sign In");
    });
  }, [auth]);

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 mx-auto max-w-6xl">
        <div>
          <img
            src={require("../images/rent-easy-high-resolution-logo.png")}
            alt="logo"
            className="h-[60px] cursor-pointer p-0 m-0 bg-red-500"
            onClick={() => {
              navigator("/");
            }}
          />
        </div>
        <div>
          <ul className="flex space-x-10 pt-3">
            <li
              className={`text-gray-500 pb-3 font-semibold ${
                checkLocation("/") && "text-red-800 border-b-[3px] border-red-600"
              }`}
              onClick={() => {
                navigator("/");
              }}
            >
              Home
            </li>
            <li
              className={`text-gray-500 pb-3 font-semibold ${
                checkLocation("/offers") &&
                "text-red-800 border-b-[3px] border-red-600"
              }`}
              onClick={() => {
                navigator("/offers");
              }}
            >
              Offers
            </li>
            <li
              className={`text-gray-500 pb-3 font-semibold ${
                (checkLocation("/sign-in") || checkLocation("/profile")) &&
                "text-red-800 border-b-[3px] border-red-600"
              }`}
              onClick={() => {
                navigator("/profile");
              }}
            >
              {check}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
