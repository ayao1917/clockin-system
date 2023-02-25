import React from "react";
import { useSelector } from "react-redux";

import { selectLocationInfo } from "../store/location/slice";

import type { ClockInHistoryRecord } from "../store/clockIn/types";

interface Props {
  clockInHistory: ClockInHistoryRecord[];
  distance: number | null;
  maxDistance: number | null;
  onUpdate: (newHistory: ClockInHistoryRecord[]) => void;
}

const ClockInButton = ({ clockInHistory, distance, maxDistance, onUpdate }: Props) => {
  const locationInfo = useSelector(selectLocationInfo);

  const shouldClockIn = clockInHistory.length > 0 ? clockInHistory[0].status === "clockOut" : true;
  const inRange = distance && maxDistance && maxDistance > distance;
  const buttonDisabled = !distance || !maxDistance || !inRange;
  const buttonText = inRange ? (shouldClockIn ? "Clock In" : "Clock Out") : "Out Of Range";

  const onClockInOut = () => {
    if (!locationInfo) {
      return;
    }

    const now = new Date();
    const record = {
      locationInfo,
      status: shouldClockIn ? "clockIn" : "clockOut",
      timestamp: now.getTime(),
    } as ClockInHistoryRecord;

    const newHistory = [
      record,
      ...clockInHistory,
    ];

    onUpdate(newHistory);
  };

  return (
    <button disabled={buttonDisabled} onClick={onClockInOut}>
      {buttonText}
    </button>
  );
};

export default ClockInButton;
