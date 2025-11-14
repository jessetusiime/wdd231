import { initMenu, initDarkMode, setFooterDates } from "./ui.mjs";
import { getWeather } from "./weather.mjs";
import { displaySpotlights } from "./spotlight.mjs";

initMenu();
initDarkMode();
setFooterDates();
getWeather();
displaySpotlights();
