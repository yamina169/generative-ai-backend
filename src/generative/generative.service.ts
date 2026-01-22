import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GenerateTextDto } from './dto/generate-text.dto';

@Injectable()
export class GenerativeService {
  private readonly OLLAMA_API = 'http://localhost:11434/api/generate';

  constructor(private readonly http: HttpService) {}

  // Summarize text only
  async summarizeText(text: string): Promise<string> {
    if (!text?.trim()) return '';
    const prompt = `Summarize the text below in simple words, keeping only the main ideas: ${text}
    `;
    return this.runOllamaStream(prompt);
  }

  // Generate ideas from topic
  async generateIdeas(dto: GenerateTextDto): Promise<string> {
    if (!dto.topic?.trim()) return '';
    const prompt = `
    You are a creative assistant.
    Provide as many clear and practical ideas as possible about "${dto.topic}".
    Format each idea as a short sentence or bullet point.
    Make them innovative, actionable, and easy to understand.
    `;
    return this.runOllamaStream(prompt);
  }

  // Run Ollama with streaming response
  private async runOllamaStream(prompt: string): Promise<string> {
    try {
      const axiosInstance = this.http.axiosRef;
      const resp = await axiosInstance.post(
        this.OLLAMA_API,
        { model: 'gemma3:1b', prompt, stream: true },
        {
          responseType: 'stream',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      const stream = resp.data;

      // Handle non-streaming response
      if (!stream || typeof stream.on !== 'function') {
        const data = resp.data;
        if (Array.isArray(data))
          return data
            .map((c: any) => c.response || '')
            .join('')
            .trim();
        if (data?.response) return String(data.response).trim();
        return '';
      }

      // Stream parsing
      return await new Promise<string>((resolve, reject) => {
        let buffer = '';
        let result = '';

        stream.on('data', (chunk: Buffer | string) => {
          buffer += chunk.toString();
          const lines = buffer.split(/\r?\n/);
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;

            const jsonStr = trimmed.startsWith('data:')
              ? trimmed.replace(/^data:\s*/, '')
              : trimmed;

            try {
              const obj = JSON.parse(jsonStr);
              if (Array.isArray(obj)) {
                for (const o of obj) if (o?.response) result += o.response;
              } else {
                if (obj?.response) result += obj.response;
                if (obj?.done) resolve(result.trim());
              }
            } catch {}
          }
        });

        stream.on('end', () => resolve(result.trim()));
        stream.on('error', (err: any) => reject(err));
      });
    } catch (err: any) {
      console.error(
        'Ollama API error:',
        err?.response?.data ?? err.message ?? err,
      );
      throw new InternalServerErrorException(
        'Failed to generate text via Ollama API',
      );
    }
  }
}
