import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Download } from "lucide-react";

import type { InvoiceItem } from "../invoices.types";

type InvoiceDownloadProps = {
  invoice: InvoiceItem;
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#27272a",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
  },
  brand: {
    fontSize: 23,
    fontFamily: "Helvetica-Bold",
    color: "#18181b",
  },
  muted: {
    marginTop: 5,
    fontSize: 9,
    color: "#71717a",
  },
  invoiceTitle: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
    color: "#18181b",
  },
  status: {
    alignSelf: "flex-end",
    marginTop: 9,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 4,
    fontSize: 9,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 28,
    gap: 20,
  },
  detailColumn: {
    width: "50%",
  },
  sectionLabel: {
    fontSize: 9,
    color: "#71717a",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  strong: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    color: "#18181b",
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 14,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#f4f4f5",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
  },
  description: {
    width: "65%",
  },
  price: {
    width: "35%",
    textAlign: "right",
  },
  summary: {
    marginTop: 20,
    marginLeft: "40%",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 9,
    gap: 12,
  },
  summaryLabel: {
    color: "#71717a",
  },
  summaryValue: {
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
  },
  totalRow: {
    marginTop: 5,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: "#d4d4d8",
  },
  totalLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
  },
  totalValue: {
    fontFamily: "Helvetica-Bold",
    fontSize: 15,
  },
  balanceBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: 5,
    backgroundColor: "#f4f4f5",
  },
  balanceLabel: {
    color: "#71717a",
    fontSize: 10,
  },
  balanceValue: {
    marginTop: 7,
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#18181b",
  },
  footer: {
    marginTop: 40,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e4e4e7",
    textAlign: "center",
    fontSize: 9,
    color: "#71717a",
    lineHeight: 1.6,
  },
});

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
};

const formatStatus = (status: InvoiceItem["status"]) =>
  String(status)
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

function InvoiceDocument({ invoice }: InvoiceDownloadProps) {
  const status = String(invoice.status).toUpperCase();
  const isPaid = status === "PAID" || status === "COMPLETED";

  const isOverdue = status === "OVERDUE";

  return (
    <Document
      title={`Invoice ${invoice.invoiceNumber}`}
      author="Nivara Hotels"
      subject={`Invoice for booking ${invoice.bookingReference}`}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>Nivara Hotels</Text>
            <Text style={styles.muted}>Hotel accommodation</Text>
          </View>

          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.muted}>{invoice.invoiceNumber}</Text>
            <Text
              style={{
                ...styles.status,
                color: isPaid ? "#166534" : isOverdue ? "#991b1b" : "#52525b",
                backgroundColor: isPaid
                  ? "#dcfce7"
                  : isOverdue
                    ? "#fee2e2"
                    : "#e4e4e7",
              }}
            >
              {formatStatus(invoice.status)}
            </Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailColumn}>
            <Text style={styles.sectionLabel}>Billed to</Text>
            <Text style={styles.strong}>{invoice.customerName}</Text>
            <Text style={styles.muted}>
              Booking: {invoice.bookingReference}
            </Text>
          </View>

          <View style={styles.detailColumn}>
            <Text style={styles.sectionLabel}>Invoice details</Text>
            <Text>Invoice No.: {invoice.invoiceNumber}</Text>
            <Text style={styles.muted}>
              Issued on: {formatDate(invoice.issuedAt)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invoice summary</Text>

          <View style={styles.tableHeader}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.price}>Amount</Text>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.description}>
              <Text style={styles.strong}>Hotel booking</Text>
              <Text style={styles.muted}>
                Booking reference: {invoice.bookingReference}
              </Text>
            </View>
            <Text style={styles.price}>
              {formatAmount(invoice.totalAmount)}
            </Text>
          </View>
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Invoice total</Text>
            <Text style={styles.summaryValue}>
              {formatAmount(invoice.totalAmount)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Amount paid</Text>
            <Text style={styles.summaryValue}>
              {formatAmount(invoice.paidAmount)}
            </Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Balance due</Text>
            <Text style={styles.totalValue}>
              {formatAmount(invoice.balanceDue)}
            </Text>
          </View>
        </View>

        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>
            {isPaid ? "Payment status" : "Outstanding balance"}
          </Text>
          <Text style={styles.balanceValue}>
            {isPaid ? "Fully paid" : formatAmount(invoice.balanceDue)}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>Thank you for choosing Nivara Hotels.</Text>
          <Text>Invoice reference: {invoice.invoiceNumber}</Text>
          <Text>Please retain this invoice for your records.</Text>
        </View>
      </Page>
    </Document>
  );
}

export function InvoiceDownload({ invoice }: InvoiceDownloadProps) {
  const fileName = `invoice-${invoice.invoiceNumber.replace(
    /[^a-zA-Z0-9_-]/g,
    "_"
  )}.pdf`;

  return (
    <PDFDownloadLink
      document={<InvoiceDocument invoice={invoice} />}
      fileName={fileName}
      style={{ textDecoration: "none" }}
      className="flex items-center"
    >
      {({ loading, error }) => (
        <>
          {loading ? (
            <>Loading...</>
          ) : error ? (
            "Unavailable"
          ) : (
            <>
              <Download className="mr-2 size-4" />
              Receipt
            </>
          )}
        </>
      )}
    </PDFDownloadLink>
  );
}
