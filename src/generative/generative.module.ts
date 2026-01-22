import { Module } from '@nestjs/common';
import { GenerativeController } from '@/generative/generative.controller';
import { GenerativeService } from '@/generative/generative.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [GenerativeController],
  providers: [GenerativeService],
})
export class GenerativeModule {}
