import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  className?: string;
}

const Clock = ({ className }: Props) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [isPm, setIsPm] = useState(false);

  const hourText = `${hour}`.padStart(2, "0");
  const minuteText = `${minute}`.padStart(2, "0");

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateTime = () => {
    const date = new Date();
    const currentHour = (date.getHours() % 12) || 12;
    setHour(currentHour);
    setMinute(date.getMinutes());
    setIsPm(date.getHours() >= 12);
  };

  return (
    <div className={className}>
      <div className="clockContainer">
        <div className="clockContent">
          <span>{`${hourText}:${minuteText}`}</span>
          <span>{isPm ? "P.M." : "A.M."}</span>
        </div>
      </div>
    </div>
  );
};

const StyledClock = styled(Clock)`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 16px;
  .clockContainer {
    align-items: center;
    border: thick double #fff;
    border-radius: 80px;
    display: flex;
    height: 120px;
    justify-content: center;
    width: 120px;
    .clockContent {
      align-items: center;
      display: flex;
      flex-direction: column;
    }
  }
`;

export default StyledClock;
