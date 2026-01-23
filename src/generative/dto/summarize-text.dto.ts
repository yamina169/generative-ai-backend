// dto/summarize-text.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class SummarizeTextDto {
  @ApiProperty({
    description: 'Text to summarize',
    example: `NestJS is a Node.js framework for building scalable server-side applications.
It uses TypeScript by default, providing type safety and modern JavaScript features.
The framework is built around modules, controllers, and providers for structured code.
It integrates easily with databases, REST APIs, GraphQL, and microservices.
NestJS emphasizes maintainability, testability, and developer productivity.`,
  })
  text: string;
}
