export const PAYMENTS_SUCCESS_MSG = {
  CASH_RECORDED: 'Cash payment recorded successfully.',
  ONLINE_INITIATED: 'Online payment initiated successfully.',
  ONLINE_VERIFIED: 'Online payment status verified.',
  WEBHOOK_PROCESSED: 'Webhook processed successfully.',
  REFUNDED: 'Payment refunded successfully.',
} as const;

export const PAYMENTS_ERROR_MSG = {
  BOOKING_NOT_FOUND: 'Booking not found.',
  BOOKING_NOT_PAYABLE: 'This booking is not eligible for payment.',
  INVOICE_NOT_FOUND: 'Invoice not found.',
  PAYMENT_NOT_FOUND: 'Payment not found.',
  NO_OUTSTANDING_BALANCE: 'This booking has no outstanding balance.',
  PAYMENT_ORDER_MISMATCH: 'Payment order does not match this attempt.',
  PAYMENT_SIGNATURE_INVALID: 'Payment signature is invalid.',
  PAYMENT_AMOUNT_MISMATCH: 'Payment amount or currency does not match.',
  PAYMENT_ALREADY_ACTIVE:
    'Complete or reconcile the current online payment first.',
  PAYMENT_NOT_ALLOWED: 'You do not have permission to initiate this payment.',
  PAYMENT_RECONCILING:
    'This payment is still being reconciled. Check its status shortly.',
  WEBHOOK_SIGNATURE_INVALID: 'Webhook signature is invalid.',
  WEBHOOK_EVENT_INVALID: 'Webhook event could not be processed.',
  AMOUNT_EXCEEDS_BALANCE: 'Payment amount exceeds the outstanding balance.',
  INVALID_REFUND_STATUS: 'Only completed payments can be refunded.',
  PAYMENT_CHANGED: 'Payment changed before this operation could be applied.',
  PAYMENT_REFERENCE_CONFLICT: 'Could not create a unique payment reference.',
} as const;
