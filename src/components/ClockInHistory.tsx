import React from "react";
import styled from "styled-components";

import type { ClockInHistoryRecord } from "../store/clockIn/types";

interface Props {
  className?: string;
  clockInHistory: ClockInHistoryRecord[];
}

const ClockInHistory = ({ className, clockInHistory }: Props) => {
  const renderHistory = (history: ClockInHistoryRecord) => {
    const { locationInfo, status, timestamp } = history;
    const clockInDate = new Date(timestamp);
    const monthText = `${clockInDate.getMonth()}`.padStart(2, "0");
    const dateText = `${clockInDate.getDate()}`.padStart(2, "0");
    const hoursText = `${clockInDate.getHours()}`.padStart(2, "0");
    const minutesText = `${clockInDate.getMinutes()}`.padStart(2, "0");
    const dateTimeText = `${monthText}/${dateText} @ ${hoursText}:${minutesText}`;
    const statusText = status === "clockIn" ? "Clock In" : "Clock Out";

    return (
      <div className="clockInHistoryRow" key={timestamp}>
        <div className="clockInHistoryDateStatus">
          <span>{dateTimeText}</span>
          <span>{statusText}</span>
        </div>
        <span>{locationInfo}</span>
      </div>
    );
  };

  return (
    <div className={className}>
      <h3>Recent clocking history</h3>
      <div className="clockInHistoryContainer">
        {clockInHistory.map(renderHistory)}
      </div>
    </div>
  );
};

const StyledClockInHistory = styled(ClockInHistory)`
  .clockInHistoryContainer {
    display: flex;
    flex-direction: column;
    .clockInHistoryRow {
      display: flex;
      flex-direction: column;
      margin-bottom: 24px;
      .clockInHistoryDateStatus {
        display: flex;
        justify-content: space-between;
      }
    }
  }
`;

export default StyledClockInHistory;
