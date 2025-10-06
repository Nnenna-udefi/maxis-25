import React from "react";
import { events } from "./constants";
import Nav from "./nav";
import AgendaCard from "./agendaCard";

const AgendaPage = () => {
  return (
    <div>
      <Nav />
      <div
        className="py-12 px-4 text-white"
        style={{
          backgroundColor: "#111",
          backgroundImage:
            "radial-gradient(#222 1px, transparent 1px), radial-gradient(#222 1px, transparent 1px)",
          backgroundPosition: "0 0, 25px 25px",
          backgroundSize: "50px 50px",
        }}
      >
        <h2 className="text-3xl font-bold text-[#1338BE] mb-6 text-center">
          Event Agenda
        </h2>
        <div className="max-w-[600px] mx-auto">
          {events.map((event, index) => (
            <AgendaCard key={index} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgendaPage;
