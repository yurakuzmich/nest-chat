import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {
    console.log('ChatService');
  }

  saveMessage(message: Partial<Message>) {
    return this.messageModel.create(message);
  }

  getMessages() {
    return this.messageModel.find();
  }
}
