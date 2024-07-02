import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";

import ListingItem from "../components/ListingItem";
export default function Profile() {
  const auth = getAuth();
  const navi = useNavigate();
  const [changeDetail, setchangeDetail] = useState(false);
  const [listing, setlisting] = useState([]);
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = { ...data };
  const handleSignOut = () => {
    auth.signOut();
    toast.success("Logged Out");
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
        await updateDoc(docRef, { name });
        toast.success("Profile Update successfully");
      }
    } catch (error) {
      toast.error("Profile Not Updated");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("time", "desc")
      );
      const queryList = await getDocs(q);
      const listings = [];
      queryList.forEach((element) => {
        return listings.push({ id: element.id, data: element.data() });
      });
      setlisting(listings);
      setloading(false);
      setTimeout(() => {
        console.log(listing);
      }, 5000);
    };
    fetchData();
  }, [auth.currentUser.uid]);
  const Delete = async (Id) => {
    const flag = window.confirm("Are you sure?");
    if (flag) {
      try {
        await deleteDoc(doc(db, "listings", Id));
        const UpdatedListing = listing.filter((lis) => lis.id !== Id);
        setlisting(UpdatedListing);
        toast.success("Successfully deleted");
      } catch (error) {
        toast.error("Post not Deleted");
      }
    }
  };
  const Edit = (Id) => {
    navi(`/edit-listing/${Id}`);
  };

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-center mt-6 font-bold text-3xl">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3 bg-gray-300 rounded p-5 shadow">
          <form>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleOnchange}
              disabled={!changeDetail}
              className={`w-full px-4 py-2 text-xl text-gray-600 bg-white border border-gray-300 rounded transition ease-in-out mb-6 ${
                changeDetail && "bg-red-300"
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
                  className="text-red-700 hover:text-red-800 transition ease-in-out duration-200 ml-1 cursor-pointer"
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
          <button
            type="submit"
            className="w-full bg-white text-black uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-red-600 transition duration-150 ease-in-out hover:shadow-lg active:bg-red-700"
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center"
            >
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
              Sell or rent your home
            </Link>
          </button>
        </div>
      </section>
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listing.length > 0 && (
          <>
            <h1 className="text-2xl text-center font-semibold">My Listings</h1>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listing.map((lis) => {
                return (
                  <ListingItem
                    key={lis.id}
                    id={lis.id}
                    listing={lis.data}
                    Delete={() => Delete(lis.id)}
                    Edit={() => Edit(lis.id)}
                  />
                );
              })}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
