import React from "react";

const assistants = [
  {
    name: "Ravi Jadhav",
    age: 28,
    mobile: "+91 9857637856",
    rating: 4.8,
    profilePic: "https://img.freepik.com/free-photo/ambitious-businessman_1098-18160.jpg?t=st=1734793475~exp=1734797075~hmac=55506949a6fd6f6bb0b0c17102b394137e41d2cd6c1e17bbfc41ee31b83268d9&w=996",

  },
  {
    name: "Rohit Kale",
    age: 30,
    mobile: "+91 8463787909",
    rating: 4.5,
    profilePic: "https://img.freepik.com/free-photo/indian-business-man-with-crossed-hands-posing-isolated-white-wall_231208-2626.jpg?ga=GA1.1.1159257864.1734760633&semt=ais_hybrid",

  },
  {
    name: "Rishabh Sathe",
    age: 35,
    mobile: "+91 8749930426",
    rating: 4.9,
    profilePic: "https://img.freepik.com/free-photo/portrait-young-indian-top-manager-t-shirt-tie-crossed-arms-smiling-white-isolated-wall_496169-1513.jpg?ga=GA1.1.1159257864.1734760633&semt=ais_hybrid",
    
  },
  {
    name: "Nikhil Mote",
    age: 25,
    mobile: "+91 8937097621",
    rating: 4.7,
    profilePic: "https://images.pexels.com/photos/913390/pexels-photo-913390.jpeg",
  },
  {
    name: "Atif Shaikh",
    age: 32,
    mobile: "+91 7896064323",
    rating: 4.6,
    profilePic: "https://images.pexels.com/photos/713520/pexels-photo-713520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  
];

const AssistantProfile = () => {
  return (
    <div className="bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Our Assistants
      </h1>

      {/* Cards Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {assistants.map((assistant, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Profile Picture */}
            <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 flex justify-center">
              <img
                src={assistant.profilePic}
                alt={assistant.name}
                className="rounded-full w-24 h-24 border-4 border-white"
              />
            </div>

            {/* Details */}
            <div className="p-6 text-center">
              <h2 className="text-xl font-bold text-gray-800">
                {assistant.name}
              </h2>
              <p className="text-gray-600 mt-1">Age: {assistant.age}</p>
              <p className="text-gray-600 mt-1">Mobile: {assistant.mobile}</p>
              <div className="flex items-center justify-center mt-4">
                <p className="text-gray-600">Rating:</p>
                <div className="ml-2 flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={
                        i < Math.floor(assistant.rating) ? "gold" : "gray"
                      }
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path d="M12 .587l3.668 7.453L24 9.576l-6 5.84 1.414 8.243L12 18.896l-7.414 4.763L6 15.416 0 9.576l8.332-1.536z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssistantProfile;
