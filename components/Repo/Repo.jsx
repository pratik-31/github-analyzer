"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Preahvihear } from "next/font/google";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});

const Repo = ({ name }) => {
  const router = useRouter();
  const [repo, setRepo] = useState([]);

  const getRepo = async () => {
    try {
      const username = localStorage.getItem("username");
      const { data } = await axios.get(
        `https://api.github.com/repos/${username}/${name}`
      );
      console.log(data);
      setRepo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRepo();
  }, []);

  return (
    <div className="fixed w-full h-full flex justify-center items-center">
      <div className="flex border-2 rounded-lg border-gray-200 teaminnerbutton border-opacity-50 p-8 sm:flex-row flex-col">
        <div className="flex-grow">
          <h2 className="text-gray-900 text-4xl title-font font-2xl mb-6">
            <span className={preahvihear.className}>{repo.name}</span>
          </h2>
          <h1 className="leading-relaxed text-base text-gray-900 mb-3 ">
            <span className={preahvihear.className}> Name : {repo.name}</span>
          </h1>
          <p className="leading-relaxed text-base text-gray-900 mb-3">
            <span className={preahvihear.className}>
              Description : {repo.description}
            </span>
          </p>
          <p className="leading-relaxed text-base text-gray-900 mb-3">
            <span className={preahvihear.className}>Forks : {repo.forks}</span>
          </p>
          <p className="leading-relaxed text-base text-gray-900 mb-3">
            <span className={preahvihear.className}>
              Stars : {repo.stargazers_count}
            </span>{" "}
          </p>
          <p className="leading-relaxed text-base text-gray-900 mb-3">
            <span className={preahvihear.className}>
              Watchers : {repo.watchers}
            </span>
          </p>
          <p className="leading-relaxed text-base text-gray-900 mb-3">
            <span className={preahvihear.className}>
              Open Issues : {repo.open_issues}
            </span>
          </p>
          <p className="leading-relaxed text-base text-gray-900 mb-3">
            <span className={preahvihear.className}>
              Language : {repo.language ? repo.language : "No Language"}
            </span>
          </p>
          <p className="leading-relaxed text-base text-gray-900 mb-3">
            <span className={preahvihear.className}>
              License : {repo.license ? repo.license.name : "No License"}
            </span>
          </p>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              onClick={() => router.push("/")}
              className="w-full text-center flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br bg-black hover:text-white  focus:ring-4 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-gray-900 hover:text-gray-50  rounded-md group-hover:bg-opacity-0">
                <span className={preahvihear.className}>Back</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repo;
