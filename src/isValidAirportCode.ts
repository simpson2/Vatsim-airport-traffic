export function isValidAirportCode(airport: string): boolean {
    const input = airport.trim();

    return /^[A-Za-z]{4}$/.test(input);
};
