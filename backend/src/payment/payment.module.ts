import { Module, DynamicModule } from '@nestjs/common';
import { PaymentService } from './payment.service';
import {
  createPaymentController,
  PaymentControllerOptions,
  PaymentServiceOptions,
} from 'payment-module';
import { StripeConfig } from 'payment-module';

@Module({})
export class PaymentSystemModule {
  static register(
    stripeOptions: PaymentControllerOptions,
    stripeConfig: StripeConfig,
  ): DynamicModule {
    const paymentService: PaymentServiceOptions = new PaymentService({
      apiKey: stripeConfig.apiKey,
      webhookSecret: stripeConfig.webhookSecret,
      apiVersion: stripeConfig.apiVersion,
    });

    const StripeController = createPaymentController(
      stripeOptions,
      paymentService,
    );

    return {
      module: PaymentSystemModule,
      controllers: [StripeController],
      providers: [
        {
          provide: stripeOptions.providerName,
          useValue: paymentService,
        },
      ],
    };
  }
}
