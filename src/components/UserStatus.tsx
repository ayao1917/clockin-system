import React from "react";
import { useTranslation } from 'react-i18next';

import type { OfficeSetting } from "../page/PageSetting";
import type { UserLocation } from "../store/location/types";

interface Props {
  distance: number | null;
  location: UserLocation | null;
  settings: OfficeSetting | null;
}

const UserStatus = ({ distance, location, settings }: Props) => {
  const { t } = useTranslation();

  if (!location) {
    return (
      <>
        <span>{t("Please enable")}</span>
        <span>GPS</span>
      </>
    );
  }

  const latitudeNotSet = settings?.latitude === null || settings?.latitude === undefined;
  const longitudeNotSet = settings?.longitude === null || settings?.longitude === undefined;
  const maxDistanceNotSet = settings?.maxDistance === null || settings?.maxDistance === undefined;
  const distanceNotSet = distance === null || distance === undefined;
  if (latitudeNotSet || longitudeNotSet || maxDistanceNotSet || distanceNotSet) {
    return (
      <>
        <span>{t("Office")}</span>
        <span>{t("Not set")}</span>
      </>
    );
  }

  if (distance <= settings.maxDistance) {
    return (
      <>
        <span>{t("You")}</span>
        <span>{t("Arrived")}</span>
      </>
    );
  }

  const roundDistance = Math.floor(distance);

  return (
    <>
      <span>{t("You are distance", { roundDistance })}</span>
      <span>{t("Away from office")}</span>
    </>
  );
};

export default UserStatus;
