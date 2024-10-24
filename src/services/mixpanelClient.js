/* eslint-disable prettier/prettier */
//Import Mixpanel API
import { Mixpanel } from "mixpanel-react-native";
 
// Set up an instance of Mixpanel
const trackAutomaticEvents = false;
const mixpanel = new Mixpanel("687c029264799ff1276b1693067dd895", trackAutomaticEvents);
mixpanel.init();

export default mixpanel;
