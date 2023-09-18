# Test

- Call Producer

    ```text
    curl --location 'http://localhost:3000/sendmessage' \
    --header 'Content-Type: application/json' \
    --data '{
        "id": 1, 
        "message": "ok 123"
    }'
    ```

- Init consumer

    ```text
    curl --location 'http://localhost:3000/process/queue/hello-queue'
    ```

- Start separate RabbitMQ

```bash
docker run -d --name rabbitmq -p 15672:15672 -p 5672:5672 -e TZ=America/Fortaleza -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin rabbitmq:3.12-management-alpine
```
