import React from "react";

import type { ClockInHistoryRecord } from "../store/clockIn/types";

interface Props {
  clockInHistory: ClockInHistoryRecord[];
}

const ClockInHistory = ({ clockInHistory }: Props) => {
  const renderHistory = (history: ClockInHistoryRecord) => {
    const { locationInfo, status, timestamp } = history;
    const clockInDate = new Date(timestamp);
    const dateText= `${clockInDate.getMonth()}/${clockInDate.getDate()} @ ${clockInDate.getHours()}:${clockInDate.getMinutes()}`;
    const statusText = status === "clockIn" ? "Clock In" : "Clock Out";

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{dateText}</span>
          <span>{statusText}</span>
        </div>
        <span>{locationInfo}</span>
      </div>
    );
  };

  return (
    <div>
      <span>Recent clocking history</span>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {clockInHistory.map(renderHistory)}
      </div>
    </div>
  );
};

export default ClockInHistory;
