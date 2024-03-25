import { BaseInterfaceRepository } from "src/base/base.interfaces";
import { User } from "./entities/user.entity";


export interface UsersRepositoryInterface extends BaseInterfaceRepository<User> {}