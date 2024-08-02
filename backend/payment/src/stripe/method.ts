import Stripe from 'stripe';
import { StripeConfig } from '../interface';

export class StripeMethods {
  private stripe: Stripe;

  constructor(private config: StripeConfig) {
    this.stripe = new Stripe(this.config.apiKey, {
      apiVersion: '2024-06-20',
    });
  }

  private async handleRequest<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      throw error;
    }
  }

  async createCustomer(email: string, name: string) {
    return this.handleRequest(() =>
      this.stripe.customers.create({ email, name })
    );
  }

  async createPaymentIntent(amount: number, currency: string) {
    return this.handleRequest(() =>
      this.stripe.paymentIntents.create({ amount, currency })
    );
  }

  async createSubscription(customerId: string, priceId: string) {
    return this.handleRequest(() =>
      this.stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
      })
    );
  }

  async getCustomer(id: string) {
    return this.handleRequest(() => this.stripe.customers.retrieve(id));
  }

  async updateCustomer(id: string, data: Partial<Stripe.CustomerUpdateParams>) {
    return this.handleRequest(() => this.stripe.customers.update(id, data));
  }

  async deleteCustomer(id: string) {
    return this.handleRequest(() => this.stripe.customers.del(id));
  }

  async getPaymentIntent(id: string) {
    return this.handleRequest(() => this.stripe.paymentIntents.retrieve(id));
  }

  async confirmPaymentIntent(id: string, paymentMethodId: string) {
    return this.handleRequest(() =>
      this.stripe.paymentIntents.confirm(id, {
        payment_method: paymentMethodId,
      })
    );
  }

  async getSubscription(id: string) {
    return this.handleRequest(() => this.stripe.subscriptions.retrieve(id));
  }

  async cancelSubscription(id: string) {
    return this.handleRequest(() => this.stripe.subscriptions.cancel(id));
  }

  async createProduct(name: string, description: string) {
    return this.handleRequest(() =>
      this.stripe.products.create({ name, description })
    );
  }

  async createPrice(productId: string, unitAmount: number, currency: string) {
    return this.handleRequest(() =>
      this.stripe.prices.create({
        product: productId,
        unit_amount: unitAmount,
        currency,
      })
    );
  }

  async createCheckoutSession(
    successUrl: string,
    cancelUrl: string,
    priceInCents: number,
    name: string,
    quantity: number
  ) {
    return this.handleRequest(async () => {
      const { url } = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: priceInCents,
              product_data: {
                name: name,
              },
            },
            quantity: quantity,
          },
        ],
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
      });
      return url;
    });
  }

  async createInvoice(customerId: string, autoAdvance: boolean) {
    return this.handleRequest(() =>
      this.stripe.invoices.create({
        customer: customerId,
        auto_advance: autoAdvance,
      })
    );
  }

  async createPaymentLink(priceId: string) {
    return this.handleRequest(() =>
      this.stripe.paymentLinks.create({
        line_items: [{ price: priceId, quantity: 1 }],
      })
    );
  }

  async createTerminalReader(label: string, registrationCode: string) {
    return this.handleRequest(() =>
      this.stripe.terminal.readers.create({
        label,
        registration_code: registrationCode,
      })
    );
  }

  async createBillingPortalSession(customerId: string, returnUrl: string) {
    return this.handleRequest(() =>
      this.stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
      })
    );
  }

  async filterStripeEvent(data: any, type: string) {
    return this.handleRequest<Promise<{ id: any; type: any; data: any }>>(
      () => {
        if (data.type === type) {
          return Promise.resolve({
            id: data.id,
            type: data.type,
            data: data.data.object,
          });
        }
        return Promise.resolve(null);
      }
    );
  }
}
