import amqp from 'amqplib';

const url = process.env.RABBITMQ_URL + "?heartbeat=5s";

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

export const consumer = async (queue) => {
    try {
        console.debug(`CONSUMER - init queue ${queue}`);

        const connection = await amqp.connect(url);

        console.debug('CONSUMER - Connected RabbitMQ.');

        const channel = await connection.createChannel();

        channel.on('error', (error) => {
            console.error(`CONSUMER - Channel error ${error}`);
        });

        channel.on('close', () => {
            console.warn(`CONSUMER - Channel closed.`);
        });

        console.debug('CONSUMER - Created Channel.');

        await channel.assertQueue(queue, {
            durable: true
        });

        console.debug(`CONSUMER - Created queue ${queue}`);

        await channel.consume(queue, (msg) => {
            if (msg) {
                console.log(`CONSUMER - Processed message ${Buffer.from(msg.content, "utf-8")}`);

                channel.ack(msg);
            }
        }, {
            exclusive: true
        });

        console.debug(`CONSUMER - Waiting for messages in ${queue}`);
    } catch (error) {
        console.error(`CONSUMER - ${error}`);
        // throw error;
    }
}