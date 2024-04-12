import {getAllFiles} from "../utils/getAllFiles";

let commandList = [];
const commandCategories = getAllFiles(__dirname, true);

for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory);

    for (const commandFile of commandFiles) {
        commandList.push(require(commandFile).data)
    }
}

export const commands = commandList;