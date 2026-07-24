export type Pilot = { // Represents a pilot in the system
    callsign: string;
    flight_plan: {
        departure: string;
        destination: string;
    } | null; // The flight plan can be null if the pilot has not filed one
};
export type VatsimData = {
    pilots: Pilot[];
    controllerCallsigns: string[];
};
export type AirportTraffic = {
    departures: Pilot[];
    arrivals: Pilot[];
    controllers: string[];
};
