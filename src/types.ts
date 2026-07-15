export type Pilot = { // Represents a pilot in the system
    callsign: string;
    flight_plan: {
        departure: string;
        destination: string;
    } | null; // The flight plan can be null if the pilot has not filed one
};