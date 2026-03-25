import { IsOptional, IsInt } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  @IsInt()
  age: number;
}
