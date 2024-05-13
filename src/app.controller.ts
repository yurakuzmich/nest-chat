import { Controller, Get, UseGuards, Request, Response, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Response() response) {
    console.log('GET / Redirecting to login');
    response.redirect('/login');
  }

  @Get('login')
  @Render('login')
  login() {
    return;
  }
}
