import React from "react";
import { GolfAvailability } from "@/app/types/golfAvailability";

const SlotsWidget = ({
  slots = [],
  isEmpty = false,
}: { slots: GolfAvailability[], isEmpty: boolean }) => {

  if (isEmpty) {
    return (
      <div className="flex items-center justify-center h-full p-4 bg-gray-100 text-center  text-gray-700">
        <p>No available slots at the moment.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 bg-gray-100 p-4 rounded-xl">
        {slots.map((slot: GolfAvailability, index: number) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <p className="text-lg font-semibold">{slot.name}</p>
            <p className="text-sm text-gray-500">
              {new Date(slot.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} on {slot.resourceName}
            </p>
            <p className="text-sm text-blue-600">${slot.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotsWidget;
