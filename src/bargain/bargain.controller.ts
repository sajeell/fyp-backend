import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BargainService } from './bargain.service';

@ApiBearerAuth()
@ApiTags('Bargain')
@Controller('bargain')
export class BargainController {
    constructor(private readonly service: BargainService) { }

    @Post('/')
    async postRequest(@Body() dto: any) {
        return dto
    }
}
