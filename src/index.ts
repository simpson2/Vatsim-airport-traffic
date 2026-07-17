import { formatAirportTraffic } from './formatAirportTraffic.js';
import { getAirportTraffic } from './getAirportTraffic.js';

const airport = process.argv[2];
if (airport === undefined) {
    console.error('Airport code is required.');
    process.exit(1);
};

try {
    const traffic = await getAirportTraffic(airport);
    const output = formatAirportTraffic(traffic);

    console.log(output);
} catch {
    console.error('Failed to retrieve airport traffic.');
    process.exit(1);
};
