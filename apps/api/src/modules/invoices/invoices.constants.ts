export const INVOICES_SUCCESS_MSG = {
  UPDATED: 'Invoice updated successfully.',
  CANCELLED: 'Invoice cancelled successfully.',
} as const;

export const INVOICES_ERROR_MSG = {
  NOT_FOUND: 'Invoice not found.',
  NOT_EDITABLE: 'Only unpaid invoices without settled payments can be updated.',
  INVALID_TOTAL: 'Discount cannot exceed subtotal plus GST.',
  COMPLETED_PAYMENTS:
    'Refund completed payments before cancelling this invoice.',
  CANNOT_CANCEL: 'This invoice cannot be cancelled in its current status.',
  CHANGED: 'Invoice changed before this operation could be applied.',
} as const;
