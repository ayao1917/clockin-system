export interface ClockInHistoryRecord {
  locationInfo: string;
  status: "clockIn" | "clockOut";
  timestamp: number;
}
