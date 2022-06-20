import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            name: 'Toy',
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '123qwe',
                database: 'Toy',
                entities: [join(__dirname, '/**/*.entity.js')],
                synchronize: true,
                logging: ['query', 'error'],
            }),
        }),
    ],
    providers: [],
    exports: [],
})
export class DatabaseModule {}
