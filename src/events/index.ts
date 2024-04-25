import {getAllFiles} from "../utils/get-all-files";

let eventList = [];

const eventFiles = getAllFiles(__dirname);

for (const eventFile of eventFiles) {
    eventList.push(require(eventFile).event);
}

export const events = eventList;