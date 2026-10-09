export const PAYMENTS_SUCCESS_MSG = {
  CASH_RECORDED: 'Cash payment recorded successfully.',
  ONLINE_INITIATED: 'Online payment initiated successfully.',
  REFUNDED: 'Payment refunded successfully.',
} as const;

export const PAYMENTS_ERROR_MSG = {
  INVOICE_NOT_FOUND: 'Invoice not found.',
  PAYMENT_NOT_FOUND: 'Payment not found.',
  AMOUNT_EXCEEDS_BALANCE: 'Payment amount exceeds the outstanding balance.',
  INVALID_REFUND_STATUS: 'Only completed payments can be refunded.',
  PAYMENT_CHANGED: 'Payment changed before this operation could be applied.',
  PAYMENT_REFERENCE_CONFLICT: 'Could not create a unique payment reference.',
} as const;
