//#region node_modules/.nitro/vite/services/ssr/assets/site-kQ5QAUhw.js
var FACEBOOK_URL = "https://www.facebook.com/people/Aerial-Allies/61591089806027/";
var EMAIL = "aerialalliesllc@gmail.com";
var MAILTO = `mailto:${EMAIL}`;
var TOWNS = [
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
	"Nebraska City"
];
function requestService(service) {
	if (typeof window === "undefined") return;
	window.dispatchEvent(new CustomEvent("aa:service", { detail: service }));
}
//#endregion
export { requestService as a, TOWNS as i, FACEBOOK_URL as n, MAILTO as r, EMAIL as t };
