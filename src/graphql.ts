
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class UserInput {
    userNo: number;
    age: number;
}

export abstract class IQuery {
    abstract createUser(name?: Nullable<string>): Nullable<Result> | Promise<Nullable<Result>>;

    abstract findUser(userNo?: Nullable<number>): Nullable<Result> | Promise<Nullable<Result>>;

    abstract updateUser(userNo?: Nullable<number>, age?: Nullable<number>): Nullable<Result> | Promise<Nullable<Result>>;

    abstract updateInput(input?: Nullable<UserInput>): Nullable<Result> | Promise<Nullable<Result>>;
}

export class Result {
    ret: string;
}

export class UserResult {
    userNo: number;
    userName: string;
    ret: string;
}

type Nullable<T> = T | null;
