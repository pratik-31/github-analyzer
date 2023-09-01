"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Preahvihear } from "next/font/google";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});

const Repositories = () => {
  const router = useRouter();
  const [repos, setRepos] = useState([]);

  const getRepos = async () => {
    try {
      const username = localStorage.getItem("username");
      const { data } = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      console.log(data);
      setRepos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRepos();
  }, []);

  return (
    <>
      <div
        className="overflow-x-auto overflow-y-auto mt-5 mx-4 md:mx-20 rounded-md"
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        }}
      >
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow">
            <table className="min-w-full divide-y table-fixed text-sm text-left text-gray-500">
              <thead className="h-20 text-xs text-gray-50 uppercase  bg-black">
                <tr>
                  <th scope="col" className="px-6 py-3 ">
                    <span className={preahvihear.className}>
                      Repository Name{" "}
                    </span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className={preahvihear.className}>Description</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className={preahvihear.className}>Languages</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className={preahvihear.className}></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {repos &&
                  repos.map((repo) => (
                    <tr className=" border-b 0 " key={repo._id}>
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        <span className={preahvihear.className}>
                          {repo.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        <span className="text-gray-900">
                          <span className={preahvihear.className}>
                            {repo.description
                              ? repo.description.slice(0, 100)
                              : "No Description"}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 ">
                        <span className="text-gray-900">
                          <span className={preahvihear.className}>
                            {repo.language ? repo.language : "No Language"}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 ">
                        <button
                          type="submit"
                          onClick={() => {
                            router.push(`/repos/${repo.name}`);
                          }}
                          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br bg-black hover:text-white  focus:ring-4 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white text-gray-900 hover:text-gray-50  rounded-md group-hover:bg-opacity-0">
                            <span className={preahvihear.className}>View</span>
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Repositories;
