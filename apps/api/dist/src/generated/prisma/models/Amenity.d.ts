import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AmenityModel = runtime.Types.Result.DefaultSelection<Prisma.$AmenityPayload>;
export type AggregateAmenity = {
    _count: AmenityCountAggregateOutputType | null;
    _min: AmenityMinAggregateOutputType | null;
    _max: AmenityMaxAggregateOutputType | null;
};
export type AmenityMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    icon: string | null;
    category: $Enums.AmenityCategory | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AmenityMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    icon: string | null;
    category: $Enums.AmenityCategory | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AmenityCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    icon: number;
    category: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AmenityMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    icon?: true;
    category?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AmenityMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    icon?: true;
    category?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AmenityCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    icon?: true;
    category?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type AmenityAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AmenityWhereInput;
    orderBy?: Prisma.AmenityOrderByWithRelationInput | Prisma.AmenityOrderByWithRelationInput[];
    cursor?: Prisma.AmenityWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AmenityCountAggregateInputType;
    _min?: AmenityMinAggregateInputType;
    _max?: AmenityMaxAggregateInputType;
};
export type GetAmenityAggregateType<T extends AmenityAggregateArgs> = {
    [P in keyof T & keyof AggregateAmenity]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAmenity[P]> : Prisma.GetScalarType<T[P], AggregateAmenity[P]>;
};
export type AmenityGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AmenityWhereInput;
    orderBy?: Prisma.AmenityOrderByWithAggregationInput | Prisma.AmenityOrderByWithAggregationInput[];
    by: Prisma.AmenityScalarFieldEnum[] | Prisma.AmenityScalarFieldEnum;
    having?: Prisma.AmenityScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AmenityCountAggregateInputType | true;
    _min?: AmenityMinAggregateInputType;
    _max?: AmenityMaxAggregateInputType;
};
export type AmenityGroupByOutputType = {
    id: string;
    name: string;
    description: string | null;
    icon: string | null;
    category: $Enums.AmenityCategory;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: AmenityCountAggregateOutputType | null;
    _min: AmenityMinAggregateOutputType | null;
    _max: AmenityMaxAggregateOutputType | null;
};
export type GetAmenityGroupByPayload<T extends AmenityGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AmenityGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AmenityGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AmenityGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AmenityGroupByOutputType[P]>;
}>>;
export type AmenityWhereInput = {
    AND?: Prisma.AmenityWhereInput | Prisma.AmenityWhereInput[];
    OR?: Prisma.AmenityWhereInput[];
    NOT?: Prisma.AmenityWhereInput | Prisma.AmenityWhereInput[];
    id?: Prisma.StringFilter<"Amenity"> | string;
    name?: Prisma.StringFilter<"Amenity"> | string;
    description?: Prisma.StringNullableFilter<"Amenity"> | string | null;
    icon?: Prisma.StringNullableFilter<"Amenity"> | string | null;
    category?: Prisma.EnumAmenityCategoryFilter<"Amenity"> | $Enums.AmenityCategory;
    isActive?: Prisma.BoolFilter<"Amenity"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Amenity"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Amenity"> | Date | string;
    roomTypes?: Prisma.RoomTypeListRelationFilter;
};
export type AmenityOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    icon?: Prisma.SortOrderInput | Prisma.SortOrder;
    category?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    roomTypes?: Prisma.RoomTypeOrderByRelationAggregateInput;
};
export type AmenityWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    name?: string;
    AND?: Prisma.AmenityWhereInput | Prisma.AmenityWhereInput[];
    OR?: Prisma.AmenityWhereInput[];
    NOT?: Prisma.AmenityWhereInput | Prisma.AmenityWhereInput[];
    description?: Prisma.StringNullableFilter<"Amenity"> | string | null;
    icon?: Prisma.StringNullableFilter<"Amenity"> | string | null;
    category?: Prisma.EnumAmenityCategoryFilter<"Amenity"> | $Enums.AmenityCategory;
    isActive?: Prisma.BoolFilter<"Amenity"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Amenity"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Amenity"> | Date | string;
    roomTypes?: Prisma.RoomTypeListRelationFilter;
}, "id" | "name">;
export type AmenityOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    icon?: Prisma.SortOrderInput | Prisma.SortOrder;
    category?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AmenityCountOrderByAggregateInput;
    _max?: Prisma.AmenityMaxOrderByAggregateInput;
    _min?: Prisma.AmenityMinOrderByAggregateInput;
};
export type AmenityScalarWhereWithAggregatesInput = {
    AND?: Prisma.AmenityScalarWhereWithAggregatesInput | Prisma.AmenityScalarWhereWithAggregatesInput[];
    OR?: Prisma.AmenityScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AmenityScalarWhereWithAggregatesInput | Prisma.AmenityScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Amenity"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Amenity"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Amenity"> | string | null;
    icon?: Prisma.StringNullableWithAggregatesFilter<"Amenity"> | string | null;
    category?: Prisma.EnumAmenityCategoryWithAggregatesFilter<"Amenity"> | $Enums.AmenityCategory;
    isActive?: Prisma.BoolWithAggregatesFilter<"Amenity"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Amenity"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Amenity"> | Date | string;
};
export type AmenityCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    icon?: string | null;
    category?: $Enums.AmenityCategory;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomTypes?: Prisma.RoomTypeCreateNestedManyWithoutAmenitiesInput;
};
export type AmenityUncheckedCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    icon?: string | null;
    category?: $Enums.AmenityCategory;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomTypes?: Prisma.RoomTypeUncheckedCreateNestedManyWithoutAmenitiesInput;
};
export type AmenityUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.EnumAmenityCategoryFieldUpdateOperationsInput | $Enums.AmenityCategory;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomTypes?: Prisma.RoomTypeUpdateManyWithoutAmenitiesNestedInput;
};
export type AmenityUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.EnumAmenityCategoryFieldUpdateOperationsInput | $Enums.AmenityCategory;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomTypes?: Prisma.RoomTypeUncheckedUpdateManyWithoutAmenitiesNestedInput;
};
export type AmenityCreateManyInput = {
    id?: string;
    name: string;
    description?: string | null;
    icon?: string | null;
    category?: $Enums.AmenityCategory;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AmenityUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.EnumAmenityCategoryFieldUpdateOperationsInput | $Enums.AmenityCategory;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AmenityUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.EnumAmenityCategoryFieldUpdateOperationsInput | $Enums.AmenityCategory;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AmenityListRelationFilter = {
    every?: Prisma.AmenityWhereInput;
    some?: Prisma.AmenityWhereInput;
    none?: Prisma.AmenityWhereInput;
};
export type AmenityOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AmenityCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AmenityMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AmenityMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AmenityCreateNestedManyWithoutRoomTypesInput = {
    create?: Prisma.XOR<Prisma.AmenityCreateWithoutRoomTypesInput, Prisma.AmenityUncheckedCreateWithoutRoomTypesInput> | Prisma.AmenityCreateWithoutRoomTypesInput[] | Prisma.AmenityUncheckedCreateWithoutRoomTypesInput[];
    connectOrCreate?: Prisma.AmenityCreateOrConnectWithoutRoomTypesInput | Prisma.AmenityCreateOrConnectWithoutRoomTypesInput[];
    connect?: Prisma.AmenityWhereUniqueInput | Prisma.AmenityWhereUniqueInput[];
};
export type AmenityUncheckedCreateNestedManyWithoutRoomTypesInput = {
    create?: Prisma.XOR<Prisma.AmenityCreateWithoutRoomTypesInput, Prisma.AmenityUncheckedCreateWithoutRoomTypesInput> | Prisma.AmenityCreateWithoutRoomTypesInput[] | Prisma.AmenityUncheckedCreateWithoutRoomTypesInput[];
    connectOrCreate?: Prisma.AmenityCreateOrConnectWithoutRoomTypesInput | Prisma.AmenityCreateOrConnectWithoutRoomTypesInput[];
    connect?: Prisma.AmenityWhereUniqueInput | Prisma.AmenityWhereUniqueInput[];
};
export type AmenityUpdateManyWithoutRoomTypesNestedInput = {
    create?: Prisma.XOR<Prisma.AmenityCreateWithoutRoomTypesInput, Prisma.AmenityUncheckedCreateWithoutRoomTypesInput> | Prisma.AmenityCreateWithoutRoomTypesInput[] | Prisma.AmenityUncheckedCreateWithoutRoomTypesInput[];
    connectOrCreate?: Prisma.AmenityCreateOrConnectWithoutRoomTypesInput | Prisma.AmenityCreateOrConnectWithoutRoomTypesInput[];
    upsert?: Prisma.AmenityUpsertWithWhereUniqueWithoutRoomTypesInput | Prisma.AmenityUpsertWithWhereUniqueWithoutRoomTypesInput[];
    set?: Prisma.AmenityWhereUniqueInput | Prisma.AmenityWhereUniqueInput[];
    disconnect?: Prisma.AmenityWhereUniqueInput | Prisma.AmenityWhereUniqueInput[];
    delete?: Prisma.AmenityWhereUniqueInput | Prisma.AmenityWhereUniqueInput[];
    connect?: Prisma.AmenityWhereUniqueInput | Prisma.AmenityWhereUniqueInput[];
    update?: Prisma.AmenityUpdateWithWhereUniqueWithoutRoomTypesInput | Prisma.AmenityUpdateWithWhereUniqueWithoutRoomTypesInput[];
    updateMany?: Prisma.AmenityUpdateManyWithWhereWithoutRoomTypesInput | Prisma.AmenityUpdateManyWithWhereWithoutRoomTypesInput[];
    deleteMany?: Prisma.AmenityScalarWhereInput | Prisma.AmenityScalarWhereInput[];
};
export type AmenityUncheckedUpdateManyWithoutRoomTypesNestedInput = {
    create?: Prisma.XOR<Prisma.AmenityCreateWithoutRoomTypesInput, Prisma.AmenityUncheckedCreateWithoutRoomTypesInput> | Prisma.AmenityCreateWithoutRoomTypesInput[] | Prisma.AmenityUncheckedCreateWithoutRoomTypesInput[];
    connectOrCreate?: Prisma.AmenityCreateOrConnectWithoutRoomTypesInput | Prisma.AmenityCreateOrConnectWithoutRoomTypesInput[];
    upsert?: Prisma.AmenityUpsertWithWhereUniqueWithoutRoomTypesInput | Prisma.AmenityUpsertWithWhereUniqueWithoutRoomTypesInput[];
    set?: Prisma.AmenityWhereUniqueInput | Prisma.AmenityWhereUniqueInput[];
    disconnect?: Prisma.AmenityWhereUniqueInput | Prisma.AmenityWhereUniqueInput[];
    delete?: Prisma.AmenityWhereUniqueInput | Prisma.AmenityWhereUniqueInput[];
    connect?: Prisma.AmenityWhereUniqueInput | Prisma.AmenityWhereUniqueInput[];
    update?: Prisma.AmenityUpdateWithWhereUniqueWithoutRoomTypesInput | Prisma.AmenityUpdateWithWhereUniqueWithoutRoomTypesInput[];
    updateMany?: Prisma.AmenityUpdateManyWithWhereWithoutRoomTypesInput | Prisma.AmenityUpdateManyWithWhereWithoutRoomTypesInput[];
    deleteMany?: Prisma.AmenityScalarWhereInput | Prisma.AmenityScalarWhereInput[];
};
export type EnumAmenityCategoryFieldUpdateOperationsInput = {
    set?: $Enums.AmenityCategory;
};
export type AmenityCreateWithoutRoomTypesInput = {
    id?: string;
    name: string;
    description?: string | null;
    icon?: string | null;
    category?: $Enums.AmenityCategory;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AmenityUncheckedCreateWithoutRoomTypesInput = {
    id?: string;
    name: string;
    description?: string | null;
    icon?: string | null;
    category?: $Enums.AmenityCategory;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AmenityCreateOrConnectWithoutRoomTypesInput = {
    where: Prisma.AmenityWhereUniqueInput;
    create: Prisma.XOR<Prisma.AmenityCreateWithoutRoomTypesInput, Prisma.AmenityUncheckedCreateWithoutRoomTypesInput>;
};
export type AmenityUpsertWithWhereUniqueWithoutRoomTypesInput = {
    where: Prisma.AmenityWhereUniqueInput;
    update: Prisma.XOR<Prisma.AmenityUpdateWithoutRoomTypesInput, Prisma.AmenityUncheckedUpdateWithoutRoomTypesInput>;
    create: Prisma.XOR<Prisma.AmenityCreateWithoutRoomTypesInput, Prisma.AmenityUncheckedCreateWithoutRoomTypesInput>;
};
export type AmenityUpdateWithWhereUniqueWithoutRoomTypesInput = {
    where: Prisma.AmenityWhereUniqueInput;
    data: Prisma.XOR<Prisma.AmenityUpdateWithoutRoomTypesInput, Prisma.AmenityUncheckedUpdateWithoutRoomTypesInput>;
};
export type AmenityUpdateManyWithWhereWithoutRoomTypesInput = {
    where: Prisma.AmenityScalarWhereInput;
    data: Prisma.XOR<Prisma.AmenityUpdateManyMutationInput, Prisma.AmenityUncheckedUpdateManyWithoutRoomTypesInput>;
};
export type AmenityScalarWhereInput = {
    AND?: Prisma.AmenityScalarWhereInput | Prisma.AmenityScalarWhereInput[];
    OR?: Prisma.AmenityScalarWhereInput[];
    NOT?: Prisma.AmenityScalarWhereInput | Prisma.AmenityScalarWhereInput[];
    id?: Prisma.StringFilter<"Amenity"> | string;
    name?: Prisma.StringFilter<"Amenity"> | string;
    description?: Prisma.StringNullableFilter<"Amenity"> | string | null;
    icon?: Prisma.StringNullableFilter<"Amenity"> | string | null;
    category?: Prisma.EnumAmenityCategoryFilter<"Amenity"> | $Enums.AmenityCategory;
    isActive?: Prisma.BoolFilter<"Amenity"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Amenity"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Amenity"> | Date | string;
};
export type AmenityUpdateWithoutRoomTypesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.EnumAmenityCategoryFieldUpdateOperationsInput | $Enums.AmenityCategory;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AmenityUncheckedUpdateWithoutRoomTypesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.EnumAmenityCategoryFieldUpdateOperationsInput | $Enums.AmenityCategory;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AmenityUncheckedUpdateManyWithoutRoomTypesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    icon?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    category?: Prisma.EnumAmenityCategoryFieldUpdateOperationsInput | $Enums.AmenityCategory;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AmenityCountOutputType = {
    roomTypes: number;
};
export type AmenityCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    roomTypes?: boolean | AmenityCountOutputTypeCountRoomTypesArgs;
};
export type AmenityCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AmenityCountOutputTypeSelect<ExtArgs> | null;
};
export type AmenityCountOutputTypeCountRoomTypesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomTypeWhereInput;
};
export type AmenitySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    icon?: boolean;
    category?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    roomTypes?: boolean | Prisma.Amenity$roomTypesArgs<ExtArgs>;
    _count?: boolean | Prisma.AmenityCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["amenity"]>;
