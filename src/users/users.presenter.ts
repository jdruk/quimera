import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersPresenter {
  constructor() {}

  presentUsers(users: User[]) {
    const userObject = {
      users: users.map((user: User) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          updated_at: user.updatedAt,
          saasId: user.saasId,
        };
      }),
    };
    return userObject;
  }
}
