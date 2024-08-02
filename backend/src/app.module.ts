import { Module } from '@nestjs/common';
import { PaymentSystemModule } from './payment/payment.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PaymentSystemModule.register(
      {
        providerName: 'StripeService',
        basePath: 'stripe',
        successUrl: `${process.env.CLIENT_URL}/success`,
        cancelUrl: `${process.env.CLIENT_URL}/failure`,
        endpoints: {
          createCheckoutSession: 'sessions',
          webhook: 'webhook',
        },
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
        apiVersion: '2020-08-27',
      },
    ),
  ],
})
export class AppModule {}
