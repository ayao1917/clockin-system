import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Clock from '../components/Clock';
import { locationGetAction } from '../store/location/actions';
import { selectLocation } from '../store/location/slice';

function PageHome() {
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);
  const gpsStatus = location ? "GPS is enabled" : "GPS is disabled";
  const latitude = location?.latitude ?? "?";
  const longitude = location?.longitude ?? "?";

  useEffect(() => {
    dispatch(locationGetAction());
  }, [dispatch]);

  const renderUserStatus = () => {
    if (!location) {
      return (
        <>
          <span>Please enable</span>
          <span>GPS</span>
        </>
      );
    }
  };

  return (
    <div style={{ alignItems: "center", display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row-reverse", width: "100%" }}>
        <Link to="/setting">Settings</Link>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <div style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
          <span>{gpsStatus}</span>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Current position</span>
              <span>{`Latitude: ${latitude}`}</span>
              <span>{`Longtitude: ${longitude}`}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Please enable</span>
              <span>GPS</span>
            </div>
          </div>
        </div>
        <Clock />
        <div>
          <span>Recent clocking history</span>
        </div>
      </div>
      <button>Out Of Range</button>
    </div>
  );
};

export default PageHome;
