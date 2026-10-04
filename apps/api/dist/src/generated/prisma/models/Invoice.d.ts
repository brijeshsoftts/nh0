import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type InvoiceModel = runtime.Types.Result.DefaultSelection<Prisma.$InvoicePayload>;
export type AggregateInvoice = {
    _count: InvoiceCountAggregateOutputType | null;
    _avg: InvoiceAvgAggregateOutputType | null;
    _sum: InvoiceSumAggregateOutputType | null;
    _min: InvoiceMinAggregateOutputType | null;
    _max: InvoiceMaxAggregateOutputType | null;
};
export type InvoiceAvgAggregateOutputType = {
    subtotal: number | null;
    taxAmount: number | null;
    discountAmount: number | null;
    totalAmount: number | null;
};
export type InvoiceSumAggregateOutputType = {
    subtotal: number | null;
    taxAmount: number | null;
    discountAmount: number | null;
    totalAmount: number | null;
};
export type InvoiceMinAggregateOutputType = {
    id: string | null;
    invoiceNumber: string | null;
    bookingId: string | null;
    customerId: string | null;
    subtotal: number | null;
    taxAmount: number | null;
    discountAmount: number | null;
    totalAmount: number | null;
    status: $Enums.InvoiceStatus | null;
    issuedAt: Date | null;
    createdAt: Date | null;
};
export type InvoiceMaxAggregateOutputType = {
    id: string | null;
    invoiceNumber: string | null;
    bookingId: string | null;
    customerId: string | null;
    subtotal: number | null;
    taxAmount: number | null;
    discountAmount: number | null;
    totalAmount: number | null;
    status: $Enums.InvoiceStatus | null;
    issuedAt: Date | null;
    createdAt: Date | null;
};
export type InvoiceCountAggregateOutputType = {
    id: number;
    invoiceNumber: number;
    bookingId: number;
    customerId: number;
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    status: number;
    issuedAt: number;
    createdAt: number;
    _all: number;
};
export type InvoiceAvgAggregateInputType = {
    subtotal?: true;
    taxAmount?: true;
    discountAmount?: true;
    totalAmount?: true;
};
export type InvoiceSumAggregateInputType = {
    subtotal?: true;
    taxAmount?: true;
    discountAmount?: true;
    totalAmount?: true;
};
export type InvoiceMinAggregateInputType = {
    id?: true;
    invoiceNumber?: true;
    bookingId?: true;
    customerId?: true;
    subtotal?: true;
    taxAmount?: true;
    discountAmount?: true;
    totalAmount?: true;
    status?: true;
    issuedAt?: true;
    createdAt?: true;
};
export type InvoiceMaxAggregateInputType = {
    id?: true;
    invoiceNumber?: true;
    bookingId?: true;
    customerId?: true;
    subtotal?: true;
    taxAmount?: true;
    discountAmount?: true;
    totalAmount?: true;
    status?: true;
    issuedAt?: true;
    createdAt?: true;
};
export type InvoiceCountAggregateInputType = {
    id?: true;
    invoiceNumber?: true;
    bookingId?: true;
    customerId?: true;
    subtotal?: true;
    taxAmount?: true;
    discountAmount?: true;
    totalAmount?: true;
    status?: true;
    issuedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type InvoiceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput | Prisma.InvoiceOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | InvoiceCountAggregateInputType;
    _avg?: InvoiceAvgAggregateInputType;
    _sum?: InvoiceSumAggregateInputType;
    _min?: InvoiceMinAggregateInputType;
    _max?: InvoiceMaxAggregateInputType;
};
export type GetInvoiceAggregateType<T extends InvoiceAggregateArgs> = {
    [P in keyof T & keyof AggregateInvoice]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateInvoice[P]> : Prisma.GetScalarType<T[P], AggregateInvoice[P]>;
};
export type InvoiceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithAggregationInput | Prisma.InvoiceOrderByWithAggregationInput[];
    by: Prisma.InvoiceScalarFieldEnum[] | Prisma.InvoiceScalarFieldEnum;
    having?: Prisma.InvoiceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: InvoiceCountAggregateInputType | true;
    _avg?: InvoiceAvgAggregateInputType;
    _sum?: InvoiceSumAggregateInputType;
    _min?: InvoiceMinAggregateInputType;
    _max?: InvoiceMaxAggregateInputType;
};
export type InvoiceGroupByOutputType = {
    id: string;
    invoiceNumber: string;
    bookingId: string;
    customerId: string;
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    status: $Enums.InvoiceStatus;
    issuedAt: Date;
    createdAt: Date;
    _count: InvoiceCountAggregateOutputType | null;
    _avg: InvoiceAvgAggregateOutputType | null;
    _sum: InvoiceSumAggregateOutputType | null;
    _min: InvoiceMinAggregateOutputType | null;
    _max: InvoiceMaxAggregateOutputType | null;
};
export type GetInvoiceGroupByPayload<T extends InvoiceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<InvoiceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof InvoiceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], InvoiceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], InvoiceGroupByOutputType[P]>;
}>>;
export type InvoiceWhereInput = {
    AND?: Prisma.InvoiceWhereInput | Prisma.InvoiceWhereInput[];
    OR?: Prisma.InvoiceWhereInput[];
    NOT?: Prisma.InvoiceWhereInput | Prisma.InvoiceWhereInput[];
    id?: Prisma.StringFilter<"Invoice"> | string;
    invoiceNumber?: Prisma.StringFilter<"Invoice"> | string;
    bookingId?: Prisma.StringFilter<"Invoice"> | string;
    customerId?: Prisma.StringFilter<"Invoice"> | string;
    subtotal?: Prisma.IntFilter<"Invoice"> | number;
    taxAmount?: Prisma.IntFilter<"Invoice"> | number;
    discountAmount?: Prisma.IntFilter<"Invoice"> | number;
    totalAmount?: Prisma.IntFilter<"Invoice"> | number;
    status?: Prisma.EnumInvoiceStatusFilter<"Invoice"> | $Enums.InvoiceStatus;
    issuedAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
    customer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    payments?: Prisma.PaymentListRelationFilter;
};
export type InvoiceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    invoiceNumber?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    subtotal?: Prisma.SortOrder;
    taxAmount?: Prisma.SortOrder;
    discountAmount?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    issuedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    booking?: Prisma.BookingOrderByWithRelationInput;
    customer?: Prisma.UserOrderByWithRelationInput;
    payments?: Prisma.PaymentOrderByRelationAggregateInput;
};
export type InvoiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    invoiceNumber?: string;
    AND?: Prisma.InvoiceWhereInput | Prisma.InvoiceWhereInput[];
    OR?: Prisma.InvoiceWhereInput[];
    NOT?: Prisma.InvoiceWhereInput | Prisma.InvoiceWhereInput[];
    bookingId?: Prisma.StringFilter<"Invoice"> | string;
    customerId?: Prisma.StringFilter<"Invoice"> | string;
    subtotal?: Prisma.IntFilter<"Invoice"> | number;
    taxAmount?: Prisma.IntFilter<"Invoice"> | number;
    discountAmount?: Prisma.IntFilter<"Invoice"> | number;
    totalAmount?: Prisma.IntFilter<"Invoice"> | number;
    status?: Prisma.EnumInvoiceStatusFilter<"Invoice"> | $Enums.InvoiceStatus;
    issuedAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
    customer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    payments?: Prisma.PaymentListRelationFilter;
}, "id" | "invoiceNumber">;
export type InvoiceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    invoiceNumber?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    subtotal?: Prisma.SortOrder;
    taxAmount?: Prisma.SortOrder;
    discountAmount?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    issuedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.InvoiceCountOrderByAggregateInput;
    _avg?: Prisma.InvoiceAvgOrderByAggregateInput;
    _max?: Prisma.InvoiceMaxOrderByAggregateInput;
    _min?: Prisma.InvoiceMinOrderByAggregateInput;
    _sum?: Prisma.InvoiceSumOrderByAggregateInput;
};
export type InvoiceScalarWhereWithAggregatesInput = {
    AND?: Prisma.InvoiceScalarWhereWithAggregatesInput | Prisma.InvoiceScalarWhereWithAggregatesInput[];
    OR?: Prisma.InvoiceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.InvoiceScalarWhereWithAggregatesInput | Prisma.InvoiceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Invoice"> | string;
    invoiceNumber?: Prisma.StringWithAggregatesFilter<"Invoice"> | string;
    bookingId?: Prisma.StringWithAggregatesFilter<"Invoice"> | string;
    customerId?: Prisma.StringWithAggregatesFilter<"Invoice"> | string;
    subtotal?: Prisma.IntWithAggregatesFilter<"Invoice"> | number;
    taxAmount?: Prisma.IntWithAggregatesFilter<"Invoice"> | number;
    discountAmount?: Prisma.IntWithAggregatesFilter<"Invoice"> | number;
    totalAmount?: Prisma.IntWithAggregatesFilter<"Invoice"> | number;
    status?: Prisma.EnumInvoiceStatusWithAggregatesFilter<"Invoice"> | $Enums.InvoiceStatus;
    issuedAt?: Prisma.DateTimeWithAggregatesFilter<"Invoice"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Invoice"> | Date | string;
};
export type InvoiceCreateInput = {
    id?: string;
    invoiceNumber: string;
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    status?: $Enums.InvoiceStatus;
    issuedAt: Date | string;
    createdAt?: Date | string;
    booking: Prisma.BookingCreateNestedOneWithoutInvoicesInput;
    customer: Prisma.UserCreateNestedOneWithoutInvoicesInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutInvoiceInput;
};
export type InvoiceUncheckedCreateInput = {
    id?: string;
    invoiceNumber: string;
    bookingId: string;
    customerId: string;
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    status?: $Enums.InvoiceStatus;
    issuedAt: Date | string;
    createdAt?: Date | string;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutInvoiceInput;
};
export type InvoiceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    subtotal?: Prisma.IntFieldUpdateOperationsInput | number;
    taxAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    issuedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutInvoicesNestedInput;
    customer?: Prisma.UserUpdateOneRequiredWithoutInvoicesNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutInvoiceNestedInput;
};
export type InvoiceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    subtotal?: Prisma.IntFieldUpdateOperationsInput | number;
    taxAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    issuedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutInvoiceNestedInput;
};
export type InvoiceCreateManyInput = {
    id?: string;
    invoiceNumber: string;
    bookingId: string;
    customerId: string;
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    status?: $Enums.InvoiceStatus;
    issuedAt: Date | string;
    createdAt?: Date | string;
};
export type InvoiceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    subtotal?: Prisma.IntFieldUpdateOperationsInput | number;
    taxAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    issuedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    subtotal?: Prisma.IntFieldUpdateOperationsInput | number;
    taxAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    issuedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceListRelationFilter = {
    every?: Prisma.InvoiceWhereInput;
    some?: Prisma.InvoiceWhereInput;
    none?: Prisma.InvoiceWhereInput;
};
export type InvoiceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type InvoiceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    invoiceNumber?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    subtotal?: Prisma.SortOrder;
    taxAmount?: Prisma.SortOrder;
    discountAmount?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    issuedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InvoiceAvgOrderByAggregateInput = {
    subtotal?: Prisma.SortOrder;
    taxAmount?: Prisma.SortOrder;
    discountAmount?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
};
export type InvoiceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    invoiceNumber?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    subtotal?: Prisma.SortOrder;
    taxAmount?: Prisma.SortOrder;
    discountAmount?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    issuedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InvoiceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    invoiceNumber?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    customerId?: Prisma.SortOrder;
    subtotal?: Prisma.SortOrder;
    taxAmount?: Prisma.SortOrder;
    discountAmount?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    issuedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type InvoiceSumOrderByAggregateInput = {
    subtotal?: Prisma.SortOrder;
    taxAmount?: Prisma.SortOrder;
    discountAmount?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
};
export type InvoiceScalarRelationFilter = {
    is?: Prisma.InvoiceWhereInput;
    isNot?: Prisma.InvoiceWhereInput;
};
export type InvoiceCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutCustomerInput, Prisma.InvoiceUncheckedCreateWithoutCustomerInput> | Prisma.InvoiceCreateWithoutCustomerInput[] | Prisma.InvoiceUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutCustomerInput | Prisma.InvoiceCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.InvoiceCreateManyCustomerInputEnvelope;
    connect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
};
export type InvoiceUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutCustomerInput, Prisma.InvoiceUncheckedCreateWithoutCustomerInput> | Prisma.InvoiceCreateWithoutCustomerInput[] | Prisma.InvoiceUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutCustomerInput | Prisma.InvoiceCreateOrConnectWithoutCustomerInput[];
    createMany?: Prisma.InvoiceCreateManyCustomerInputEnvelope;
    connect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
};
export type InvoiceUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutCustomerInput, Prisma.InvoiceUncheckedCreateWithoutCustomerInput> | Prisma.InvoiceCreateWithoutCustomerInput[] | Prisma.InvoiceUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutCustomerInput | Prisma.InvoiceCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.InvoiceUpsertWithWhereUniqueWithoutCustomerInput | Prisma.InvoiceUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.InvoiceCreateManyCustomerInputEnvelope;
    set?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    disconnect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    delete?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    connect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    update?: Prisma.InvoiceUpdateWithWhereUniqueWithoutCustomerInput | Prisma.InvoiceUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.InvoiceUpdateManyWithWhereWithoutCustomerInput | Prisma.InvoiceUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.InvoiceScalarWhereInput | Prisma.InvoiceScalarWhereInput[];
};
export type InvoiceUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutCustomerInput, Prisma.InvoiceUncheckedCreateWithoutCustomerInput> | Prisma.InvoiceCreateWithoutCustomerInput[] | Prisma.InvoiceUncheckedCreateWithoutCustomerInput[];
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutCustomerInput | Prisma.InvoiceCreateOrConnectWithoutCustomerInput[];
    upsert?: Prisma.InvoiceUpsertWithWhereUniqueWithoutCustomerInput | Prisma.InvoiceUpsertWithWhereUniqueWithoutCustomerInput[];
    createMany?: Prisma.InvoiceCreateManyCustomerInputEnvelope;
    set?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    disconnect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    delete?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    connect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    update?: Prisma.InvoiceUpdateWithWhereUniqueWithoutCustomerInput | Prisma.InvoiceUpdateWithWhereUniqueWithoutCustomerInput[];
    updateMany?: Prisma.InvoiceUpdateManyWithWhereWithoutCustomerInput | Prisma.InvoiceUpdateManyWithWhereWithoutCustomerInput[];
    deleteMany?: Prisma.InvoiceScalarWhereInput | Prisma.InvoiceScalarWhereInput[];
};
export type InvoiceCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutBookingInput, Prisma.InvoiceUncheckedCreateWithoutBookingInput> | Prisma.InvoiceCreateWithoutBookingInput[] | Prisma.InvoiceUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutBookingInput | Prisma.InvoiceCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.InvoiceCreateManyBookingInputEnvelope;
    connect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
};
export type InvoiceUncheckedCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutBookingInput, Prisma.InvoiceUncheckedCreateWithoutBookingInput> | Prisma.InvoiceCreateWithoutBookingInput[] | Prisma.InvoiceUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutBookingInput | Prisma.InvoiceCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.InvoiceCreateManyBookingInputEnvelope;
    connect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
};
export type InvoiceUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutBookingInput, Prisma.InvoiceUncheckedCreateWithoutBookingInput> | Prisma.InvoiceCreateWithoutBookingInput[] | Prisma.InvoiceUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutBookingInput | Prisma.InvoiceCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.InvoiceUpsertWithWhereUniqueWithoutBookingInput | Prisma.InvoiceUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.InvoiceCreateManyBookingInputEnvelope;
    set?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    disconnect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    delete?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    connect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    update?: Prisma.InvoiceUpdateWithWhereUniqueWithoutBookingInput | Prisma.InvoiceUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.InvoiceUpdateManyWithWhereWithoutBookingInput | Prisma.InvoiceUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.InvoiceScalarWhereInput | Prisma.InvoiceScalarWhereInput[];
};
export type InvoiceUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutBookingInput, Prisma.InvoiceUncheckedCreateWithoutBookingInput> | Prisma.InvoiceCreateWithoutBookingInput[] | Prisma.InvoiceUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutBookingInput | Prisma.InvoiceCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.InvoiceUpsertWithWhereUniqueWithoutBookingInput | Prisma.InvoiceUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.InvoiceCreateManyBookingInputEnvelope;
    set?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    disconnect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    delete?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    connect?: Prisma.InvoiceWhereUniqueInput | Prisma.InvoiceWhereUniqueInput[];
    update?: Prisma.InvoiceUpdateWithWhereUniqueWithoutBookingInput | Prisma.InvoiceUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.InvoiceUpdateManyWithWhereWithoutBookingInput | Prisma.InvoiceUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.InvoiceScalarWhereInput | Prisma.InvoiceScalarWhereInput[];
};
export type EnumInvoiceStatusFieldUpdateOperationsInput = {
    set?: $Enums.InvoiceStatus;
};
export type InvoiceCreateNestedOneWithoutPaymentsInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutPaymentsInput, Prisma.InvoiceUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutPaymentsInput;
    connect?: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: Prisma.XOR<Prisma.InvoiceCreateWithoutPaymentsInput, Prisma.InvoiceUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.InvoiceCreateOrConnectWithoutPaymentsInput;
    upsert?: Prisma.InvoiceUpsertWithoutPaymentsInput;
    connect?: Prisma.InvoiceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.InvoiceUpdateToOneWithWhereWithoutPaymentsInput, Prisma.InvoiceUpdateWithoutPaymentsInput>, Prisma.InvoiceUncheckedUpdateWithoutPaymentsInput>;
};
export type InvoiceCreateWithoutCustomerInput = {
    id?: string;
    invoiceNumber: string;
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    status?: $Enums.InvoiceStatus;
    issuedAt: Date | string;
    createdAt?: Date | string;
    booking: Prisma.BookingCreateNestedOneWithoutInvoicesInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutInvoiceInput;
};
export type InvoiceUncheckedCreateWithoutCustomerInput = {
    id?: string;
    invoiceNumber: string;
    bookingId: string;
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    status?: $Enums.InvoiceStatus;
    issuedAt: Date | string;
    createdAt?: Date | string;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutInvoiceInput;
};
export type InvoiceCreateOrConnectWithoutCustomerInput = {
    where: Prisma.InvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvoiceCreateWithoutCustomerInput, Prisma.InvoiceUncheckedCreateWithoutCustomerInput>;
};
export type InvoiceCreateManyCustomerInputEnvelope = {
    data: Prisma.InvoiceCreateManyCustomerInput | Prisma.InvoiceCreateManyCustomerInput[];
    skipDuplicates?: boolean;
};
export type InvoiceUpsertWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.InvoiceWhereUniqueInput;
    update: Prisma.XOR<Prisma.InvoiceUpdateWithoutCustomerInput, Prisma.InvoiceUncheckedUpdateWithoutCustomerInput>;
    create: Prisma.XOR<Prisma.InvoiceCreateWithoutCustomerInput, Prisma.InvoiceUncheckedCreateWithoutCustomerInput>;
};
export type InvoiceUpdateWithWhereUniqueWithoutCustomerInput = {
    where: Prisma.InvoiceWhereUniqueInput;
    data: Prisma.XOR<Prisma.InvoiceUpdateWithoutCustomerInput, Prisma.InvoiceUncheckedUpdateWithoutCustomerInput>;
};
export type InvoiceUpdateManyWithWhereWithoutCustomerInput = {
    where: Prisma.InvoiceScalarWhereInput;
    data: Prisma.XOR<Prisma.InvoiceUpdateManyMutationInput, Prisma.InvoiceUncheckedUpdateManyWithoutCustomerInput>;
};
export type InvoiceScalarWhereInput = {
    AND?: Prisma.InvoiceScalarWhereInput | Prisma.InvoiceScalarWhereInput[];
    OR?: Prisma.InvoiceScalarWhereInput[];
    NOT?: Prisma.InvoiceScalarWhereInput | Prisma.InvoiceScalarWhereInput[];
    id?: Prisma.StringFilter<"Invoice"> | string;
    invoiceNumber?: Prisma.StringFilter<"Invoice"> | string;
    bookingId?: Prisma.StringFilter<"Invoice"> | string;
    customerId?: Prisma.StringFilter<"Invoice"> | string;
    subtotal?: Prisma.IntFilter<"Invoice"> | number;
    taxAmount?: Prisma.IntFilter<"Invoice"> | number;
    discountAmount?: Prisma.IntFilter<"Invoice"> | number;
    totalAmount?: Prisma.IntFilter<"Invoice"> | number;
    status?: Prisma.EnumInvoiceStatusFilter<"Invoice"> | $Enums.InvoiceStatus;
    issuedAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"Invoice"> | Date | string;
};
export type InvoiceCreateWithoutBookingInput = {
    id?: string;
    invoiceNumber: string;
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    status?: $Enums.InvoiceStatus;
    issuedAt: Date | string;
    createdAt?: Date | string;
    customer: Prisma.UserCreateNestedOneWithoutInvoicesInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutInvoiceInput;
};
export type InvoiceUncheckedCreateWithoutBookingInput = {
    id?: string;
    invoiceNumber: string;
    customerId: string;
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    status?: $Enums.InvoiceStatus;
    issuedAt: Date | string;
    createdAt?: Date | string;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutInvoiceInput;
};
export type InvoiceCreateOrConnectWithoutBookingInput = {
    where: Prisma.InvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvoiceCreateWithoutBookingInput, Prisma.InvoiceUncheckedCreateWithoutBookingInput>;
};
export type InvoiceCreateManyBookingInputEnvelope = {
    data: Prisma.InvoiceCreateManyBookingInput | Prisma.InvoiceCreateManyBookingInput[];
    skipDuplicates?: boolean;
};
export type InvoiceUpsertWithWhereUniqueWithoutBookingInput = {
    where: Prisma.InvoiceWhereUniqueInput;
    update: Prisma.XOR<Prisma.InvoiceUpdateWithoutBookingInput, Prisma.InvoiceUncheckedUpdateWithoutBookingInput>;
    create: Prisma.XOR<Prisma.InvoiceCreateWithoutBookingInput, Prisma.InvoiceUncheckedCreateWithoutBookingInput>;
};
export type InvoiceUpdateWithWhereUniqueWithoutBookingInput = {
    where: Prisma.InvoiceWhereUniqueInput;
    data: Prisma.XOR<Prisma.InvoiceUpdateWithoutBookingInput, Prisma.InvoiceUncheckedUpdateWithoutBookingInput>;
};
export type InvoiceUpdateManyWithWhereWithoutBookingInput = {
    where: Prisma.InvoiceScalarWhereInput;
    data: Prisma.XOR<Prisma.InvoiceUpdateManyMutationInput, Prisma.InvoiceUncheckedUpdateManyWithoutBookingInput>;
};
export type InvoiceCreateWithoutPaymentsInput = {
    id?: string;
    invoiceNumber: string;
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    status?: $Enums.InvoiceStatus;
    issuedAt: Date | string;
    createdAt?: Date | string;
    booking: Prisma.BookingCreateNestedOneWithoutInvoicesInput;
    customer: Prisma.UserCreateNestedOneWithoutInvoicesInput;
};
export type InvoiceUncheckedCreateWithoutPaymentsInput = {
    id?: string;
    invoiceNumber: string;
    bookingId: string;
    customerId: string;
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    status?: $Enums.InvoiceStatus;
    issuedAt: Date | string;
    createdAt?: Date | string;
};
export type InvoiceCreateOrConnectWithoutPaymentsInput = {
    where: Prisma.InvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvoiceCreateWithoutPaymentsInput, Prisma.InvoiceUncheckedCreateWithoutPaymentsInput>;
};
export type InvoiceUpsertWithoutPaymentsInput = {
    update: Prisma.XOR<Prisma.InvoiceUpdateWithoutPaymentsInput, Prisma.InvoiceUncheckedUpdateWithoutPaymentsInput>;
    create: Prisma.XOR<Prisma.InvoiceCreateWithoutPaymentsInput, Prisma.InvoiceUncheckedCreateWithoutPaymentsInput>;
    where?: Prisma.InvoiceWhereInput;
};
export type InvoiceUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: Prisma.InvoiceWhereInput;
    data: Prisma.XOR<Prisma.InvoiceUpdateWithoutPaymentsInput, Prisma.InvoiceUncheckedUpdateWithoutPaymentsInput>;
};
export type InvoiceUpdateWithoutPaymentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    subtotal?: Prisma.IntFieldUpdateOperationsInput | number;
    taxAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    issuedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutInvoicesNestedInput;
    customer?: Prisma.UserUpdateOneRequiredWithoutInvoicesNestedInput;
};
export type InvoiceUncheckedUpdateWithoutPaymentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    subtotal?: Prisma.IntFieldUpdateOperationsInput | number;
    taxAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    issuedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceCreateManyCustomerInput = {
    id?: string;
    invoiceNumber: string;
    bookingId: string;
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    status?: $Enums.InvoiceStatus;
    issuedAt: Date | string;
    createdAt?: Date | string;
};
export type InvoiceUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    subtotal?: Prisma.IntFieldUpdateOperationsInput | number;
    taxAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    issuedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutInvoicesNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutInvoiceNestedInput;
};
export type InvoiceUncheckedUpdateWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    subtotal?: Prisma.IntFieldUpdateOperationsInput | number;
    taxAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    issuedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutInvoiceNestedInput;
};
export type InvoiceUncheckedUpdateManyWithoutCustomerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    subtotal?: Prisma.IntFieldUpdateOperationsInput | number;
    taxAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    issuedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceCreateManyBookingInput = {
    id?: string;
    invoiceNumber: string;
    customerId: string;
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    status?: $Enums.InvoiceStatus;
    issuedAt: Date | string;
    createdAt?: Date | string;
};
export type InvoiceUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    subtotal?: Prisma.IntFieldUpdateOperationsInput | number;
    taxAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    issuedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    customer?: Prisma.UserUpdateOneRequiredWithoutInvoicesNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutInvoiceNestedInput;
};
export type InvoiceUncheckedUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    subtotal?: Prisma.IntFieldUpdateOperationsInput | number;
    taxAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    issuedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutInvoiceNestedInput;
};
export type InvoiceUncheckedUpdateManyWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    invoiceNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    customerId?: Prisma.StringFieldUpdateOperationsInput | string;
    subtotal?: Prisma.IntFieldUpdateOperationsInput | number;
    taxAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    totalAmount?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumInvoiceStatusFieldUpdateOperationsInput | $Enums.InvoiceStatus;
    issuedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type InvoiceCountOutputType = {
    payments: number;
};
export type InvoiceCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    payments?: boolean | InvoiceCountOutputTypeCountPaymentsArgs;
};
export type InvoiceCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceCountOutputTypeSelect<ExtArgs> | null;
};
export type InvoiceCountOutputTypeCountPaymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
};
export type InvoiceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    invoiceNumber?: boolean;
    bookingId?: boolean;
    customerId?: boolean;
    subtotal?: boolean;
    taxAmount?: boolean;
    discountAmount?: boolean;
    totalAmount?: boolean;
    status?: boolean;
    issuedAt?: boolean;
    createdAt?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    payments?: boolean | Prisma.Invoice$paymentsArgs<ExtArgs>;
    _count?: boolean | Prisma.InvoiceCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["invoice"]>;
