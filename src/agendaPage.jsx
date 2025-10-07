import { events } from "./utils/constants";
import Nav from "./components/nav";
import AgendaCard from "./components/agendaCard";
import Footer from "./components/footer";

const AgendaPage = () => {
  return (
    <div>
      <Nav />
      <div
        className="py-12 md:px-12 px-4 text-white"
        style={{
          backgroundColor: "#111",
          backgroundImage:
            "radial-gradient(#222 1px, transparent 1px), radial-gradient(#222 1px, transparent 1px)",
          backgroundPosition: "0 0, 25px 25px",
          backgroundSize: "50px 50px",
        }}
      >
        <h2 className="text-3xl md:text-5xl font-bold font-merriweather text-[#00A8E8] mb-6 text-center">
          🪩 Conference Agenda
        </h2>
        <div className="mx-auto pb-6 block md:grid grid-cols-2 justify-items-center gap-10">
          {events.map((event, index) => (
            <div
              key={index}
              className={
                index === events.length - 1 ? "col-span-2 mx-auto" : ""
              }
            >
              <AgendaCard event={event} />
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AgendaPage;
