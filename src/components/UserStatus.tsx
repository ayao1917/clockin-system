import React from "react";

import type { OfficeSetting } from "../page/PageSetting";
import type { UserLocation } from "../store/location/types";

interface Props {
  distance: number | null;
  location: UserLocation | null;
  settings: OfficeSetting | null;
}

const UserStatus = ({ distance, location, settings }: Props) => {
  if (!location) {
    return (
      <>
        <span>Please enable</span>
        <span>GPS</span>
      </>
    );
  }

  if (!settings?.latitude || !settings?.longitude || !settings?.maxDistance || !distance) {
    return (
      <>
        <span>Office</span>
        <span>Not set</span>
      </>
    );
  }

  if (distance <= settings.maxDistance) {
    return (
      <>
        <span>You</span>
        <span>Arrived</span>
      </>
    );
  }

  const roundDistance = Math.floor(distance);

  return (
    <>
      <span>{`You are ${roundDistance} km`}</span>
      <span>away from office.</span>
    </>
  );
};

export default UserStatus;
