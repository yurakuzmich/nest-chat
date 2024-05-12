import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const testData = process.env.TEST_DATA || 'Hello World!';
    console.log('Test data is: ', testData);
    return testData;
  }
}
