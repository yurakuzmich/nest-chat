import { Body, Controller, Get, Post, Render, UseGuards, Request } from '@nestjs/common';
import { AppGateway } from 'src/app.gateway';
import { ChatService } from './chat.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('chat')
export class ChatController {

  constructor(
    private appGateway: AppGateway,
    private chatService: ChatService,
    private jwtService: JwtService,
  ) { }

  @UseGuards(AuthGuard)
  @Render('chat')
  @Get()
  chat(@Request() request) {
    const token = request.session.user;
    const decodedToken = this.jwtService.decode(token) as { [key: string]: any };

    console.log(decodedToken)
    return { username: decodedToken.name };
  }

  @UseGuards(AuthGuard)
  @Post()
  async sendMessage(@Body() payload: any) {
    const { text, user }= payload;
    
    const saveMessage = await this.chatService.saveMessage({
      text,
      timestamp: Date.now().toString(),
      user,
    });

    if(!saveMessage) {
      throw new Error('Error saving message');
    }
    const date = new Date(parseInt(saveMessage.timestamp));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const time = `${hours}:${minutes}:${seconds}`;
    const message = JSON.stringify({text, user, time});

    try {
      this.appGateway.broadcastMessage('message', message);
    } catch (error) {
      throw new Error(error);
    }
  }
}
