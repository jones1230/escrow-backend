import {
    IsString,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    Matches,
    MaxLength,
    MinLength,
    IsEnum,
} from 'class-validator';
import { AccountType } from '../../../generated/prisma';
import { Type } from 'class-transformer';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    firstName: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    lastName?: string;

    @IsEmail({})
    @IsNotEmpty()
    @MaxLength(100)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    // @Matches(/^(?=.*[a-z](?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$)/)
    password: string;

    @IsString()
    @IsOptional()
    @Matches(/^(\+233|0)[2-9]\d{8}$/)
    phoneNumber?: string;

    @IsNotEmpty()
    @Type(() => Date)
    dateOfBirth: Date;

    @IsEnum(AccountType)
    @IsOptional()
    accountType?: AccountType;
}
