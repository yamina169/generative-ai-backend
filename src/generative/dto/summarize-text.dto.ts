import { ApiProperty } from '@nestjs/swagger';

export class SummarizeTextDto {
  @ApiProperty({
    required: false,
    description: 'Text to summarize',
    example: 'NestJS is a Node.js framework...',
  })
  text?: string;

  @ApiProperty({
    required: false,
    description: 'Path to a local PDF file',
    example: 'files/document.pdf',
  })
  pdfPath?: string;
}
