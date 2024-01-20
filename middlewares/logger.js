import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';

export const logEvents = async (message, logFileName, dirname) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`

    try {
        const logsFolderPath = path.join(dirname, '', 'logs');
        console.log('Checking if logs folder exists:', logsFolderPath);
        if (!fs.existsSync(logsFolderPath)) {
            console.log('Creating directory:', logsFolderPath);
            await fsPromises.mkdir(logsFolderPath);
        }
        const logFilePath = path.join(logsFolderPath, logFileName);
        console.log('Log written to:', logFilePath);
        await fsPromises.appendFile(logFilePath, logItem);
        console.log('Log written successfully.');
    } catch (err) {
        console.error(err);
    }
}


export const logger = (req, res, next, dirname) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log', dirname)
    console.log(`${req.method} ${req.path}`)
    next()
}