"use client";

import getCampground from "@/libs/getCampground";
import updateCampground from "@/libs/updateCampground";
// import CurrentCampgroundShower from "@/components/CurrentCampgroundShower";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditCampgroundPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const urlParams = useSearchParams();
  const id = urlParams.get("id") as string;
  const cname = urlParams.get("name");

  const [campgroundJsonReady, setCampgroundJsonReady] = useState<Object>();

  useEffect(() => {
    const fetchCampground = async () => {
      const data = await getCampground(id);
      setCampgroundJsonReady(data);
    };
    fetchCampground();
  }, [id]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [picture, setPicture] = useState("");

  if (!session || !session.user.token) return null;
  const submit = () => {
    if (
      name &&
      address&&
      telephone&&
      picture
    ) {
      const editCampground = async () => {
        await updateCampground(
          id,
          session.user.token,
          name,
          address,
          telephone,
          picture
        );
      };
      editCampground();
      alert("Successfully edited!");
      router.push("/campground");
    } else {
      alert("Please fill in the missing field!");
    }
  };

  return (
    <main className="text-left mx-[20%] pb-5">
      <div className="text-4xl font-bold mt-[8%] ">
        Edit Campground : {cname}
      </div>
      {/* <CurrentCampgroundShower campground={campgroundJsonReady} /> */}

      <div className="w-full my-10">
        <label className="w-auto block text-gray-700" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          required
          id="name"
          name="name"
          placeholder="Type the name of campground here"
          className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mt-2 text-gray-700 focus:outline-none focus:border-emerald-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>

      <div className="w-full my-10">
        <label className="w-auto block text-gray-700" htmlFor="address">
          Address
        </label>
        <input
          type="text"
          required
          id="address"
          name="address"
          placeholder="Type the address of campground here"
          className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mt-2 text-gray-700 focus:outline-none focus:border-emerald-500"
          value={address}
          onChange={(e) => setPicture(e.target.value)}
        ></input>
      </div>
      
      <div className="w-full my-10">
          <label className="w-auto block text-gray-700" htmlFor="tel">
            Phone Number
          </label>
          <input
            type="text"
            required
            id="tel"
            name="tel"
            placeholder="Type the phone number here"
            className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mt-2 text-gray-700 focus:outline-none focus:border-emerald-500"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          ></input>
      </div>

      <div className="w-full my-10">
        <label className="w-auto block text-gray-700" htmlFor="picture">
          Picture
        </label>
        <input
          type="text"
          required
          id="picture"
          name="picture"
          placeholder="Type the source of image here"
          className="bg-white border-[2px] border-gray-500 rounded-lg w-full py-2 px-4 mt-2 text-gray-700 focus:outline-none focus:border-emerald-500"
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
        ></input>
      </div>
      <div className="text-center">
        <button
          className="bg-white border-[2px] border-red-500 px-8 py-1 mr-10 text-red-500 font-medium rounded-full hover:bg-red-500 hover:text-white"
          onClick={() => {
            setName("");
            setAddress("");
            setTelephone("");
            setPicture("");
          }}
        >
          Cancel
        </button>
        <button
          className="border-[2px] border-blue-800 bg-blue-800 px-10 py-1 text-white font-medium rounded-full hover:bg-white hover:text-blue-800 hover:bg-white"
          onClick={submit}
        >
          Edit
        </button>
      </div>
    </main>
  );
}
