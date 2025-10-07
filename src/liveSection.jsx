import React from "react";
import { useState, useEffect } from "react";
import { parseTime } from "./constants";
import { ArrowLeft, ArrowRight } from "lucide-react";

const LiveSection = ({ activities, date }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [eventEnded, setEventEnded] = useState(false);

  // Automatically detect current or ended state
  useEffect(() => {
    const checkCurrentActivity = () => {
      const now = new Date();
      const index = activities.findIndex((a) => {
        const start = parseTime(a.startTime, date);
        const end = parseTime(a.endTime, date);
        return now >= start && now <= end;
      });

      setCurrentIndex(index >= 0 ? index : null);

      // Check if the entire event has ended
      const lastEnd = parseTime(
        activities[activities.length - 1].endTime,
        date
      );
      setEventEnded(now > lastEnd);
    };

    checkCurrentActivity();
    const interval = setInterval(checkCurrentActivity, 60000);
    return () => clearInterval(interval);
  }, [activities, date]);

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
      const start = parseTime(a.startTime);
      const end = parseTime(a.endTime);
      return now >= start && now <= end;
    });

    // If an activity is live, set it; otherwise, clear
    setCurrentIndex(index >= 0 ? index : null);
  };

  const current = showActivity(currentIndex);
  const prev = showActivity((currentIndex ?? -1) - 1);
  const next = showActivity((currentIndex ?? -1) + 1);
  return (
    <div className="p-4 md:py-6 w-full text-lg max-h-[500px] md:text-xl flex flex-col bg-white justify-center border-3  rounded-lg shadow  my-6">
      {/* if event hasn't started show live now, live, prv & next divs else show event has ended */}
      {eventEnded ? (
        <p className="text-gray-500 italic">The event has ended.</p>
      ) : (
        <div>
          {/* when live now is clicked, it goes back to what is live now */}
          <h2
            className="text-3xl md:text-5xl font-merriweather font-bold cursor-pointer text-black mb-3"
            onClick={goCurrent}
          >
            Live Now
          </h2>
          {current ? (
            <div className="p-3 bg-[#32a58c] border-l-4 border-[#005c48]">
              <p className="text-sm md:text-base text-black">
                {current.startTime} - {current.endTime}
              </p>
              <p className="text-sm md:text-base text-black">{current.date}</p>
              <h3 className="text-lg md:text-3xl font-bold text-black">
                {current.name}
              </h3>
            </div>
          ) : (
            <p className="text-gray-500">Event Upcoming!!!</p>
          )}
        </div>
      )}
      {!eventEnded && (
        <div className="flex md:flex-row flex-col justify-between text-black mt-20">
          <div>
            <h4 className="font-semibold text-gray-700">Previous</h4>
            {prev ? (
              <div>
                <p>
                  {prev.name} ({prev.startTime})
                </p>
                <div
                  onClick={goPrev}
                  className="text-black w-full cursor-pointer flex justify-center items-center "
                >
                  <ArrowLeft size={30} />
                </div>
              </div>
            ) : (
              <p className="text-gray-400">None</p>
            )}
          </div>
          <div className="mt-10 md:mt-0">
            <h4 className="font-semibold text-gray-700">Next</h4>
            {next ? (
              <div>
                <p className="text-black">
                  {next.name} ({next.startTime})
                </p>
                <div
                  onClick={goNext}
                  className="text-black w-full cursor-pointer flex justify-center items-center "
                >
                  <ArrowRight size={30} />
                </div>
              </div>
            ) : (
              <p className="text-gray-400">None</p>
            )}
          </div>
        </div>
      )}
    </div>
    // </div>
  );
};

export default LiveSection;
