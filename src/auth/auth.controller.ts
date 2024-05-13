import { Body, Controller, Get, HttpCode, HttpStatus, Post, Render, Request, Response } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() {email, pass}, @Response() response, @Request() req) {
    console.log(email, pass);
    const result = await this.authService.signIn(email, pass);
    console.log('RESULT: ', result);
    req.session.user = result.access_token;

    return response.status(200).json(result);
  }

  @Get('register')
  @Render('register')
  registerUser() {
    return;
  }

  // @HttpCode(HttpStatus.OK)
  @Render('error')
  @Post('register')
  async register(@Body() {name, email, pass}, @Request() request, @Response() response) {

    const result = await this.authService.register(name, email, pass);
    request.session.user = result.access_token;
    response.redirect('/chat');
  }

  @Get('logout')
    logout(@Request() request, @Response() response) {
    request.session.destroy();
    response.redirect('/login');
  }
}
