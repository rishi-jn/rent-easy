import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import GLogin from "../components/GLogin";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
export default function ForgetPassword() {
  const [email, setemail] = useState("");
  const handleChange = (e) => {
    setemail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("email sent successfully");
    } catch (error) {
      toast.error("invalid email");
    }
  };
  return (
    <section>
      <h1 className="font-bold text-center m-3 text-3xl">Forgot Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src={require("../images/key.jpg")}
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form className="m-3" on onSubmit={handleSubmit}>
            <input
              className="mb-6 w-full px-4 py-2 text-xl text-gray-600 border-gray-500 rounded transition ease-in-out"
              type="email"
              id="email"
              value={email}
              placeholder="Email Address"
              onChange={handleChange}
            />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg ">
              <p className="mb-6 ">
                Don't have a account?
                <Link
                  to="/sign-up"
                  className="text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-2"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  to="/sign-in"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  Sign In
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 active:bg-blue-800"
            >
              Send Reset Password
            </button>
            <div
              className="my-4 before:border-t flex before:flex-1  items-center before:border-gray-300
          after:border-t  after:flex-1   after:border-gray-300"
            >
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <GLogin />
          </form>
        </div>
      </div>
    </section>
  );
}
