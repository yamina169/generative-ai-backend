import { Controller, Post, Body } from '@nestjs/common';
import { GenerativeService } from './generative.service';
import { GenerateTextDto } from './dto/generate-text.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Generative')
@Controller('generative')
export class GenerativeController {
  constructor(private readonly generativeService: GenerativeService) {}

  @Post('summarize')
  @ApiOperation({ summary: 'Summarize text only' })
  async summarize(@Body('text') text: string) {
    if (!text?.trim()) return { result: '' };
    const summary = await this.generativeService.summarizeText(text);
    return { result: summary };
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generate ideas from topic' })
  async generate(@Body() dto: GenerateTextDto) {
    if (!dto.topic?.trim()) return { result: '' };
    const ideas = await this.generativeService.generateIdeas(dto);
    return { result: ideas };
  }
}
