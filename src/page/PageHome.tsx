import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Clock from '../components/Clock';
import ClockInButton from '../components/ClockInButton';
import ClockInHistory from '../components/ClockInHistory';
import UserStatus from '../components/UserStatus';
import { LOCAL_STORAGE_KEYS } from '../constants/localStorage';
import { locationGetAction } from '../store/location/actions';
import { selectLocation } from '../store/location/slice';
import { calculateDistance } from '../utils/location';

import type { OfficeSetting } from './PageSetting';
import type { ClockInHistoryRecord } from "../store/clockIn/types";

const PageHome = () => {
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);
  const [officeSetting, setOfficeSetting] = useState<OfficeSetting | null>(null);
  const [storedHistory, setStoredHistory] = useState<ClockInHistoryRecord[]>([]);

  const gpsStatus = location ? "GPS is enabled" : "GPS is disabled";
  const latitude = location?.latitude ?? "?";
  const longitude = location?.longitude ?? "?";

  const distance = useMemo(() => {
    if (!location || !officeSetting?.latitude || !officeSetting?.longitude) {
      return null;
    }

    const officeLocation = {
      latitude: officeSetting.latitude,
      longitude: officeSetting.longitude,
    };
    return calculateDistance(location, officeLocation);
  }, [location, officeSetting?.latitude, officeSetting?.longitude]);

  useEffect(() => {
    dispatch(locationGetAction());
  }, [dispatch]);

  useEffect(() => {
    const settingString = localStorage.getItem(LOCAL_STORAGE_KEYS.OFFICE_SETTING);

    if (settingString) {
      const data = JSON.parse(settingString) as OfficeSetting;
      setOfficeSetting(data);
    }
  }, []);

  useEffect(() => {
    const storedDataString = localStorage.getItem(LOCAL_STORAGE_KEYS.CLOCK_IN_HISTORY);

    if (storedDataString) {
      const clockInHistory = JSON.parse(storedDataString) ?? [];
      setStoredHistory(clockInHistory);
    }
  }, []);

  const onUpdateClockInHistory = (newHistory: ClockInHistoryRecord[]) => {
    setStoredHistory(newHistory);
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.CLOCK_IN_HISTORY,
      JSON.stringify(newHistory)
    );
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
              <UserStatus
                distance={distance}
                location={location}
                settings={officeSetting}
              />
            </div>
          </div>
        </div>
        <Clock />
        <ClockInHistory clockInHistory={storedHistory} />
      </div>
      <ClockInButton
        clockInHistory={storedHistory}
        distance={distance}
        maxDistance={officeSetting?.maxDistance ?? null}
        onUpdate={onUpdateClockInHistory}
      />
    </div>
  );
};



export default PageHome;
