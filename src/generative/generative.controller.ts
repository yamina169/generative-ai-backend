// generative.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { GenerativeService } from './generative.service';
import { GenerateTextDto } from './dto/generate-text.dto';
import { SummarizeTextDto } from './dto/summarize-text.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Generative')
@Controller('generative')
export class GenerativeController {
  constructor(private readonly generativeService: GenerativeService) {}

  @Post('summarize')
  @ApiOperation({ summary: 'Summarize provided text' })
  @ApiResponse({
    status: 201,
    description: 'Summary of the provided text',
    schema: {
      example: { result: 'This is a summarized version of your input text...' },
    },
  })
  async summarize(@Body() dto: SummarizeTextDto) {
    if (!dto.text?.trim()) return { result: '' };
    const summary = await this.generativeService.summarizeText(dto.text);
    return { result: summary };
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generate ideas from a topic' })
  @ApiResponse({
    status: 201,
    description: 'Generated ideas based on the topic',
    schema: {
      example: { result: ['Idea 1 about NestJS', 'Idea 2 about NestJS'] },
    },
  })
  async generate(@Body() dto: GenerateTextDto) {
    if (!dto.topic?.trim()) return { result: [] };
    const ideas = await this.generativeService.generateIdeas(dto);
    return { result: ideas };
  }
}
