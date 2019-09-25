import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function swaggerD(app) {
    const options = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/api/docs', app, document);
}
