import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../database/repository/user.repository';
import { UserEntity } from '../database/entity/user.entity';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { Result, UserInput } from '../../graphql';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class UserService {
    private readonly repository: UserRepository;

    constructor(
        @InjectConnection('Toy')
        private dbConn: Connection,
        private redisCache: RedisService,
    ) {
        this.repository = dbConn.getCustomRepository(UserRepository);
    }

    cacheKey(userNo: number) {
        return 'account' + userNo;
    }

    async createUser(name: string) {
        const userData: UserEntity = new UserEntity();
        userData.userName = name;
        await this.repository.save(userData);
        await this.redisCache.set(this.cacheKey(userData.userNo), name);

        const ret: Result = new Result();
        ret.ret = '성공한듯';
        return ret;
    }

    async findUser(userNo: number) {
        const cacheKey = this.cacheKey(userNo);
        console.log(cacheKey);
        const cached = await this.redisCache.get(cacheKey);

        const ret: Result = new Result();
        ret.ret = 'failed';
        let data;
        if (!cached) {
            console.log('from db');
            data = await this.repository.find({ userNo: userNo });
            if (data && data.length) {
                const userData: UserEntity = data[0];
                await this.redisCache.set(cacheKey, userData.userName);
                ret.ret = 'success with db';
            }
        } else {
            console.log('from redis');
            data = cached;
            ret.ret = 'success with redis';
        }

        console.log(data);

        return ret;
    }

    async updateUser(userNo: number, age: number) {
        console.log(`${userNo},${age}`);
        const updateResult = await this.repository.update(
            {
                userNo: userNo,
            },
            { age: age},
        );

        console.log(updateResult);
        const ret: Result = new Result();
        ret.ret = 'success';
        return ret;
    }

    async updateInput(input: UserInput) {
        return await this.updateUser(input.userNo, input.age);
    }
}
