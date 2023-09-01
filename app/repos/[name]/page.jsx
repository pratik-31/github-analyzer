import Repo from "@/components/Repo/Repo";
import React from "react";

const page = ({ params }) => {
  return (
    <div>
      <Repo name={params.name} />
    </div>
  );
};

export default page;
