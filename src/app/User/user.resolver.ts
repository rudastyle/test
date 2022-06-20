import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Result, UserInput } from '../../graphql';
@Resolver()
export class UserResolver {
    constructor(private userService: UserService) {}
    @Query(() => Result)
    async createUser(@Args('name', { type: () => String }) name: string) {
        return await this.userService.createUser(name);
    }

    @Query(() => Result)
    async findUser(@Args('userNo', { type: () => Int }) userNo: number) {
        return await this.userService.findUser(userNo);
    }

    @Query(() => Result)
    async updateUser(
        @Args('userNo', { type: () => Int }) userNo: number,
        @Args('age', { type: () => Int }) age: number,
    ) {
        return await this.userService.updateUser(userNo, age);
    }

    @Query(() => Result)
    async updateInput(@Args('input') input: UserInput) {
        console.log(input);
        return await this.userService.updateInput(input);
    }
}
