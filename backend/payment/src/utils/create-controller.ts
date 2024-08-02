import { Controller, Post, Body } from '@nestjs/common';
import { CreateSessionDto } from '../dto/create-session.dto';
import { PaymentControllerOptions, PaymentServiceOptions } from '../interface';

export function createPaymentController(
  options: PaymentControllerOptions,
  service: PaymentServiceOptions,
) {
  @Controller(options.basePath)
  class PaymentController {
    service: PaymentServiceOptions;
    constructor() {
      this.service = service;
    }

    @Post(options.endpoints.createCheckoutSession)
    async createCheckoutSession(@Body() body: CreateSessionDto) {
      const { price, name, quantity } = body;
      return this.service.createCheckoutSession(
        options.successUrl,
        options.cancelUrl,
        price * 100,
        name,
        quantity,
      );
    }

    @Post(options.endpoints.webhook)
    async paymentHook(@Body() body: any) {
      return this.service.handleStripeEvent(body, 'checkout.session.completed');
    }
  }

  return PaymentController;
}
