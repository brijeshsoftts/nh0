import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type StaffModel = runtime.Types.Result.DefaultSelection<Prisma.$StaffPayload>;
export type AggregateStaff = {
    _count: StaffCountAggregateOutputType | null;
    _min: StaffMinAggregateOutputType | null;
    _max: StaffMaxAggregateOutputType | null;
};
export type StaffMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    fatherName: string | null;
    motherName: string | null;
    idProofImageId: string | null;
    idProofNumber: string | null;
    qualification: string | null;
    experience: string | null;
    category: $Enums.Category | null;
    emergencyContact: string | null;
    address: string | null;
    signatureImageId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type StaffMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    fatherName: string | null;
    motherName: string | null;
    idProofImageId: string | null;
    idProofNumber: string | null;
    qualification: string | null;
    experience: string | null;
    category: $Enums.Category | null;
    emergencyContact: string | null;
    address: string | null;
    signatureImageId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type StaffCountAggregateOutputType = {
    id: number;
    userId: number;
    fatherName: number;
    motherName: number;
    idProofImageId: number;
    idProofNumber: number;
    qualification: number;
    experience: number;
    category: number;
    emergencyContact: number;
    address: number;
    signatureImageId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type StaffMinAggregateInputType = {
    id?: true;
    userId?: true;
    fatherName?: true;
    motherName?: true;
    idProofImageId?: true;
    idProofNumber?: true;
    qualification?: true;
    experience?: true;
    category?: true;
    emergencyContact?: true;
    address?: true;
    signatureImageId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type StaffMaxAggregateInputType = {
    id?: true;
    userId?: true;
    fatherName?: true;
    motherName?: true;
    idProofImageId?: true;
    idProofNumber?: true;
    qualification?: true;
    experience?: true;
    category?: true;
    emergencyContact?: true;
    address?: true;
    signatureImageId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type StaffCountAggregateInputType = {
    id?: true;
    userId?: true;
    fatherName?: true;
    motherName?: true;
    idProofImageId?: true;
    idProofNumber?: true;
    qualification?: true;
    experience?: true;
    category?: true;
    emergencyContact?: true;
    address?: true;
    signatureImageId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type StaffAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StaffWhereInput;
    orderBy?: Prisma.StaffOrderByWithRelationInput | Prisma.StaffOrderByWithRelationInput[];
    cursor?: Prisma.StaffWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | StaffCountAggregateInputType;
    _min?: StaffMinAggregateInputType;
    _max?: StaffMaxAggregateInputType;
};
export type GetStaffAggregateType<T extends StaffAggregateArgs> = {
    [P in keyof T & keyof AggregateStaff]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStaff[P]> : Prisma.GetScalarType<T[P], AggregateStaff[P]>;
};
export type StaffGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StaffWhereInput;
    orderBy?: Prisma.StaffOrderByWithAggregationInput | Prisma.StaffOrderByWithAggregationInput[];
    by: Prisma.StaffScalarFieldEnum[] | Prisma.StaffScalarFieldEnum;
    having?: Prisma.StaffScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StaffCountAggregateInputType | true;
    _min?: StaffMinAggregateInputType;
    _max?: StaffMaxAggregateInputType;
};
export type StaffGroupByOutputType = {
    id: string;
    userId: string;
    fatherName: string;
    motherName: string;
    idProofImageId: string | null;
    idProofNumber: string;
    qualification: string;
    experience: string;
    category: $Enums.Category;
    emergencyContact: string;
    address: string;
    signatureImageId: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: StaffCountAggregateOutputType | null;
    _min: StaffMinAggregateOutputType | null;
    _max: StaffMaxAggregateOutputType | null;
};
export type GetStaffGroupByPayload<T extends StaffGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StaffGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StaffGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StaffGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StaffGroupByOutputType[P]>;
}>>;
export type StaffWhereInput = {
    AND?: Prisma.StaffWhereInput | Prisma.StaffWhereInput[];
    OR?: Prisma.StaffWhereInput[];
    NOT?: Prisma.StaffWhereInput | Prisma.StaffWhereInput[];
    id?: Prisma.StringFilter<"Staff"> | string;
    userId?: Prisma.StringFilter<"Staff"> | string;
    fatherName?: Prisma.StringFilter<"Staff"> | string;
    motherName?: Prisma.StringFilter<"Staff"> | string;
    idProofImageId?: Prisma.StringNullableFilter<"Staff"> | string | null;
    idProofNumber?: Prisma.StringFilter<"Staff"> | string;
    qualification?: Prisma.StringFilter<"Staff"> | string;
    experience?: Prisma.StringFilter<"Staff"> | string;
    category?: Prisma.EnumCategoryFilter<"Staff"> | $Enums.Category;
    emergencyContact?: Prisma.StringFilter<"Staff"> | string;
    address?: Prisma.StringFilter<"Staff"> | string;
    signatureImageId?: Prisma.StringNullableFilter<"Staff"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Staff"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Staff"> | Date | string;
    signatureImage?: Prisma.XOR<Prisma.ImageNullableScalarRelationFilter, Prisma.ImageWhereInput> | null;
    idProofImage?: Prisma.XOR<Prisma.ImageNullableScalarRelationFilter, Prisma.ImageWhereInput> | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type StaffOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    fatherName?: Prisma.SortOrder;
    motherName?: Prisma.SortOrder;
    idProofImageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    idProofNumber?: Prisma.SortOrder;
    qualification?: Prisma.SortOrder;
    experience?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    emergencyContact?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    signatureImageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    signatureImage?: Prisma.ImageOrderByWithRelationInput;
    idProofImage?: Prisma.ImageOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type StaffWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.StaffWhereInput | Prisma.StaffWhereInput[];
    OR?: Prisma.StaffWhereInput[];
    NOT?: Prisma.StaffWhereInput | Prisma.StaffWhereInput[];
    fatherName?: Prisma.StringFilter<"Staff"> | string;
    motherName?: Prisma.StringFilter<"Staff"> | string;
    idProofImageId?: Prisma.StringNullableFilter<"Staff"> | string | null;
    idProofNumber?: Prisma.StringFilter<"Staff"> | string;
    qualification?: Prisma.StringFilter<"Staff"> | string;
    experience?: Prisma.StringFilter<"Staff"> | string;
    category?: Prisma.EnumCategoryFilter<"Staff"> | $Enums.Category;
    emergencyContact?: Prisma.StringFilter<"Staff"> | string;
    address?: Prisma.StringFilter<"Staff"> | string;
    signatureImageId?: Prisma.StringNullableFilter<"Staff"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Staff"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Staff"> | Date | string;
    signatureImage?: Prisma.XOR<Prisma.ImageNullableScalarRelationFilter, Prisma.ImageWhereInput> | null;
    idProofImage?: Prisma.XOR<Prisma.ImageNullableScalarRelationFilter, Prisma.ImageWhereInput> | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type StaffOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    fatherName?: Prisma.SortOrder;
    motherName?: Prisma.SortOrder;
    idProofImageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    idProofNumber?: Prisma.SortOrder;
    qualification?: Prisma.SortOrder;
    experience?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    emergencyContact?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    signatureImageId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.StaffCountOrderByAggregateInput;
    _max?: Prisma.StaffMaxOrderByAggregateInput;
    _min?: Prisma.StaffMinOrderByAggregateInput;
};
export type StaffScalarWhereWithAggregatesInput = {
    AND?: Prisma.StaffScalarWhereWithAggregatesInput | Prisma.StaffScalarWhereWithAggregatesInput[];
    OR?: Prisma.StaffScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StaffScalarWhereWithAggregatesInput | Prisma.StaffScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Staff"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Staff"> | string;
    fatherName?: Prisma.StringWithAggregatesFilter<"Staff"> | string;
    motherName?: Prisma.StringWithAggregatesFilter<"Staff"> | string;
    idProofImageId?: Prisma.StringNullableWithAggregatesFilter<"Staff"> | string | null;
    idProofNumber?: Prisma.StringWithAggregatesFilter<"Staff"> | string;
    qualification?: Prisma.StringWithAggregatesFilter<"Staff"> | string;
    experience?: Prisma.StringWithAggregatesFilter<"Staff"> | string;
    category?: Prisma.EnumCategoryWithAggregatesFilter<"Staff"> | $Enums.Category;
    emergencyContact?: Prisma.StringWithAggregatesFilter<"Staff"> | string;
    address?: Prisma.StringWithAggregatesFilter<"Staff"> | string;
    signatureImageId?: Prisma.StringNullableWithAggregatesFilter<"Staff"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Staff"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Staff"> | Date | string;
};
export type StaffCreateInput = {
    id?: string;
    fatherName: string;
    motherName: string;
    idProofNumber: string;
    qualification: string;
    experience: string;
    category: $Enums.Category;
    emergencyContact: string;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    signatureImage?: Prisma.ImageCreateNestedOneWithoutStaffSignaturesInput;
    idProofImage?: Prisma.ImageCreateNestedOneWithoutStaffIdProofsInput;
    user: Prisma.UserCreateNestedOneWithoutStaffInput;
};
export type StaffUncheckedCreateInput = {
    id?: string;
    userId: string;
    fatherName: string;
    motherName: string;
    idProofImageId?: string | null;
    idProofNumber: string;
    qualification: string;
    experience: string;
    category: $Enums.Category;
    emergencyContact: string;
    address: string;
    signatureImageId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StaffUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fatherName?: Prisma.StringFieldUpdateOperationsInput | string;
    motherName?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    qualification?: Prisma.StringFieldUpdateOperationsInput | string;
    experience?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    emergencyContact?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    signatureImage?: Prisma.ImageUpdateOneWithoutStaffSignaturesNestedInput;
    idProofImage?: Prisma.ImageUpdateOneWithoutStaffIdProofsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutStaffNestedInput;
};
export type StaffUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    fatherName?: Prisma.StringFieldUpdateOperationsInput | string;
    motherName?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    qualification?: Prisma.StringFieldUpdateOperationsInput | string;
    experience?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    emergencyContact?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    signatureImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StaffCreateManyInput = {
    id?: string;
    userId: string;
    fatherName: string;
    motherName: string;
    idProofImageId?: string | null;
    idProofNumber: string;
    qualification: string;
    experience: string;
    category: $Enums.Category;
    emergencyContact: string;
    address: string;
    signatureImageId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StaffUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fatherName?: Prisma.StringFieldUpdateOperationsInput | string;
    motherName?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    qualification?: Prisma.StringFieldUpdateOperationsInput | string;
    experience?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    emergencyContact?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StaffUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    fatherName?: Prisma.StringFieldUpdateOperationsInput | string;
    motherName?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    qualification?: Prisma.StringFieldUpdateOperationsInput | string;
    experience?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    emergencyContact?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    signatureImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StaffNullableScalarRelationFilter = {
    is?: Prisma.StaffWhereInput | null;
    isNot?: Prisma.StaffWhereInput | null;
};
export type StaffCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    fatherName?: Prisma.SortOrder;
    motherName?: Prisma.SortOrder;
    idProofImageId?: Prisma.SortOrder;
    idProofNumber?: Prisma.SortOrder;
    qualification?: Prisma.SortOrder;
    experience?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    emergencyContact?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    signatureImageId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StaffMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    fatherName?: Prisma.SortOrder;
    motherName?: Prisma.SortOrder;
    idProofImageId?: Prisma.SortOrder;
    idProofNumber?: Prisma.SortOrder;
    qualification?: Prisma.SortOrder;
    experience?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    emergencyContact?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    signatureImageId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StaffMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    fatherName?: Prisma.SortOrder;
    motherName?: Prisma.SortOrder;
    idProofImageId?: Prisma.SortOrder;
    idProofNumber?: Prisma.SortOrder;
    qualification?: Prisma.SortOrder;
    experience?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    emergencyContact?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    signatureImageId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StaffListRelationFilter = {
    every?: Prisma.StaffWhereInput;
    some?: Prisma.StaffWhereInput;
    none?: Prisma.StaffWhereInput;
};
export type StaffOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StaffCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StaffCreateWithoutUserInput, Prisma.StaffUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StaffCreateOrConnectWithoutUserInput;
    connect?: Prisma.StaffWhereUniqueInput;
};
export type StaffUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.StaffCreateWithoutUserInput, Prisma.StaffUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StaffCreateOrConnectWithoutUserInput;
    connect?: Prisma.StaffWhereUniqueInput;
};
export type StaffUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StaffCreateWithoutUserInput, Prisma.StaffUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StaffCreateOrConnectWithoutUserInput;
    upsert?: Prisma.StaffUpsertWithoutUserInput;
    disconnect?: Prisma.StaffWhereInput | boolean;
    delete?: Prisma.StaffWhereInput | boolean;
    connect?: Prisma.StaffWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StaffUpdateToOneWithWhereWithoutUserInput, Prisma.StaffUpdateWithoutUserInput>, Prisma.StaffUncheckedUpdateWithoutUserInput>;
};
export type StaffUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.StaffCreateWithoutUserInput, Prisma.StaffUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.StaffCreateOrConnectWithoutUserInput;
    upsert?: Prisma.StaffUpsertWithoutUserInput;
    disconnect?: Prisma.StaffWhereInput | boolean;
    delete?: Prisma.StaffWhereInput | boolean;
    connect?: Prisma.StaffWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StaffUpdateToOneWithWhereWithoutUserInput, Prisma.StaffUpdateWithoutUserInput>, Prisma.StaffUncheckedUpdateWithoutUserInput>;
};
export type EnumCategoryFieldUpdateOperationsInput = {
    set?: $Enums.Category;
};
export type StaffCreateNestedManyWithoutIdProofImageInput = {
    create?: Prisma.XOR<Prisma.StaffCreateWithoutIdProofImageInput, Prisma.StaffUncheckedCreateWithoutIdProofImageInput> | Prisma.StaffCreateWithoutIdProofImageInput[] | Prisma.StaffUncheckedCreateWithoutIdProofImageInput[];
    connectOrCreate?: Prisma.StaffCreateOrConnectWithoutIdProofImageInput | Prisma.StaffCreateOrConnectWithoutIdProofImageInput[];
    createMany?: Prisma.StaffCreateManyIdProofImageInputEnvelope;
    connect?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
};
export type StaffCreateNestedManyWithoutSignatureImageInput = {
    create?: Prisma.XOR<Prisma.StaffCreateWithoutSignatureImageInput, Prisma.StaffUncheckedCreateWithoutSignatureImageInput> | Prisma.StaffCreateWithoutSignatureImageInput[] | Prisma.StaffUncheckedCreateWithoutSignatureImageInput[];
    connectOrCreate?: Prisma.StaffCreateOrConnectWithoutSignatureImageInput | Prisma.StaffCreateOrConnectWithoutSignatureImageInput[];
    createMany?: Prisma.StaffCreateManySignatureImageInputEnvelope;
    connect?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
};
export type StaffUncheckedCreateNestedManyWithoutIdProofImageInput = {
    create?: Prisma.XOR<Prisma.StaffCreateWithoutIdProofImageInput, Prisma.StaffUncheckedCreateWithoutIdProofImageInput> | Prisma.StaffCreateWithoutIdProofImageInput[] | Prisma.StaffUncheckedCreateWithoutIdProofImageInput[];
    connectOrCreate?: Prisma.StaffCreateOrConnectWithoutIdProofImageInput | Prisma.StaffCreateOrConnectWithoutIdProofImageInput[];
    createMany?: Prisma.StaffCreateManyIdProofImageInputEnvelope;
    connect?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
};
export type StaffUncheckedCreateNestedManyWithoutSignatureImageInput = {
    create?: Prisma.XOR<Prisma.StaffCreateWithoutSignatureImageInput, Prisma.StaffUncheckedCreateWithoutSignatureImageInput> | Prisma.StaffCreateWithoutSignatureImageInput[] | Prisma.StaffUncheckedCreateWithoutSignatureImageInput[];
    connectOrCreate?: Prisma.StaffCreateOrConnectWithoutSignatureImageInput | Prisma.StaffCreateOrConnectWithoutSignatureImageInput[];
    createMany?: Prisma.StaffCreateManySignatureImageInputEnvelope;
    connect?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
};
export type StaffUpdateManyWithoutIdProofImageNestedInput = {
    create?: Prisma.XOR<Prisma.StaffCreateWithoutIdProofImageInput, Prisma.StaffUncheckedCreateWithoutIdProofImageInput> | Prisma.StaffCreateWithoutIdProofImageInput[] | Prisma.StaffUncheckedCreateWithoutIdProofImageInput[];
    connectOrCreate?: Prisma.StaffCreateOrConnectWithoutIdProofImageInput | Prisma.StaffCreateOrConnectWithoutIdProofImageInput[];
    upsert?: Prisma.StaffUpsertWithWhereUniqueWithoutIdProofImageInput | Prisma.StaffUpsertWithWhereUniqueWithoutIdProofImageInput[];
    createMany?: Prisma.StaffCreateManyIdProofImageInputEnvelope;
    set?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
    disconnect?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
    delete?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
    connect?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
    update?: Prisma.StaffUpdateWithWhereUniqueWithoutIdProofImageInput | Prisma.StaffUpdateWithWhereUniqueWithoutIdProofImageInput[];
    updateMany?: Prisma.StaffUpdateManyWithWhereWithoutIdProofImageInput | Prisma.StaffUpdateManyWithWhereWithoutIdProofImageInput[];
    deleteMany?: Prisma.StaffScalarWhereInput | Prisma.StaffScalarWhereInput[];
};
export type StaffUpdateManyWithoutSignatureImageNestedInput = {
    create?: Prisma.XOR<Prisma.StaffCreateWithoutSignatureImageInput, Prisma.StaffUncheckedCreateWithoutSignatureImageInput> | Prisma.StaffCreateWithoutSignatureImageInput[] | Prisma.StaffUncheckedCreateWithoutSignatureImageInput[];
    connectOrCreate?: Prisma.StaffCreateOrConnectWithoutSignatureImageInput | Prisma.StaffCreateOrConnectWithoutSignatureImageInput[];
    upsert?: Prisma.StaffUpsertWithWhereUniqueWithoutSignatureImageInput | Prisma.StaffUpsertWithWhereUniqueWithoutSignatureImageInput[];
    createMany?: Prisma.StaffCreateManySignatureImageInputEnvelope;
    set?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
    disconnect?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
    delete?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
    connect?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
    update?: Prisma.StaffUpdateWithWhereUniqueWithoutSignatureImageInput | Prisma.StaffUpdateWithWhereUniqueWithoutSignatureImageInput[];
    updateMany?: Prisma.StaffUpdateManyWithWhereWithoutSignatureImageInput | Prisma.StaffUpdateManyWithWhereWithoutSignatureImageInput[];
    deleteMany?: Prisma.StaffScalarWhereInput | Prisma.StaffScalarWhereInput[];
};
export type StaffUncheckedUpdateManyWithoutIdProofImageNestedInput = {
    create?: Prisma.XOR<Prisma.StaffCreateWithoutIdProofImageInput, Prisma.StaffUncheckedCreateWithoutIdProofImageInput> | Prisma.StaffCreateWithoutIdProofImageInput[] | Prisma.StaffUncheckedCreateWithoutIdProofImageInput[];
    connectOrCreate?: Prisma.StaffCreateOrConnectWithoutIdProofImageInput | Prisma.StaffCreateOrConnectWithoutIdProofImageInput[];
    upsert?: Prisma.StaffUpsertWithWhereUniqueWithoutIdProofImageInput | Prisma.StaffUpsertWithWhereUniqueWithoutIdProofImageInput[];
    createMany?: Prisma.StaffCreateManyIdProofImageInputEnvelope;
    set?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
    disconnect?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
    delete?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
    connect?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
    update?: Prisma.StaffUpdateWithWhereUniqueWithoutIdProofImageInput | Prisma.StaffUpdateWithWhereUniqueWithoutIdProofImageInput[];
    updateMany?: Prisma.StaffUpdateManyWithWhereWithoutIdProofImageInput | Prisma.StaffUpdateManyWithWhereWithoutIdProofImageInput[];
    deleteMany?: Prisma.StaffScalarWhereInput | Prisma.StaffScalarWhereInput[];
};
export type StaffUncheckedUpdateManyWithoutSignatureImageNestedInput = {
    create?: Prisma.XOR<Prisma.StaffCreateWithoutSignatureImageInput, Prisma.StaffUncheckedCreateWithoutSignatureImageInput> | Prisma.StaffCreateWithoutSignatureImageInput[] | Prisma.StaffUncheckedCreateWithoutSignatureImageInput[];
    connectOrCreate?: Prisma.StaffCreateOrConnectWithoutSignatureImageInput | Prisma.StaffCreateOrConnectWithoutSignatureImageInput[];
    upsert?: Prisma.StaffUpsertWithWhereUniqueWithoutSignatureImageInput | Prisma.StaffUpsertWithWhereUniqueWithoutSignatureImageInput[];
    createMany?: Prisma.StaffCreateManySignatureImageInputEnvelope;
    set?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
    disconnect?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
    delete?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
    connect?: Prisma.StaffWhereUniqueInput | Prisma.StaffWhereUniqueInput[];
    update?: Prisma.StaffUpdateWithWhereUniqueWithoutSignatureImageInput | Prisma.StaffUpdateWithWhereUniqueWithoutSignatureImageInput[];
    updateMany?: Prisma.StaffUpdateManyWithWhereWithoutSignatureImageInput | Prisma.StaffUpdateManyWithWhereWithoutSignatureImageInput[];
    deleteMany?: Prisma.StaffScalarWhereInput | Prisma.StaffScalarWhereInput[];
};
export type StaffCreateWithoutUserInput = {
    id?: string;
    fatherName: string;
    motherName: string;
    idProofNumber: string;
    qualification: string;
    experience: string;
    category: $Enums.Category;
    emergencyContact: string;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    signatureImage?: Prisma.ImageCreateNestedOneWithoutStaffSignaturesInput;
    idProofImage?: Prisma.ImageCreateNestedOneWithoutStaffIdProofsInput;
};
export type StaffUncheckedCreateWithoutUserInput = {
    id?: string;
    fatherName: string;
    motherName: string;
    idProofImageId?: string | null;
    idProofNumber: string;
    qualification: string;
    experience: string;
    category: $Enums.Category;
    emergencyContact: string;
    address: string;
    signatureImageId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StaffCreateOrConnectWithoutUserInput = {
    where: Prisma.StaffWhereUniqueInput;
    create: Prisma.XOR<Prisma.StaffCreateWithoutUserInput, Prisma.StaffUncheckedCreateWithoutUserInput>;
};
export type StaffUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.StaffUpdateWithoutUserInput, Prisma.StaffUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.StaffCreateWithoutUserInput, Prisma.StaffUncheckedCreateWithoutUserInput>;
    where?: Prisma.StaffWhereInput;
};
export type StaffUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.StaffWhereInput;
    data: Prisma.XOR<Prisma.StaffUpdateWithoutUserInput, Prisma.StaffUncheckedUpdateWithoutUserInput>;
};
export type StaffUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fatherName?: Prisma.StringFieldUpdateOperationsInput | string;
    motherName?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    qualification?: Prisma.StringFieldUpdateOperationsInput | string;
    experience?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    emergencyContact?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    signatureImage?: Prisma.ImageUpdateOneWithoutStaffSignaturesNestedInput;
    idProofImage?: Prisma.ImageUpdateOneWithoutStaffIdProofsNestedInput;
};
export type StaffUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fatherName?: Prisma.StringFieldUpdateOperationsInput | string;
    motherName?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    qualification?: Prisma.StringFieldUpdateOperationsInput | string;
    experience?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    emergencyContact?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    signatureImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StaffCreateWithoutIdProofImageInput = {
    id?: string;
    fatherName: string;
    motherName: string;
    idProofNumber: string;
    qualification: string;
    experience: string;
    category: $Enums.Category;
    emergencyContact: string;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    signatureImage?: Prisma.ImageCreateNestedOneWithoutStaffSignaturesInput;
    user: Prisma.UserCreateNestedOneWithoutStaffInput;
};
export type StaffUncheckedCreateWithoutIdProofImageInput = {
    id?: string;
    userId: string;
    fatherName: string;
    motherName: string;
    idProofNumber: string;
    qualification: string;
    experience: string;
    category: $Enums.Category;
    emergencyContact: string;
    address: string;
    signatureImageId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StaffCreateOrConnectWithoutIdProofImageInput = {
    where: Prisma.StaffWhereUniqueInput;
    create: Prisma.XOR<Prisma.StaffCreateWithoutIdProofImageInput, Prisma.StaffUncheckedCreateWithoutIdProofImageInput>;
};
export type StaffCreateManyIdProofImageInputEnvelope = {
    data: Prisma.StaffCreateManyIdProofImageInput | Prisma.StaffCreateManyIdProofImageInput[];
    skipDuplicates?: boolean;
};
export type StaffCreateWithoutSignatureImageInput = {
    id?: string;
    fatherName: string;
    motherName: string;
    idProofNumber: string;
    qualification: string;
    experience: string;
    category: $Enums.Category;
    emergencyContact: string;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    idProofImage?: Prisma.ImageCreateNestedOneWithoutStaffIdProofsInput;
    user: Prisma.UserCreateNestedOneWithoutStaffInput;
};
export type StaffUncheckedCreateWithoutSignatureImageInput = {
    id?: string;
    userId: string;
    fatherName: string;
    motherName: string;
    idProofImageId?: string | null;
    idProofNumber: string;
    qualification: string;
    experience: string;
    category: $Enums.Category;
    emergencyContact: string;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StaffCreateOrConnectWithoutSignatureImageInput = {
    where: Prisma.StaffWhereUniqueInput;
    create: Prisma.XOR<Prisma.StaffCreateWithoutSignatureImageInput, Prisma.StaffUncheckedCreateWithoutSignatureImageInput>;
};
export type StaffCreateManySignatureImageInputEnvelope = {
    data: Prisma.StaffCreateManySignatureImageInput | Prisma.StaffCreateManySignatureImageInput[];
    skipDuplicates?: boolean;
};
export type StaffUpsertWithWhereUniqueWithoutIdProofImageInput = {
    where: Prisma.StaffWhereUniqueInput;
    update: Prisma.XOR<Prisma.StaffUpdateWithoutIdProofImageInput, Prisma.StaffUncheckedUpdateWithoutIdProofImageInput>;
    create: Prisma.XOR<Prisma.StaffCreateWithoutIdProofImageInput, Prisma.StaffUncheckedCreateWithoutIdProofImageInput>;
};
export type StaffUpdateWithWhereUniqueWithoutIdProofImageInput = {
    where: Prisma.StaffWhereUniqueInput;
    data: Prisma.XOR<Prisma.StaffUpdateWithoutIdProofImageInput, Prisma.StaffUncheckedUpdateWithoutIdProofImageInput>;
};
export type StaffUpdateManyWithWhereWithoutIdProofImageInput = {
    where: Prisma.StaffScalarWhereInput;
    data: Prisma.XOR<Prisma.StaffUpdateManyMutationInput, Prisma.StaffUncheckedUpdateManyWithoutIdProofImageInput>;
};
export type StaffScalarWhereInput = {
    AND?: Prisma.StaffScalarWhereInput | Prisma.StaffScalarWhereInput[];
    OR?: Prisma.StaffScalarWhereInput[];
    NOT?: Prisma.StaffScalarWhereInput | Prisma.StaffScalarWhereInput[];
    id?: Prisma.StringFilter<"Staff"> | string;
    userId?: Prisma.StringFilter<"Staff"> | string;
    fatherName?: Prisma.StringFilter<"Staff"> | string;
    motherName?: Prisma.StringFilter<"Staff"> | string;
    idProofImageId?: Prisma.StringNullableFilter<"Staff"> | string | null;
    idProofNumber?: Prisma.StringFilter<"Staff"> | string;
    qualification?: Prisma.StringFilter<"Staff"> | string;
    experience?: Prisma.StringFilter<"Staff"> | string;
    category?: Prisma.EnumCategoryFilter<"Staff"> | $Enums.Category;
    emergencyContact?: Prisma.StringFilter<"Staff"> | string;
    address?: Prisma.StringFilter<"Staff"> | string;
    signatureImageId?: Prisma.StringNullableFilter<"Staff"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Staff"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Staff"> | Date | string;
};
export type StaffUpsertWithWhereUniqueWithoutSignatureImageInput = {
    where: Prisma.StaffWhereUniqueInput;
    update: Prisma.XOR<Prisma.StaffUpdateWithoutSignatureImageInput, Prisma.StaffUncheckedUpdateWithoutSignatureImageInput>;
    create: Prisma.XOR<Prisma.StaffCreateWithoutSignatureImageInput, Prisma.StaffUncheckedCreateWithoutSignatureImageInput>;
};
export type StaffUpdateWithWhereUniqueWithoutSignatureImageInput = {
    where: Prisma.StaffWhereUniqueInput;
    data: Prisma.XOR<Prisma.StaffUpdateWithoutSignatureImageInput, Prisma.StaffUncheckedUpdateWithoutSignatureImageInput>;
};
export type StaffUpdateManyWithWhereWithoutSignatureImageInput = {
    where: Prisma.StaffScalarWhereInput;
    data: Prisma.XOR<Prisma.StaffUpdateManyMutationInput, Prisma.StaffUncheckedUpdateManyWithoutSignatureImageInput>;
};
export type StaffCreateManyIdProofImageInput = {
    id?: string;
    userId: string;
    fatherName: string;
    motherName: string;
    idProofNumber: string;
    qualification: string;
    experience: string;
    category: $Enums.Category;
    emergencyContact: string;
    address: string;
    signatureImageId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StaffCreateManySignatureImageInput = {
    id?: string;
    userId: string;
    fatherName: string;
    motherName: string;
    idProofImageId?: string | null;
    idProofNumber: string;
    qualification: string;
    experience: string;
    category: $Enums.Category;
    emergencyContact: string;
    address: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StaffUpdateWithoutIdProofImageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fatherName?: Prisma.StringFieldUpdateOperationsInput | string;
    motherName?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    qualification?: Prisma.StringFieldUpdateOperationsInput | string;
    experience?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    emergencyContact?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    signatureImage?: Prisma.ImageUpdateOneWithoutStaffSignaturesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutStaffNestedInput;
};
export type StaffUncheckedUpdateWithoutIdProofImageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    fatherName?: Prisma.StringFieldUpdateOperationsInput | string;
    motherName?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    qualification?: Prisma.StringFieldUpdateOperationsInput | string;
    experience?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    emergencyContact?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    signatureImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StaffUncheckedUpdateManyWithoutIdProofImageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    fatherName?: Prisma.StringFieldUpdateOperationsInput | string;
    motherName?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    qualification?: Prisma.StringFieldUpdateOperationsInput | string;
    experience?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    emergencyContact?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    signatureImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StaffUpdateWithoutSignatureImageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fatherName?: Prisma.StringFieldUpdateOperationsInput | string;
    motherName?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    qualification?: Prisma.StringFieldUpdateOperationsInput | string;
    experience?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    emergencyContact?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    idProofImage?: Prisma.ImageUpdateOneWithoutStaffIdProofsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutStaffNestedInput;
};
export type StaffUncheckedUpdateWithoutSignatureImageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    fatherName?: Prisma.StringFieldUpdateOperationsInput | string;
    motherName?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    qualification?: Prisma.StringFieldUpdateOperationsInput | string;
    experience?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    emergencyContact?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StaffUncheckedUpdateManyWithoutSignatureImageInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    fatherName?: Prisma.StringFieldUpdateOperationsInput | string;
    motherName?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofImageId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idProofNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    qualification?: Prisma.StringFieldUpdateOperationsInput | string;
    experience?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumCategoryFieldUpdateOperationsInput | $Enums.Category;
    emergencyContact?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StaffSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    fatherName?: boolean;
    motherName?: boolean;
    idProofImageId?: boolean;
    idProofNumber?: boolean;
    qualification?: boolean;
    experience?: boolean;
    category?: boolean;
    emergencyContact?: boolean;
    address?: boolean;
    signatureImageId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    signatureImage?: boolean | Prisma.Staff$signatureImageArgs<ExtArgs>;
    idProofImage?: boolean | Prisma.Staff$idProofImageArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["staff"]>;
export type StaffSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    fatherName?: boolean;
    motherName?: boolean;
    idProofImageId?: boolean;
    idProofNumber?: boolean;
    qualification?: boolean;
    experience?: boolean;
    category?: boolean;
    emergencyContact?: boolean;
    address?: boolean;
    signatureImageId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    signatureImage?: boolean | Prisma.Staff$signatureImageArgs<ExtArgs>;
    idProofImage?: boolean | Prisma.Staff$idProofImageArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["staff"]>;
export type StaffSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    fatherName?: boolean;
    motherName?: boolean;
    idProofImageId?: boolean;
    idProofNumber?: boolean;
    qualification?: boolean;
    experience?: boolean;
    category?: boolean;
    emergencyContact?: boolean;
    address?: boolean;
    signatureImageId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    signatureImage?: boolean | Prisma.Staff$signatureImageArgs<ExtArgs>;
    idProofImage?: boolean | Prisma.Staff$idProofImageArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["staff"]>;
export type StaffSelectScalar = {
    id?: boolean;
    userId?: boolean;
    fatherName?: boolean;
    motherName?: boolean;
    idProofImageId?: boolean;
    idProofNumber?: boolean;
    qualification?: boolean;
    experience?: boolean;
    category?: boolean;
    emergencyContact?: boolean;
    address?: boolean;
    signatureImageId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type StaffOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "fatherName" | "motherName" | "idProofImageId" | "idProofNumber" | "qualification" | "experience" | "category" | "emergencyContact" | "address" | "signatureImageId" | "createdAt" | "updatedAt", ExtArgs["result"]["staff"]>;
export type StaffInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    signatureImage?: boolean | Prisma.Staff$signatureImageArgs<ExtArgs>;
    idProofImage?: boolean | Prisma.Staff$idProofImageArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type StaffIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    signatureImage?: boolean | Prisma.Staff$signatureImageArgs<ExtArgs>;
    idProofImage?: boolean | Prisma.Staff$idProofImageArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type StaffIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    signatureImage?: boolean | Prisma.Staff$signatureImageArgs<ExtArgs>;
    idProofImage?: boolean | Prisma.Staff$idProofImageArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $StaffPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Staff";
    objects: {
        signatureImage: Prisma.$ImagePayload<ExtArgs> | null;
        idProofImage: Prisma.$ImagePayload<ExtArgs> | null;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        fatherName: string;
        motherName: string;
        idProofImageId: string | null;
        idProofNumber: string;
        qualification: string;
        experience: string;
        category: $Enums.Category;
        emergencyContact: string;
        address: string;
        signatureImageId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["staff"]>;
    composites: {};
};
export type StaffGetPayload<S extends boolean | null | undefined | StaffDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StaffPayload, S>;
export type StaffCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StaffFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StaffCountAggregateInputType | true;
};
export interface StaffDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Staff'];
        meta: {
            name: 'Staff';
        };
    };
    findUnique<T extends StaffFindUniqueArgs>(args: Prisma.SelectSubset<T, StaffFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StaffClient<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends StaffFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StaffFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StaffClient<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends StaffFindFirstArgs>(args?: Prisma.SelectSubset<T, StaffFindFirstArgs<ExtArgs>>): Prisma.Prisma__StaffClient<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends StaffFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StaffFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StaffClient<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends StaffFindManyArgs>(args?: Prisma.SelectSubset<T, StaffFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends StaffCreateArgs>(args: Prisma.SelectSubset<T, StaffCreateArgs<ExtArgs>>): Prisma.Prisma__StaffClient<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends StaffCreateManyArgs>(args?: Prisma.SelectSubset<T, StaffCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends StaffCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StaffCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends StaffDeleteArgs>(args: Prisma.SelectSubset<T, StaffDeleteArgs<ExtArgs>>): Prisma.Prisma__StaffClient<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends StaffUpdateArgs>(args: Prisma.SelectSubset<T, StaffUpdateArgs<ExtArgs>>): Prisma.Prisma__StaffClient<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends StaffDeleteManyArgs>(args?: Prisma.SelectSubset<T, StaffDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends StaffUpdateManyArgs>(args: Prisma.SelectSubset<T, StaffUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends StaffUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StaffUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends StaffUpsertArgs>(args: Prisma.SelectSubset<T, StaffUpsertArgs<ExtArgs>>): Prisma.Prisma__StaffClient<runtime.Types.Result.GetResult<Prisma.$StaffPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends StaffCountArgs>(args?: Prisma.Subset<T, StaffCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StaffCountAggregateOutputType> : number>;
    aggregate<T extends StaffAggregateArgs>(args: Prisma.Subset<T, StaffAggregateArgs>): Prisma.PrismaPromise<GetStaffAggregateType<T>>;
    groupBy<T extends StaffGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StaffGroupByArgs['orderBy'];
    } : {
        orderBy?: StaffGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StaffGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: StaffFieldRefs;
}
export interface Prisma__StaffClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    signatureImage<T extends Prisma.Staff$signatureImageArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Staff$signatureImageArgs<ExtArgs>>): Prisma.Prisma__ImageClient<runtime.Types.Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    idProofImage<T extends Prisma.Staff$idProofImageArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Staff$idProofImageArgs<ExtArgs>>): Prisma.Prisma__ImageClient<runtime.Types.Result.GetResult<Prisma.$ImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface StaffFieldRefs {
    readonly id: Prisma.FieldRef<"Staff", 'String'>;
    readonly userId: Prisma.FieldRef<"Staff", 'String'>;
    readonly fatherName: Prisma.FieldRef<"Staff", 'String'>;
    readonly motherName: Prisma.FieldRef<"Staff", 'String'>;
    readonly idProofImageId: Prisma.FieldRef<"Staff", 'String'>;
    readonly idProofNumber: Prisma.FieldRef<"Staff", 'String'>;
    readonly qualification: Prisma.FieldRef<"Staff", 'String'>;
    readonly experience: Prisma.FieldRef<"Staff", 'String'>;
    readonly category: Prisma.FieldRef<"Staff", 'Category'>;
    readonly emergencyContact: Prisma.FieldRef<"Staff", 'String'>;
    readonly address: Prisma.FieldRef<"Staff", 'String'>;
    readonly signatureImageId: Prisma.FieldRef<"Staff", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Staff", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Staff", 'DateTime'>;
}
export type StaffFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelect<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    include?: Prisma.StaffInclude<ExtArgs> | null;
    where: Prisma.StaffWhereUniqueInput;
};
export type StaffFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelect<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    include?: Prisma.StaffInclude<ExtArgs> | null;
    where: Prisma.StaffWhereUniqueInput;
};
export type StaffFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type StaffFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type StaffFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type StaffCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelect<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    include?: Prisma.StaffInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StaffCreateInput, Prisma.StaffUncheckedCreateInput>;
};
export type StaffCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.StaffCreateManyInput | Prisma.StaffCreateManyInput[];
    skipDuplicates?: boolean;
};
export type StaffCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    data: Prisma.StaffCreateManyInput | Prisma.StaffCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.StaffIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type StaffUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelect<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    include?: Prisma.StaffInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StaffUpdateInput, Prisma.StaffUncheckedUpdateInput>;
    where: Prisma.StaffWhereUniqueInput;
};
export type StaffUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.StaffUpdateManyMutationInput, Prisma.StaffUncheckedUpdateManyInput>;
    where?: Prisma.StaffWhereInput;
    limit?: number;
};
export type StaffUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.StaffUpdateManyMutationInput, Prisma.StaffUncheckedUpdateManyInput>;
    where?: Prisma.StaffWhereInput;
    limit?: number;
    include?: Prisma.StaffIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type StaffUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelect<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    include?: Prisma.StaffInclude<ExtArgs> | null;
    where: Prisma.StaffWhereUniqueInput;
    create: Prisma.XOR<Prisma.StaffCreateInput, Prisma.StaffUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.StaffUpdateInput, Prisma.StaffUncheckedUpdateInput>;
};
export type StaffDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelect<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    include?: Prisma.StaffInclude<ExtArgs> | null;
    where: Prisma.StaffWhereUniqueInput;
};
export type StaffDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StaffWhereInput;
    limit?: number;
};
export type Staff$signatureImageArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageSelect<ExtArgs> | null;
    omit?: Prisma.ImageOmit<ExtArgs> | null;
    include?: Prisma.ImageInclude<ExtArgs> | null;
    where?: Prisma.ImageWhereInput;
};
export type Staff$idProofImageArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ImageSelect<ExtArgs> | null;
    omit?: Prisma.ImageOmit<ExtArgs> | null;
    include?: Prisma.ImageInclude<ExtArgs> | null;
    where?: Prisma.ImageWhereInput;
};
export type StaffDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.StaffSelect<ExtArgs> | null;
    omit?: Prisma.StaffOmit<ExtArgs> | null;
    include?: Prisma.StaffInclude<ExtArgs> | null;
};
