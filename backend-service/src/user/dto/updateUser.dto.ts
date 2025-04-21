import { Type } from 'class-transformer';
import { UserProfileDto } from '../../profile/userProfile.dto';
import {
    IsOptional,
    IsString,
    MaxLength,
    IsEmail,
    Matches,
    ValidateNested,
} from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @MaxLength(50)
    firstName?: string;

    @IsString()
    @IsOptional()
    @MaxLength(50)
    lastName?: string;

    @IsEmail({})
    @IsOptional()
    @MaxLength(100)
    email?: string;

    @IsOptional()
    @IsString()
    dateOfBirth?: string;

    @IsOptional()
    @IsString()
    @Matches(/^(\+233|0)[2-9]\d{8}$/)
    phoneNumber?: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => UserProfileDto)
    profile?: UserProfileDto;
}
