/**
 *  Función para enviar una notificación a un cliente del depósito recibido
 */
export class SendClientNotification {
  constructor({ client, notification }) {
    this.client = client;
    this.notification = notification;
  }

  async call() {
    await this.client.sendNotification(this.notification);
  }
}