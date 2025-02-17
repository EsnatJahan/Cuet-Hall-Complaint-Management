import React from 'react'
function ProfilePage(){
  return(
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
    <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
    <table className="w-full border-collapse border border-gray-300">
      <img src="man.png" alt="" />
      <tbody>
        {[
          ["Name", "Esnat Jahan"],
          ["Email", "ena@gmail.com"],
          ["Hall", "CUET Tapshi Rabeya Hall"],
          ["Room No", "220"],
          ["Phone Number", "0147788"]
        ].map(([key, value]) => (
          <tr key={key} className="border-b border-gray-200">
            <td className="px-4 py-2 font-semibold text-gray-700 bg-gray-100">{key}</td>
            <td className="px-4 py-2 text-gray-800">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}


export default ProfilePage;
