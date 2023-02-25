import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";

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

interface Props {
  className?: string;
}

const PageHome = ({ className }: Props) => {
  const dispatch = useDispatch();
  const location = useSelector(selectLocation);
  const [officeSetting, setOfficeSetting] = useState<OfficeSetting | null>(null);
  const [storedHistory, setStoredHistory] = useState<ClockInHistoryRecord[]>([]);
  const { t } = useTranslation();

  const gpsStatus = location ? t("GPS is enabled") : t("GPS is disabled");
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
    <div className={className}>
      <div className="headerContainer">
        <Link to="/setting">{t("Settings")}</Link>
      </div>
      <div className="clockInPanelContainer">
        <div className="locationInfoContainer">
          <h3>{gpsStatus}</h3>
          <div className="locationInfoRow">
            <div className="locationInfoContent">
              <span>{t("Current position")}</span>
              <span>{t("Current latitude", { latitude })}</span>
              <span>{t("Current longitude", { longitude })}</span>
            </div>
            <div className="locationInfoContent">
              <UserStatus
                distance={distance}
                location={location}
                settings={officeSetting}
              />
            </div>
          </div>
        </div>
        <Clock className="clockInPanelUnit" />
        <ClockInHistory
          className="clockInPanelUnit"
          clockInHistory={storedHistory}
        />
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

const StyledPageHome = styled(PageHome)`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
  .headerContainer {
    display: flex;
    flex-direction: row-reverse;
    padding: 8px;
    width: 100%;
  }
  .clockInPanelContainer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .locationInfoContainer {
      align-items: center;
      display: flex;
      flex: 1 1 0;
      flex-direction: column;
      .locationInfoRow {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .locationInfoContent {
          align-items: center;
          display: flex;
          flex-direction: column;
        }
      }
    }
    .clockInPanelUnit {
      flex: 1 1 0;
    }
  }
`;

export default StyledPageHome;
