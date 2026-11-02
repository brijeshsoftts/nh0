import { createCrud } from "@/lib/crud/createCrud";

import type { InvoiceItem } from "./invoices.types";

type Invoice = InvoiceItem;

export const invoicesCrud = createCrud<Invoice, undefined>()({
  resource: "invoices",
  endpoint: "/invoices",
  label: "Invoice",
});

export const { useList: useInvoices } = invoicesCrud;
