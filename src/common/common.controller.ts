import { Controller, Get } from '@nestjs/common';

@Controller('')
export class CommonController {
  @Get()
  sayHello() {
    return { message: 'welcome!' };
  }
}
