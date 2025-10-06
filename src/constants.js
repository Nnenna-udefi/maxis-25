export const events = [
  {
    date: "October 31, 2025",
    activities: [
      {
        name: "Arrival",
        startTime: "12:00 PM",
        endTime: "1:19 PM",
      },
      {
        name: "Check In",
        startTime: "1:20 PM",
        endTime: "2:00 PM",
      },
      {
        name: "Opening Plenary",
        startTime: "2:00 PM",
        endTime: "3:00 PM",
      },
      {
        name: "Our Essence",
        startTime: "3:00 PM",
        endTime: "4:00 PM",
      },
    ],
  },
  {
    date: "November 1, 2025",
    activities: [
      {
        name: "Arrival",
        startTime: "12:00 PM",
        endTime: "1:19 PM",
      },
      {
        name: "Check In",
        startTime: "1:20 PM",
        endTime: "2:00 PM",
      },
      {
        name: "Opening Plenary",
        startTime: "2:00 PM",
        endTime: "3:00 PM",
      },
      {
        name: "Our Essence",
        startTime: "3:00 PM",
        endTime: "4:00 PM",
      },
    ],
  },
  {
    date: "November 2, 2025",
    activities: [
      {
        name: "Arrival",
        startTime: "12:00 PM",
        endTime: "1:19 PM",
      },
      {
        name: "Check In",
        startTime: "1:20 PM",
        endTime: "2:00 PM",
      },
      {
        name: "Opening Plenary",
        startTime: "2:00 PM",
        endTime: "3:00 PM",
      },
      {
        name: "Our Essence",
        startTime: "3:00 PM",
        endTime: "4:00 PM",
      },
    ],
  },
];

export function parseTime(timeStr, dateStr) {
  const baseDate = new Date(dateStr); // parse event date
  const hasModifier = timeStr.includes("AM") || timeStr.includes("PM");
  let hours, minutes;

  if (hasModifier) {
    const [time, modifier] = timeStr.split(" ");
    [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
  } else {
    [hours, minutes] = timeStr.split(":").map(Number);
  }

  return new Date(
    baseDate.getFullYear(),
    baseDate.getMonth(),
    baseDate.getDate(),
    hours,
    minutes
  );
}
