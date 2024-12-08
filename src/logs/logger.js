import pino from  'pino';

const logger = pino ({
    transport: {
        target: 'pino-pretty',
        options: {
            translateTime: 'SYS:dd-mm-yy HH:mm:ss',
        }
    }
});

export default logger;