import amqp from 'amqplib';

const url = 'amqp://admin:admin@localhost?heartbeat=5s';

export const producer = async (queue, msg) => {
    try {
        console.debug(`PRODUCER - queue received ${queue}`);
        console.debug(`PRODUCER - msg received   ${msg}`);

        const connection = await amqp.connect(url);

        console.debug('PRODUCER - Connected RabbitMQ.');

        const channel = await connection.createChannel();

        console.debug('PRODUCER - Created Channel.');

        await channel.assertQueue(queue, {
            durable: true
        });

        console.debug(`PRODUCER - Created queue ${queue}`);

        channel.on('return', function (msg) { console.warn('Returned message!') });

        channel.sendToQueue(queue, Buffer.from(msg), { mandatory: true }, (err, _) => {
            if (err) {
                console.error(`PRODUCER - sendQueue ${err}`);
            } else {
                console.log("PRODUCER - Sent %s", msg);
            }
        });

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error(`PRODUCER - ${error}`);
        // throw error;
    }
}