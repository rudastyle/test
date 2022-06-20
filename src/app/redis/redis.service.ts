import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache, CachingConfig } from 'cache-manager';

@Injectable()
export class RedisService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

    public set(key: string, value: string, options?: CachingConfig): Promise<string> {
        return this.cacheManager.set(key, value, options);
    }

    public get(key: string): Promise<string> {
        return this.cacheManager.get(key);
    }
}
