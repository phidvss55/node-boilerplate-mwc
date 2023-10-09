import { IsOptional, IsString, ValidateNested } from 'class-validator';
import CreateAddressDto from './address.dto';
import { Type } from 'class-transformer';

class CreateUserDto {
  @IsString()
  public firstName!: string;

  @IsString()
  public lastName!: string;

  @IsString()
  public email!: string;

  @IsString()
  public phone!: string;

  @IsString()
  public password!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  public address?: CreateAddressDto;
}

export default CreateUserDto;
