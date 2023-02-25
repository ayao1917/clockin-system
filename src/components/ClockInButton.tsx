import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";

import { selectLocationInfo } from "../store/location/slice";

import type { ClockInHistoryRecord } from "../store/clockIn/types";

interface Props {
  className?: string;
  clockInHistory: ClockInHistoryRecord[];
  distance: number | null;
  maxDistance: number | null;
  onUpdate: (newHistory: ClockInHistoryRecord[]) => void;
}

const ClockInButton = ({ className, clockInHistory, distance, maxDistance, onUpdate }: Props) => {
  const locationInfo = useSelector(selectLocationInfo);
  const { t } = useTranslation();

  const shouldClockIn = clockInHistory.length > 0 ? clockInHistory[0].status === "clockOut" : true;
  const inRange = distance && maxDistance && maxDistance > distance;
  const buttonDisabled = !distance || !maxDistance || !inRange;
  const buttonText = inRange ? (shouldClockIn ? t("Clock In") : t("Clock Out")) : t("Out Of Range");
  const buttonClass = inRange ? (shouldClockIn ? "clockInButton" : "clockOutButton") : "";

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
    <div className={className}>
      <button
        className={buttonClass}
        disabled={buttonDisabled}
        onClick={onClockInOut}
      >
        {buttonText}
      </button>
    </div>
  );
};

const StyledClockInButton = styled(ClockInButton)`
  .clockInButton {
    background-color: #009eff;
  }
  .clockOutButton {
    background-color: #ffc300;
  }
`;

export default StyledClockInButton;
