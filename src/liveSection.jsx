import React from "react";
import { useState, useEffect } from "react";
import { parseTime } from "./constants";
import {
  ArrowBigLeft,
  ArrowBigRight,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const LiveSection = ({ activities, date }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  // Auto-update based on current time

  useEffect(() => {
    const checkCurrentActivity = () => {
      const now = new Date();
      const index = activities.findIndex((a) => {
        const start = parseTime(a.startTime, date);
        const end = parseTime(a.endTime, date);
        return now >= start && now <= end;
      });

      setCurrentIndex(index >= 0 ? index : null);
    };

    checkCurrentActivity();
    const interval = setInterval(checkCurrentActivity, 60000); // check every 1 min
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

  const current = showActivity(currentIndex);
  const prev = showActivity((currentIndex ?? -1) - 1);
  const next = showActivity((currentIndex ?? -1) + 1);
  return (
    <div className="p-4 md:py-6 w-full text-lg max-h-[500px] md:text-xl flex flex-col bg-white justify-center border-3  rounded-lg shadow  my-6">
      <h2 className="text-3xl md:text-5xl font-bold text-black mb-3">
        Live Now
      </h2>
      {current ? (
        <div className="p-3 bg-[#94a4e0] border-l-4 border-[#1338be]">
          <p className="text-sm text-black">
            {current.startTime} - {current.endTime}
          </p>
          <h3 className="text-lg md:text-2xl font-bold text-black">
            {current.name}
          </h3>
        </div>
      ) : (
        <p className="text-gray-500">No activity is live right now.</p>
      )}

      <div className="flex md:flex-row flex-col justify-between text-black mt-10">
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
    </div>
    // </div>
  );
};

export default LiveSection;
