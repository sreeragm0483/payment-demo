import { Injectable } from '@nestjs/common';
import { StripeMethods, StripeConfig } from 'payment-module';
import { SuccessResponse } from 'src/shared/success.response';

@Injectable()
export class PaymentService {
  private stripMethod: StripeMethods;
  constructor(private config: StripeConfig) {
    this.stripMethod = new StripeMethods(config);
  }

  async createCheckoutSession(
    successUrl: string,
    cancelUrl: string,
    priceInCents: number,
    name: string,
    quantity: number,
  ) {
    const url = await this.stripMethod.createCheckoutSession(
      successUrl,
      cancelUrl,
      priceInCents,
      name,
      quantity,
    );

    return new SuccessResponse<{ url: string }>('Checkout session created', {
      url,
    });
  }

  async handleStripeEvent(event: any) {
    const data = await this.stripMethod.filterStripeEvent(
      event,
      'checkout.session.completed',
    );
    console.log('Webhook handled', data);
    // store this events in database
    // need the storing of events to idempotent
  }
}
