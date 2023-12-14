import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

export interface MyFormmater {
  name: string;
  age: number;
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getName(): MyFormmater[] {
    throw new HttpException('报错了', HttpStatus.BAD_REQUEST);
  }
}
