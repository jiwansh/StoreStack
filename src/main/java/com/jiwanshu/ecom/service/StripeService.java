package com.jiwanshu.ecom.service;

import com.jiwanshu.ecom.payload.StripePaymentDTO;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface StripeService {

    PaymentIntent paymentIntent(StripePaymentDTO stripePaymentDto) throws StripeException;
}
