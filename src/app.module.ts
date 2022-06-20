import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppRouteModule } from './app/app_route.module';
import { DatabaseModule } from './app/database/database.module';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            debug: true,
            playground: true,
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: join(process.cwd(), 'src/graphql.ts'),
                outputAs: 'class',
            },
        }),
        DatabaseModule,
        AppRouteModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
