import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ImageModel = runtime.Types.Result.DefaultSelection<Prisma.$ImagePayload>;
export type AggregateImage = {
    _count: ImageCountAggregateOutputType | null;
    _avg: ImageAvgAggregateOutputType | null;
    _sum: ImageSumAggregateOutputType | null;
    _min: ImageMinAggregateOutputType | null;
    _max: ImageMaxAggregateOutputType | null;
};
export type ImageAvgAggregateOutputType = {
    sortOrder: number | null;
};
export type ImageSumAggregateOutputType = {
    sortOrder: number | null;
};
export type ImageMinAggregateOutputType = {
    id: string | null;
    url: string | null;
    altText: string | null;
    isPrimary: boolean | null;
    sortOrder: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    roomTypeId: string | null;
};
export type ImageMaxAggregateOutputType = {
    id: string | null;
    url: string | null;
    altText: string | null;
    isPrimary: boolean | null;
    sortOrder: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    roomTypeId: string | null;
};
export type ImageCountAggregateOutputType = {
    id: number;
    url: number;
    altText: number;
    isPrimary: number;
    sortOrder: number;
    createdAt: number;
    updatedAt: number;
    roomTypeId: number;
    _all: number;
};
export type ImageAvgAggregateInputType = {
    sortOrder?: true;
};
export type ImageSumAggregateInputType = {
    sortOrder?: true;
};
export type ImageMinAggregateInputType = {
    id?: true;
    url?: true;
    altText?: true;
    isPrimary?: true;
    sortOrder?: true;
    createdAt?: true;
    updatedAt?: true;
    roomTypeId?: true;
};
export type ImageMaxAggregateInputType = {
    id?: true;
    url?: true;
    altText?: true;
    isPrimary?: true;
    sortOrder?: true;
    createdAt?: true;
    updatedAt?: true;
    roomTypeId?: true;
};
export type ImageCountAggregateInputType = {
    id?: true;
    url?: true;
    altText?: true;
    isPrimary?: true;
    sortOrder?: true;
    createdAt?: true;
    updatedAt?: true;
    roomTypeId?: true;
    _all?: true;
};
export type ImageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ImageWhereInput;
    orderBy?: Prisma.ImageOrderByWithRelationInput | Prisma.ImageOrderByWithRelationInput[];
    cursor?: Prisma.ImageWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ImageCountAggregateInputType;
    _avg?: ImageAvgAggregateInputType;
    _sum?: ImageSumAggregateInputType;
    _min?: ImageMinAggregateInputType;
    _max?: ImageMaxAggregateInputType;
};
export type GetImageAggregateType<T extends ImageAggregateArgs> = {
    [P in keyof T & keyof AggregateImage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateImage[P]> : Prisma.GetScalarType<T[P], AggregateImage[P]>;
};
export type ImageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ImageWhereInput;
    orderBy?: Prisma.ImageOrderByWithAggregationInput | Prisma.ImageOrderByWithAggregationInput[];
    by: Prisma.ImageScalarFieldEnum[] | Prisma.ImageScalarFieldEnum;
    having?: Prisma.ImageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ImageCountAggregateInputType | true;
    _avg?: ImageAvgAggregateInputType;
    _sum?: ImageSumAggregateInputType;
    _min?: ImageMinAggregateInputType;
    _max?: ImageMaxAggregateInputType;
};
export type ImageGroupByOutputType = {
    id: string;
    url: string;
    altText: string | null;
    isPrimary: boolean;
    sortOrder: number;
    createdAt: Date;
    updatedAt: Date;
    roomTypeId: string | null;
    _count: ImageCountAggregateOutputType | null;
    _avg: ImageAvgAggregateOutputType | null;
    _sum: ImageSumAggregateOutputType | null;
    _min: ImageMinAggregateOutputType | null;
    _max: ImageMaxAggregateOutputType | null;
};
export type GetImageGroupByPayload<T extends ImageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ImageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ImageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ImageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ImageGroupByOutputType[P]>;
}>>;
export type ImageWhereInput = {
    AND?: Prisma.ImageWhereInput | Prisma.ImageWhereInput[];
    OR?: Prisma.ImageWhereInput[];
    NOT?: Prisma.ImageWhereInput | Prisma.ImageWhereInput[];
    id?: Prisma.StringFilter<"Image"> | string;
    url?: Prisma.StringFilter<"Image"> | string;
    altText?: Prisma.StringNullableFilter<"Image"> | string | null;
    isPrimary?: Prisma.BoolFilter<"Image"> | boolean;
    sortOrder?: Prisma.IntFilter<"Image"> | number;
    createdAt?: Prisma.DateTimeFilter<"Image"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Image"> | Date | string;
    roomTypeId?: Prisma.StringNullableFilter<"Image"> | string | null;
    roomType?: Prisma.XOR<Prisma.RoomTypeNullableScalarRelationFilter, Prisma.RoomTypeWhereInput> | null;
    profileUsers?: Prisma.UserListRelationFilter;
    issues?: Prisma.IssueListRelationFilter;
    staffIdProofs?: Prisma.StaffListRelationFilter;
    staffSignatures?: Prisma.StaffListRelationFilter;
    customerIdProofs?: Prisma.CustomerListRelationFilter;
    customerSignatures?: Prisma.CustomerListRelationFilter;
};
export type ImageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    altText?: Prisma.SortOrderInput | Prisma.SortOrder;
    isPrimary?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrderInput | Prisma.SortOrder;
    roomType?: Prisma.RoomTypeOrderByWithRelationInput;
    profileUsers?: Prisma.UserOrderByRelationAggregateInput;
    issues?: Prisma.IssueOrderByRelationAggregateInput;
    staffIdProofs?: Prisma.StaffOrderByRelationAggregateInput;
    staffSignatures?: Prisma.StaffOrderByRelationAggregateInput;
    customerIdProofs?: Prisma.CustomerOrderByRelationAggregateInput;
    customerSignatures?: Prisma.CustomerOrderByRelationAggregateInput;
};
export type ImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ImageWhereInput | Prisma.ImageWhereInput[];
    OR?: Prisma.ImageWhereInput[];
    NOT?: Prisma.ImageWhereInput | Prisma.ImageWhereInput[];
    url?: Prisma.StringFilter<"Image"> | string;
    altText?: Prisma.StringNullableFilter<"Image"> | string | null;
    isPrimary?: Prisma.BoolFilter<"Image"> | boolean;
    sortOrder?: Prisma.IntFilter<"Image"> | number;
    createdAt?: Prisma.DateTimeFilter<"Image"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Image"> | Date | string;
    roomTypeId?: Prisma.StringNullableFilter<"Image"> | string | null;
    roomType?: Prisma.XOR<Prisma.RoomTypeNullableScalarRelationFilter, Prisma.RoomTypeWhereInput> | null;
    profileUsers?: Prisma.UserListRelationFilter;
    issues?: Prisma.IssueListRelationFilter;
    staffIdProofs?: Prisma.StaffListRelationFilter;
    staffSignatures?: Prisma.StaffListRelationFilter;
    customerIdProofs?: Prisma.CustomerListRelationFilter;
    customerSignatures?: Prisma.CustomerListRelationFilter;
}, "id">;
export type ImageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    altText?: Prisma.SortOrderInput | Prisma.SortOrder;
    isPrimary?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ImageCountOrderByAggregateInput;
    _avg?: Prisma.ImageAvgOrderByAggregateInput;
    _max?: Prisma.ImageMaxOrderByAggregateInput;
    _min?: Prisma.ImageMinOrderByAggregateInput;
    _sum?: Prisma.ImageSumOrderByAggregateInput;
};
export type ImageScalarWhereWithAggregatesInput = {
    AND?: Prisma.ImageScalarWhereWithAggregatesInput | Prisma.ImageScalarWhereWithAggregatesInput[];
    OR?: Prisma.ImageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ImageScalarWhereWithAggregatesInput | Prisma.ImageScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Image"> | string;
    url?: Prisma.StringWithAggregatesFilter<"Image"> | string;
    altText?: Prisma.StringNullableWithAggregatesFilter<"Image"> | string | null;
    isPrimary?: Prisma.BoolWithAggregatesFilter<"Image"> | boolean;
    sortOrder?: Prisma.IntWithAggregatesFilter<"Image"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Image"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Image"> | Date | string;
    roomTypeId?: Prisma.StringNullableWithAggregatesFilter<"Image"> | string | null;
};
export type ImageCreateInput = {
    id?: string;
    url: string;
    altText?: string | null;
    isPrimary?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomType?: Prisma.RoomTypeCreateNestedOneWithoutImagesInput;
    profileUsers?: Prisma.UserCreateNestedManyWithoutProfileImageInput;
    issues?: Prisma.IssueCreateNestedManyWithoutImageInput;
    staffIdProofs?: Prisma.StaffCreateNestedManyWithoutIdProofImageInput;
    staffSignatures?: Prisma.StaffCreateNestedManyWithoutSignatureImageInput;
    customerIdProofs?: Prisma.CustomerCreateNestedManyWithoutIdProofImageInput;
    customerSignatures?: Prisma.CustomerCreateNestedManyWithoutSignatureImageInput;
};
export type ImageUncheckedCreateInput = {
    id?: string;
    url: string;
    altText?: string | null;
    isPrimary?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomTypeId?: string | null;
    profileUsers?: Prisma.UserUncheckedCreateNestedManyWithoutProfileImageInput;
    issues?: Prisma.IssueUncheckedCreateNestedManyWithoutImageInput;
    staffIdProofs?: Prisma.StaffUncheckedCreateNestedManyWithoutIdProofImageInput;
    staffSignatures?: Prisma.StaffUncheckedCreateNestedManyWithoutSignatureImageInput;
    customerIdProofs?: Prisma.CustomerUncheckedCreateNestedManyWithoutIdProofImageInput;
    customerSignatures?: Prisma.CustomerUncheckedCreateNestedManyWithoutSignatureImageInput;
};
export type ImageUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomType?: Prisma.RoomTypeUpdateOneWithoutImagesNestedInput;
    profileUsers?: Prisma.UserUpdateManyWithoutProfileImageNestedInput;
    issues?: Prisma.IssueUpdateManyWithoutImageNestedInput;
    staffIdProofs?: Prisma.StaffUpdateManyWithoutIdProofImageNestedInput;
    staffSignatures?: Prisma.StaffUpdateManyWithoutSignatureImageNestedInput;
    customerIdProofs?: Prisma.CustomerUpdateManyWithoutIdProofImageNestedInput;
    customerSignatures?: Prisma.CustomerUpdateManyWithoutSignatureImageNestedInput;
};
export type ImageUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomTypeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileUsers?: Prisma.UserUncheckedUpdateManyWithoutProfileImageNestedInput;
    issues?: Prisma.IssueUncheckedUpdateManyWithoutImageNestedInput;
    staffIdProofs?: Prisma.StaffUncheckedUpdateManyWithoutIdProofImageNestedInput;
    staffSignatures?: Prisma.StaffUncheckedUpdateManyWithoutSignatureImageNestedInput;
    customerIdProofs?: Prisma.CustomerUncheckedUpdateManyWithoutIdProofImageNestedInput;
    customerSignatures?: Prisma.CustomerUncheckedUpdateManyWithoutSignatureImageNestedInput;
};
export type ImageCreateManyInput = {
    id?: string;
    url: string;
    altText?: string | null;
    isPrimary?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomTypeId?: string | null;
};
export type ImageUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ImageUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomTypeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type ImageNullableScalarRelationFilter = {
    is?: Prisma.ImageWhereInput | null;
    isNot?: Prisma.ImageWhereInput | null;
};
export type ImageListRelationFilter = {
    every?: Prisma.ImageWhereInput;
    some?: Prisma.ImageWhereInput;
    none?: Prisma.ImageWhereInput;
};
export type ImageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ImageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    altText?: Prisma.SortOrder;
    isPrimary?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrder;
};
export type ImageAvgOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type ImageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    altText?: Prisma.SortOrder;
    isPrimary?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrder;
};
export type ImageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    altText?: Prisma.SortOrder;
    isPrimary?: Prisma.SortOrder;
    sortOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrder;
};
export type ImageSumOrderByAggregateInput = {
    sortOrder?: Prisma.SortOrder;
};
export type ImageCreateNestedOneWithoutProfileUsersInput = {
    create?: Prisma.XOR<Prisma.ImageCreateWithoutProfileUsersInput, Prisma.ImageUncheckedCreateWithoutProfileUsersInput>;
    connectOrCreate?: Prisma.ImageCreateOrConnectWithoutProfileUsersInput;
    connect?: Prisma.ImageWhereUniqueInput;
};
export type ImageUpdateOneWithoutProfileUsersNestedInput = {
    create?: Prisma.XOR<Prisma.ImageCreateWithoutProfileUsersInput, Prisma.ImageUncheckedCreateWithoutProfileUsersInput>;
    connectOrCreate?: Prisma.ImageCreateOrConnectWithoutProfileUsersInput;
    upsert?: Prisma.ImageUpsertWithoutProfileUsersInput;
    disconnect?: Prisma.ImageWhereInput | boolean;
    delete?: Prisma.ImageWhereInput | boolean;
    connect?: Prisma.ImageWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ImageUpdateToOneWithWhereWithoutProfileUsersInput, Prisma.ImageUpdateWithoutProfileUsersInput>, Prisma.ImageUncheckedUpdateWithoutProfileUsersInput>;
};
export type ImageCreateNestedOneWithoutStaffSignaturesInput = {
    create?: Prisma.XOR<Prisma.ImageCreateWithoutStaffSignaturesInput, Prisma.ImageUncheckedCreateWithoutStaffSignaturesInput>;
    connectOrCreate?: Prisma.ImageCreateOrConnectWithoutStaffSignaturesInput;
    connect?: Prisma.ImageWhereUniqueInput;
};
export type ImageCreateNestedOneWithoutStaffIdProofsInput = {
    create?: Prisma.XOR<Prisma.ImageCreateWithoutStaffIdProofsInput, Prisma.ImageUncheckedCreateWithoutStaffIdProofsInput>;
    connectOrCreate?: Prisma.ImageCreateOrConnectWithoutStaffIdProofsInput;
    connect?: Prisma.ImageWhereUniqueInput;
};
export type ImageUpdateOneWithoutStaffSignaturesNestedInput = {
    create?: Prisma.XOR<Prisma.ImageCreateWithoutStaffSignaturesInput, Prisma.ImageUncheckedCreateWithoutStaffSignaturesInput>;
    connectOrCreate?: Prisma.ImageCreateOrConnectWithoutStaffSignaturesInput;
    upsert?: Prisma.ImageUpsertWithoutStaffSignaturesInput;
    disconnect?: Prisma.ImageWhereInput | boolean;
    delete?: Prisma.ImageWhereInput | boolean;
    connect?: Prisma.ImageWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ImageUpdateToOneWithWhereWithoutStaffSignaturesInput, Prisma.ImageUpdateWithoutStaffSignaturesInput>, Prisma.ImageUncheckedUpdateWithoutStaffSignaturesInput>;
};
export type ImageUpdateOneWithoutStaffIdProofsNestedInput = {
    create?: Prisma.XOR<Prisma.ImageCreateWithoutStaffIdProofsInput, Prisma.ImageUncheckedCreateWithoutStaffIdProofsInput>;
    connectOrCreate?: Prisma.ImageCreateOrConnectWithoutStaffIdProofsInput;
    upsert?: Prisma.ImageUpsertWithoutStaffIdProofsInput;
    disconnect?: Prisma.ImageWhereInput | boolean;
    delete?: Prisma.ImageWhereInput | boolean;
    connect?: Prisma.ImageWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ImageUpdateToOneWithWhereWithoutStaffIdProofsInput, Prisma.ImageUpdateWithoutStaffIdProofsInput>, Prisma.ImageUncheckedUpdateWithoutStaffIdProofsInput>;
};
export type ImageCreateNestedOneWithoutCustomerSignaturesInput = {
    create?: Prisma.XOR<Prisma.ImageCreateWithoutCustomerSignaturesInput, Prisma.ImageUncheckedCreateWithoutCustomerSignaturesInput>;
    connectOrCreate?: Prisma.ImageCreateOrConnectWithoutCustomerSignaturesInput;
    connect?: Prisma.ImageWhereUniqueInput;
};
export type ImageCreateNestedOneWithoutCustomerIdProofsInput = {
    create?: Prisma.XOR<Prisma.ImageCreateWithoutCustomerIdProofsInput, Prisma.ImageUncheckedCreateWithoutCustomerIdProofsInput>;
    connectOrCreate?: Prisma.ImageCreateOrConnectWithoutCustomerIdProofsInput;
    connect?: Prisma.ImageWhereUniqueInput;
};
export type ImageUpdateOneWithoutCustomerSignaturesNestedInput = {
    create?: Prisma.XOR<Prisma.ImageCreateWithoutCustomerSignaturesInput, Prisma.ImageUncheckedCreateWithoutCustomerSignaturesInput>;
    connectOrCreate?: Prisma.ImageCreateOrConnectWithoutCustomerSignaturesInput;
    upsert?: Prisma.ImageUpsertWithoutCustomerSignaturesInput;
    disconnect?: Prisma.ImageWhereInput | boolean;
    delete?: Prisma.ImageWhereInput | boolean;
    connect?: Prisma.ImageWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ImageUpdateToOneWithWhereWithoutCustomerSignaturesInput, Prisma.ImageUpdateWithoutCustomerSignaturesInput>, Prisma.ImageUncheckedUpdateWithoutCustomerSignaturesInput>;
};
export type ImageUpdateOneWithoutCustomerIdProofsNestedInput = {
    create?: Prisma.XOR<Prisma.ImageCreateWithoutCustomerIdProofsInput, Prisma.ImageUncheckedCreateWithoutCustomerIdProofsInput>;
    connectOrCreate?: Prisma.ImageCreateOrConnectWithoutCustomerIdProofsInput;
    upsert?: Prisma.ImageUpsertWithoutCustomerIdProofsInput;
    disconnect?: Prisma.ImageWhereInput | boolean;
    delete?: Prisma.ImageWhereInput | boolean;
    connect?: Prisma.ImageWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ImageUpdateToOneWithWhereWithoutCustomerIdProofsInput, Prisma.ImageUpdateWithoutCustomerIdProofsInput>, Prisma.ImageUncheckedUpdateWithoutCustomerIdProofsInput>;
};
export type ImageCreateNestedManyWithoutRoomTypeInput = {
    create?: Prisma.XOR<Prisma.ImageCreateWithoutRoomTypeInput, Prisma.ImageUncheckedCreateWithoutRoomTypeInput> | Prisma.ImageCreateWithoutRoomTypeInput[] | Prisma.ImageUncheckedCreateWithoutRoomTypeInput[];
    connectOrCreate?: Prisma.ImageCreateOrConnectWithoutRoomTypeInput | Prisma.ImageCreateOrConnectWithoutRoomTypeInput[];
    createMany?: Prisma.ImageCreateManyRoomTypeInputEnvelope;
    connect?: Prisma.ImageWhereUniqueInput | Prisma.ImageWhereUniqueInput[];
};
export type ImageUncheckedCreateNestedManyWithoutRoomTypeInput = {
    create?: Prisma.XOR<Prisma.ImageCreateWithoutRoomTypeInput, Prisma.ImageUncheckedCreateWithoutRoomTypeInput> | Prisma.ImageCreateWithoutRoomTypeInput[] | Prisma.ImageUncheckedCreateWithoutRoomTypeInput[];
    connectOrCreate?: Prisma.ImageCreateOrConnectWithoutRoomTypeInput | Prisma.ImageCreateOrConnectWithoutRoomTypeInput[];
    createMany?: Prisma.ImageCreateManyRoomTypeInputEnvelope;
    connect?: Prisma.ImageWhereUniqueInput | Prisma.ImageWhereUniqueInput[];
};
export type ImageUpdateManyWithoutRoomTypeNestedInput = {
    create?: Prisma.XOR<Prisma.ImageCreateWithoutRoomTypeInput, Prisma.ImageUncheckedCreateWithoutRoomTypeInput> | Prisma.ImageCreateWithoutRoomTypeInput[] | Prisma.ImageUncheckedCreateWithoutRoomTypeInput[];
    connectOrCreate?: Prisma.ImageCreateOrConnectWithoutRoomTypeInput | Prisma.ImageCreateOrConnectWithoutRoomTypeInput[];
    upsert?: Prisma.ImageUpsertWithWhereUniqueWithoutRoomTypeInput | Prisma.ImageUpsertWithWhereUniqueWithoutRoomTypeInput[];
    createMany?: Prisma.ImageCreateManyRoomTypeInputEnvelope;
    set?: Prisma.ImageWhereUniqueInput | Prisma.ImageWhereUniqueInput[];
    disconnect?: Prisma.ImageWhereUniqueInput | Prisma.ImageWhereUniqueInput[];
    delete?: Prisma.ImageWhereUniqueInput | Prisma.ImageWhereUniqueInput[];
    connect?: Prisma.ImageWhereUniqueInput | Prisma.ImageWhereUniqueInput[];
    update?: Prisma.ImageUpdateWithWhereUniqueWithoutRoomTypeInput | Prisma.ImageUpdateWithWhereUniqueWithoutRoomTypeInput[];
    updateMany?: Prisma.ImageUpdateManyWithWhereWithoutRoomTypeInput | Prisma.ImageUpdateManyWithWhereWithoutRoomTypeInput[];
    deleteMany?: Prisma.ImageScalarWhereInput | Prisma.ImageScalarWhereInput[];
};
export type ImageUncheckedUpdateManyWithoutRoomTypeNestedInput = {
    create?: Prisma.XOR<Prisma.ImageCreateWithoutRoomTypeInput, Prisma.ImageUncheckedCreateWithoutRoomTypeInput> | Prisma.ImageCreateWithoutRoomTypeInput[] | Prisma.ImageUncheckedCreateWithoutRoomTypeInput[];
    connectOrCreate?: Prisma.ImageCreateOrConnectWithoutRoomTypeInput | Prisma.ImageCreateOrConnectWithoutRoomTypeInput[];
    upsert?: Prisma.ImageUpsertWithWhereUniqueWithoutRoomTypeInput | Prisma.ImageUpsertWithWhereUniqueWithoutRoomTypeInput[];
    createMany?: Prisma.ImageCreateManyRoomTypeInputEnvelope;
    set?: Prisma.ImageWhereUniqueInput | Prisma.ImageWhereUniqueInput[];
    disconnect?: Prisma.ImageWhereUniqueInput | Prisma.ImageWhereUniqueInput[];
    delete?: Prisma.ImageWhereUniqueInput | Prisma.ImageWhereUniqueInput[];
    connect?: Prisma.ImageWhereUniqueInput | Prisma.ImageWhereUniqueInput[];
    update?: Prisma.ImageUpdateWithWhereUniqueWithoutRoomTypeInput | Prisma.ImageUpdateWithWhereUniqueWithoutRoomTypeInput[];
    updateMany?: Prisma.ImageUpdateManyWithWhereWithoutRoomTypeInput | Prisma.ImageUpdateManyWithWhereWithoutRoomTypeInput[];
    deleteMany?: Prisma.ImageScalarWhereInput | Prisma.ImageScalarWhereInput[];
};
export type ImageCreateNestedOneWithoutIssuesInput = {
    create?: Prisma.XOR<Prisma.ImageCreateWithoutIssuesInput, Prisma.ImageUncheckedCreateWithoutIssuesInput>;
    connectOrCreate?: Prisma.ImageCreateOrConnectWithoutIssuesInput;
    connect?: Prisma.ImageWhereUniqueInput;
};
export type ImageUpdateOneWithoutIssuesNestedInput = {
    create?: Prisma.XOR<Prisma.ImageCreateWithoutIssuesInput, Prisma.ImageUncheckedCreateWithoutIssuesInput>;
    connectOrCreate?: Prisma.ImageCreateOrConnectWithoutIssuesInput;
    upsert?: Prisma.ImageUpsertWithoutIssuesInput;
    disconnect?: Prisma.ImageWhereInput | boolean;
    delete?: Prisma.ImageWhereInput | boolean;
    connect?: Prisma.ImageWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ImageUpdateToOneWithWhereWithoutIssuesInput, Prisma.ImageUpdateWithoutIssuesInput>, Prisma.ImageUncheckedUpdateWithoutIssuesInput>;
};
export type ImageCreateWithoutProfileUsersInput = {
    id?: string;
    url: string;
    altText?: string | null;
    isPrimary?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomType?: Prisma.RoomTypeCreateNestedOneWithoutImagesInput;
    issues?: Prisma.IssueCreateNestedManyWithoutImageInput;
    staffIdProofs?: Prisma.StaffCreateNestedManyWithoutIdProofImageInput;
    staffSignatures?: Prisma.StaffCreateNestedManyWithoutSignatureImageInput;
    customerIdProofs?: Prisma.CustomerCreateNestedManyWithoutIdProofImageInput;
    customerSignatures?: Prisma.CustomerCreateNestedManyWithoutSignatureImageInput;
};
export type ImageUncheckedCreateWithoutProfileUsersInput = {
    id?: string;
    url: string;
    altText?: string | null;
    isPrimary?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomTypeId?: string | null;
    issues?: Prisma.IssueUncheckedCreateNestedManyWithoutImageInput;
    staffIdProofs?: Prisma.StaffUncheckedCreateNestedManyWithoutIdProofImageInput;
    staffSignatures?: Prisma.StaffUncheckedCreateNestedManyWithoutSignatureImageInput;
    customerIdProofs?: Prisma.CustomerUncheckedCreateNestedManyWithoutIdProofImageInput;
    customerSignatures?: Prisma.CustomerUncheckedCreateNestedManyWithoutSignatureImageInput;
};
export type ImageCreateOrConnectWithoutProfileUsersInput = {
    where: Prisma.ImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ImageCreateWithoutProfileUsersInput, Prisma.ImageUncheckedCreateWithoutProfileUsersInput>;
};
export type ImageUpsertWithoutProfileUsersInput = {
    update: Prisma.XOR<Prisma.ImageUpdateWithoutProfileUsersInput, Prisma.ImageUncheckedUpdateWithoutProfileUsersInput>;
    create: Prisma.XOR<Prisma.ImageCreateWithoutProfileUsersInput, Prisma.ImageUncheckedCreateWithoutProfileUsersInput>;
    where?: Prisma.ImageWhereInput;
};
export type ImageUpdateToOneWithWhereWithoutProfileUsersInput = {
    where?: Prisma.ImageWhereInput;
    data: Prisma.XOR<Prisma.ImageUpdateWithoutProfileUsersInput, Prisma.ImageUncheckedUpdateWithoutProfileUsersInput>;
};
export type ImageUpdateWithoutProfileUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomType?: Prisma.RoomTypeUpdateOneWithoutImagesNestedInput;
    issues?: Prisma.IssueUpdateManyWithoutImageNestedInput;
    staffIdProofs?: Prisma.StaffUpdateManyWithoutIdProofImageNestedInput;
    staffSignatures?: Prisma.StaffUpdateManyWithoutSignatureImageNestedInput;
    customerIdProofs?: Prisma.CustomerUpdateManyWithoutIdProofImageNestedInput;
    customerSignatures?: Prisma.CustomerUpdateManyWithoutSignatureImageNestedInput;
};
export type ImageUncheckedUpdateWithoutProfileUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomTypeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    issues?: Prisma.IssueUncheckedUpdateManyWithoutImageNestedInput;
    staffIdProofs?: Prisma.StaffUncheckedUpdateManyWithoutIdProofImageNestedInput;
    staffSignatures?: Prisma.StaffUncheckedUpdateManyWithoutSignatureImageNestedInput;
    customerIdProofs?: Prisma.CustomerUncheckedUpdateManyWithoutIdProofImageNestedInput;
    customerSignatures?: Prisma.CustomerUncheckedUpdateManyWithoutSignatureImageNestedInput;
};
export type ImageCreateWithoutStaffSignaturesInput = {
    id?: string;
    url: string;
    altText?: string | null;
    isPrimary?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomType?: Prisma.RoomTypeCreateNestedOneWithoutImagesInput;
    profileUsers?: Prisma.UserCreateNestedManyWithoutProfileImageInput;
    issues?: Prisma.IssueCreateNestedManyWithoutImageInput;
    staffIdProofs?: Prisma.StaffCreateNestedManyWithoutIdProofImageInput;
    customerIdProofs?: Prisma.CustomerCreateNestedManyWithoutIdProofImageInput;
    customerSignatures?: Prisma.CustomerCreateNestedManyWithoutSignatureImageInput;
};
export type ImageUncheckedCreateWithoutStaffSignaturesInput = {
    id?: string;
    url: string;
    altText?: string | null;
    isPrimary?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomTypeId?: string | null;
    profileUsers?: Prisma.UserUncheckedCreateNestedManyWithoutProfileImageInput;
    issues?: Prisma.IssueUncheckedCreateNestedManyWithoutImageInput;
    staffIdProofs?: Prisma.StaffUncheckedCreateNestedManyWithoutIdProofImageInput;
    customerIdProofs?: Prisma.CustomerUncheckedCreateNestedManyWithoutIdProofImageInput;
    customerSignatures?: Prisma.CustomerUncheckedCreateNestedManyWithoutSignatureImageInput;
};
export type ImageCreateOrConnectWithoutStaffSignaturesInput = {
    where: Prisma.ImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ImageCreateWithoutStaffSignaturesInput, Prisma.ImageUncheckedCreateWithoutStaffSignaturesInput>;
};
export type ImageCreateWithoutStaffIdProofsInput = {
    id?: string;
    url: string;
    altText?: string | null;
    isPrimary?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomType?: Prisma.RoomTypeCreateNestedOneWithoutImagesInput;
    profileUsers?: Prisma.UserCreateNestedManyWithoutProfileImageInput;
    issues?: Prisma.IssueCreateNestedManyWithoutImageInput;
    staffSignatures?: Prisma.StaffCreateNestedManyWithoutSignatureImageInput;
    customerIdProofs?: Prisma.CustomerCreateNestedManyWithoutIdProofImageInput;
    customerSignatures?: Prisma.CustomerCreateNestedManyWithoutSignatureImageInput;
};
export type ImageUncheckedCreateWithoutStaffIdProofsInput = {
    id?: string;
    url: string;
    altText?: string | null;
    isPrimary?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomTypeId?: string | null;
    profileUsers?: Prisma.UserUncheckedCreateNestedManyWithoutProfileImageInput;
    issues?: Prisma.IssueUncheckedCreateNestedManyWithoutImageInput;
    staffSignatures?: Prisma.StaffUncheckedCreateNestedManyWithoutSignatureImageInput;
    customerIdProofs?: Prisma.CustomerUncheckedCreateNestedManyWithoutIdProofImageInput;
    customerSignatures?: Prisma.CustomerUncheckedCreateNestedManyWithoutSignatureImageInput;
};
export type ImageCreateOrConnectWithoutStaffIdProofsInput = {
    where: Prisma.ImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ImageCreateWithoutStaffIdProofsInput, Prisma.ImageUncheckedCreateWithoutStaffIdProofsInput>;
};
export type ImageUpsertWithoutStaffSignaturesInput = {
    update: Prisma.XOR<Prisma.ImageUpdateWithoutStaffSignaturesInput, Prisma.ImageUncheckedUpdateWithoutStaffSignaturesInput>;
    create: Prisma.XOR<Prisma.ImageCreateWithoutStaffSignaturesInput, Prisma.ImageUncheckedCreateWithoutStaffSignaturesInput>;
    where?: Prisma.ImageWhereInput;
};
export type ImageUpdateToOneWithWhereWithoutStaffSignaturesInput = {
    where?: Prisma.ImageWhereInput;
    data: Prisma.XOR<Prisma.ImageUpdateWithoutStaffSignaturesInput, Prisma.ImageUncheckedUpdateWithoutStaffSignaturesInput>;
};
export type ImageUpdateWithoutStaffSignaturesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomType?: Prisma.RoomTypeUpdateOneWithoutImagesNestedInput;
    profileUsers?: Prisma.UserUpdateManyWithoutProfileImageNestedInput;
    issues?: Prisma.IssueUpdateManyWithoutImageNestedInput;
    staffIdProofs?: Prisma.StaffUpdateManyWithoutIdProofImageNestedInput;
    customerIdProofs?: Prisma.CustomerUpdateManyWithoutIdProofImageNestedInput;
    customerSignatures?: Prisma.CustomerUpdateManyWithoutSignatureImageNestedInput;
};
export type ImageUncheckedUpdateWithoutStaffSignaturesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomTypeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileUsers?: Prisma.UserUncheckedUpdateManyWithoutProfileImageNestedInput;
    issues?: Prisma.IssueUncheckedUpdateManyWithoutImageNestedInput;
    staffIdProofs?: Prisma.StaffUncheckedUpdateManyWithoutIdProofImageNestedInput;
    customerIdProofs?: Prisma.CustomerUncheckedUpdateManyWithoutIdProofImageNestedInput;
    customerSignatures?: Prisma.CustomerUncheckedUpdateManyWithoutSignatureImageNestedInput;
};
export type ImageUpsertWithoutStaffIdProofsInput = {
    update: Prisma.XOR<Prisma.ImageUpdateWithoutStaffIdProofsInput, Prisma.ImageUncheckedUpdateWithoutStaffIdProofsInput>;
    create: Prisma.XOR<Prisma.ImageCreateWithoutStaffIdProofsInput, Prisma.ImageUncheckedCreateWithoutStaffIdProofsInput>;
    where?: Prisma.ImageWhereInput;
};
export type ImageUpdateToOneWithWhereWithoutStaffIdProofsInput = {
    where?: Prisma.ImageWhereInput;
    data: Prisma.XOR<Prisma.ImageUpdateWithoutStaffIdProofsInput, Prisma.ImageUncheckedUpdateWithoutStaffIdProofsInput>;
};
export type ImageUpdateWithoutStaffIdProofsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomType?: Prisma.RoomTypeUpdateOneWithoutImagesNestedInput;
    profileUsers?: Prisma.UserUpdateManyWithoutProfileImageNestedInput;
    issues?: Prisma.IssueUpdateManyWithoutImageNestedInput;
    staffSignatures?: Prisma.StaffUpdateManyWithoutSignatureImageNestedInput;
    customerIdProofs?: Prisma.CustomerUpdateManyWithoutIdProofImageNestedInput;
    customerSignatures?: Prisma.CustomerUpdateManyWithoutSignatureImageNestedInput;
};
export type ImageUncheckedUpdateWithoutStaffIdProofsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomTypeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileUsers?: Prisma.UserUncheckedUpdateManyWithoutProfileImageNestedInput;
    issues?: Prisma.IssueUncheckedUpdateManyWithoutImageNestedInput;
    staffSignatures?: Prisma.StaffUncheckedUpdateManyWithoutSignatureImageNestedInput;
    customerIdProofs?: Prisma.CustomerUncheckedUpdateManyWithoutIdProofImageNestedInput;
    customerSignatures?: Prisma.CustomerUncheckedUpdateManyWithoutSignatureImageNestedInput;
};
export type ImageCreateWithoutCustomerSignaturesInput = {
    id?: string;
    url: string;
    altText?: string | null;
    isPrimary?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomType?: Prisma.RoomTypeCreateNestedOneWithoutImagesInput;
    profileUsers?: Prisma.UserCreateNestedManyWithoutProfileImageInput;
    issues?: Prisma.IssueCreateNestedManyWithoutImageInput;
    staffIdProofs?: Prisma.StaffCreateNestedManyWithoutIdProofImageInput;
    staffSignatures?: Prisma.StaffCreateNestedManyWithoutSignatureImageInput;
    customerIdProofs?: Prisma.CustomerCreateNestedManyWithoutIdProofImageInput;
};
export type ImageUncheckedCreateWithoutCustomerSignaturesInput = {
    id?: string;
    url: string;
    altText?: string | null;
    isPrimary?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomTypeId?: string | null;
    profileUsers?: Prisma.UserUncheckedCreateNestedManyWithoutProfileImageInput;
    issues?: Prisma.IssueUncheckedCreateNestedManyWithoutImageInput;
    staffIdProofs?: Prisma.StaffUncheckedCreateNestedManyWithoutIdProofImageInput;
    staffSignatures?: Prisma.StaffUncheckedCreateNestedManyWithoutSignatureImageInput;
    customerIdProofs?: Prisma.CustomerUncheckedCreateNestedManyWithoutIdProofImageInput;
};
export type ImageCreateOrConnectWithoutCustomerSignaturesInput = {
    where: Prisma.ImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ImageCreateWithoutCustomerSignaturesInput, Prisma.ImageUncheckedCreateWithoutCustomerSignaturesInput>;
};
export type ImageCreateWithoutCustomerIdProofsInput = {
    id?: string;
    url: string;
    altText?: string | null;
    isPrimary?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomType?: Prisma.RoomTypeCreateNestedOneWithoutImagesInput;
    profileUsers?: Prisma.UserCreateNestedManyWithoutProfileImageInput;
    issues?: Prisma.IssueCreateNestedManyWithoutImageInput;
    staffIdProofs?: Prisma.StaffCreateNestedManyWithoutIdProofImageInput;
    staffSignatures?: Prisma.StaffCreateNestedManyWithoutSignatureImageInput;
    customerSignatures?: Prisma.CustomerCreateNestedManyWithoutSignatureImageInput;
};
export type ImageUncheckedCreateWithoutCustomerIdProofsInput = {
    id?: string;
    url: string;
    altText?: string | null;
    isPrimary?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomTypeId?: string | null;
    profileUsers?: Prisma.UserUncheckedCreateNestedManyWithoutProfileImageInput;
    issues?: Prisma.IssueUncheckedCreateNestedManyWithoutImageInput;
    staffIdProofs?: Prisma.StaffUncheckedCreateNestedManyWithoutIdProofImageInput;
    staffSignatures?: Prisma.StaffUncheckedCreateNestedManyWithoutSignatureImageInput;
    customerSignatures?: Prisma.CustomerUncheckedCreateNestedManyWithoutSignatureImageInput;
};
export type ImageCreateOrConnectWithoutCustomerIdProofsInput = {
    where: Prisma.ImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ImageCreateWithoutCustomerIdProofsInput, Prisma.ImageUncheckedCreateWithoutCustomerIdProofsInput>;
};
export type ImageUpsertWithoutCustomerSignaturesInput = {
    update: Prisma.XOR<Prisma.ImageUpdateWithoutCustomerSignaturesInput, Prisma.ImageUncheckedUpdateWithoutCustomerSignaturesInput>;
    create: Prisma.XOR<Prisma.ImageCreateWithoutCustomerSignaturesInput, Prisma.ImageUncheckedCreateWithoutCustomerSignaturesInput>;
    where?: Prisma.ImageWhereInput;
};
export type ImageUpdateToOneWithWhereWithoutCustomerSignaturesInput = {
    where?: Prisma.ImageWhereInput;
    data: Prisma.XOR<Prisma.ImageUpdateWithoutCustomerSignaturesInput, Prisma.ImageUncheckedUpdateWithoutCustomerSignaturesInput>;
};
export type ImageUpdateWithoutCustomerSignaturesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomType?: Prisma.RoomTypeUpdateOneWithoutImagesNestedInput;
    profileUsers?: Prisma.UserUpdateManyWithoutProfileImageNestedInput;
    issues?: Prisma.IssueUpdateManyWithoutImageNestedInput;
    staffIdProofs?: Prisma.StaffUpdateManyWithoutIdProofImageNestedInput;
    staffSignatures?: Prisma.StaffUpdateManyWithoutSignatureImageNestedInput;
    customerIdProofs?: Prisma.CustomerUpdateManyWithoutIdProofImageNestedInput;
};
export type ImageUncheckedUpdateWithoutCustomerSignaturesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomTypeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileUsers?: Prisma.UserUncheckedUpdateManyWithoutProfileImageNestedInput;
    issues?: Prisma.IssueUncheckedUpdateManyWithoutImageNestedInput;
    staffIdProofs?: Prisma.StaffUncheckedUpdateManyWithoutIdProofImageNestedInput;
    staffSignatures?: Prisma.StaffUncheckedUpdateManyWithoutSignatureImageNestedInput;
    customerIdProofs?: Prisma.CustomerUncheckedUpdateManyWithoutIdProofImageNestedInput;
};
export type ImageUpsertWithoutCustomerIdProofsInput = {
    update: Prisma.XOR<Prisma.ImageUpdateWithoutCustomerIdProofsInput, Prisma.ImageUncheckedUpdateWithoutCustomerIdProofsInput>;
    create: Prisma.XOR<Prisma.ImageCreateWithoutCustomerIdProofsInput, Prisma.ImageUncheckedCreateWithoutCustomerIdProofsInput>;
    where?: Prisma.ImageWhereInput;
};
export type ImageUpdateToOneWithWhereWithoutCustomerIdProofsInput = {
    where?: Prisma.ImageWhereInput;
    data: Prisma.XOR<Prisma.ImageUpdateWithoutCustomerIdProofsInput, Prisma.ImageUncheckedUpdateWithoutCustomerIdProofsInput>;
};
export type ImageUpdateWithoutCustomerIdProofsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomType?: Prisma.RoomTypeUpdateOneWithoutImagesNestedInput;
    profileUsers?: Prisma.UserUpdateManyWithoutProfileImageNestedInput;
    issues?: Prisma.IssueUpdateManyWithoutImageNestedInput;
    staffIdProofs?: Prisma.StaffUpdateManyWithoutIdProofImageNestedInput;
    staffSignatures?: Prisma.StaffUpdateManyWithoutSignatureImageNestedInput;
    customerSignatures?: Prisma.CustomerUpdateManyWithoutSignatureImageNestedInput;
};
export type ImageUncheckedUpdateWithoutCustomerIdProofsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomTypeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileUsers?: Prisma.UserUncheckedUpdateManyWithoutProfileImageNestedInput;
    issues?: Prisma.IssueUncheckedUpdateManyWithoutImageNestedInput;
    staffIdProofs?: Prisma.StaffUncheckedUpdateManyWithoutIdProofImageNestedInput;
    staffSignatures?: Prisma.StaffUncheckedUpdateManyWithoutSignatureImageNestedInput;
    customerSignatures?: Prisma.CustomerUncheckedUpdateManyWithoutSignatureImageNestedInput;
};
export type ImageCreateWithoutRoomTypeInput = {
    id?: string;
    url: string;
    altText?: string | null;
    isPrimary?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profileUsers?: Prisma.UserCreateNestedManyWithoutProfileImageInput;
    issues?: Prisma.IssueCreateNestedManyWithoutImageInput;
    staffIdProofs?: Prisma.StaffCreateNestedManyWithoutIdProofImageInput;
    staffSignatures?: Prisma.StaffCreateNestedManyWithoutSignatureImageInput;
    customerIdProofs?: Prisma.CustomerCreateNestedManyWithoutIdProofImageInput;
    customerSignatures?: Prisma.CustomerCreateNestedManyWithoutSignatureImageInput;
};
export type ImageUncheckedCreateWithoutRoomTypeInput = {
    id?: string;
    url: string;
    altText?: string | null;
    isPrimary?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    profileUsers?: Prisma.UserUncheckedCreateNestedManyWithoutProfileImageInput;
    issues?: Prisma.IssueUncheckedCreateNestedManyWithoutImageInput;
    staffIdProofs?: Prisma.StaffUncheckedCreateNestedManyWithoutIdProofImageInput;
    staffSignatures?: Prisma.StaffUncheckedCreateNestedManyWithoutSignatureImageInput;
    customerIdProofs?: Prisma.CustomerUncheckedCreateNestedManyWithoutIdProofImageInput;
    customerSignatures?: Prisma.CustomerUncheckedCreateNestedManyWithoutSignatureImageInput;
};
export type ImageCreateOrConnectWithoutRoomTypeInput = {
    where: Prisma.ImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ImageCreateWithoutRoomTypeInput, Prisma.ImageUncheckedCreateWithoutRoomTypeInput>;
};
export type ImageCreateManyRoomTypeInputEnvelope = {
    data: Prisma.ImageCreateManyRoomTypeInput | Prisma.ImageCreateManyRoomTypeInput[];
    skipDuplicates?: boolean;
};
export type ImageUpsertWithWhereUniqueWithoutRoomTypeInput = {
    where: Prisma.ImageWhereUniqueInput;
    update: Prisma.XOR<Prisma.ImageUpdateWithoutRoomTypeInput, Prisma.ImageUncheckedUpdateWithoutRoomTypeInput>;
    create: Prisma.XOR<Prisma.ImageCreateWithoutRoomTypeInput, Prisma.ImageUncheckedCreateWithoutRoomTypeInput>;
};
export type ImageUpdateWithWhereUniqueWithoutRoomTypeInput = {
    where: Prisma.ImageWhereUniqueInput;
    data: Prisma.XOR<Prisma.ImageUpdateWithoutRoomTypeInput, Prisma.ImageUncheckedUpdateWithoutRoomTypeInput>;
};
export type ImageUpdateManyWithWhereWithoutRoomTypeInput = {
    where: Prisma.ImageScalarWhereInput;
    data: Prisma.XOR<Prisma.ImageUpdateManyMutationInput, Prisma.ImageUncheckedUpdateManyWithoutRoomTypeInput>;
};
export type ImageScalarWhereInput = {
    AND?: Prisma.ImageScalarWhereInput | Prisma.ImageScalarWhereInput[];
    OR?: Prisma.ImageScalarWhereInput[];
    NOT?: Prisma.ImageScalarWhereInput | Prisma.ImageScalarWhereInput[];
    id?: Prisma.StringFilter<"Image"> | string;
    url?: Prisma.StringFilter<"Image"> | string;
    altText?: Prisma.StringNullableFilter<"Image"> | string | null;
    isPrimary?: Prisma.BoolFilter<"Image"> | boolean;
    sortOrder?: Prisma.IntFilter<"Image"> | number;
    createdAt?: Prisma.DateTimeFilter<"Image"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Image"> | Date | string;
    roomTypeId?: Prisma.StringNullableFilter<"Image"> | string | null;
};
export type ImageCreateWithoutIssuesInput = {
    id?: string;
    url: string;
    altText?: string | null;
    isPrimary?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomType?: Prisma.RoomTypeCreateNestedOneWithoutImagesInput;
    profileUsers?: Prisma.UserCreateNestedManyWithoutProfileImageInput;
    staffIdProofs?: Prisma.StaffCreateNestedManyWithoutIdProofImageInput;
    staffSignatures?: Prisma.StaffCreateNestedManyWithoutSignatureImageInput;
    customerIdProofs?: Prisma.CustomerCreateNestedManyWithoutIdProofImageInput;
    customerSignatures?: Prisma.CustomerCreateNestedManyWithoutSignatureImageInput;
};
export type ImageUncheckedCreateWithoutIssuesInput = {
    id?: string;
    url: string;
    altText?: string | null;
    isPrimary?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomTypeId?: string | null;
    profileUsers?: Prisma.UserUncheckedCreateNestedManyWithoutProfileImageInput;
    staffIdProofs?: Prisma.StaffUncheckedCreateNestedManyWithoutIdProofImageInput;
    staffSignatures?: Prisma.StaffUncheckedCreateNestedManyWithoutSignatureImageInput;
    customerIdProofs?: Prisma.CustomerUncheckedCreateNestedManyWithoutIdProofImageInput;
    customerSignatures?: Prisma.CustomerUncheckedCreateNestedManyWithoutSignatureImageInput;
};
export type ImageCreateOrConnectWithoutIssuesInput = {
    where: Prisma.ImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ImageCreateWithoutIssuesInput, Prisma.ImageUncheckedCreateWithoutIssuesInput>;
};
export type ImageUpsertWithoutIssuesInput = {
    update: Prisma.XOR<Prisma.ImageUpdateWithoutIssuesInput, Prisma.ImageUncheckedUpdateWithoutIssuesInput>;
    create: Prisma.XOR<Prisma.ImageCreateWithoutIssuesInput, Prisma.ImageUncheckedCreateWithoutIssuesInput>;
    where?: Prisma.ImageWhereInput;
};
export type ImageUpdateToOneWithWhereWithoutIssuesInput = {
    where?: Prisma.ImageWhereInput;
    data: Prisma.XOR<Prisma.ImageUpdateWithoutIssuesInput, Prisma.ImageUncheckedUpdateWithoutIssuesInput>;
};
export type ImageUpdateWithoutIssuesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomType?: Prisma.RoomTypeUpdateOneWithoutImagesNestedInput;
    profileUsers?: Prisma.UserUpdateManyWithoutProfileImageNestedInput;
    staffIdProofs?: Prisma.StaffUpdateManyWithoutIdProofImageNestedInput;
    staffSignatures?: Prisma.StaffUpdateManyWithoutSignatureImageNestedInput;
    customerIdProofs?: Prisma.CustomerUpdateManyWithoutIdProofImageNestedInput;
    customerSignatures?: Prisma.CustomerUpdateManyWithoutSignatureImageNestedInput;
};
export type ImageUncheckedUpdateWithoutIssuesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomTypeId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profileUsers?: Prisma.UserUncheckedUpdateManyWithoutProfileImageNestedInput;
    staffIdProofs?: Prisma.StaffUncheckedUpdateManyWithoutIdProofImageNestedInput;
    staffSignatures?: Prisma.StaffUncheckedUpdateManyWithoutSignatureImageNestedInput;
    customerIdProofs?: Prisma.CustomerUncheckedUpdateManyWithoutIdProofImageNestedInput;
    customerSignatures?: Prisma.CustomerUncheckedUpdateManyWithoutSignatureImageNestedInput;
};
export type ImageCreateManyRoomTypeInput = {
    id?: string;
    url: string;
    altText?: string | null;
    isPrimary?: boolean;
    sortOrder?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ImageUpdateWithoutRoomTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profileUsers?: Prisma.UserUpdateManyWithoutProfileImageNestedInput;
    issues?: Prisma.IssueUpdateManyWithoutImageNestedInput;
    staffIdProofs?: Prisma.StaffUpdateManyWithoutIdProofImageNestedInput;
    staffSignatures?: Prisma.StaffUpdateManyWithoutSignatureImageNestedInput;
    customerIdProofs?: Prisma.CustomerUpdateManyWithoutIdProofImageNestedInput;
    customerSignatures?: Prisma.CustomerUpdateManyWithoutSignatureImageNestedInput;
};
export type ImageUncheckedUpdateWithoutRoomTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    profileUsers?: Prisma.UserUncheckedUpdateManyWithoutProfileImageNestedInput;
    issues?: Prisma.IssueUncheckedUpdateManyWithoutImageNestedInput;
    staffIdProofs?: Prisma.StaffUncheckedUpdateManyWithoutIdProofImageNestedInput;
    staffSignatures?: Prisma.StaffUncheckedUpdateManyWithoutSignatureImageNestedInput;
    customerIdProofs?: Prisma.CustomerUncheckedUpdateManyWithoutIdProofImageNestedInput;
    customerSignatures?: Prisma.CustomerUncheckedUpdateManyWithoutSignatureImageNestedInput;
};
export type ImageUncheckedUpdateManyWithoutRoomTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    altText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPrimary?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    sortOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ImageCountOutputType = {
    profileUsers: number;
    issues: number;
    staffIdProofs: number;
    staffSignatures: number;
    customerIdProofs: number;
    customerSignatures: number;
};
export type ImageCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    profileUsers?: boolean | ImageCountOutputTypeCountProfileUsersArgs;
    issues?: boolean | ImageCountOutputTypeCountIssuesArgs;
    staffIdProofs?: boolean | ImageCountOutputTypeCountStaffIdProofsArgs;
    staffSignatures?: boolean | ImageCountOutputTypeCountStaffSignaturesArgs;
    customerIdProofs?: boolean | ImageCountOutputTypeCountCustomerIdProofsArgs;
    customerSignatures?: boolean | ImageCountOutputTypeCountCustomerSignaturesArgs;
};
export type ImageCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageCountOutputTypeSelect<ExtArgs> | null;
};
export type ImageCountOutputTypeCountProfileUsersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
};
export type ImageCountOutputTypeCountIssuesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IssueWhereInput;
};
export type ImageCountOutputTypeCountStaffIdProofsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StaffWhereInput;
};
export type ImageCountOutputTypeCountStaffSignaturesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StaffWhereInput;
};
export type ImageCountOutputTypeCountCustomerIdProofsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CustomerWhereInput;
};
export type ImageCountOutputTypeCountCustomerSignaturesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CustomerWhereInput;
};
export type ImageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    url?: boolean;
    altText?: boolean;
    isPrimary?: boolean;
    sortOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    roomTypeId?: boolean;
    roomType?: boolean | Prisma.Image$roomTypeArgs<ExtArgs>;
    profileUsers?: boolean | Prisma.Image$profileUsersArgs<ExtArgs>;
    issues?: boolean | Prisma.Image$issuesArgs<ExtArgs>;
    staffIdProofs?: boolean | Prisma.Image$staffIdProofsArgs<ExtArgs>;
    staffSignatures?: boolean | Prisma.Image$staffSignaturesArgs<ExtArgs>;
    customerIdProofs?: boolean | Prisma.Image$customerIdProofsArgs<ExtArgs>;
    customerSignatures?: boolean | Prisma.Image$customerSignaturesArgs<ExtArgs>;
    _count?: boolean | Prisma.ImageCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["image"]>;
