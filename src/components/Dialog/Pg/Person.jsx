import React from "react";

export default function Person({ user }) {
  return (
    <div
      className="p-4 bg-white w-[300px] rounded-xl shadow-md hover:shadow-xl cursor-pointer"
      style={{ transition: ".2s" }}
    >
      <h1 className="font-bold text-[20px]">{user.nom}</h1>
      <p>
        Age: <strong>{user.age}</strong>
      </p>
      <p>
        Occupation: <strong>{user.occupation}</strong>
      </p>
      <p>
        Phone: <strong>{user.phone ?? "-"}</strong>
      </p>
    </div>
  );
}
