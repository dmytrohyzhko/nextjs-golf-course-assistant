"use client";

import React, { useState } from "react";
import styles from "../shared/page.module.css";
import Chat from "../../components/chat";
import WeatherWidget from "../../components/weather-widget";
import { getWeather } from "../../utils/weather";
import { searchAvailability } from "../../utils/availability";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";


const FunctionCalling = () => {
  const [availableSlots, setAvailableSlots] = useState<GolfAvailability[]>([]);

  const isEmpty = Object.keys(availableSlots).length === 0;

  const functionCallHandler = async (toolCall) => {

    if (toolCall?.function?.name === "search_availability") {
      const result = await searchAvailability(toolCall);
      return JSON.stringify(result);
    }

  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          <SlotsWidget
            availableSlots={availableSlots}
            isEmpty={isEmpty}
          />
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat functionCallHandler={functionCallHandler} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default FunctionCalling;
