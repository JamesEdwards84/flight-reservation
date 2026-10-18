export interface FlightRequest {
    "departureCity": string,
    "arrivalCity": string,
    "dateOfDeparture": string
}

export interface FlightResponse {
    "id": number,
    "flightNumber": string,
    "operatingAirlines": string,
    "departureCity": string,
    "arrivalCity": string,
    "dateOfDeparture": string,
    "estimatedTimeOfDeparture": string
}