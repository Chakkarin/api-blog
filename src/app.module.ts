import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './modules/categories/categories.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest_blog',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true
    }),
    CategoriesModule,
    PostsModule
  ],
  controllers: [
    AppController
  ],
  providers: [AppService],
})
export class AppModule { }
