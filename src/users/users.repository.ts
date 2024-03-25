import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { BaseAbstractRepostitory } from "src/base/base.repository";
import { UsersRepositoryInterface } from "./user.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository extends BaseAbstractRepostitory<User> implements UsersRepositoryInterface {
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>) {
        super(usersRepository)
    }
}