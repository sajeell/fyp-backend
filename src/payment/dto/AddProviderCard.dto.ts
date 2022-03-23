import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsDateString,
} from 'class-validator';

export class AddProviderCardDto {
    @ApiProperty()
    @IsString()
    stripeToken: string;

    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsDateString()
    dob: Date;

    @ApiProperty()
    @IsString()
    ssnNumber: string;

    @ApiProperty()
    @IsString()
    city: string;

    @ApiProperty()
    @IsString()
    country: string;

    @ApiProperty()
    @IsString()
    postal_code: string;

    @ApiProperty()
    @IsString()
    line1: string;

    @ApiProperty()
    @IsString()
    state: string;

    @ApiProperty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    gender: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    businessWebUrl: string;
}