import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  
  async getUser(mail: string) {
   const user = await this.userModel.findOne({ email: mail }).exec();
   return user;
  }

  async createUser(name: string, email: string, password: string): Promise<UserDocument> {
    const newUser = new this.userModel({ name, email, password });
    return newUser.save();
  }
}
