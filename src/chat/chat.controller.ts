import { Body, Controller, Post } from '@nestjs/common';
import { AppGateway } from 'src/app.gateway';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {

  constructor(
    private appGateway: AppGateway,
    private chatService: ChatService,
  ) { }

  @Post()
  sendMessage(@Body() payload: any) {
    const { text, user }= payload;
    this.chatService.saveMessage({
      text,
      timestamp: Date.now().toString(),
      user,
    });
    const message = JSON.stringify({text, user});
    this.appGateway.broadcastMessage('message', message)
  }
}
