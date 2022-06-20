import ormConfig from './ormconfigs.json';
import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
    config: getOrmConfig(),
}));

function getOrmConfig() {
    return ormConfig;
}

export { getOrmConfig };
