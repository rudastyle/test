import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { RedisService } from './redis.service';
import IORedis from 'ioredis';
@Module({
    imports: [
        CacheModule.registerAsync({
            useFactory: () => ({
                store: redisStore,
                host: 'localhost',
                port: 7007,
                ttl: 15,
            }),
        }),
    ],
    providers: [RedisService],
    exports: [RedisService],
})
export class RedisModule {}
