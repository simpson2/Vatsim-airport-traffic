# Vatsim-airport-traffic

TypeScript CLI for displaying live VATSIM airport traffic and relevant online controller callsigns.

## Installation

Install the project dependencies:

```text
npm install
```

## Usage

Run the CLI with an airport code:

```text
npm start -- EIDW
```

Replace `EIDW` with the ICAO code of the airport you want to check.

Example output:

```text
Controllers:EIDW_GND, EIDW_TWR

Departures:
VJT565 EIDW -> HESH

Arrivals:
UPS207 KSDF -> EIDW
```

When no relevant controllers are online, the controller section displays:

```text
Controllers:None
```
