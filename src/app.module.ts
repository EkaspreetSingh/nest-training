import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthticationMiddeware } from './middlewares/authentication.middleware';

@Module({
  imports: [UserModule, AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthticationMiddeware)
      .exclude(
        { path: 'user', method: RequestMethod.GET },
        // { path: 'user', method: RequestMethod.POST },
      )
      .forRoutes('*')
  }
}
