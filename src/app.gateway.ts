import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'; // or any other WebSocket library

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer() server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected');
  }

  handleDisconnect(client: WebSocket) {
    console.log('Client disconnected');
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, @MessageBody() payload: any) {
    console.log('Received message:', payload);
    this.server.emit('message', payload);
    // Handle the incoming message here
  }

  broadcastMessage(event, message) {
    this.server.emit(event, message);
  }
}
