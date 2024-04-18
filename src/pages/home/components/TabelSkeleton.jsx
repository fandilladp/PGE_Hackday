import React from "react";

const TabelSkeleton = () => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th className="skeleton h-12 w-full rounded-none"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="skeleton h-12 bg-white"></td>
          </tr>
          <tr>
            <td className="skeleton h-12 w-full rounded-none"></td>
          </tr>
          <tr>
            <td className="skeleton h-12 bg-white"></td>
          </tr>
          <tr>
            <td className="skeleton h-12 w-full rounded-none"></td>
          </tr>
          <tr>
            <td className="skeleton h-12 bg-white"></td>
          </tr>
          <tr>
            <td className="skeleton h-12 w-full rounded-none"></td>
          </tr>
          <tr>
            <td className="skeleton h-12 bg-white"></td>
          </tr>
          <tr>
            <td className="skeleton h-12 w-full rounded-none"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TabelSkeleton;
