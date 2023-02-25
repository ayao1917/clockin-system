import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { LOCAL_STORAGE_KEYS } from "../constants/localStorage";

export interface OfficeSetting {
  latitude: number;
  longitude: number;
  maxDistance: number;
}

const PageSetting = () => {
  const [clockinRange, setClockinRange] = useState(0);
  const [latitude, setLatitude] = useState("0");
  const [longitude, setLongitude] = useState("0");

  useEffect(() => {
    const storedDataString = localStorage.getItem(LOCAL_STORAGE_KEYS.OFFICE_SETTING);

    if (storedDataString) {
      const data = JSON.parse(storedDataString) as OfficeSetting;

      if (data.maxDistance) {
        setClockinRange(data.maxDistance);
      }

      if (data.latitude) {
        setLatitude(`${data.latitude}`);
      }

      if (data.longitude) {
        setLongitude(`${data.longitude}`);
      }
    }
  }, []);

  const onClockinRangeChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setClockinRange(parseInt(value));
  };

  const onLatitudeChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setLatitude(value);
  };

  const onLongitudeChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setLongitude(value);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const latitudeNumber = parseFloat(latitude);
    const longitudeNumber = parseFloat(longitude);
    console.log(latitudeNumber, longitudeNumber);

    // TODO: Add form validation here
    if (latitudeNumber < -90 || latitudeNumber > 90) {
      alert("Invalid latitude");
      return;
    }

    if (longitudeNumber < -180 || longitudeNumber > 180) {
      alert("Invalid longitude");
      return;
    }

    const dataToStore: OfficeSetting = {
      latitude: latitudeNumber,
      longitude: longitudeNumber,
      maxDistance: clockinRange,
    };

    localStorage.setItem(LOCAL_STORAGE_KEYS.OFFICE_SETTING, JSON.stringify(dataToStore));
    alert("Setting saved");
  };

  return (
    <div style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", width: "100%" }}>
        <Link to="/">Home</Link>
      </div>
      <h2>Settings</h2>
      <form onSubmit={onFormSubmit} style={{ width: "540px" }}>
        <h3>Set clockIn range</h3>
        <hr style={{ borderTop: "1px solid #bbb", width: "100%" }} />
        <div>
          <label htmlFor="clockinRange">Range in KM</label>
          <input
            id="clockinRange"
            max="20"
            min="0"
            onChange={onClockinRangeChange}
            type="range"
            value={clockinRange}
          />
          <span>{`${clockinRange} KM`}</span>
        </div>
        <h3>Set office location</h3>
        <hr style={{ borderTop: "1px solid #bbb", width: "100%" }} />
        <div>
          <label htmlFor="latitude">latitude</label>
          <input
            id="latitude"
            onChange={onLatitudeChange}
            type="number"
            value={latitude}
          />
        </div>
        <div>
          <label htmlFor="longitude">longitude</label>
          <input
            id="longitude"
            onChange={onLongitudeChange}
            type="number"
            value={longitude}
          />
        </div>
        <input type="submit" value={"Save"} />
      </form>
    </div>
  );
};

export default PageSetting;
