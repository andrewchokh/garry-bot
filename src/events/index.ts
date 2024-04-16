import {getAllFiles} from "../utils/getAllFiles";

let eventList = [];

const eventFiles = getAllFiles(__dirname);

for (const eventFile of eventFiles) {
    eventList.push(require(eventFile).data)
}

export const events = eventList;