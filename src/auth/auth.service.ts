import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    
    const user = await this.usersService.getUser(email);

    const result = await bcrypt.compare(pass, user.password);

    if (!result) {
      throw new Error('Invalid password');
    }

    const payload = { 
      sub: user.id, 
      name: user.name, 
      email: user.email 
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(name: string, email: string, pass: string): Promise<any> {
    const existingUser = await this.usersService.getUser(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(pass, 10);

    const createdUser = await this.usersService.createUser(name, email, hashedPassword);

    const payload = { 
      sub: createdUser.id, 
      name: createdUser.name, 
      email: createdUser.email 
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
