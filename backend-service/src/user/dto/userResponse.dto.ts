import { Exclude, Expose, Type } from 'class-transformer';
import { UserProfileDto } from '../../profile/userProfile.dto';
import { VerificationStatus } from '../../../generated/prisma';

export class UserResponseDto {
    @Expose()
    id: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName?: string;

    @Expose()
    email: string;

    @Exclude()
    password: string;

    @Expose()
    phoneNumber?: string;

    @Expose()
    dateOfBirth?: string;

    @Expose()
    verificationStatus: VerificationStatus;

    @Expose()
    lastLoginAt: string;

    @Expose()
    @Type(() => UserProfileDto)
    profile?: UserProfileDto;
}
