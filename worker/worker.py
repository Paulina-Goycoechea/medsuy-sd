import pika, os, time

RABBIT_HOST = os.getenv("RABBIT_HOST", "rabbitmq")

def main():
    while True:
        try:
            print("Conectando a RabbitMQ...")
            connection = pika.BlockingConnection(
                pika.ConnectionParameters(host=RABBIT_HOST)
            )
            channel = connection.channel()
            channel.queue_declare(queue='notifications', durable=True)

            print("Worker escuchando la cola 'notifications'...")

            def callback(ch, method, properties, body):
                print("Mensaje recibido:", body.decode())
                ch.basic_ack(delivery_tag=method.delivery_tag)

            channel.basic_consume(
                queue='notifications',
                on_message_callback=callback
            )

            channel.start_consuming()

        except Exception as e:
            print("Error en worker:", e)
            time.sleep(3)
            continue

if __name__ == "__main__":
    main()
