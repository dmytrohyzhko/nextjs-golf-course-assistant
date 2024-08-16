"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Chat from "../../components/chat";
import SlotsWidget from "../../components/slots-widget";
import FileViewer from "../../components/file-viewer";
import { searchAvailability } from "../../utils/availability";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";
import { GolfAvailability } from "@/app/types/golfAvailability";

const FunctionCalling = () => {
  const [availableSlots, setAvailableSlots] = useState<GolfAvailability[]>([]);

  const isEmpty = Object.keys(availableSlots).length === 0;

  const functionCallHandler = async (toolCall: RequiredActionFunctionToolCall) => {

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
            slots={availableSlots}
            isEmpty={isEmpty}
          />
          <FileViewer />
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
