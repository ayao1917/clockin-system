import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";

import { LOCAL_STORAGE_KEYS } from "../constants/localStorage";

interface Props {
  className?: string;
}

export interface OfficeSetting {
  latitude: number;
  longitude: number;
  maxDistance: number;
}

const PageSetting = ({ className }: Props) => {
  const [clockinRange, setClockinRange] = useState(0);
  const [latitude, setLatitude] = useState("0");
  const [longitude, setLongitude] = useState("0");
  const { t } = useTranslation();

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

    // TODO: Add form validation here
    if (latitudeNumber < -90 || latitudeNumber > 90) {
      alert(t("Invalid latitude"));
      return;
    }

    if (longitudeNumber < -180 || longitudeNumber > 180) {
      alert(t("Invalid longitude"));
      return;
    }

    const dataToStore: OfficeSetting = {
      latitude: latitudeNumber,
      longitude: longitudeNumber,
      maxDistance: clockinRange,
    };

    localStorage.setItem(LOCAL_STORAGE_KEYS.OFFICE_SETTING, JSON.stringify(dataToStore));
    alert(t("Setting saved"));
  };

  return (
    <div className={className}>
      <div className="headerContainer">
        <Link to="/">{t("Home")}</Link>
      </div>
      <h2>{t("Settings")}</h2>
      <form className="settingForm" onSubmit={onFormSubmit}>
        <div className="formGroup">
          <h3 className="formGroupHeader">{t("Set clockIn range")}</h3>
          <hr className="divider" />
          <div className="inputGroup">
            <label htmlFor="clockinRange">{t("Range in KM")}</label>
            <input
              id="clockinRange"
              max="20"
              min="0"
              onChange={onClockinRangeChange}
              type="range"
              value={clockinRange}
            />
            <span>{t("Range value", { clockinRange })}</span>
          </div>
        </div>
        <div className="formGroup">
          <h3 className="formGroupHeader">{t("Set office location")}</h3>
          <hr className="divider" />
          <div className="inputGroup">
            <label htmlFor="latitude">{t("Latitude")}</label>
            <input
              id="latitude"
              name="latitude"
              onChange={onLatitudeChange}
              type="number"
              value={latitude}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="longitude">{t("Longitude")}</label>
            <input
              id="longitude"
              name="longitude"
              onChange={onLongitudeChange}
              type="number"
              value={longitude}
            />
          </div>
        </div>
        <div className="formFooter">
          <input className="submitButtom" type="submit" value={t("Save") ?? "Save"} />
        </div>
      </form>
    </div>
  );
};

const StyledPageSetting = styled(PageSetting)`
  align-items: center;
  display: flex;
  flex-direction: column;
  .headerContainer {
    display: flex;
    padding: 8px;
    width: 100%;
  }
  .settingForm {
    width: 540px;
    .formGroup {
      margin-bottom: 24px;
      .formGroupHeader {
        margin-bottom: 4px
      }
      .divider {
        border-top: 1px solid #bbb;
        width: 100%;
      }
      .inputGroup {
        margin-bottom: 16px;
        label {
          margin-right: 8px;
        }
      }
    }
    .formFooter {
      display: flex;
      justify-content: center;
      width: 100%;
      .submitButtom {
        border: none;
        border-radius: 60px;
        height: 120px;
        width: 120px;
      }
    }
  }
`;

export default StyledPageSetting;
