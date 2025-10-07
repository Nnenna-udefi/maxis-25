import { events } from "./utils/constants";
import { Link } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import Nav from "./components/nav";
import LiveSection from "./components/liveSection";
import Footer from "./components/footer";

const Home = () => {
  const allActivities = events.flatMap((event) =>
    event.activities.map((activity) => ({
      ...activity,
      date: event.date,
    }))
  );
  return (
    <div>
      <Nav />
      <div
        className=" p-6 md:px-12 md:pt-12 md:pb-4 h-screen"
        style={{
          backgroundColor: "#111",
          backgroundImage:
            "radial-gradient(#222 1px, transparent 1px), radial-gradient(#222 1px, transparent 1px)",
          backgroundPosition: "0 0, 25px 25px",
          backgroundSize: "50px 50px",
        }}
      >
        <div className="lg:h-[600px]  p-4  block lg:flex justify-between text-center items-center text-white">
          <div className="w-full flex flex-col items-center md:items-start justify-center">
            <div className="flex gap-2 items-center date py-2 px-4 rounded-full text-sm mb-4">
              <Calendar />
              <p>October 31 - November 2, 2025</p>
            </div>
            <Link
              to={
                "https://www.google.com/maps/place/Cedar+Court+Hotel+Bradford/@53.7702198,-1.7540776,17z/data=!3m1!4b1!4m9!3m8!1s0x487be12a2f03fd3d:0x321e44ef1354c994!5m2!4m1!1i2!8m2!3d53.7702198!4d-1.7515027!16s%2Fg%2F1tls2d6_?entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D"
              }
              target="_blank"
              className="flex gap-1 md:gap-3 items-center py-2 text-base md:text-lg mb-4"
            >
              <MapPin />
              <p>Cedar Court Hotel, Bradford</p>
            </Link>
            <h1 className="heading font-merriweather md:leading-24 text-white uppercase text-6xl lg:text-8xl font-extrabold pb-2">
              Maxis 25'
            </h1>
            <p className="text-white font-cinzel italic uppercase md:text-5xl text-3xl font-extrabold pb-4">
              Conference
            </p>
            <div className="pt-6">
              <Link
                to="/agenda"
                className="text-white transition duration-300 transform hover:scale-105 border hover:bg-white hover:text-black rounded-full py-4 px-6 text-lg md:text-xl"
              >
                View Agenda
              </Link>
            </div>
          </div>

          <div className="w-full px-4 mt-20 lg:mt-0">
            <LiveSection activities={allActivities} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
