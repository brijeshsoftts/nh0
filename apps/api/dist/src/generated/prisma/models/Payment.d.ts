import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PaymentModel = runtime.Types.Result.DefaultSelection<Prisma.$PaymentPayload>;
export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null;
    _avg: PaymentAvgAggregateOutputType | null;
    _sum: PaymentSumAggregateOutputType | null;
    _min: PaymentMinAggregateOutputType | null;
    _max: PaymentMaxAggregateOutputType | null;
};
export type PaymentAvgAggregateOutputType = {
    amount: number | null;
};
export type PaymentSumAggregateOutputType = {
    amount: number | null;
};
export type PaymentMinAggregateOutputType = {
    id: string | null;
    paymentReference: string | null;
    transactionId: string | null;
    invoiceId: string | null;
    bookingId: string | null;
    customerId: string | null;
    amount: number | null;
    paymentMethod: $Enums.PaymentMethod | null;
    paymentStatus: $Enums.PaymentStatus | null;
    paidAt: Date | null;
    recordedBy: string | null;
    createdAt: Date | null;
};
export type PaymentMaxAggregateOutputType = {
    id: string | null;
    paymentReference: string | null;
    transactionId: string | null;
    invoiceId: string | null;
    bookingId: string | null;
    customerId: string | null;
    amount: number | null;
    paymentMethod: $Enums.PaymentMethod | null;
    paymentStatus: $Enums.PaymentStatus | null;
    paidAt: Date | null;
    recordedBy: string | null;
    createdAt: Date | null;
};
export type PaymentCountAggregateOutputType = {
    id: number;
    paymentReference: number;
    transactionId: number;
    invoiceId: number;
    bookingId: number;
    customerId: number;
    amount: number;
    paymentMethod: number;
    paymentStatus: number;
    paidAt: number;
    recordedBy: number;
    createdAt: number;
    _all: number;
};
export type PaymentAvgAggregateInputType = {
    amount?: true;
};
export type PaymentSumAggregateInputType = {
    amount?: true;
};
export type PaymentMinAggregateInputType = {
    id?: true;
    paymentReference?: true;
    transactionId?: true;
    invoiceId?: true;
    bookingId?: true;
    customerId?: true;
    amount?: true;
    paymentMethod?: true;
    paymentStatus?: true;
    paidAt?: true;
    recordedBy?: true;
    createdAt?: true;
};
export type PaymentMaxAggregateInputType = {
    id?: true;
    paymentReference?: true;
    transactionId?: true;
    invoiceId?: true;
    bookingId?: true;
    customerId?: true;
    amount?: true;
    paymentMethod?: true;
    paymentStatus?: true;
    paidAt?: true;
    recordedBy?: true;
    createdAt?: true;
};
export type PaymentCountAggregateInputType = {
    id?: true;
    paymentReference?: true;
    transactionId?: true;
    invoiceId?: true;
    bookingId?: true;
    customerId?: true;
    amount?: true;
    paymentMethod?: true;
    paymentStatus?: true;
    paidAt?: true;
    recordedBy?: true;
    createdAt?: true;
    _all?: true;
};
export type PaymentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[];
    cursor?: Prisma.PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PaymentCountAggregateInputType;
    _avg?: PaymentAvgAggregateInputType;
    _sum?: PaymentSumAggregateInputType;
    _min?: PaymentMinAggregateInputType;
    _max?: PaymentMaxAggregateInputType;
};
export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
    [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePayment[P]> : Prisma.GetScalarType<T[P], AggregatePayment[P]>;
};
export type PaymentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithAggregationInput | Prisma.PaymentOrderByWithAggregationInput[];
    by: Prisma.PaymentScalarFieldEnum[] | Prisma.PaymentScalarFieldEnum;
    having?: Prisma.PaymentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PaymentCountAggregateInputType | true;
    _avg?: PaymentAvgAggregateInputType;
    _sum?: PaymentSumAggregateInputType;
    _min?: PaymentMinAggregateInputType;
    _max?: PaymentMaxAggregateInputType;
};
export type PaymentGroupByOutputType = {
    id: string;
    paymentReference: string;
    transactionId: string | null;
    invoiceId: string;
    bookingId: string;
    customerId: string;
    amount: number;
    paymentMethod: $Enums.PaymentMethod;
    paymentStatus: $Enums.PaymentStatus;
    paidAt: Date | null;
    recordedBy: string | null;
    createdAt: Date;
    _count: PaymentCountAggregateOutputType | null;
    _avg: PaymentAvgAggregateOutputType | null;
    _sum: PaymentSumAggregateOutputType | null;
    _min: PaymentMinAggregateOutputType | null;
    _max: PaymentMaxAggregateOutputType | null;
};
export type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PaymentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PaymentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PaymentGroupByOutputType[P]>;
}>>;
export type PaymentWhereInput = {
    AND?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[];
    OR?: Prisma.PaymentWhereInput[];
    NOT?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[];
    id?: Prisma.StringFilter<"Payment"> | string;
    paymentReference?: Prisma.StringFilter<"Payment"> | string;
    transactionId?: Prisma.StringNullableFilter<"Payment"> | string | null;
    invoiceId?: Prisma.StringFilter<"Payment"> | string;
    bookingId?: Prisma.StringFilter<"Payment"> | string;
    customerId?: Prisma.StringFilter<"Payment"> | string;
    amount?: Prisma.IntFilter<"Payment"> | number;
    paymentMethod?: Prisma.EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeNullableFilter<"Payment"> | Date | string | null;
    recordedBy?: Prisma.StringNullableFilter<"Payment"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Payment"> | Date | string;
    invoice?: Prisma.XOR<Prisma.InvoiceScalarRelationFilter, Prisma.InvoiceWhereInput>;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
    customer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    recorder?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type PaymentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    paymentReference?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    recordedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    invoice?: Prisma.InvoiceOrderByWithRelationInput;
    booking?: Prisma.BookingOrderByWithRelationInput;
    customer?: Prisma.UserOrderByWithRelationInput;
    recorder?: Prisma.UserOrderByWithRelationInput;
};
export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    paymentReference?: string;
    AND?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[];
    OR?: Prisma.PaymentWhereInput[];
    NOT?: Prisma.PaymentWhereInput | Prisma.PaymentWhereInput[];
    transactionId?: Prisma.StringNullableFilter<"Payment"> | string | null;
    invoiceId?: Prisma.StringFilter<"Payment"> | string;
    bookingId?: Prisma.StringFilter<"Payment"> | string;
    customerId?: Prisma.StringFilter<"Payment"> | string;
    amount?: Prisma.IntFilter<"Payment"> | number;
    paymentMethod?: Prisma.EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeNullableFilter<"Payment"> | Date | string | null;
    recordedBy?: Prisma.StringNullableFilter<"Payment"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Payment"> | Date | string;
    invoice?: Prisma.XOR<Prisma.InvoiceScalarRelationFilter, Prisma.InvoiceWhereInput>;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
    customer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    recorder?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id" | "paymentReference">;
