import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestModuleModule } from './test-module/test-module.module';
import config from '../../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), TestModuleModule],
})
export class AppModule {}
