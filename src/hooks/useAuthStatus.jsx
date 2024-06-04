import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useState,useEffect } from "react";
export function useAuthStatus() {
  const [loggedIn, setloggedIn] = useState(false);
  const [checking, setchecking] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) setloggedIn(true);
      setchecking(false);
    });
  }, []);
   return { loggedIn, checking };
}
