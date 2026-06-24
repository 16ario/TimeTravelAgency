import "./style.css";

import { initDestinationDetails } from "./modules/ui.js";
import { initChatbot } from "./modules/chatbot.js";
import { initRecommendation } from "./modules/recommendation.js";
import { initReservation } from "./modules/reservation.js";

initDestinationDetails();
initChatbot();
initRecommendation();
initReservation();

console.log("TimeTravel Agency — application chargée.");