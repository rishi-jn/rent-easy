import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { GoogleAuthProvider } from "firebase/auth";
// import { serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
export default function GLogin() {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      const ref = doc(db, "users", result.user.uid);
      await setDoc(ref, {
        name: result.user.displayName,
        email: result.user.email,
        time: serverTimestamp(),
      });
      navigate("/");
      toast.success("Successfully loged in");
    } catch (error) {
      toast.error("Try later");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center justify-center w-full bg-red-700 text-white px-7 py-3 text-sm font-medium hover:bg-red-800 active:bg-red-900 rounded"
    >
      <FcGoogle className="text-2xl bg-white rounded-full mr-2" />
      Continue With Google
    </button>
  );
}
