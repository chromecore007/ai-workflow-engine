import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from './schemas/request.schema';
import { AiService } from '../ai/ai.service';

@Injectable()
export class RequestsService {
  constructor(
    @InjectModel(Request.name) private requestModel: Model<Request>,
    private aiService: AiService
  ) {}

  async create(data) {
    const created = await this.requestModel.create(data);

    
    setImmediate(async () => {
      const ai = await this.aiService.enrich(data);

      console.log("AI RESULT:", ai); 

      await this.requestModel.findByIdAndUpdate(created._id, ai);
    });

    return created;
  }

  async findAll(query) {
    const { page = 1, limit = 10, category } = query;

    const filter = category ? { category } : {};

    return this.requestModel
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit);
  }
}