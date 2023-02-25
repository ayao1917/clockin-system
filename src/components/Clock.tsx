import React, { useEffect, useState } from "react";

const Clock = () => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [isPm, setIsPm] = useState(false);

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
    <div style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{hour}</span>:<span>{minute}</span>
      </div>
      <span>{isPm ? "P.M." : "A.M."}</span>
    </div>
  );
};

export default Clock;
