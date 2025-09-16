// src/Component/SkeletonList.jsx
import React from "react";

const SkeletonList = ({ title, count = 10 }) => {
  return (
    <div className="px-6 py-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-700 animate-pulse rounded-lg h-60"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonList;