export type ImageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    url?: boolean;
    altText?: boolean;
    isPrimary?: boolean;
    sortOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    roomTypeId?: boolean;
    roomType?: boolean | Prisma.Image$roomTypeArgs<ExtArgs>;
}, ExtArgs["result"]["image"]>;
export type ImageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    url?: boolean;
    altText?: boolean;
    isPrimary?: boolean;
    sortOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    roomTypeId?: boolean;
    roomType?: boolean | Prisma.Image$roomTypeArgs<ExtArgs>;
}, ExtArgs["result"]["image"]>;
export type ImageSelectScalar = {
    id?: boolean;
    url?: boolean;
    altText?: boolean;
    isPrimary?: boolean;
    sortOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    roomTypeId?: boolean;
};
export type ImageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "url" | "altText" | "isPrimary" | "sortOrder" | "createdAt" | "updatedAt" | "roomTypeId", ExtArgs["result"]["image"]>;
export type ImageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    roomType?: boolean | Prisma.Image$roomTypeArgs<ExtArgs>;
    profileUsers?: boolean | Prisma.Image$profileUsersArgs<ExtArgs>;
    issues?: boolean | Prisma.Image$issuesArgs<ExtArgs>;
    staffIdProofs?: boolean | Prisma.Image$staffIdProofsArgs<ExtArgs>;
    staffSignatures?: boolean | Prisma.Image$staffSignaturesArgs<ExtArgs>;
    customerIdProofs?: boolean | Prisma.Image$customerIdProofsArgs<ExtArgs>;
    customerSignatures?: boolean | Prisma.Image$customerSignaturesArgs<ExtArgs>;
    _count?: boolean | Prisma.ImageCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ImageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    roomType?: boolean | Prisma.Image$roomTypeArgs<ExtArgs>;
};
export type ImageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    roomType?: boolean | Prisma.Image$roomTypeArgs<ExtArgs>;
};
export type $ImagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Image";
    objects: {
        roomType: Prisma.$RoomTypePayload<ExtArgs> | null;
        profileUsers: Prisma.$UserPayload<ExtArgs>[];
        issues: Prisma.$IssuePayload<ExtArgs>[];
        staffIdProofs: Prisma.$StaffPayload<ExtArgs>[];
        staffSignatures: Prisma.$StaffPayload<ExtArgs>[];
        customerIdProofs: Prisma.$CustomerPayload<ExtArgs>[];
        customerSignatures: Prisma.$CustomerPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        url: string;
        altText: string | null;
        isPrimary: boolean;
        sortOrder: number;
        createdAt: Date;
        updatedAt: Date;
        roomTypeId: string | null;
    }, ExtArgs["result"]["image"]>;
    composites: {};
};
export type ImageGetPayload<S extends boolean | null | undefined | ImageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ImagePayload, S>;
export type ImageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ImageCountAggregateInputType | true;
};
export interface ImageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Image'];
        meta: {
            name: 'Image';
        };
    };
    findUnique<T extends ImageFindUniqueArgs>(args: Prisma.SelectSubset<T, ImageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ImageClient<runtime.Types.Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ImageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ImageClient<runtime.Types.Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ImageFindFirstArgs>(args?: Prisma.SelectSubset<T, ImageFindFirstArgs<ExtArgs>>): Prisma.Prisma__ImageClient<runtime.Types.Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ImageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ImageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ImageClient<runtime.Types.Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ImageFindManyArgs>(args?: Prisma.SelectSubset<T, ImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ImageCreateArgs>(args: Prisma.SelectSubset<T, ImageCreateArgs<ExtArgs>>): Prisma.Prisma__ImageClient<runtime.Types.Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ImageCreateManyArgs>(args?: Prisma.SelectSubset<T, ImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ImageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ImageDeleteArgs>(args: Prisma.SelectSubset<T, ImageDeleteArgs<ExtArgs>>): Prisma.Prisma__ImageClient<runtime.Types.Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ImageUpdateArgs>(args: Prisma.SelectSubset<T, ImageUpdateArgs<ExtArgs>>): Prisma.Prisma__ImageClient<runtime.Types.Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ImageDeleteManyArgs>(args?: Prisma.SelectSubset<T, ImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ImageUpdateManyArgs>(args: Prisma.SelectSubset<T, ImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ImageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ImageUpsertArgs>(args: Prisma.SelectSubset<T, ImageUpsertArgs<ExtArgs>>): Prisma.Prisma__ImageClient<runtime.Types.Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ImageCountArgs>(args?: Prisma.Subset<T, ImageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ImageCountAggregateOutputType> : number>;
    aggregate<T extends ImageAggregateArgs>(args: Prisma.Subset<T, ImageAggregateArgs>): Prisma.PrismaPromise<GetImageAggregateType<T>>;
    groupBy<T extends ImageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ImageGroupByArgs['orderBy'];
    } : {
        orderBy?: ImageGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ImageFieldRefs;
}
export interface Prisma__ImageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    roomType<T extends Prisma.Image$roomTypeArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Image$roomTypeArgs<ExtArgs>>): Prisma.Prisma__RoomTypeClient<runtime.Types.Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    profileUsers<T extends Prisma.Image$profileUsersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Image$profileUsersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    issues<T extends Prisma.Image$issuesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Image$issuesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    staffIdProofs<T extends Prisma.Image$staffIdProofsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Image$staffIdProofsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    staffSignatures<T extends Prisma.Image$staffSignaturesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Image$staffSignaturesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    customerIdProofs<T extends Prisma.Image$customerIdProofsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Image$customerIdProofsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    customerSignatures<T extends Prisma.Image$customerSignaturesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Image$customerSignaturesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ImageFieldRefs {
    readonly id: Prisma.FieldRef<"Image", 'String'>;
    readonly url: Prisma.FieldRef<"Image", 'String'>;
    readonly altText: Prisma.FieldRef<"Image", 'String'>;
    readonly isPrimary: Prisma.FieldRef<"Image", 'Boolean'>;
    readonly sortOrder: Prisma.FieldRef<"Image", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Image", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Image", 'DateTime'>;
    readonly roomTypeId: Prisma.FieldRef<"Image", 'String'>;
}
export type ImageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageSelect<ExtArgs> | null;
    omit?: Prisma.ImageOmit<ExtArgs> | null;
    include?: Prisma.ImageInclude<ExtArgs> | null;
    where: Prisma.ImageWhereUniqueInput;
};
export type ImageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageSelect<ExtArgs> | null;
    omit?: Prisma.ImageOmit<ExtArgs> | null;
    include?: Prisma.ImageInclude<ExtArgs> | null;
    where: Prisma.ImageWhereUniqueInput;
};
export type ImageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageSelect<ExtArgs> | null;
    omit?: Prisma.ImageOmit<ExtArgs> | null;
    include?: Prisma.ImageInclude<ExtArgs> | null;
    where?: Prisma.ImageWhereInput;
    orderBy?: Prisma.ImageOrderByWithRelationInput | Prisma.ImageOrderByWithRelationInput[];
    cursor?: Prisma.ImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ImageScalarFieldEnum | Prisma.ImageScalarFieldEnum[];
};
export type ImageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageSelect<ExtArgs> | null;
    omit?: Prisma.ImageOmit<ExtArgs> | null;
    include?: Prisma.ImageInclude<ExtArgs> | null;
    where?: Prisma.ImageWhereInput;
    orderBy?: Prisma.ImageOrderByWithRelationInput | Prisma.ImageOrderByWithRelationInput[];
    cursor?: Prisma.ImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ImageScalarFieldEnum | Prisma.ImageScalarFieldEnum[];
};
export type ImageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageSelect<ExtArgs> | null;
    omit?: Prisma.ImageOmit<ExtArgs> | null;
    include?: Prisma.ImageInclude<ExtArgs> | null;
    where?: Prisma.ImageWhereInput;
    orderBy?: Prisma.ImageOrderByWithRelationInput | Prisma.ImageOrderByWithRelationInput[];
    cursor?: Prisma.ImageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ImageScalarFieldEnum | Prisma.ImageScalarFieldEnum[];
};
export type ImageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageSelect<ExtArgs> | null;
    omit?: Prisma.ImageOmit<ExtArgs> | null;
    include?: Prisma.ImageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ImageCreateInput, Prisma.ImageUncheckedCreateInput>;
};
export type ImageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ImageCreateManyInput | Prisma.ImageCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ImageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ImageOmit<ExtArgs> | null;
    data: Prisma.ImageCreateManyInput | Prisma.ImageCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ImageIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ImageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageSelect<ExtArgs> | null;
    omit?: Prisma.ImageOmit<ExtArgs> | null;
    include?: Prisma.ImageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ImageUpdateInput, Prisma.ImageUncheckedUpdateInput>;
    where: Prisma.ImageWhereUniqueInput;
};
export type ImageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ImageUpdateManyMutationInput, Prisma.ImageUncheckedUpdateManyInput>;
    where?: Prisma.ImageWhereInput;
    limit?: number;
};
export type ImageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ImageOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ImageUpdateManyMutationInput, Prisma.ImageUncheckedUpdateManyInput>;
    where?: Prisma.ImageWhereInput;
    limit?: number;
    include?: Prisma.ImageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ImageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageSelect<ExtArgs> | null;
    omit?: Prisma.ImageOmit<ExtArgs> | null;
    include?: Prisma.ImageInclude<ExtArgs> | null;
    where: Prisma.ImageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ImageCreateInput, Prisma.ImageUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ImageUpdateInput, Prisma.ImageUncheckedUpdateInput>;
};
export type ImageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageSelect<ExtArgs> | null;
    omit?: Prisma.ImageOmit<ExtArgs> | null;
    include?: Prisma.ImageInclude<ExtArgs> | null;
    where: Prisma.ImageWhereUniqueInput;
};
export type ImageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ImageWhereInput;
    limit?: number;
};
export type Image$roomTypeArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomTypeSelect<ExtArgs> | null;
    omit?: Prisma.RoomTypeOmit<ExtArgs> | null;
    include?: Prisma.RoomTypeInclude<ExtArgs> | null;
    where?: Prisma.RoomTypeWhereInput;
};
export type Image$profileUsersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type Image$issuesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IssueSelect<ExtArgs> | null;
    omit?: Prisma.IssueOmit<ExtArgs> | null;
    include?: Prisma.IssueInclude<ExtArgs> | null;
    where?: Prisma.IssueWhereInput;
    orderBy?: Prisma.IssueOrderByWithRelationInput | Prisma.IssueOrderByWithRelationInput[];
    cursor?: Prisma.IssueWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IssueScalarFieldEnum | Prisma.IssueScalarFieldEnum[];
};
export type Image$staffIdProofsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelect<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    include?: Prisma.StaffInclude<ExtArgs> | null;
    where?: Prisma.StaffWhereInput;
    orderBy?: Prisma.StaffOrderByWithRelationInput | Prisma.StaffOrderByWithRelationInput[];
    cursor?: Prisma.StaffWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StaffScalarFieldEnum | Prisma.StaffScalarFieldEnum[];
};
export type Image$staffSignaturesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelect<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    include?: Prisma.StaffInclude<ExtArgs> | null;
    where?: Prisma.StaffWhereInput;
    orderBy?: Prisma.StaffOrderByWithRelationInput | Prisma.StaffOrderByWithRelationInput[];
    cursor?: Prisma.StaffWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StaffScalarFieldEnum | Prisma.StaffScalarFieldEnum[];
};
export type Image$customerIdProofsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Image$customerSignaturesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ImageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageSelect<ExtArgs> | null;
    omit?: Prisma.ImageOmit<ExtArgs> | null;
    include?: Prisma.ImageInclude<ExtArgs> | null;
};
