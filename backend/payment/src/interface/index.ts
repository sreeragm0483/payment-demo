export interface StripeConfig {
  apiKey: string;
  webhookSecret: string;
  apiVersion: string;
}

export interface PaymentServiceOptions {
  createCheckoutSession: (
    successUrl: string,
    cancelUrl: string,
    price: number,
    name: string,
    quantity: number
  ) => Promise<any>;
  handleStripeEvent: (body: any, eventType: string) => Promise<any>;
}

export interface PaymentControllerOptions {
  basePath: string;
  providerName: string;
  successUrl: string;
  cancelUrl: string;
  endpoints: {
    createCheckoutSession: string;
    webhook: string;
  };
}