export type PaymentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    paymentReference?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    recordedBy?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PaymentCountOrderByAggregateInput;
    _avg?: Prisma.PaymentAvgOrderByAggregateInput;
    _max?: Prisma.PaymentMaxOrderByAggregateInput;
    _min?: Prisma.PaymentMinOrderByAggregateInput;
    _sum?: Prisma.PaymentSumOrderByAggregateInput;
};
export type PaymentScalarWhereWithAggregatesInput = {
    AND?: Prisma.PaymentScalarWhereWithAggregatesInput | Prisma.PaymentScalarWhereWithAggregatesInput[];
    OR?: Prisma.PaymentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PaymentScalarWhereWithAggregatesInput | Prisma.PaymentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Payment"> | string;
    paymentReference?: Prisma.StringWithAggregatesFilter<"Payment"> | string;
    transactionId?: Prisma.StringNullableWithAggregatesFilter<"Payment"> | string | null;
    invoiceId?: Prisma.StringWithAggregatesFilter<"Payment"> | string;
    bookingId?: Prisma.StringWithAggregatesFilter<"Payment"> | string;
    customerId?: Prisma.StringWithAggregatesFilter<"Payment"> | string;
    amount?: Prisma.IntWithAggregatesFilter<"Payment"> | number;
    paymentMethod?: Prisma.EnumPaymentMethodWithAggregatesFilter<"Payment"> | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null;
    recordedBy?: Prisma.StringNullableWithAggregatesFilter<"Payment"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Payment"> | Date | string;
};
export type PaymentCreateInput = {
    id?: string;
    paymentReference: string;
    transactionId?: string | null;
    amount: number;
    paymentMethod: $Enums.PaymentMethod;
    paymentStatus?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    invoice: Prisma.InvoiceCreateNestedOneWithoutPaymentsInput;
    booking: Prisma.BookingCreateNestedOneWithoutPaymentsInput;
    customer: Prisma.UserCreateNestedOneWithoutPaymentsAsCustomerInput;
    recorder?: Prisma.UserCreateNestedOneWithoutPaymentsRecordedInput;
};
export type PaymentUncheckedCreateInput = {
    id?: string;
    paymentReference: string;
    transactionId?: string | null;
    invoiceId: string;
    bookingId: string;
    customerId: string;
    amount: number;
    paymentMethod: $Enums.PaymentMethod;
    paymentStatus?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    recordedBy?: string | null;
    createdAt?: Date | string;
};
export type PaymentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentReference?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoice?: Prisma.InvoiceUpdateOneRequiredWithoutPaymentsNestedInput;
    booking?: Prisma.BookingUpdateOneRequiredWithoutPaymentsNestedInput;
    customer?: Prisma.UserUpdateOneRequiredWithoutPaymentsAsCustomerNestedInput;
    recorder?: Prisma.UserUpdateOneWithoutPaymentsRecordedNestedInput;
};
export type PaymentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentReference?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    invoiceId?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recordedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentCreateManyInput = {
    id?: string;
    paymentReference: string;
    transactionId?: string | null;
    invoiceId: string;
    bookingId: string;
    customerId: string;
    amount: number;
    paymentMethod: $Enums.PaymentMethod;
    paymentStatus?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    recordedBy?: string | null;
    createdAt?: Date | string;
};
export type PaymentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentReference?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentReference?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    invoiceId?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recordedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentListRelationFilter = {
    every?: Prisma.PaymentWhereInput;
    some?: Prisma.PaymentWhereInput;
    none?: Prisma.PaymentWhereInput;
};
export type PaymentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PaymentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    paymentReference?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    recordedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PaymentAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type PaymentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    paymentReference?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    recordedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PaymentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    paymentReference?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    invoiceId?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    paymentMethod?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    recordedBy?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PaymentSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type PaymentCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutCustomerInput, Prisma.PaymentUncheckedCreateWithoutCustomerInput> | Prisma.PaymentCreateWithoutCustomerInput[] | Prisma.PaymentUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutCustomerInput | Prisma.PaymentCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.PaymentCreateManyCustomerInputEnvelope;
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
};
export type PaymentCreateNestedManyWithoutRecorderInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutRecorderInput, Prisma.PaymentUncheckedCreateWithoutRecorderInput> | Prisma.PaymentCreateWithoutRecorderInput[] | Prisma.PaymentUncheckedCreateWithoutRecorderInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutRecorderInput | Prisma.PaymentCreateOrConnectWithoutRecorderInput[];
    createMany?: Prisma.PaymentCreateManyRecorderInputEnvelope;
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
};
export type PaymentUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutCustomerInput, Prisma.PaymentUncheckedCreateWithoutCustomerInput> | Prisma.PaymentCreateWithoutCustomerInput[] | Prisma.PaymentUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutCustomerInput | Prisma.PaymentCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.PaymentCreateManyCustomerInputEnvelope;
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
};
export type PaymentUncheckedCreateNestedManyWithoutRecorderInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutRecorderInput, Prisma.PaymentUncheckedCreateWithoutRecorderInput> | Prisma.PaymentCreateWithoutRecorderInput[] | Prisma.PaymentUncheckedCreateWithoutRecorderInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutRecorderInput | Prisma.PaymentCreateOrConnectWithoutRecorderInput[];
    createMany?: Prisma.PaymentCreateManyRecorderInputEnvelope;
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
};
export type PaymentUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutCustomerInput, Prisma.PaymentUncheckedCreateWithoutCustomerInput> | Prisma.PaymentCreateWithoutCustomerInput[] | Prisma.PaymentUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutCustomerInput | Prisma.PaymentCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutCustomerInput | Prisma.PaymentUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.PaymentCreateManyCustomerInputEnvelope;
    set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    update?: Prisma.PaymentUpdateWithWhereUniqueWithoutCustomerInput | Prisma.PaymentUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutCustomerInput | Prisma.PaymentUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
};
export type PaymentUpdateManyWithoutRecorderNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutRecorderInput, Prisma.PaymentUncheckedCreateWithoutRecorderInput> | Prisma.PaymentCreateWithoutRecorderInput[] | Prisma.PaymentUncheckedCreateWithoutRecorderInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutRecorderInput | Prisma.PaymentCreateOrConnectWithoutRecorderInput[];
    upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutRecorderInput | Prisma.PaymentUpsertWithWhereUniqueWithoutRecorderInput[];
    createMany?: Prisma.PaymentCreateManyRecorderInputEnvelope;
    set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    update?: Prisma.PaymentUpdateWithWhereUniqueWithoutRecorderInput | Prisma.PaymentUpdateWithWhereUniqueWithoutRecorderInput[];
    updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutRecorderInput | Prisma.PaymentUpdateManyWithWhereWithoutRecorderInput[];
    deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
};
export type PaymentUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutCustomerInput, Prisma.PaymentUncheckedCreateWithoutCustomerInput> | Prisma.PaymentCreateWithoutCustomerInput[] | Prisma.PaymentUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutCustomerInput | Prisma.PaymentCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutCustomerInput | Prisma.PaymentUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.PaymentCreateManyCustomerInputEnvelope;
    set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    update?: Prisma.PaymentUpdateWithWhereUniqueWithoutCustomerInput | Prisma.PaymentUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutCustomerInput | Prisma.PaymentUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
};
export type PaymentUncheckedUpdateManyWithoutRecorderNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutRecorderInput, Prisma.PaymentUncheckedCreateWithoutRecorderInput> | Prisma.PaymentCreateWithoutRecorderInput[] | Prisma.PaymentUncheckedCreateWithoutRecorderInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutRecorderInput | Prisma.PaymentCreateOrConnectWithoutRecorderInput[];
    upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutRecorderInput | Prisma.PaymentUpsertWithWhereUniqueWithoutRecorderInput[];
    createMany?: Prisma.PaymentCreateManyRecorderInputEnvelope;
    set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    update?: Prisma.PaymentUpdateWithWhereUniqueWithoutRecorderInput | Prisma.PaymentUpdateWithWhereUniqueWithoutRecorderInput[];
    updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutRecorderInput | Prisma.PaymentUpdateManyWithWhereWithoutRecorderInput[];
    deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
};
export type PaymentCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutBookingInput, Prisma.PaymentUncheckedCreateWithoutBookingInput> | Prisma.PaymentCreateWithoutBookingInput[] | Prisma.PaymentUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutBookingInput | Prisma.PaymentCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.PaymentCreateManyBookingInputEnvelope;
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
};
export type PaymentUncheckedCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutBookingInput, Prisma.PaymentUncheckedCreateWithoutBookingInput> | Prisma.PaymentCreateWithoutBookingInput[] | Prisma.PaymentUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutBookingInput | Prisma.PaymentCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.PaymentCreateManyBookingInputEnvelope;
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
};
export type PaymentUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutBookingInput, Prisma.PaymentUncheckedCreateWithoutBookingInput> | Prisma.PaymentCreateWithoutBookingInput[] | Prisma.PaymentUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutBookingInput | Prisma.PaymentCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutBookingInput | Prisma.PaymentUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.PaymentCreateManyBookingInputEnvelope;
    set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    update?: Prisma.PaymentUpdateWithWhereUniqueWithoutBookingInput | Prisma.PaymentUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutBookingInput | Prisma.PaymentUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
};
export type PaymentUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutBookingInput, Prisma.PaymentUncheckedCreateWithoutBookingInput> | Prisma.PaymentCreateWithoutBookingInput[] | Prisma.PaymentUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutBookingInput | Prisma.PaymentCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutBookingInput | Prisma.PaymentUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.PaymentCreateManyBookingInputEnvelope;
    set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    update?: Prisma.PaymentUpdateWithWhereUniqueWithoutBookingInput | Prisma.PaymentUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutBookingInput | Prisma.PaymentUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
};
export type PaymentCreateNestedManyWithoutInvoiceInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutInvoiceInput, Prisma.PaymentUncheckedCreateWithoutInvoiceInput> | Prisma.PaymentCreateWithoutInvoiceInput[] | Prisma.PaymentUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutInvoiceInput | Prisma.PaymentCreateOrConnectWithoutInvoiceInput[];
    createMany?: Prisma.PaymentCreateManyInvoiceInputEnvelope;
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
};
export type PaymentUncheckedCreateNestedManyWithoutInvoiceInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutInvoiceInput, Prisma.PaymentUncheckedCreateWithoutInvoiceInput> | Prisma.PaymentCreateWithoutInvoiceInput[] | Prisma.PaymentUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutInvoiceInput | Prisma.PaymentCreateOrConnectWithoutInvoiceInput[];
    createMany?: Prisma.PaymentCreateManyInvoiceInputEnvelope;
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
};
export type PaymentUpdateManyWithoutInvoiceNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutInvoiceInput, Prisma.PaymentUncheckedCreateWithoutInvoiceInput> | Prisma.PaymentCreateWithoutInvoiceInput[] | Prisma.PaymentUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutInvoiceInput | Prisma.PaymentCreateOrConnectWithoutInvoiceInput[];
    upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutInvoiceInput | Prisma.PaymentUpsertWithWhereUniqueWithoutInvoiceInput[];
    createMany?: Prisma.PaymentCreateManyInvoiceInputEnvelope;
    set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    update?: Prisma.PaymentUpdateWithWhereUniqueWithoutInvoiceInput | Prisma.PaymentUpdateWithWhereUniqueWithoutInvoiceInput[];
    updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutInvoiceInput | Prisma.PaymentUpdateManyWithWhereWithoutInvoiceInput[];
    deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
};
export type PaymentUncheckedUpdateManyWithoutInvoiceNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentCreateWithoutInvoiceInput, Prisma.PaymentUncheckedCreateWithoutInvoiceInput> | Prisma.PaymentCreateWithoutInvoiceInput[] | Prisma.PaymentUncheckedCreateWithoutInvoiceInput[];
    connectOrCreate?: Prisma.PaymentCreateOrConnectWithoutInvoiceInput | Prisma.PaymentCreateOrConnectWithoutInvoiceInput[];
    upsert?: Prisma.PaymentUpsertWithWhereUniqueWithoutInvoiceInput | Prisma.PaymentUpsertWithWhereUniqueWithoutInvoiceInput[];
    createMany?: Prisma.PaymentCreateManyInvoiceInputEnvelope;
    set?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    disconnect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    delete?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    connect?: Prisma.PaymentWhereUniqueInput | Prisma.PaymentWhereUniqueInput[];
    update?: Prisma.PaymentUpdateWithWhereUniqueWithoutInvoiceInput | Prisma.PaymentUpdateWithWhereUniqueWithoutInvoiceInput[];
    updateMany?: Prisma.PaymentUpdateManyWithWhereWithoutInvoiceInput | Prisma.PaymentUpdateManyWithWhereWithoutInvoiceInput[];
    deleteMany?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
};
export type EnumPaymentMethodFieldUpdateOperationsInput = {
    set?: $Enums.PaymentMethod;
};
export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus;
};
export type PaymentCreateWithoutCustomerInput = {
    id?: string;
    paymentReference: string;
    transactionId?: string | null;
    amount: number;
    paymentMethod: $Enums.PaymentMethod;
    paymentStatus?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    invoice: Prisma.InvoiceCreateNestedOneWithoutPaymentsInput;
    booking: Prisma.BookingCreateNestedOneWithoutPaymentsInput;
    recorder?: Prisma.UserCreateNestedOneWithoutPaymentsRecordedInput;
};
export type PaymentUncheckedCreateWithoutCustomerInput = {
    id?: string;
    paymentReference: string;
    transactionId?: string | null;
    invoiceId: string;
    bookingId: string;
    amount: number;
    paymentMethod: $Enums.PaymentMethod;
    paymentStatus?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    recordedBy?: string | null;
    createdAt?: Date | string;
};
export type PaymentCreateOrConnectWithoutCustomerInput = {
    where: Prisma.PaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutCustomerInput, Prisma.PaymentUncheckedCreateWithoutCustomerInput>;
};
export type PaymentCreateManyCustomerInputEnvelope = {
    data: Prisma.PaymentCreateManyCustomerInput | Prisma.PaymentCreateManyCustomerInput[];
    skipDuplicates?: boolean;
};
export type PaymentCreateWithoutRecorderInput = {
    id?: string;
    paymentReference: string;
    transactionId?: string | null;
    amount: number;
    paymentMethod: $Enums.PaymentMethod;
    paymentStatus?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    invoice: Prisma.InvoiceCreateNestedOneWithoutPaymentsInput;
    booking: Prisma.BookingCreateNestedOneWithoutPaymentsInput;
    customer: Prisma.UserCreateNestedOneWithoutPaymentsAsCustomerInput;
};
export type PaymentUncheckedCreateWithoutRecorderInput = {
    id?: string;
    paymentReference: string;
    transactionId?: string | null;
    invoiceId: string;
    bookingId: string;
    customerId: string;
    amount: number;
    paymentMethod: $Enums.PaymentMethod;
    paymentStatus?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PaymentCreateOrConnectWithoutRecorderInput = {
    where: Prisma.PaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutRecorderInput, Prisma.PaymentUncheckedCreateWithoutRecorderInput>;
};
export type PaymentCreateManyRecorderInputEnvelope = {
    data: Prisma.PaymentCreateManyRecorderInput | Prisma.PaymentCreateManyRecorderInput[];
    skipDuplicates?: boolean;
};
export type PaymentUpsertWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.PaymentWhereUniqueInput;
    update: Prisma.XOR<Prisma.PaymentUpdateWithoutCustomerInput, Prisma.PaymentUncheckedUpdateWithoutCustomerInput>;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutCustomerInput, Prisma.PaymentUncheckedCreateWithoutCustomerInput>;
};
export type PaymentUpdateWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.PaymentWhereUniqueInput;
    data: Prisma.XOR<Prisma.PaymentUpdateWithoutCustomerInput, Prisma.PaymentUncheckedUpdateWithoutCustomerInput>;
};
export type PaymentUpdateManyWithWhereWithoutCustomerInput = {
    where: Prisma.PaymentScalarWhereInput;
    data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyWithoutCustomerInput>;
};
export type PaymentScalarWhereInput = {
    AND?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
    OR?: Prisma.PaymentScalarWhereInput[];
    NOT?: Prisma.PaymentScalarWhereInput | Prisma.PaymentScalarWhereInput[];
    id?: Prisma.StringFilter<"Payment"> | string;
    paymentReference?: Prisma.StringFilter<"Payment"> | string;
    transactionId?: Prisma.StringNullableFilter<"Payment"> | string | null;
    invoiceId?: Prisma.StringFilter<"Payment"> | string;
    bookingId?: Prisma.StringFilter<"Payment"> | string;
    customerId?: Prisma.StringFilter<"Payment"> | string;
    amount?: Prisma.IntFilter<"Payment"> | number;
    paymentMethod?: Prisma.EnumPaymentMethodFilter<"Payment"> | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeNullableFilter<"Payment"> | Date | string | null;
    recordedBy?: Prisma.StringNullableFilter<"Payment"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Payment"> | Date | string;
};
export type PaymentUpsertWithWhereUniqueWithoutRecorderInput = {
    where: Prisma.PaymentWhereUniqueInput;
    update: Prisma.XOR<Prisma.PaymentUpdateWithoutRecorderInput, Prisma.PaymentUncheckedUpdateWithoutRecorderInput>;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutRecorderInput, Prisma.PaymentUncheckedCreateWithoutRecorderInput>;
};
export type PaymentUpdateWithWhereUniqueWithoutRecorderInput = {
    where: Prisma.PaymentWhereUniqueInput;
    data: Prisma.XOR<Prisma.PaymentUpdateWithoutRecorderInput, Prisma.PaymentUncheckedUpdateWithoutRecorderInput>;
};
export type PaymentUpdateManyWithWhereWithoutRecorderInput = {
    where: Prisma.PaymentScalarWhereInput;
    data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyWithoutRecorderInput>;
};
export type PaymentCreateWithoutBookingInput = {
    id?: string;
    paymentReference: string;
    transactionId?: string | null;
    amount: number;
    paymentMethod: $Enums.PaymentMethod;
    paymentStatus?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    invoice: Prisma.InvoiceCreateNestedOneWithoutPaymentsInput;
    customer: Prisma.UserCreateNestedOneWithoutPaymentsAsCustomerInput;
    recorder?: Prisma.UserCreateNestedOneWithoutPaymentsRecordedInput;
};
export type PaymentUncheckedCreateWithoutBookingInput = {
    id?: string;
    paymentReference: string;
    transactionId?: string | null;
    invoiceId: string;
    customerId: string;
    amount: number;
    paymentMethod: $Enums.PaymentMethod;
    paymentStatus?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    recordedBy?: string | null;
    createdAt?: Date | string;
};
export type PaymentCreateOrConnectWithoutBookingInput = {
    where: Prisma.PaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutBookingInput, Prisma.PaymentUncheckedCreateWithoutBookingInput>;
};
export type PaymentCreateManyBookingInputEnvelope = {
    data: Prisma.PaymentCreateManyBookingInput | Prisma.PaymentCreateManyBookingInput[];
    skipDuplicates?: boolean;
};
export type PaymentUpsertWithWhereUniqueWithoutBookingInput = {
    where: Prisma.PaymentWhereUniqueInput;
    update: Prisma.XOR<Prisma.PaymentUpdateWithoutBookingInput, Prisma.PaymentUncheckedUpdateWithoutBookingInput>;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutBookingInput, Prisma.PaymentUncheckedCreateWithoutBookingInput>;
};
export type PaymentUpdateWithWhereUniqueWithoutBookingInput = {
    where: Prisma.PaymentWhereUniqueInput;
    data: Prisma.XOR<Prisma.PaymentUpdateWithoutBookingInput, Prisma.PaymentUncheckedUpdateWithoutBookingInput>;
};
export type PaymentUpdateManyWithWhereWithoutBookingInput = {
    where: Prisma.PaymentScalarWhereInput;
    data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyWithoutBookingInput>;
};
export type PaymentCreateWithoutInvoiceInput = {
    id?: string;
    paymentReference: string;
    transactionId?: string | null;
    amount: number;
    paymentMethod: $Enums.PaymentMethod;
    paymentStatus?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    booking: Prisma.BookingCreateNestedOneWithoutPaymentsInput;
    customer: Prisma.UserCreateNestedOneWithoutPaymentsAsCustomerInput;
    recorder?: Prisma.UserCreateNestedOneWithoutPaymentsRecordedInput;
};
export type PaymentUncheckedCreateWithoutInvoiceInput = {
    id?: string;
    paymentReference: string;
    transactionId?: string | null;
    bookingId: string;
    customerId: string;
    amount: number;
    paymentMethod: $Enums.PaymentMethod;
    paymentStatus?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    recordedBy?: string | null;
    createdAt?: Date | string;
};
export type PaymentCreateOrConnectWithoutInvoiceInput = {
    where: Prisma.PaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutInvoiceInput, Prisma.PaymentUncheckedCreateWithoutInvoiceInput>;
};
export type PaymentCreateManyInvoiceInputEnvelope = {
    data: Prisma.PaymentCreateManyInvoiceInput | Prisma.PaymentCreateManyInvoiceInput[];
    skipDuplicates?: boolean;
};
export type PaymentUpsertWithWhereUniqueWithoutInvoiceInput = {
    where: Prisma.PaymentWhereUniqueInput;
    update: Prisma.XOR<Prisma.PaymentUpdateWithoutInvoiceInput, Prisma.PaymentUncheckedUpdateWithoutInvoiceInput>;
    create: Prisma.XOR<Prisma.PaymentCreateWithoutInvoiceInput, Prisma.PaymentUncheckedCreateWithoutInvoiceInput>;
};
export type PaymentUpdateWithWhereUniqueWithoutInvoiceInput = {
    where: Prisma.PaymentWhereUniqueInput;
    data: Prisma.XOR<Prisma.PaymentUpdateWithoutInvoiceInput, Prisma.PaymentUncheckedUpdateWithoutInvoiceInput>;
};
export type PaymentUpdateManyWithWhereWithoutInvoiceInput = {
    where: Prisma.PaymentScalarWhereInput;
    data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyWithoutInvoiceInput>;
};
export type PaymentCreateManyCustomerInput = {
    id?: string;
    paymentReference: string;
    transactionId?: string | null;
    invoiceId: string;
    bookingId: string;
    amount: number;
    paymentMethod: $Enums.PaymentMethod;
    paymentStatus?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    recordedBy?: string | null;
    createdAt?: Date | string;
};
export type PaymentCreateManyRecorderInput = {
    id?: string;
    paymentReference: string;
    transactionId?: string | null;
    invoiceId: string;
    bookingId: string;
    customerId: string;
    amount: number;
    paymentMethod: $Enums.PaymentMethod;
    paymentStatus?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
};
export type PaymentUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentReference?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoice?: Prisma.InvoiceUpdateOneRequiredWithoutPaymentsNestedInput;
    booking?: Prisma.BookingUpdateOneRequiredWithoutPaymentsNestedInput;
    recorder?: Prisma.UserUpdateOneWithoutPaymentsRecordedNestedInput;
};
export type PaymentUncheckedUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentReference?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    invoiceId?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recordedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentUncheckedUpdateManyWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentReference?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    invoiceId?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recordedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentUpdateWithoutRecorderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentReference?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoice?: Prisma.InvoiceUpdateOneRequiredWithoutPaymentsNestedInput;
    booking?: Prisma.BookingUpdateOneRequiredWithoutPaymentsNestedInput;
    customer?: Prisma.UserUpdateOneRequiredWithoutPaymentsAsCustomerNestedInput;
};
export type PaymentUncheckedUpdateWithoutRecorderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentReference?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    invoiceId?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentUncheckedUpdateManyWithoutRecorderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentReference?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    invoiceId?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentCreateManyBookingInput = {
    id?: string;
    paymentReference: string;
    transactionId?: string | null;
    invoiceId: string;
    customerId: string;
    amount: number;
    paymentMethod: $Enums.PaymentMethod;
    paymentStatus?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    recordedBy?: string | null;
    createdAt?: Date | string;
};
export type PaymentUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentReference?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    invoice?: Prisma.InvoiceUpdateOneRequiredWithoutPaymentsNestedInput;
    customer?: Prisma.UserUpdateOneRequiredWithoutPaymentsAsCustomerNestedInput;
    recorder?: Prisma.UserUpdateOneWithoutPaymentsRecordedNestedInput;
};
export type PaymentUncheckedUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentReference?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    invoiceId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recordedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentUncheckedUpdateManyWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentReference?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    invoiceId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recordedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentCreateManyInvoiceInput = {
    id?: string;
    paymentReference: string;
    transactionId?: string | null;
    bookingId: string;
    customerId: string;
    amount: number;
    paymentMethod: $Enums.PaymentMethod;
    paymentStatus?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    recordedBy?: string | null;
    createdAt?: Date | string;
};
export type PaymentUpdateWithoutInvoiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentReference?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutPaymentsNestedInput;
    customer?: Prisma.UserUpdateOneRequiredWithoutPaymentsAsCustomerNestedInput;
    recorder?: Prisma.UserUpdateOneWithoutPaymentsRecordedNestedInput;
};
export type PaymentUncheckedUpdateWithoutInvoiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentReference?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recordedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentUncheckedUpdateManyWithoutInvoiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentReference?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    paymentMethod?: Prisma.EnumPaymentMethodFieldUpdateOperationsInput | $Enums.PaymentMethod;
    paymentStatus?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    recordedBy?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    paymentReference?: boolean;
    transactionId?: boolean;
    invoiceId?: boolean;
    bookingId?: boolean;
    customerId?: boolean;
    amount?: boolean;
    paymentMethod?: boolean;
    paymentStatus?: boolean;
    paidAt?: boolean;
    recordedBy?: boolean;
    createdAt?: boolean;
    invoice?: boolean | Prisma.InvoiceDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    recorder?: boolean | Prisma.Payment$recorderArgs<ExtArgs>;
}, ExtArgs["result"]["payment"]>;
export type PaymentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    paymentReference?: boolean;
    transactionId?: boolean;
    invoiceId?: boolean;
    bookingId?: boolean;
    customerId?: boolean;
    amount?: boolean;
    paymentMethod?: boolean;
    paymentStatus?: boolean;
    paidAt?: boolean;
    recordedBy?: boolean;
    createdAt?: boolean;
    invoice?: boolean | Prisma.InvoiceDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    recorder?: boolean | Prisma.Payment$recorderArgs<ExtArgs>;
}, ExtArgs["result"]["payment"]>;
export type PaymentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    paymentReference?: boolean;
    transactionId?: boolean;
    invoiceId?: boolean;
    bookingId?: boolean;
    customerId?: boolean;
    amount?: boolean;
    paymentMethod?: boolean;
    paymentStatus?: boolean;
    paidAt?: boolean;
    recordedBy?: boolean;
    createdAt?: boolean;
    invoice?: boolean | Prisma.InvoiceDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    recorder?: boolean | Prisma.Payment$recorderArgs<ExtArgs>;
}, ExtArgs["result"]["payment"]>;
export type PaymentSelectScalar = {
    id?: boolean;
    paymentReference?: boolean;
    transactionId?: boolean;
    invoiceId?: boolean;
    bookingId?: boolean;
    customerId?: boolean;
    amount?: boolean;
    paymentMethod?: boolean;
    paymentStatus?: boolean;
    paidAt?: boolean;
    recordedBy?: boolean;
    createdAt?: boolean;
};
export type PaymentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "paymentReference" | "transactionId" | "invoiceId" | "bookingId" | "customerId" | "amount" | "paymentMethod" | "paymentStatus" | "paidAt" | "recordedBy" | "createdAt", ExtArgs["result"]["payment"]>;
export type PaymentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    invoice?: boolean | Prisma.InvoiceDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    recorder?: boolean | Prisma.Payment$recorderArgs<ExtArgs>;
};
export type PaymentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    invoice?: boolean | Prisma.InvoiceDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    recorder?: boolean | Prisma.Payment$recorderArgs<ExtArgs>;
};
export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    invoice?: boolean | Prisma.InvoiceDefaultArgs<ExtArgs>;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    recorder?: boolean | Prisma.Payment$recorderArgs<ExtArgs>;
};
export type $PaymentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Payment";
    objects: {
        invoice: Prisma.$InvoicePayload<ExtArgs>;
        booking: Prisma.$BookingPayload<ExtArgs>;
        customer: Prisma.$UserPayload<ExtArgs>;
        recorder: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        paymentReference: string;
        transactionId: string | null;
        invoiceId: string;
        bookingId: string;
        customerId: string;
        amount: number;
        paymentMethod: $Enums.PaymentMethod;
        paymentStatus: $Enums.PaymentStatus;
        paidAt: Date | null;
        recordedBy: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["payment"]>;
    composites: {};
};
export type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PaymentPayload, S>;
export type PaymentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PaymentCountAggregateInputType | true;
};
export interface PaymentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Payment'];
        meta: {
            name: 'Payment';
        };
    };
    findUnique<T extends PaymentFindUniqueArgs>(args: Prisma.SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PaymentFindFirstArgs>(args?: Prisma.SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PaymentFindManyArgs>(args?: Prisma.SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PaymentCreateArgs>(args: Prisma.SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PaymentCreateManyArgs>(args?: Prisma.SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PaymentDeleteArgs>(args: Prisma.SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PaymentUpdateArgs>(args: Prisma.SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PaymentDeleteManyArgs>(args?: Prisma.SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PaymentUpdateManyArgs>(args: Prisma.SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PaymentUpsertArgs>(args: Prisma.SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PaymentCountArgs>(args?: Prisma.Subset<T, PaymentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PaymentCountAggregateOutputType> : number>;
    aggregate<T extends PaymentAggregateArgs>(args: Prisma.Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>;
    groupBy<T extends PaymentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PaymentGroupByArgs['orderBy'];
    } : {
        orderBy?: PaymentGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PaymentFieldRefs;
}
export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    invoice<T extends Prisma.InvoiceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.InvoiceDefaultArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    booking<T extends Prisma.BookingDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BookingDefaultArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    customer<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    recorder<T extends Prisma.Payment$recorderArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Payment$recorderArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PaymentFieldRefs {
    readonly id: Prisma.FieldRef<"Payment", 'String'>;
    readonly paymentReference: Prisma.FieldRef<"Payment", 'String'>;
    readonly transactionId: Prisma.FieldRef<"Payment", 'String'>;
    readonly invoiceId: Prisma.FieldRef<"Payment", 'String'>;
    readonly bookingId: Prisma.FieldRef<"Payment", 'String'>;
    readonly customerId: Prisma.FieldRef<"Payment", 'String'>;
    readonly amount: Prisma.FieldRef<"Payment", 'Int'>;
    readonly paymentMethod: Prisma.FieldRef<"Payment", 'PaymentMethod'>;
    readonly paymentStatus: Prisma.FieldRef<"Payment", 'PaymentStatus'>;
    readonly paidAt: Prisma.FieldRef<"Payment", 'DateTime'>;
    readonly recordedBy: Prisma.FieldRef<"Payment", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Payment", 'DateTime'>;
}
export type PaymentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where: Prisma.PaymentWhereUniqueInput;
};
export type PaymentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where: Prisma.PaymentWhereUniqueInput;
};
export type PaymentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[];
    cursor?: Prisma.PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentScalarFieldEnum | Prisma.PaymentScalarFieldEnum[];
};
export type PaymentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[];
    cursor?: Prisma.PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentScalarFieldEnum | Prisma.PaymentScalarFieldEnum[];
};
export type PaymentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[];
    cursor?: Prisma.PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentScalarFieldEnum | Prisma.PaymentScalarFieldEnum[];
};
export type PaymentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentCreateInput, Prisma.PaymentUncheckedCreateInput>;
};
export type PaymentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PaymentCreateManyInput | Prisma.PaymentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PaymentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    data: Prisma.PaymentCreateManyInput | Prisma.PaymentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PaymentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PaymentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentUpdateInput, Prisma.PaymentUncheckedUpdateInput>;
    where: Prisma.PaymentWhereUniqueInput;
};
export type PaymentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyInput>;
    where?: Prisma.PaymentWhereInput;
    limit?: number;
};
export type PaymentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentUpdateManyMutationInput, Prisma.PaymentUncheckedUpdateManyInput>;
    where?: Prisma.PaymentWhereInput;
    limit?: number;
    include?: Prisma.PaymentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PaymentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where: Prisma.PaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentCreateInput, Prisma.PaymentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PaymentUpdateInput, Prisma.PaymentUncheckedUpdateInput>;
};
export type PaymentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where: Prisma.PaymentWhereUniqueInput;
};
export type PaymentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
    limit?: number;
};
export type Payment$recorderArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type PaymentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
};
