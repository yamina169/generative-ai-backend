import { ApiProperty } from '@nestjs/swagger';

export class GenerateTextDto {
  @ApiProperty({
    description: 'Topic or keyword to generate ideas',
    example: 'NestJS',
  })
  topic: string;
}
