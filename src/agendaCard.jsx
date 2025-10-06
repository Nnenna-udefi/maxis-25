import React from "react";
const colors = ["border-red-500", "border-yellow-500", "border-blue-500"];
const AgendaCard = ({ event }) => {
  return (
    <div>
      <div
        style={{ border: "1px dashed #ccc", padding: "1rem", margin: "1rem 0" }}
        className="md:text-xl text-lg "
      >
        <h3 className="bg-[#1338BE] text-white text-2xl font-extrabold p-2">
          {event.date}
        </h3>
        <div className="max-h-[500px] scroll-smooth overflow-y-auto">
          {event.activities.map((activity, i) => (
            <div
              key={activity.name}
              className="flex justify-between items-center border-b py-4"
            >
              <div className={`border-l-6 pl-4 ${colors[i % colors.length]}`}>
                <p>{activity.startTime}</p>
                <p className="text-gray-700">{activity.endTime}</p>
              </div>
              <div>
                <h4>{activity.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgendaCard;
