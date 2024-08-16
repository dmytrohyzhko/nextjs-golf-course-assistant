import React from "react";
import styles from "./weather-widget.module.css";

import { GolfAvailability } from "@/app/types/golfAvailability";

const SlotsWidget = ({
  slots = [],
  isEmpty = false,
}: { slots: GolfAvailability[], isEmpty: boolean } ) => {

  if (isEmpty) {
    return (
      <div>
<p>No available slots at the moment.</p>
      </div>
    );
  }

  return (
    <div>
      {
      slots.map((slot: GolfAvailability, index: number) => (
        <div key={index}>
          <p>{slot.name} at {new Date(slot.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <p>Price: ${slot.price}</p>
        </div>
      ))
      }
    </div>
  );
};

export default SlotsWidget;
