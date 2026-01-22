import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

// -----------------------------
// Check if Ollama CLI is installed and server is reachable
// -----------------------------
async function checkOllama(): Promise<void> {
  try {
    // 1️ Check if Ollama CLI is installed
    const { stdout: version } = await execFileAsync('ollama', ['--version']);
    console.log('✅ Ollama CLI version:', version.trim());

    // 2️ Check if Ollama server is running by listing models
    const { stdout } = await execFileAsync('ollama', ['list']);

    const requiredModels = ['gemma3:1b'];
    const missingModels = requiredModels.filter(
      (model) => !stdout.includes(model),
    );

    if (missingModels.length > 0) {
      console.error('❌ Missing Ollama model(s):', missingModels.join(', '));
      console.error('👉 Run the following command to download:');
      console.error('   ollama pull gemma3:1b');
      process.exit(1);
    }

    console.log('✅ Ollama model is ready:', requiredModels.join(', '));
  } catch (err: any) {
    // Detect whether CLI is missing or server not reachable
    if (err.code === 'ENOENT') {
      console.error(
        '❌ Ollama CLI not found. Please install it: https://ollama.com',
      );
    } else {
      console.error(
        '❌ Ollama server not reachable. Make sure Ollama Desktop is running.',
      );
      console.error('Details:', err.message);
    }
    process.exit(1);
  }
}

// -----------------------------
// Bootstrap NestJS app
// -----------------------------
async function bootstrap() {
  // Check Ollama before starting server
  await checkOllama();

  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Generative AI API')
    .setDescription('Automatic summary + Idea generator')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);

  console.log('🚀 Backend running on http://localhost:3000');
  console.log('📘 Swagger docs: http://localhost:3000/api-docs');
}

bootstrap();
