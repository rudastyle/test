import { CacheModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { RedisModule } from '../redis/redis.module';
@Module({
    imports: [RedisModule],
    providers: [UserService, UserResolver],
    exports: [],
})
export class UserModule {}
