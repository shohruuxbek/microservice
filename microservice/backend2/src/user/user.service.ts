import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    await this.ensureEmailIsFree(createUserDto.email);
    return await this.userModel.create(createUserDto);
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    const user = isValidObjectId(id)
      ? await this.userModel.findById(id).exec()
      : null;
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    const user = await this.findOne(id);
    const changes = Object.fromEntries(
      Object.entries(updateUserDto).filter(([, value]) => value !== undefined),
    ) as UpdateUserDto;
    if (changes.email && changes.email !== user.email) {
      await this.ensureEmailIsFree(changes.email);
    }
    user.set(changes);
    return await user.save();
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.deleteOne();
  }

  private async ensureEmailIsFree(email: string): Promise<void> {
    const exists = await this.userModel.exists({ email: email.toLowerCase() });
    if (exists) {
      throw new ConflictException(`User with email ${email} already exists`);
    }
  }
}
