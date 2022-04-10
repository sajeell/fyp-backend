import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IntermediaryService } from './intermediary.service';

@ApiTags('Intermediary')
@Controller('intermediary')
export class IntermediaryController {
    constructor(private readonly service: IntermediaryService) { }

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
}
