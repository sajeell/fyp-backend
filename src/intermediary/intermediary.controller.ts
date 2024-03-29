import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IntermediaryService } from './intermediary.service';

@ApiTags('Intermediary')
@Controller('intermediary')
export class IntermediaryController {
    constructor(private readonly service: IntermediaryService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    public async fetchIntermediaries() {
        return await this.service.fetchIntermediaries()
    }

    @UseGuards(JwtAuthGuard)
    @Post('/create')
    public async postIntermediary(@Body() body: any) {
        return await this.service.postIntermediaryData(body)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/by/agent/:id')
    public async getAgentIntermediaries(@Param('id') id: any) {
        return await this.service.fetchIntermediariesViaAgentID(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/product/by/:id')
    public async getProductViaIntermediary(@Param('id') id: any) {
        console.log(id)
        return await this.service.fetchProductViaIntermediary(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/deduct/commission')
    public async deductCommission(@Body() body: any) {
        const { intermediaryID, totalPrice, sellerID } = body
        return await this.service.deductCommission(intermediaryID, totalPrice, sellerID)
    }
}
