"use client";

import React, { useState } from "react";
import '../../globals.css';
import styles from "../shared/page.module.css";
import Chat from "../../components/chat";
import SlotsWidget from "../../components/slots-widget";
import { searchAvailability } from "../../utils/availability";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";
import { GolfAvailability } from "@/app/types/golfAvailability";


const FunctionCalling = () => {
  const [availableSlots, setAvailableSlots] = useState<GolfAvailability[]>([]);

  const isEmpty = Object.keys(availableSlots).length === 0;

  const functionCallHandler = async (toolCall) => {
    
    if (toolCall?.function?.name === "search_availability") {
      const result = await searchAvailability(toolCall);

      if (result?.success) {

        setAvailableSlots(result?.data);
        return JSON.stringify(result?.message);

      } else {

        return JSON.stringify(result?.message);

      }
    }

  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          <SlotsWidget
            slots={availableSlots}
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
