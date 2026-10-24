import { createCrud } from "@/lib/crud/createCrud";

import type { CustomerPayment } from "./payments.types";

type Payment = CustomerPayment | PaymentItem;

export const paymentsCrud = createCrud<Payment, undefined>()({
  resource: "payments",
  endpoint: "/payments",
  label: "Payment",
});

export const { useList: usePayments } = paymentsCrud;
