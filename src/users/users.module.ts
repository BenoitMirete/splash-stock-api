import { Module } from '@nestjs/common';
import { UserRepository } from './orm/user.repository';
import { TypeOrmExModule } from 'src/config/orm/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
})
export class UsersModule {}
