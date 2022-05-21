import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bargain, BargainDocument } from './bargain.schema';

@Injectable()
export class BargainService {
    constructor(
        @InjectModel(Bargain.name) private readonly model: Model<BargainDocument>
    ) { }
}
