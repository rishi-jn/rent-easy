import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
export default function Contact({ user, listing }) {
  const [owner, setowner] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetch = async () => {
      const docRef = doc(db, "users", user);
      const Doc = await getDoc(docRef);
      setowner(Doc.data());
    };
    fetch();
  }, []);
  function onChange(e) {
    setMessage(e.target.value);
  }
  return (
    <>
      {owner !== null && (
        <div className="flex flex-col w-full">
          <p>Contact {owner.name}</p>
          <div className="mt-3 mb-6">
            <textarea
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={onChange}
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
            ></textarea>
          </div>
          <a href={`mailto:${owner.email}?Subject=${listing.name}&body=${message}`}><button type="button" className="px-2 py-3 bg-blue-600 text-white rounded text-sm shadow-md hover:shadow-lg hover:bg-blue-700 transition duration-100 ease-in-out w-full text-center">Send Message</button></a>
        </div>
      )}
    </>
  );
}