export type AmenitySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    icon?: boolean;
    category?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["amenity"]>;
export type AmenitySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    icon?: boolean;
    category?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["amenity"]>;
export type AmenitySelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    icon?: boolean;
    category?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type AmenityOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "icon" | "category" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["amenity"]>;
export type AmenityInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    roomTypes?: boolean | Prisma.Amenity$roomTypesArgs<ExtArgs>;
    _count?: boolean | Prisma.AmenityCountOutputTypeDefaultArgs<ExtArgs>;
};
export type AmenityIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type AmenityIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $AmenityPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Amenity";
    objects: {
        roomTypes: Prisma.$RoomTypePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        description: string | null;
        icon: string | null;
        category: $Enums.AmenityCategory;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["amenity"]>;
    composites: {};
};
export type AmenityGetPayload<S extends boolean | null | undefined | AmenityDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AmenityPayload, S>;
export type AmenityCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AmenityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AmenityCountAggregateInputType | true;
};
export interface AmenityDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Amenity'];
        meta: {
            name: 'Amenity';
        };
    };
    findUnique<T extends AmenityFindUniqueArgs>(args: Prisma.SelectSubset<T, AmenityFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AmenityClient<runtime.Types.Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AmenityFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AmenityFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AmenityClient<runtime.Types.Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AmenityFindFirstArgs>(args?: Prisma.SelectSubset<T, AmenityFindFirstArgs<ExtArgs>>): Prisma.Prisma__AmenityClient<runtime.Types.Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AmenityFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AmenityFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AmenityClient<runtime.Types.Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AmenityFindManyArgs>(args?: Prisma.SelectSubset<T, AmenityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AmenityCreateArgs>(args: Prisma.SelectSubset<T, AmenityCreateArgs<ExtArgs>>): Prisma.Prisma__AmenityClient<runtime.Types.Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AmenityCreateManyArgs>(args?: Prisma.SelectSubset<T, AmenityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AmenityCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AmenityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AmenityDeleteArgs>(args: Prisma.SelectSubset<T, AmenityDeleteArgs<ExtArgs>>): Prisma.Prisma__AmenityClient<runtime.Types.Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AmenityUpdateArgs>(args: Prisma.SelectSubset<T, AmenityUpdateArgs<ExtArgs>>): Prisma.Prisma__AmenityClient<runtime.Types.Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AmenityDeleteManyArgs>(args?: Prisma.SelectSubset<T, AmenityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AmenityUpdateManyArgs>(args: Prisma.SelectSubset<T, AmenityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AmenityUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AmenityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AmenityUpsertArgs>(args: Prisma.SelectSubset<T, AmenityUpsertArgs<ExtArgs>>): Prisma.Prisma__AmenityClient<runtime.Types.Result.GetResult<Prisma.$AmenityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AmenityCountArgs>(args?: Prisma.Subset<T, AmenityCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AmenityCountAggregateOutputType> : number>;
    aggregate<T extends AmenityAggregateArgs>(args: Prisma.Subset<T, AmenityAggregateArgs>): Prisma.PrismaPromise<GetAmenityAggregateType<T>>;
    groupBy<T extends AmenityGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AmenityGroupByArgs['orderBy'];
    } : {
        orderBy?: AmenityGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AmenityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAmenityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AmenityFieldRefs;
}
export interface Prisma__AmenityClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    roomTypes<T extends Prisma.Amenity$roomTypesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Amenity$roomTypesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AmenityFieldRefs {
    readonly id: Prisma.FieldRef<"Amenity", 'String'>;
    readonly name: Prisma.FieldRef<"Amenity", 'String'>;
    readonly description: Prisma.FieldRef<"Amenity", 'String'>;
    readonly icon: Prisma.FieldRef<"Amenity", 'String'>;
    readonly category: Prisma.FieldRef<"Amenity", 'AmenityCategory'>;
    readonly isActive: Prisma.FieldRef<"Amenity", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Amenity", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Amenity", 'DateTime'>;
}
export type AmenityFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AmenitySelect<ExtArgs> | null;
    omit?: Prisma.AmenityOmit<ExtArgs> | null;
    include?: Prisma.AmenityInclude<ExtArgs> | null;
    where: Prisma.AmenityWhereUniqueInput;
};
export type AmenityFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AmenitySelect<ExtArgs> | null;
    omit?: Prisma.AmenityOmit<ExtArgs> | null;
    include?: Prisma.AmenityInclude<ExtArgs> | null;
    where: Prisma.AmenityWhereUniqueInput;
};
export type AmenityFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AmenitySelect<ExtArgs> | null;
    omit?: Prisma.AmenityOmit<ExtArgs> | null;
    include?: Prisma.AmenityInclude<ExtArgs> | null;
    where?: Prisma.AmenityWhereInput;
    orderBy?: Prisma.AmenityOrderByWithRelationInput | Prisma.AmenityOrderByWithRelationInput[];
    cursor?: Prisma.AmenityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AmenityScalarFieldEnum | Prisma.AmenityScalarFieldEnum[];
};
export type AmenityFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AmenitySelect<ExtArgs> | null;
    omit?: Prisma.AmenityOmit<ExtArgs> | null;
    include?: Prisma.AmenityInclude<ExtArgs> | null;
    where?: Prisma.AmenityWhereInput;
    orderBy?: Prisma.AmenityOrderByWithRelationInput | Prisma.AmenityOrderByWithRelationInput[];
    cursor?: Prisma.AmenityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AmenityScalarFieldEnum | Prisma.AmenityScalarFieldEnum[];
};
export type AmenityFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AmenitySelect<ExtArgs> | null;
    omit?: Prisma.AmenityOmit<ExtArgs> | null;
    include?: Prisma.AmenityInclude<ExtArgs> | null;
    where?: Prisma.AmenityWhereInput;
    orderBy?: Prisma.AmenityOrderByWithRelationInput | Prisma.AmenityOrderByWithRelationInput[];
    cursor?: Prisma.AmenityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AmenityScalarFieldEnum | Prisma.AmenityScalarFieldEnum[];
};
export type AmenityCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AmenitySelect<ExtArgs> | null;
    omit?: Prisma.AmenityOmit<ExtArgs> | null;
    include?: Prisma.AmenityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AmenityCreateInput, Prisma.AmenityUncheckedCreateInput>;
};
export type AmenityCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AmenityCreateManyInput | Prisma.AmenityCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AmenityCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AmenitySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AmenityOmit<ExtArgs> | null;
    data: Prisma.AmenityCreateManyInput | Prisma.AmenityCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AmenityUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AmenitySelect<ExtArgs> | null;
    omit?: Prisma.AmenityOmit<ExtArgs> | null;
    include?: Prisma.AmenityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AmenityUpdateInput, Prisma.AmenityUncheckedUpdateInput>;
    where: Prisma.AmenityWhereUniqueInput;
};
export type AmenityUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AmenityUpdateManyMutationInput, Prisma.AmenityUncheckedUpdateManyInput>;
    where?: Prisma.AmenityWhereInput;
    limit?: number;
};
export type AmenityUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AmenitySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AmenityOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AmenityUpdateManyMutationInput, Prisma.AmenityUncheckedUpdateManyInput>;
    where?: Prisma.AmenityWhereInput;
    limit?: number;
};
export type AmenityUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AmenitySelect<ExtArgs> | null;
    omit?: Prisma.AmenityOmit<ExtArgs> | null;
    include?: Prisma.AmenityInclude<ExtArgs> | null;
    where: Prisma.AmenityWhereUniqueInput;
    create: Prisma.XOR<Prisma.AmenityCreateInput, Prisma.AmenityUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AmenityUpdateInput, Prisma.AmenityUncheckedUpdateInput>;
};
export type AmenityDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AmenitySelect<ExtArgs> | null;
    omit?: Prisma.AmenityOmit<ExtArgs> | null;
    include?: Prisma.AmenityInclude<ExtArgs> | null;
    where: Prisma.AmenityWhereUniqueInput;
};
export type AmenityDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AmenityWhereInput;
    limit?: number;
};
export type Amenity$roomTypesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomTypeSelect<ExtArgs> | null;
    omit?: Prisma.RoomTypeOmit<ExtArgs> | null;
    include?: Prisma.RoomTypeInclude<ExtArgs> | null;
    where?: Prisma.RoomTypeWhereInput;
    orderBy?: Prisma.RoomTypeOrderByWithRelationInput | Prisma.RoomTypeOrderByWithRelationInput[];
    cursor?: Prisma.RoomTypeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RoomTypeScalarFieldEnum | Prisma.RoomTypeScalarFieldEnum[];
};
export type AmenityDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AmenitySelect<ExtArgs> | null;
    omit?: Prisma.AmenityOmit<ExtArgs> | null;
    include?: Prisma.AmenityInclude<ExtArgs> | null;
};
