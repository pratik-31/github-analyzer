"use client";
import axios from "axios";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { Preahvihear } from "next/font/google";
import { useEffect, useState } from "react";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});

const Nav = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [providers, setProviders] = useState(null);

  const getUser = async () => {
    const { data } = await axios.get("/api/user");
    localStorage.setItem("username", data.data.username);
  };

  useEffect(() => {
    const setProvidersFunc = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvidersFunc();
    getUser();
  }, [session?.user]);

  return (
    <div className="flex items-center justify-between mt-4 mx-6">
      {user ? (
        <div className="w-full flex items-center justify-between">
          <div className="text-black">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-gray-900 hover:text-gray-500 rounded-md">
              <span className={preahvihear.className}>
                {session?.user?.name}
              </span>
            </span>
          </div>
          <div className="items-center md:order-2">
            <button
              type="submit"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br bg-black hover:text-white  focus:ring-4 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-gray-900 hover:text-gray-50  rounded-md group-hover:bg-opacity-0">
                <span className={preahvihear.className}>Sign Out</span>
              </span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <div className="flex items-center md:order-2" key={provider.name}>
                <div className="relative mr-2">
                  <button
                    type="submit"
                    onClick={() => {
                      signIn({ callbackUrl: "/" });
                      window.location.reload();
                    }}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br bg-black hover:text-white  focus:ring-4 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-gray-900 hover:text-gray-50  rounded-md group-hover:bg-opacity-0">
                      <span className={preahvihear.className}>Sign In</span>
                    </span>
                  </button>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Nav;
