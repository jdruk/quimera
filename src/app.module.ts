import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { dbDataSource } from './config/data.source';
import { SaasModule } from './saas/saas.module';
import { StationGroupModule } from './station-group/station-group.module';
import { StationModule } from './station/station.module';
import { StationConnectorsModule } from './station-connectors/station-connectors.module';
import { AuthModule } from './auth/auth.module';
import { TenancyMiddleware } from './middleware/tenancy.middleware';
import { AsyncContextService } from './common/async-context.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot(dbDataSource),
    UsersModule,
    SaasModule,
    StationGroupModule,
    StationModule,
    StationConnectorsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AsyncContextService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenancyMiddleware)
      .forRoutes('*');
  }
}
