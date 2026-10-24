import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Download } from "lucide-react";

import type { PaymentItem } from "../payments.types";

type PaymentReceiptProps = {
  payment: PaymentItem;
};

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 10,
    color: "#27272a",
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e7",
  },
  brand: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#18181b",
  },
  muted: {
    color: "#71717a",
    marginTop: 5,
    fontSize: 9,
  },
  receiptTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
  },
  status: {
    marginTop: 8,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 4,
    fontSize: 9,
    textAlign: "center",
    alignSelf: "flex-end",
  },
  amountSection: {
    marginTop: 24,
    padding: 18,
    backgroundColor: "#f4f4f5",
    borderRadius: 6,
  },
  amountLabel: {
    color: "#71717a",
    fontSize: 10,
  },
  amount: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    marginTop: 8,
    color: "#18181b",
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginBottom: 12,
    color: "#18181b",
  },
  section: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f5",
    gap: 12,
  },
  label: {
    color: "#71717a",
    width: "42%",
  },
  value: {
    width: "58%",
    textAlign: "right",
    fontFamily: "Helvetica-Bold",
  },
  footer: {
    marginTop: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e4e4e7",
    textAlign: "center",
    color: "#71717a",
    fontSize: 9,
    lineHeight: 1.6,
  },
});

const formatDate = (value: string | null) => {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(date);
};

const formatAmount = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

const formatLabel = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

function PaymentReceiptDocument({ payment }: PaymentReceiptProps) {
  const isPaid = payment.paymentStatus === "COMPLETED";

  return (
    <Document
      title={`Payment Receipt ${payment.paymentReference}`}
      author="Nivara Hotels"
      subject={`Payment for booking ${payment.bookingReference}`}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>Nivara Hotels</Text>
            <Text style={styles.muted}>Payment receipt</Text>
          </View>

          <View>
            <Text style={styles.receiptTitle}>RECEIPT</Text>
            <Text style={styles.muted}>{payment.paymentReference}</Text>
            <Text
              style={{
                ...styles.status,
                color: isPaid ? "#166534" : "#52525b",
                backgroundColor: isPaid ? "#dcfce7" : "#e4e4e7",
              }}
            >
              {formatLabel(payment.paymentStatus)}
            </Text>
          </View>
        </View>

        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Payment amount</Text>
          <Text style={styles.amount}>{formatAmount(payment.amount)}</Text>
          <Text style={styles.muted}>
            {payment.paidAt
              ? `Paid on ${formatDate(payment.paidAt)}`
              : `Recorded on ${formatDate(payment.createdAt)}`}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Customer name</Text>
            <Text style={styles.value}>{payment.customerName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Booking reference</Text>
            <Text style={styles.value}>{payment.bookingReference}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Invoice number</Text>
            <Text style={styles.value}>{payment.invoiceNumber}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transaction details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Payment reference</Text>
            <Text style={styles.value}>{payment.paymentReference}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Transaction ID</Text>
            <Text style={styles.value}>
              {payment.transactionId ?? "Not available"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment method</Text>
            <Text style={styles.value}>
              {formatLabel(String(payment.paymentMethod))}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment date</Text>
            <Text style={styles.value}>{formatDate(payment.paidAt)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Recorded by</Text>
            <Text style={styles.value}>
              {payment.recordedByName ?? "Not available"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Created on</Text>
            <Text style={styles.value}>{formatDate(payment.createdAt)}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Thank you for choosing Nivara Hotels.</Text>
          <Text>
            This receipt records the payment details available in our system.
          </Text>
          <Text>Payment reference: {payment.paymentReference}</Text>
        </View>
      </Page>
    </Document>
  );
}

export function PaymentDownload({ payment }: PaymentReceiptProps) {
  const fileName = `receipt-${payment.paymentReference.replace(
    /[^a-zA-Z0-9_-]/g,
    "_"
  )}.pdf`;

  return (
    <PDFDownloadLink
      document={<PaymentReceiptDocument payment={payment} />}
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
