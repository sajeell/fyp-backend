import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BargainService } from './bargain.service';

@ApiBearerAuth()
@ApiTags('Bargain')
@Controller('bargain')
export class BargainController {
    constructor(private readonly service: BargainService) { }

    @Get('')
    async getAllRequests() {
        return await this.service.getAllRequests()
    }

    @Get('/seller/:id')
    async getAllRequestsAssignedToSeller(@Param('id') sellerID: string) {
        return await this.service.getAllRequestsAssignedToSeller(sellerID)
    }

    @Get('/buyer/:id')
    async getAllRequestsOfBuyer(@Param('id') buyerID: string) {
        return await this.service.getAllRequestsOfBuyer(buyerID)
    }

    @Post('/request')
    async postRequest(@Body() dto: any) {
        return await this.service.postRequest(dto)
    }

    @Put('/acceptrequest')
    async acceptRequest(@Body() dto: any) {
        return await this.service.acceptRequest(dto)
    }

}
