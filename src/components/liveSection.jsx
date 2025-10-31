import { useState, useEffect } from "react";
import { parseTime } from "../utils/constants";
import { ArrowLeft, ArrowRight, CalendarArrowDown, Circle } from "lucide-react";

const LiveSection = ({ activities, date }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [eventEnded, setEventEnded] = useState(false);

  useEffect(() => {
    // Sort without mutating the original array
    const sortedActivities = [...activities].sort((a, b) => {
      const startA = parseTime(a.startTime, a.date);
      const startB = parseTime(b.startTime, b.date);
      return startA - startB;
    });

    const checkCurrentActivity = () => {
      const now = new Date();

      // Find currently live activity
      const index = sortedActivities.findIndex((a) => {
        const start = parseTime(a.startTime, a.date);
        const end = parseTime(a.endTime, a.date);
        return now >= start && now <= end;
      });

      if (index >= 0) {
        setCurrentIndex(index);
      } else {
        // If no live event, find the first *upcoming* one
        const upcomingIndex = sortedActivities.findIndex((a) => {
          const start = parseTime(a.startTime, a.date);
          return start > now;
        });

        setCurrentIndex(upcomingIndex >= 0 ? upcomingIndex : 0);
      }

      const lastActivity = sortedActivities[sortedActivities.length - 1];
      const lastEnd = parseTime(lastActivity.endTime, lastActivity.date);
      setEventEnded(now > lastEnd);
    };

    console.log(
      "Sorted activities:",
      sortedActivities.map((a) => `${a.date} ${a.startTime}`)
    );

    checkCurrentActivity();
    const interval = setInterval(checkCurrentActivity, 60000);
    return () => clearInterval(interval);
  }, [activities]);

  const showActivity = (index) => {
    if (index < 0 || index >= activities.length) return null;
    return activities[index];
  };

  // Manual navigation handlers
  const goPrev = () => {
    setCurrentIndex((prev) => {
      if (prev === null) return 0;
      return prev > 0 ? prev - 1 : prev;
    });
  };

  const goNext = () => {
    setCurrentIndex((prev) => {
      if (prev === null) return 0;
      return prev < activities.length - 1 ? prev + 1 : prev;
    });
  };

  const goCurrent = () => {
    const now = new Date();
    const index = activities.findIndex((a) => {
      const start = parseTime(a.startTime, date);
      const end = parseTime(a.endTime, date);
      return now >= start && now <= end;
    });

    setCurrentIndex(index >= 0 ? index : null);
  };

  const current = showActivity(currentIndex);
  const prev = showActivity((currentIndex ?? -1) - 1);
  const next = showActivity((currentIndex ?? -1) + 1);
  return (
    <div className="p-4 md:py-6 w-full text-lg max-h-[700px] md:text-xl flex flex-col bg-white justify-center border-3  rounded-lg shadow  my-6">
      {/* if event hasn't started show live now, live, prv & next divs else show event has ended */}
      {eventEnded ? (
        <p className="text-gray-700 italic uppercase text-3xl font-extrabold">
          The event has ended.
        </p>
      ) : (
        <div className="flex flex-col items-center justify-center">
          {/* when live now is clicked, it goes back to what is live now */}
          {current ? (
            <div className="flex flex-col justify-center items-center">
              <div
                className="text-2xl w-fit flex gap-2 items-center text-center font-cinzel py-2 px-4 mt-6  rounded-full bg-[#D85838] text-white font-bold cursor-pointer mb-3 transition duration-300 transform hover:scale-105"
                onClick={goCurrent}
              >
                <span>
                  <Circle
                    size={10}
                    color="white"
                    className="bg-white rounded-full"
                  />
                </span>
                <h1>Live Now</h1>
              </div>

              <div className="px-6 py-3 bg-[#97a9ec] border-l-4 border-[#1338be] w-full">
                <p className="text-sm md:text-base text-black">
                  {current.startTime} - {current.endTime}
                </p>
                <p className="text-sm md:text-base text-black">
                  {current.date}
                  {/* {new Date(current.date).toDateString()} */}
                </p>
                <h3 className="text-lg md:text-3xl font-bold text-black">
                  {current.name}
                </h3>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center gap-4">
              <CalendarArrowDown color="#000" size={50} />
              <p className="text-gray-700 font-extrabold">
                There is no event live now.
              </p>
              <p className="text-black text-sm">
                The Conference starts on October 31st, 2025
              </p>
            </div>
          )}
        </div>
      )}
      {!eventEnded && (
        <div className="flex md:flex-row flex-col justify-between text-black mt-20">
          <div>
            <h4 className="font-semibold text-gray-700">Previous</h4>
            {prev ? (
              <div onClick={goPrev} className="cursor-pointer">
                <p>
                  {prev.name} ({prev.startTime})
                </p>
                <div className="text-black w-full flex justify-center items-center ">
                  <ArrowLeft size={30} />
                </div>
              </div>
            ) : (
              <p className="text-gray-600">None</p>
            )}
          </div>
          <div className="mt-10 md:mt-0">
            <h4 className="font-semibold text-gray-700">Next</h4>
            {next ? (
              <div onClick={goNext} className="cursor-pointer">
                <p className="text-black">
                  {next.name} ({next.startTime})
                </p>
                <div className="text-black w-full flex justify-center items-center ">
                  <ArrowRight size={30} />
                </div>
              </div>
            ) : (
              <p className="text-gray-600">None</p>
            )}
          </div>
        </div>
      )}
    </div>
    // </div>
  );
};

export default LiveSection;
