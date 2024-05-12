import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() {email, pass}) {
    return this.authService.signIn(email, pass);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() {name, email, pass}) {
    return this.authService.register(name, email, pass);
  }
}
