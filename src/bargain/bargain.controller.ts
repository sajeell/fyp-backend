import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BargainService } from './bargain.service';

@ApiBearerAuth()
@ApiTags('Bargain')
@Controller('bargain')
export class BargainController {
    constructor(private readonly service: BargainService) { }

    @Post('/request')
    async postRequest(@Body() dto: any) {
        return await this.service.postRequest(dto)
    }

    @Post('/acceptrequest')
    async acceptRequest(@Body() dto: any) {
        return await this.service.acceptRequest(dto)
    }

}
