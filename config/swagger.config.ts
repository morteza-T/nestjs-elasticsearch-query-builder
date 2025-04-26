import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('CRM v2 Back Office API')
  .setDescription(
    'CRM v2 Back Office is an service to report customers (loan, account, card ,...) data. please set Bearer token in Authorize Section',
  )
  .setVersion('1.0')
  .addBearerAuth()
  .build();
