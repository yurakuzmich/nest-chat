import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {
    console.log('ChatService');
  }

  async saveMessage(message: Partial<Message>) {
    try {
      const result = await this.messageModel.create(message);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getMessages() {
    try {
      const messages = await this.messageModel.find();
      return messages;
    } catch (error) {
      throw new Error(error);
    }
  }
}
