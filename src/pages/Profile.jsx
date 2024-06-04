import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";
export default function Profile() {
  const auth = getAuth();
  const navi = useNavigate();
  const [changeDetail, setchangeDetail] = useState(false);
  const [data, setdata] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = { ...data };
  const handleSignOut = () => {
    auth.signOut();
    navi("/");
  };
  const handleOnchange = (e) => {
    setdata((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, { displayName: name });
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, { name, });
        toast.success("Profile Update successfully");
      }
    } catch (error) {
      toast.error("Profile Not Updated");
    }
  };
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-center mt-6 font-bold text-3xl">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleOnchange}
              disabled={!changeDetail}
              className={`w-full px-4 py-2 text-xl text-gray-600 bg-white border border-gray-300 rounded transition ease-in-out mb-6 ${
                changeDetail && "bg-red-200"
              }`}
            />
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full px-4 py-2 text-xl text-gray-600 bg-white border border-gray-300 rounded transition ease-in-out mb-6"
            />
            <div className="mb-6 flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="flex items-center">
                Do you want to change name?{" "}
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setchangeDetail((prev) => !prev);
                  }}
                  className="text-red-500 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  {changeDetail ? "Apply changes" : "Edit"}
                </span>
              </p>
              <p
                onClick={handleSignOut}
                className="text-blue-500 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
