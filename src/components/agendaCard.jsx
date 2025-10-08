const colors = ["border-red-500", "border-yellow-500", "border-blue-500"];
const AgendaCard = ({ event }) => {
  return (
    <div className="py-4 max-w-[500px] md:w-[500px]">
      <div
        style={{ border: "1px dashed #ccc", padding: "1rem", margin: "1rem 0" }}
        className="md:text-xl text-lg max-w-full"
      >
        <div className="bg-[#09729b] text-[#F5F5F5] text-lg md:text-xl p-2 font-extrabold">
          <h2>{event.title}</h2>
          <h3 className="pt-2 ">{event.date}</h3>
        </div>
        <div className="max-h-[500px] scroll-smooth scrollbar overflow-y-auto px-2">
          {event.activities.map((activity, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b py-4"
            >
              <div className={`border-l-6 pl-4 ${colors[i % colors.length]}`}>
                <p>{activity.startTime}</p>
                <p className="text-gray-500">{activity.endTime}</p>
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
