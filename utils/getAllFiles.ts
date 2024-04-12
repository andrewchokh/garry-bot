import * as fs from 'fs';
import * as path from 'path';

export function getAllFiles(directory: string, foldersOnly: boolean = false) {
    let fileNames = [];

    const files = fs.readdirSync(directory, {withFileTypes: true});

    for (const file of files) {
        const filePath = path.join(directory, file.name);

        if (foldersOnly && file.isDirectory()) fileNames.push(filePath);

        if (
            !foldersOnly &&
            file.isFile() &&
            !filePath.startsWith('index')
        )
            fileNames.push(filePath);
    }

    return fileNames;
}