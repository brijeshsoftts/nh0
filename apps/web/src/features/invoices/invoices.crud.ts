import { createCrud } from "@/lib/crud/createCrud";

import type { CustomerInvoice, InvoiceItem } from "./invoices.types";

type Payment = CustomerInvoice | InvoiceItem;

export const invoicesCrud = createCrud<Payment, undefined>()({
  resource: "invoices",
  endpoint: "/invoices",
  label: "Invoice",
});

export const { useList: useInvoices, useStats: useInvoicesStats } =
  invoicesCrud;
