import React from "react";
import { events } from "./constants";

const Home = () => {
  const todayEvent =
    events.find(
      (event) =>
        new Date(event.date).toDateString() === new Date().toDateString()
    ) || events[0];
  return (
    <div>
      <Nav />
      <div
        className="relative bg-cover p-6 md:p-12  min-h-screen "
        style={{
          backgroundColor: "#111",
          backgroundImage:
            "radial-gradient(#222 1px, transparent 1px), radial-gradient(#222 1px, transparent 1px)",
          backgroundPosition: "0 0, 25px 25px",
          backgroundSize: "50px 50px",
        }}
      >
        <div className="lg:h-[600px]  p-4  block lg:flex justify-between text-center items-center text-white">
          <div className="w-full flex flex-col items-center md:items-start justify-center px-4">
            <div className="flex gap-3 items-center date py-2 px-4 rounded-full text-sm mb-4">
              <Calendar />
              <p>October 31 - November 2, 2025</p>
            </div>
            <div className="flex gap-1 md:gap-3 items-center  py-2 px-4 text-base md:text-lg mb-4">
              <MapPin />
              <p>Cedar Court Hotel, Bradford</p>
            </div>
            <h1 className="heading font-merriweather md:leading-24 text-white uppercase text-6xl lg:text-8xl font-extrabold pb-2">
              Maxis 25'
            </h1>
            <p className="text-white font-cinzel italic uppercase md:text-5xl text-3xl font-extrabold pb-4">
              Conference
            </p>
            <div className="pt-6">
              <Link
                to="/agenda"
                className="text-white border hover:bg-white hover:text-black rounded-full py-4 px-6 text-lg md:text-xl"
              >
                View Agenda
              </Link>
            </div>
          </div>

          <div className="w-full px-4 mt-20 md:mt-0">
            <LiveSection activities={todayEvent.activities} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