export type InvoiceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    invoiceNumber?: boolean;
    bookingId?: boolean;
    customerId?: boolean;
    subtotal?: boolean;
    taxAmount?: boolean;
    discountAmount?: boolean;
    totalAmount?: boolean;
    status?: boolean;
    issuedAt?: boolean;
    createdAt?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["invoice"]>;
export type InvoiceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    invoiceNumber?: boolean;
    bookingId?: boolean;
    customerId?: boolean;
    subtotal?: boolean;
    taxAmount?: boolean;
    discountAmount?: boolean;
    totalAmount?: boolean;
    status?: boolean;
    issuedAt?: boolean;
    createdAt?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["invoice"]>;
export type InvoiceSelectScalar = {
    id?: boolean;
    invoiceNumber?: boolean;
    bookingId?: boolean;
    customerId?: boolean;
    subtotal?: boolean;
    taxAmount?: boolean;
    discountAmount?: boolean;
    totalAmount?: boolean;
    status?: boolean;
    issuedAt?: boolean;
    createdAt?: boolean;
};
export type InvoiceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "invoiceNumber" | "bookingId" | "customerId" | "subtotal" | "taxAmount" | "discountAmount" | "totalAmount" | "status" | "issuedAt" | "createdAt", ExtArgs["result"]["invoice"]>;
export type InvoiceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    payments?: boolean | Prisma.Invoice$paymentsArgs<ExtArgs>;
    _count?: boolean | Prisma.InvoiceCountOutputTypeDefaultArgs<ExtArgs>;
};
export type InvoiceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type InvoiceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    customer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $InvoicePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Invoice";
    objects: {
        booking: Prisma.$BookingPayload<ExtArgs>;
        customer: Prisma.$UserPayload<ExtArgs>;
        payments: Prisma.$PaymentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        invoiceNumber: string;
        bookingId: string;
        customerId: string;
        subtotal: number;
        taxAmount: number;
        discountAmount: number;
        totalAmount: number;
        status: $Enums.InvoiceStatus;
        issuedAt: Date;
        createdAt: Date;
    }, ExtArgs["result"]["invoice"]>;
    composites: {};
};
export type InvoiceGetPayload<S extends boolean | null | undefined | InvoiceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$InvoicePayload, S>;
export type InvoiceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<InvoiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: InvoiceCountAggregateInputType | true;
};
export interface InvoiceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Invoice'];
        meta: {
            name: 'Invoice';
        };
    };
    findUnique<T extends InvoiceFindUniqueArgs>(args: Prisma.SelectSubset<T, InvoiceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends InvoiceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, InvoiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends InvoiceFindFirstArgs>(args?: Prisma.SelectSubset<T, InvoiceFindFirstArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends InvoiceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, InvoiceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends InvoiceFindManyArgs>(args?: Prisma.SelectSubset<T, InvoiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends InvoiceCreateArgs>(args: Prisma.SelectSubset<T, InvoiceCreateArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends InvoiceCreateManyArgs>(args?: Prisma.SelectSubset<T, InvoiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends InvoiceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, InvoiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends InvoiceDeleteArgs>(args: Prisma.SelectSubset<T, InvoiceDeleteArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends InvoiceUpdateArgs>(args: Prisma.SelectSubset<T, InvoiceUpdateArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends InvoiceDeleteManyArgs>(args?: Prisma.SelectSubset<T, InvoiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends InvoiceUpdateManyArgs>(args: Prisma.SelectSubset<T, InvoiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends InvoiceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, InvoiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends InvoiceUpsertArgs>(args: Prisma.SelectSubset<T, InvoiceUpsertArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends InvoiceCountArgs>(args?: Prisma.Subset<T, InvoiceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], InvoiceCountAggregateOutputType> : number>;
    aggregate<T extends InvoiceAggregateArgs>(args: Prisma.Subset<T, InvoiceAggregateArgs>): Prisma.PrismaPromise<GetInvoiceAggregateType<T>>;
    groupBy<T extends InvoiceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: InvoiceGroupByArgs['orderBy'];
    } : {
        orderBy?: InvoiceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, InvoiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInvoiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: InvoiceFieldRefs;
}
export interface Prisma__InvoiceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    booking<T extends Prisma.BookingDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BookingDefaultArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    customer<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    payments<T extends Prisma.Invoice$paymentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Invoice$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface InvoiceFieldRefs {
    readonly id: Prisma.FieldRef<"Invoice", 'String'>;
    readonly invoiceNumber: Prisma.FieldRef<"Invoice", 'String'>;
    readonly bookingId: Prisma.FieldRef<"Invoice", 'String'>;
    readonly customerId: Prisma.FieldRef<"Invoice", 'String'>;
    readonly subtotal: Prisma.FieldRef<"Invoice", 'Int'>;
    readonly taxAmount: Prisma.FieldRef<"Invoice", 'Int'>;
    readonly discountAmount: Prisma.FieldRef<"Invoice", 'Int'>;
    readonly totalAmount: Prisma.FieldRef<"Invoice", 'Int'>;
    readonly status: Prisma.FieldRef<"Invoice", 'InvoiceStatus'>;
    readonly issuedAt: Prisma.FieldRef<"Invoice", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Invoice", 'DateTime'>;
}
export type InvoiceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput | Prisma.InvoiceOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InvoiceScalarFieldEnum | Prisma.InvoiceScalarFieldEnum[];
};
export type InvoiceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput | Prisma.InvoiceOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InvoiceScalarFieldEnum | Prisma.InvoiceScalarFieldEnum[];
};
export type InvoiceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput | Prisma.InvoiceOrderByWithRelationInput[];
    cursor?: Prisma.InvoiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InvoiceScalarFieldEnum | Prisma.InvoiceScalarFieldEnum[];
};
export type InvoiceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvoiceCreateInput, Prisma.InvoiceUncheckedCreateInput>;
};
export type InvoiceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.InvoiceCreateManyInput | Prisma.InvoiceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type InvoiceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    data: Prisma.InvoiceCreateManyInput | Prisma.InvoiceCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.InvoiceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type InvoiceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvoiceUpdateInput, Prisma.InvoiceUncheckedUpdateInput>;
    where: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.InvoiceUpdateManyMutationInput, Prisma.InvoiceUncheckedUpdateManyInput>;
    where?: Prisma.InvoiceWhereInput;
    limit?: number;
};
export type InvoiceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.InvoiceUpdateManyMutationInput, Prisma.InvoiceUncheckedUpdateManyInput>;
    where?: Prisma.InvoiceWhereInput;
    limit?: number;
    include?: Prisma.InvoiceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type InvoiceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where: Prisma.InvoiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.InvoiceCreateInput, Prisma.InvoiceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.InvoiceUpdateInput, Prisma.InvoiceUncheckedUpdateInput>;
};
export type InvoiceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where: Prisma.InvoiceWhereUniqueInput;
};
export type InvoiceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InvoiceWhereInput;
    limit?: number;
};
export type Invoice$paymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type InvoiceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
};
