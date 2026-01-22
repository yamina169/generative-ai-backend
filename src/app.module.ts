import { Module } from '@nestjs/common';
import { GenerativeModule } from '@/generative/generative.module';

@Module({
  imports: [GenerativeModule],
})
export class AppModule {}
