export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface State {
  location: UserLocation | null;
  locationGetError: string | null;
  locationGetPending: boolean;
}
