import {getAllFiles} from "../utils/get-all-files";

let commandList = [];
const commandCategories = getAllFiles(__dirname, true);

for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory);

    for (const commandFile of commandFiles) {
        commandList.push(require(commandFile).command)
    }
}

export const commands = commandList;