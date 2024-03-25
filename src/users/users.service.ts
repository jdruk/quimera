import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { UsersPresenter } from './users.presenter';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private usersPresenter: UsersPresenter,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<any> {
    const users = await this.usersRepository.findAll();
    return this.usersPresenter.presentUsers(users);
  }

  async findOne(id: number): Promise<any> {
    return await this.usersRepository.findOneById(id);
  }

  async findOneByEmail(email: string): Promise<any> {
    return await this.usersRepository.findByCondition( { email: email } );
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    this.usersRepository.remove(id)
    return `This action removed user with id ${id}`;
  }
}
