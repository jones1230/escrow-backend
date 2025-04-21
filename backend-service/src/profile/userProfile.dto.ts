import { IsObject, IsOptional, IsUrl, Length } from 'class-validator';
import { Expose } from 'class-transformer';

interface SocialMediaLinks {
    facebook: string;
    whatsapp: string;
    twitter: string;
    snapchat: string;
    instagram: string;
}

export class UserProfileDto {
    @Expose()
    @IsOptional()
    @Length(3, 150, {
        message: 'Bio must be between 3 and 150 characters long',
    })
    bio?: string;

    @Expose()
    @IsOptional()
    @IsUrl()
    profilePictureUrl?: string;

    @Expose()
    @IsOptional()
    @Length(3, 100)
    addressStreet?: string;

    @Expose()
    @IsOptional()
    @Length(3, 100)
    addressCity?: string;

    @Expose()
    @IsOptional()
    addressCountry?: string;

    @Expose()
    @IsOptional()
    @IsUrl()
    websiteUrl?: string;

    @Expose()
    @IsOptional()
    @IsUrl()
    @IsObject()
    socialMediaLinks?: SocialMediaLinks; //REMEMBER: You have to JSON.stringify() the object received here!

    @Expose()
    @IsOptional()
    @Length(3, 100, {
        message: 'Company name must be between 3 and 100 characters long',
    })
    companyName?: string;
}
