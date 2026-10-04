import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CustomerModel = runtime.Types.Result.DefaultSelection<Prisma.$CustomerPayload>;
export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null;
    _min: CustomerMinAggregateOutputType | null;
    _max: CustomerMaxAggregateOutputType | null;
};
export type CustomerMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    idProofNumber: string | null;
    idProofImageId: string | null;
    signatureImageId: string | null;
    address: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CustomerMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    idProofNumber: string | null;
    idProofImageId: string | null;
    signatureImageId: string | null;
    address: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CustomerCountAggregateOutputType = {
    id: number;
    userId: number;
    idProofNumber: number;
    idProofImageId: number;
    signatureImageId: number;
    address: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CustomerMinAggregateInputType = {
    id?: true;
    userId?: true;
    idProofNumber?: true;
    idProofImageId?: true;
    signatureImageId?: true;
    address?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CustomerMaxAggregateInputType = {
    id?: true;
    userId?: true;
    idProofNumber?: true;
    idProofImageId?: true;
    signatureImageId?: true;
    address?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CustomerCountAggregateInputType = {
    id?: true;
    userId?: true;
    idProofNumber?: true;
    idProofImageId?: true;
    signatureImageId?: true;
    address?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CustomerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput | Prisma.CustomerOrderByWithRelationInput[];
    cursor?: Prisma.CustomerWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CustomerCountAggregateInputType;
    _min?: CustomerMinAggregateInputType;
    _max?: CustomerMaxAggregateInputType;
};
export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
    [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCustomer[P]> : Prisma.GetScalarType<T[P], AggregateCustomer[P]>;
};
export type CustomerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithAggregationInput | Prisma.CustomerOrderByWithAggregationInput[];
    by: Prisma.CustomerScalarFieldEnum[] | Prisma.CustomerScalarFieldEnum;
    having?: Prisma.CustomerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CustomerCountAggregateInputType | true;
    _min?: CustomerMinAggregateInputType;
    _max?: CustomerMaxAggregateInputType;
};
export type CustomerGroupByOutputType = {
    id: string;
    userId: string;
    idProofNumber: string;
    idProofImageId: string | null;
    signatureImageId: string | null;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    _count: CustomerCountAggregateOutputType | null;
    _min: CustomerMinAggregateOutputType | null;
    _max: CustomerMaxAggregateOutputType | null;
};
export type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CustomerGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CustomerGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CustomerGroupByOutputType[P]>;
}>>;
export type CustomerWhereInput = {
    AND?: Prisma.CustomerWhereInput | Prisma.CustomerWhereInput[];
    OR?: Prisma.CustomerWhereInput[];
    NOT?: Prisma.CustomerWhereInput | Prisma.CustomerWhereInput[];
    id?: Prisma.StringFilter<"Customer"> | string;
    userId?: Prisma.StringFilter<"Customer"> | string;
    idProofNumber?: Prisma.StringFilter<"Customer"> | string;
    idProofImageId?: Prisma.StringNullableFilter<"Customer"> | string | null;
    signatureImageId?: Prisma.StringNullableFilter<"Customer"> | string | null;
    address?: Prisma.StringFilter<"Customer"> | string;
    createdAt?: Prisma.DateTimeFilter<"Customer"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Customer"> | Date | string;
    signatureImage?: Prisma.XOR<Prisma.ImageNullableScalarRelationFilter, Prisma.ImageWhereInput> | null;
    idProofImage?: Prisma.XOR<Prisma.ImageNullableScalarRelationFilter, Prisma.ImageWhereInput> | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type CustomerOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    idProofNumber?: Prisma.SortOrder;
    idProofImageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    signatureImageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    signatureImage?: Prisma.ImageOrderByWithRelationInput;
    idProofImage?: Prisma.ImageOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.CustomerWhereInput | Prisma.CustomerWhereInput[];
    OR?: Prisma.CustomerWhereInput[];
    NOT?: Prisma.CustomerWhereInput | Prisma.CustomerWhereInput[];
    idProofNumber?: Prisma.StringFilter<"Customer"> | string;
    idProofImageId?: Prisma.StringNullableFilter<"Customer"> | string | null;
    signatureImageId?: Prisma.StringNullableFilter<"Customer"> | string | null;
    address?: Prisma.StringFilter<"Customer"> | string;
    createdAt?: Prisma.DateTimeFilter<"Customer"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Customer"> | Date | string;
    signatureImage?: Prisma.XOR<Prisma.ImageNullableScalarRelationFilter, Prisma.ImageWhereInput> | null;
    idProofImage?: Prisma.XOR<Prisma.ImageNullableScalarRelationFilter, Prisma.ImageWhereInput> | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type CustomerOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    idProofNumber?: Prisma.SortOrder;
    idProofImageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    signatureImageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CustomerCountOrderByAggregateInput;
    _max?: Prisma.CustomerMaxOrderByAggregateInput;
    _min?: Prisma.CustomerMinOrderByAggregateInput;
};
export type CustomerScalarWhereWithAggregatesInput = {
    AND?: Prisma.CustomerScalarWhereWithAggregatesInput | Prisma.CustomerScalarWhereWithAggregatesInput[];
    OR?: Prisma.CustomerScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CustomerScalarWhereWithAggregatesInput | Prisma.CustomerScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Customer"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Customer"> | string;
    idProofNumber?: Prisma.StringWithAggregatesFilter<"Customer"> | string;
    idProofImageId?: Prisma.StringNullableWithAggregatesFilter<"Customer"> | string | null;
    signatureImageId?: Prisma.StringNullableWithAggregatesFilter<"Customer"> | string | null;
    address?: Prisma.StringWithAggregatesFilter<"Customer"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Customer"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Customer"> | Date | string;
};
export type CustomerCreateInput = {
    id?: string;
    idProofNumber: string;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    signatureImage?: Prisma.ImageCreateNestedOneWithoutCustomerSignaturesInput;
    idProofImage?: Prisma.ImageCreateNestedOneWithoutCustomerIdProofsInput;
    user: Prisma.UserCreateNestedOneWithoutCustomerProfileInput;
};
export type CustomerUncheckedCreateInput = {
    id?: string;
    userId: string;
    idProofNumber: string;
    idProofImageId?: string | null;
    signatureImageId?: string | null;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CustomerUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    signatureImage?: Prisma.ImageUpdateOneWithoutCustomerSignaturesNestedInput;
    idProofImage?: Prisma.ImageUpdateOneWithoutCustomerIdProofsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutCustomerProfileNestedInput;
};
export type CustomerUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    signatureImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CustomerCreateManyInput = {
    id?: string;
    userId: string;
    idProofNumber: string;
    idProofImageId?: string | null;
    signatureImageId?: string | null;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CustomerUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CustomerUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    signatureImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CustomerNullableScalarRelationFilter = {
    is?: Prisma.CustomerWhereInput | null;
    isNot?: Prisma.CustomerWhereInput | null;
};
export type CustomerCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    idProofNumber?: Prisma.SortOrder;
    idProofImageId?: Prisma.SortOrder;
    signatureImageId?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CustomerMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    idProofNumber?: Prisma.SortOrder;
    idProofImageId?: Prisma.SortOrder;
    signatureImageId?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CustomerMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    idProofNumber?: Prisma.SortOrder;
    idProofImageId?: Prisma.SortOrder;
    signatureImageId?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CustomerListRelationFilter = {
    every?: Prisma.CustomerWhereInput;
    some?: Prisma.CustomerWhereInput;
    none?: Prisma.CustomerWhereInput;
};
export type CustomerOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CustomerCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CustomerCreateWithoutUserInput, Prisma.CustomerUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.CustomerCreateOrConnectWithoutUserInput;
    connect?: Prisma.CustomerWhereUniqueInput;
};
export type CustomerUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.CustomerCreateWithoutUserInput, Prisma.CustomerUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.CustomerCreateOrConnectWithoutUserInput;
    connect?: Prisma.CustomerWhereUniqueInput;
};
export type CustomerUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CustomerCreateWithoutUserInput, Prisma.CustomerUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.CustomerCreateOrConnectWithoutUserInput;
    upsert?: Prisma.CustomerUpsertWithoutUserInput;
    disconnect?: Prisma.CustomerWhereInput | boolean;
    delete?: Prisma.CustomerWhereInput | boolean;
    connect?: Prisma.CustomerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CustomerUpdateToOneWithWhereWithoutUserInput, Prisma.CustomerUpdateWithoutUserInput>, Prisma.CustomerUncheckedUpdateWithoutUserInput>;
};
export type CustomerUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.CustomerCreateWithoutUserInput, Prisma.CustomerUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.CustomerCreateOrConnectWithoutUserInput;
    upsert?: Prisma.CustomerUpsertWithoutUserInput;
    disconnect?: Prisma.CustomerWhereInput | boolean;
    delete?: Prisma.CustomerWhereInput | boolean;
    connect?: Prisma.CustomerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CustomerUpdateToOneWithWhereWithoutUserInput, Prisma.CustomerUpdateWithoutUserInput>, Prisma.CustomerUncheckedUpdateWithoutUserInput>;
};
export type CustomerCreateNestedManyWithoutIdProofImageInput = {
    create?: Prisma.XOR<Prisma.CustomerCreateWithoutIdProofImageInput, Prisma.CustomerUncheckedCreateWithoutIdProofImageInput> | Prisma.CustomerCreateWithoutIdProofImageInput[] | Prisma.CustomerUncheckedCreateWithoutIdProofImageInput[];
    connectOrCreate?: Prisma.CustomerCreateOrConnectWithoutIdProofImageInput | Prisma.CustomerCreateOrConnectWithoutIdProofImageInput[];
    createMany?: Prisma.CustomerCreateManyIdProofImageInputEnvelope;
    connect?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
};
export type CustomerCreateNestedManyWithoutSignatureImageInput = {
    create?: Prisma.XOR<Prisma.CustomerCreateWithoutSignatureImageInput, Prisma.CustomerUncheckedCreateWithoutSignatureImageInput> | Prisma.CustomerCreateWithoutSignatureImageInput[] | Prisma.CustomerUncheckedCreateWithoutSignatureImageInput[];
    connectOrCreate?: Prisma.CustomerCreateOrConnectWithoutSignatureImageInput | Prisma.CustomerCreateOrConnectWithoutSignatureImageInput[];
    createMany?: Prisma.CustomerCreateManySignatureImageInputEnvelope;
    connect?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
};
export type CustomerUncheckedCreateNestedManyWithoutIdProofImageInput = {
    create?: Prisma.XOR<Prisma.CustomerCreateWithoutIdProofImageInput, Prisma.CustomerUncheckedCreateWithoutIdProofImageInput> | Prisma.CustomerCreateWithoutIdProofImageInput[] | Prisma.CustomerUncheckedCreateWithoutIdProofImageInput[];
    connectOrCreate?: Prisma.CustomerCreateOrConnectWithoutIdProofImageInput | Prisma.CustomerCreateOrConnectWithoutIdProofImageInput[];
    createMany?: Prisma.CustomerCreateManyIdProofImageInputEnvelope;
    connect?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
};
export type CustomerUncheckedCreateNestedManyWithoutSignatureImageInput = {
    create?: Prisma.XOR<Prisma.CustomerCreateWithoutSignatureImageInput, Prisma.CustomerUncheckedCreateWithoutSignatureImageInput> | Prisma.CustomerCreateWithoutSignatureImageInput[] | Prisma.CustomerUncheckedCreateWithoutSignatureImageInput[];
    connectOrCreate?: Prisma.CustomerCreateOrConnectWithoutSignatureImageInput | Prisma.CustomerCreateOrConnectWithoutSignatureImageInput[];
    createMany?: Prisma.CustomerCreateManySignatureImageInputEnvelope;
    connect?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
};
export type CustomerUpdateManyWithoutIdProofImageNestedInput = {
    create?: Prisma.XOR<Prisma.CustomerCreateWithoutIdProofImageInput, Prisma.CustomerUncheckedCreateWithoutIdProofImageInput> | Prisma.CustomerCreateWithoutIdProofImageInput[] | Prisma.CustomerUncheckedCreateWithoutIdProofImageInput[];
    connectOrCreate?: Prisma.CustomerCreateOrConnectWithoutIdProofImageInput | Prisma.CustomerCreateOrConnectWithoutIdProofImageInput[];
    upsert?: Prisma.CustomerUpsertWithWhereUniqueWithoutIdProofImageInput | Prisma.CustomerUpsertWithWhereUniqueWithoutIdProofImageInput[];
    createMany?: Prisma.CustomerCreateManyIdProofImageInputEnvelope;
    set?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
    disconnect?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
    delete?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
    connect?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
    update?: Prisma.CustomerUpdateWithWhereUniqueWithoutIdProofImageInput | Prisma.CustomerUpdateWithWhereUniqueWithoutIdProofImageInput[];
    updateMany?: Prisma.CustomerUpdateManyWithWhereWithoutIdProofImageInput | Prisma.CustomerUpdateManyWithWhereWithoutIdProofImageInput[];
    deleteMany?: Prisma.CustomerScalarWhereInput | Prisma.CustomerScalarWhereInput[];
};
export type CustomerUpdateManyWithoutSignatureImageNestedInput = {
    create?: Prisma.XOR<Prisma.CustomerCreateWithoutSignatureImageInput, Prisma.CustomerUncheckedCreateWithoutSignatureImageInput> | Prisma.CustomerCreateWithoutSignatureImageInput[] | Prisma.CustomerUncheckedCreateWithoutSignatureImageInput[];
    connectOrCreate?: Prisma.CustomerCreateOrConnectWithoutSignatureImageInput | Prisma.CustomerCreateOrConnectWithoutSignatureImageInput[];
    upsert?: Prisma.CustomerUpsertWithWhereUniqueWithoutSignatureImageInput | Prisma.CustomerUpsertWithWhereUniqueWithoutSignatureImageInput[];
    createMany?: Prisma.CustomerCreateManySignatureImageInputEnvelope;
    set?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
    disconnect?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
    delete?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
    connect?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
    update?: Prisma.CustomerUpdateWithWhereUniqueWithoutSignatureImageInput | Prisma.CustomerUpdateWithWhereUniqueWithoutSignatureImageInput[];
    updateMany?: Prisma.CustomerUpdateManyWithWhereWithoutSignatureImageInput | Prisma.CustomerUpdateManyWithWhereWithoutSignatureImageInput[];
    deleteMany?: Prisma.CustomerScalarWhereInput | Prisma.CustomerScalarWhereInput[];
};
export type CustomerUncheckedUpdateManyWithoutIdProofImageNestedInput = {
    create?: Prisma.XOR<Prisma.CustomerCreateWithoutIdProofImageInput, Prisma.CustomerUncheckedCreateWithoutIdProofImageInput> | Prisma.CustomerCreateWithoutIdProofImageInput[] | Prisma.CustomerUncheckedCreateWithoutIdProofImageInput[];
    connectOrCreate?: Prisma.CustomerCreateOrConnectWithoutIdProofImageInput | Prisma.CustomerCreateOrConnectWithoutIdProofImageInput[];
    upsert?: Prisma.CustomerUpsertWithWhereUniqueWithoutIdProofImageInput | Prisma.CustomerUpsertWithWhereUniqueWithoutIdProofImageInput[];
    createMany?: Prisma.CustomerCreateManyIdProofImageInputEnvelope;
    set?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
    disconnect?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
    delete?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
    connect?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
    update?: Prisma.CustomerUpdateWithWhereUniqueWithoutIdProofImageInput | Prisma.CustomerUpdateWithWhereUniqueWithoutIdProofImageInput[];
    updateMany?: Prisma.CustomerUpdateManyWithWhereWithoutIdProofImageInput | Prisma.CustomerUpdateManyWithWhereWithoutIdProofImageInput[];
    deleteMany?: Prisma.CustomerScalarWhereInput | Prisma.CustomerScalarWhereInput[];
};
export type CustomerUncheckedUpdateManyWithoutSignatureImageNestedInput = {
    create?: Prisma.XOR<Prisma.CustomerCreateWithoutSignatureImageInput, Prisma.CustomerUncheckedCreateWithoutSignatureImageInput> | Prisma.CustomerCreateWithoutSignatureImageInput[] | Prisma.CustomerUncheckedCreateWithoutSignatureImageInput[];
    connectOrCreate?: Prisma.CustomerCreateOrConnectWithoutSignatureImageInput | Prisma.CustomerCreateOrConnectWithoutSignatureImageInput[];
    upsert?: Prisma.CustomerUpsertWithWhereUniqueWithoutSignatureImageInput | Prisma.CustomerUpsertWithWhereUniqueWithoutSignatureImageInput[];
    createMany?: Prisma.CustomerCreateManySignatureImageInputEnvelope;
    set?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
    disconnect?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
    delete?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
    connect?: Prisma.CustomerWhereUniqueInput | Prisma.CustomerWhereUniqueInput[];
    update?: Prisma.CustomerUpdateWithWhereUniqueWithoutSignatureImageInput | Prisma.CustomerUpdateWithWhereUniqueWithoutSignatureImageInput[];
    updateMany?: Prisma.CustomerUpdateManyWithWhereWithoutSignatureImageInput | Prisma.CustomerUpdateManyWithWhereWithoutSignatureImageInput[];
    deleteMany?: Prisma.CustomerScalarWhereInput | Prisma.CustomerScalarWhereInput[];
};
export type CustomerCreateWithoutUserInput = {
    id?: string;
    idProofNumber: string;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    signatureImage?: Prisma.ImageCreateNestedOneWithoutCustomerSignaturesInput;
    idProofImage?: Prisma.ImageCreateNestedOneWithoutCustomerIdProofsInput;
};
export type CustomerUncheckedCreateWithoutUserInput = {
    id?: string;
    idProofNumber: string;
    idProofImageId?: string | null;
    signatureImageId?: string | null;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CustomerCreateOrConnectWithoutUserInput = {
    where: Prisma.CustomerWhereUniqueInput;
    create: Prisma.XOR<Prisma.CustomerCreateWithoutUserInput, Prisma.CustomerUncheckedCreateWithoutUserInput>;
};
export type CustomerUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.CustomerUpdateWithoutUserInput, Prisma.CustomerUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.CustomerCreateWithoutUserInput, Prisma.CustomerUncheckedCreateWithoutUserInput>;
    where?: Prisma.CustomerWhereInput;
};
export type CustomerUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.CustomerWhereInput;
    data: Prisma.XOR<Prisma.CustomerUpdateWithoutUserInput, Prisma.CustomerUncheckedUpdateWithoutUserInput>;
};
export type CustomerUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    signatureImage?: Prisma.ImageUpdateOneWithoutCustomerSignaturesNestedInput;
    idProofImage?: Prisma.ImageUpdateOneWithoutCustomerIdProofsNestedInput;
};
export type CustomerUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    signatureImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CustomerCreateWithoutIdProofImageInput = {
    id?: string;
    idProofNumber: string;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    signatureImage?: Prisma.ImageCreateNestedOneWithoutCustomerSignaturesInput;
    user: Prisma.UserCreateNestedOneWithoutCustomerProfileInput;
};
export type CustomerUncheckedCreateWithoutIdProofImageInput = {
    id?: string;
    userId: string;
    idProofNumber: string;
    signatureImageId?: string | null;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CustomerCreateOrConnectWithoutIdProofImageInput = {
    where: Prisma.CustomerWhereUniqueInput;
    create: Prisma.XOR<Prisma.CustomerCreateWithoutIdProofImageInput, Prisma.CustomerUncheckedCreateWithoutIdProofImageInput>;
};
export type CustomerCreateManyIdProofImageInputEnvelope = {
    data: Prisma.CustomerCreateManyIdProofImageInput | Prisma.CustomerCreateManyIdProofImageInput[];
    skipDuplicates?: boolean;
};
export type CustomerCreateWithoutSignatureImageInput = {
    id?: string;
    idProofNumber: string;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    idProofImage?: Prisma.ImageCreateNestedOneWithoutCustomerIdProofsInput;
    user: Prisma.UserCreateNestedOneWithoutCustomerProfileInput;
};
export type CustomerUncheckedCreateWithoutSignatureImageInput = {
    id?: string;
    userId: string;
    idProofNumber: string;
    idProofImageId?: string | null;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CustomerCreateOrConnectWithoutSignatureImageInput = {
    where: Prisma.CustomerWhereUniqueInput;
    create: Prisma.XOR<Prisma.CustomerCreateWithoutSignatureImageInput, Prisma.CustomerUncheckedCreateWithoutSignatureImageInput>;
};
export type CustomerCreateManySignatureImageInputEnvelope = {
    data: Prisma.CustomerCreateManySignatureImageInput | Prisma.CustomerCreateManySignatureImageInput[];
    skipDuplicates?: boolean;
};
export type CustomerUpsertWithWhereUniqueWithoutIdProofImageInput = {
    where: Prisma.CustomerWhereUniqueInput;
    update: Prisma.XOR<Prisma.CustomerUpdateWithoutIdProofImageInput, Prisma.CustomerUncheckedUpdateWithoutIdProofImageInput>;
    create: Prisma.XOR<Prisma.CustomerCreateWithoutIdProofImageInput, Prisma.CustomerUncheckedCreateWithoutIdProofImageInput>;
};
export type CustomerUpdateWithWhereUniqueWithoutIdProofImageInput = {
    where: Prisma.CustomerWhereUniqueInput;
    data: Prisma.XOR<Prisma.CustomerUpdateWithoutIdProofImageInput, Prisma.CustomerUncheckedUpdateWithoutIdProofImageInput>;
};
export type CustomerUpdateManyWithWhereWithoutIdProofImageInput = {
    where: Prisma.CustomerScalarWhereInput;
    data: Prisma.XOR<Prisma.CustomerUpdateManyMutationInput, Prisma.CustomerUncheckedUpdateManyWithoutIdProofImageInput>;
};
export type CustomerScalarWhereInput = {
    AND?: Prisma.CustomerScalarWhereInput | Prisma.CustomerScalarWhereInput[];
    OR?: Prisma.CustomerScalarWhereInput[];
    NOT?: Prisma.CustomerScalarWhereInput | Prisma.CustomerScalarWhereInput[];
    id?: Prisma.StringFilter<"Customer"> | string;
    userId?: Prisma.StringFilter<"Customer"> | string;
    idProofNumber?: Prisma.StringFilter<"Customer"> | string;
    idProofImageId?: Prisma.StringNullableFilter<"Customer"> | string | null;
    signatureImageId?: Prisma.StringNullableFilter<"Customer"> | string | null;
    address?: Prisma.StringFilter<"Customer"> | string;
    createdAt?: Prisma.DateTimeFilter<"Customer"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Customer"> | Date | string;
};
export type CustomerUpsertWithWhereUniqueWithoutSignatureImageInput = {
    where: Prisma.CustomerWhereUniqueInput;
    update: Prisma.XOR<Prisma.CustomerUpdateWithoutSignatureImageInput, Prisma.CustomerUncheckedUpdateWithoutSignatureImageInput>;
    create: Prisma.XOR<Prisma.CustomerCreateWithoutSignatureImageInput, Prisma.CustomerUncheckedCreateWithoutSignatureImageInput>;
};
export type CustomerUpdateWithWhereUniqueWithoutSignatureImageInput = {
    where: Prisma.CustomerWhereUniqueInput;
    data: Prisma.XOR<Prisma.CustomerUpdateWithoutSignatureImageInput, Prisma.CustomerUncheckedUpdateWithoutSignatureImageInput>;
};
export type CustomerUpdateManyWithWhereWithoutSignatureImageInput = {
    where: Prisma.CustomerScalarWhereInput;
    data: Prisma.XOR<Prisma.CustomerUpdateManyMutationInput, Prisma.CustomerUncheckedUpdateManyWithoutSignatureImageInput>;
};
export type CustomerCreateManyIdProofImageInput = {
    id?: string;
    userId: string;
    idProofNumber: string;
    signatureImageId?: string | null;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CustomerCreateManySignatureImageInput = {
    id?: string;
    userId: string;
    idProofNumber: string;
    idProofImageId?: string | null;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CustomerUpdateWithoutIdProofImageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    signatureImage?: Prisma.ImageUpdateOneWithoutCustomerSignaturesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutCustomerProfileNestedInput;
};
export type CustomerUncheckedUpdateWithoutIdProofImageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    signatureImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CustomerUncheckedUpdateManyWithoutIdProofImageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    signatureImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CustomerUpdateWithoutSignatureImageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    idProofImage?: Prisma.ImageUpdateOneWithoutCustomerIdProofsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutCustomerProfileNestedInput;
};
export type CustomerUncheckedUpdateWithoutSignatureImageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CustomerUncheckedUpdateManyWithoutSignatureImageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CustomerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    idProofNumber?: boolean;
    idProofImageId?: boolean;
    signatureImageId?: boolean;
    address?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    signatureImage?: boolean | Prisma.Customer$signatureImageArgs<ExtArgs>;
    idProofImage?: boolean | Prisma.Customer$idProofImageArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["customer"]>;
export type CustomerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    idProofNumber?: boolean;
    idProofImageId?: boolean;
    signatureImageId?: boolean;
    address?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    signatureImage?: boolean | Prisma.Customer$signatureImageArgs<ExtArgs>;
    idProofImage?: boolean | Prisma.Customer$idProofImageArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["customer"]>;
export type CustomerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    idProofNumber?: boolean;
    idProofImageId?: boolean;
    signatureImageId?: boolean;
    address?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    signatureImage?: boolean | Prisma.Customer$signatureImageArgs<ExtArgs>;
    idProofImage?: boolean | Prisma.Customer$idProofImageArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["customer"]>;
export type CustomerSelectScalar = {
    id?: boolean;
    userId?: boolean;
    idProofNumber?: boolean;
    idProofImageId?: boolean;
    signatureImageId?: boolean;
    address?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CustomerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "idProofNumber" | "idProofImageId" | "signatureImageId" | "address" | "createdAt" | "updatedAt", ExtArgs["result"]["customer"]>;
export type CustomerInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    signatureImage?: boolean | Prisma.Customer$signatureImageArgs<ExtArgs>;
    idProofImage?: boolean | Prisma.Customer$idProofImageArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CustomerIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    signatureImage?: boolean | Prisma.Customer$signatureImageArgs<ExtArgs>;
    idProofImage?: boolean | Prisma.Customer$idProofImageArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    signatureImage?: boolean | Prisma.Customer$signatureImageArgs<ExtArgs>;
    idProofImage?: boolean | Prisma.Customer$idProofImageArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $CustomerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Customer";
    objects: {
        signatureImage: Prisma.$ImagePayload<ExtArgs> | null;
        idProofImage: Prisma.$ImagePayload<ExtArgs> | null;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        idProofNumber: string;
        idProofImageId: string | null;
        signatureImageId: string | null;
        address: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["customer"]>;
    composites: {};
};
export type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CustomerPayload, S>;
export type CustomerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CustomerCountAggregateInputType | true;
};
export interface CustomerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Customer'];
        meta: {
            name: 'Customer';
        };
    };
    findUnique<T extends CustomerFindUniqueArgs>(args: Prisma.SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CustomerFindFirstArgs>(args?: Prisma.SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CustomerFindManyArgs>(args?: Prisma.SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CustomerCreateArgs>(args: Prisma.SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CustomerCreateManyArgs>(args?: Prisma.SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CustomerDeleteArgs>(args: Prisma.SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CustomerUpdateArgs>(args: Prisma.SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CustomerDeleteManyArgs>(args?: Prisma.SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CustomerUpdateManyArgs>(args: Prisma.SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CustomerUpsertArgs>(args: Prisma.SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma.Prisma__CustomerClient<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CustomerCountArgs>(args?: Prisma.Subset<T, CustomerCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CustomerCountAggregateOutputType> : number>;
    aggregate<T extends CustomerAggregateArgs>(args: Prisma.Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>;
    groupBy<T extends CustomerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CustomerGroupByArgs['orderBy'];
    } : {
        orderBy?: CustomerGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CustomerFieldRefs;
}
export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    signatureImage<T extends Prisma.Customer$signatureImageArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Customer$signatureImageArgs<ExtArgs>>): Prisma.Prisma__ImageClient<runtime.Types.Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    idProofImage<T extends Prisma.Customer$idProofImageArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Customer$idProofImageArgs<ExtArgs>>): Prisma.Prisma__ImageClient<runtime.Types.Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CustomerFieldRefs {
    readonly id: Prisma.FieldRef<"Customer", 'String'>;
    readonly userId: Prisma.FieldRef<"Customer", 'String'>;
    readonly idProofNumber: Prisma.FieldRef<"Customer", 'String'>;
    readonly idProofImageId: Prisma.FieldRef<"Customer", 'String'>;
    readonly signatureImageId: Prisma.FieldRef<"Customer", 'String'>;
    readonly address: Prisma.FieldRef<"Customer", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Customer", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Customer", 'DateTime'>;
}
export type CustomerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    where: Prisma.CustomerWhereUniqueInput;
};
export type CustomerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    where: Prisma.CustomerWhereUniqueInput;
};
export type CustomerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput | Prisma.CustomerOrderByWithRelationInput[];
    cursor?: Prisma.CustomerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CustomerScalarFieldEnum | Prisma.CustomerScalarFieldEnum[];
};
export type CustomerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput | Prisma.CustomerOrderByWithRelationInput[];
    cursor?: Prisma.CustomerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CustomerScalarFieldEnum | Prisma.CustomerScalarFieldEnum[];
};
export type CustomerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput | Prisma.CustomerOrderByWithRelationInput[];
    cursor?: Prisma.CustomerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CustomerScalarFieldEnum | Prisma.CustomerScalarFieldEnum[];
};
export type CustomerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CustomerCreateInput, Prisma.CustomerUncheckedCreateInput>;
};
export type CustomerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CustomerCreateManyInput | Prisma.CustomerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CustomerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    data: Prisma.CustomerCreateManyInput | Prisma.CustomerCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CustomerIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CustomerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CustomerUpdateInput, Prisma.CustomerUncheckedUpdateInput>;
    where: Prisma.CustomerWhereUniqueInput;
};
export type CustomerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CustomerUpdateManyMutationInput, Prisma.CustomerUncheckedUpdateManyInput>;
    where?: Prisma.CustomerWhereInput;
    limit?: number;
};
export type CustomerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CustomerUpdateManyMutationInput, Prisma.CustomerUncheckedUpdateManyInput>;
    where?: Prisma.CustomerWhereInput;
    limit?: number;
    include?: Prisma.CustomerIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CustomerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    where: Prisma.CustomerWhereUniqueInput;
    create: Prisma.XOR<Prisma.CustomerCreateInput, Prisma.CustomerUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CustomerUpdateInput, Prisma.CustomerUncheckedUpdateInput>;
};
export type CustomerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
    where: Prisma.CustomerWhereUniqueInput;
};
export type CustomerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CustomerWhereInput;
    limit?: number;
};
export type Customer$signatureImageArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageSelect<ExtArgs> | null;
    omit?: Prisma.ImageOmit<ExtArgs> | null;
    include?: Prisma.ImageInclude<ExtArgs> | null;
    where?: Prisma.ImageWhereInput;
};
export type Customer$idProofImageArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageSelect<ExtArgs> | null;
    omit?: Prisma.ImageOmit<ExtArgs> | null;
    include?: Prisma.ImageInclude<ExtArgs> | null;
    where?: Prisma.ImageWhereInput;
};
export type CustomerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CustomerSelect<ExtArgs> | null;
    omit?: Prisma.CustomerOmit<ExtArgs> | null;
    include?: Prisma.CustomerInclude<ExtArgs> | null;
};
