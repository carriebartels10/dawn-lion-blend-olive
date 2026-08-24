export const FACEBOOK_URL =
  "https://www.facebook.com/people/Aerial-Allies/61591089806027/";

export const EMAIL = "aerialalliesllc@gmail.com";
export const MAILTO = `mailto:${EMAIL}`;

export const TOWNS = [
  "Hallam",
  "Lincoln",
  "Beatrice",
  "Crete",
  "Wilber",
  "Firth",
  "Hickman",
  "Cortland",
  "Adams",
  "Sprague",
  "Roca",
  "Panama",
  "Sterling",
  "Fairbury",
  "Seward",
  "Nebraska City",
];

export type FlightService =
  | "agriculture"
  | "residential"
  | "rescue"
  | "sales"
  | "other";

export function requestService(service: FlightService) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("aa:service", { detail: service }));
}
