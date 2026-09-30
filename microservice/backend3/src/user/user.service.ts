import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly users = new Map<number, User>();
  private nextId = 1;

  create(createUserDto: CreateUserDto): User {
    this.ensureEmailIsFree(createUserDto.email);
    const now = new Date();
    const user: User = {
      id: this.nextId++,
      ...createUserDto,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(user.id, user);
    return user;
  }

  findAll(): User[] {
    return [...this.users.values()].sort((a, b) => b.id - a.id);
  }

  findOne(id: number): User {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto): User {
    const user = this.findOne(id);
    const changes = Object.fromEntries(
      Object.entries(updateUserDto).filter(([, value]) => value !== undefined),
    ) as UpdateUserDto;
    if (changes.email && changes.email !== user.email) {
      this.ensureEmailIsFree(changes.email);
    }
    Object.assign(user, changes, { updatedAt: new Date() });
    return user;
  }

  remove(id: number): void {
    this.findOne(id);
    this.users.delete(id);
  }

  private ensureEmailIsFree(email: string): void {
    for (const user of this.users.values()) {
      if (user.email === email) {
        throw new ConflictException(`User with email ${email} already exists`);
      }
    }
  }
}
