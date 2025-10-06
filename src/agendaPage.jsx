import React from "react";
import { events } from "./constants";
import Nav from "./nav";

const AgendaPage = () => {
  return (
    <div>
      <Nav />
      <h2 className="text-3xl font-bold text-[#1338BE] mb-6 text-center">
        Event Agenda
      </h2>
      <div className="max-w-[600px] mx-auto">
        {events.map((event, index) => (
          <AgendaCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
};

export default AgendaPage;
