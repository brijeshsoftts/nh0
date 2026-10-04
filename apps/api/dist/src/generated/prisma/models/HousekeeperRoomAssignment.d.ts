import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type HousekeeperRoomAssignmentModel = runtime.Types.Result.DefaultSelection<Prisma.$HousekeeperRoomAssignmentPayload>;
export type AggregateHousekeeperRoomAssignment = {
    _count: HousekeeperRoomAssignmentCountAggregateOutputType | null;
    _min: HousekeeperRoomAssignmentMinAggregateOutputType | null;
    _max: HousekeeperRoomAssignmentMaxAggregateOutputType | null;
};
export type HousekeeperRoomAssignmentMinAggregateOutputType = {
    id: string | null;
    housekeeperId: string | null;
    roomId: string | null;
    assignedBy: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type HousekeeperRoomAssignmentMaxAggregateOutputType = {
    id: string | null;
    housekeeperId: string | null;
    roomId: string | null;
    assignedBy: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type HousekeeperRoomAssignmentCountAggregateOutputType = {
    id: number;
    housekeeperId: number;
    roomId: number;
    assignedBy: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type HousekeeperRoomAssignmentMinAggregateInputType = {
    id?: true;
    housekeeperId?: true;
    roomId?: true;
    assignedBy?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type HousekeeperRoomAssignmentMaxAggregateInputType = {
    id?: true;
    housekeeperId?: true;
    roomId?: true;
    assignedBy?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type HousekeeperRoomAssignmentCountAggregateInputType = {
    id?: true;
    housekeeperId?: true;
    roomId?: true;
    assignedBy?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type HousekeeperRoomAssignmentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HousekeeperRoomAssignmentWhereInput;
    orderBy?: Prisma.HousekeeperRoomAssignmentOrderByWithRelationInput | Prisma.HousekeeperRoomAssignmentOrderByWithRelationInput[];
    cursor?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | HousekeeperRoomAssignmentCountAggregateInputType;
    _min?: HousekeeperRoomAssignmentMinAggregateInputType;
    _max?: HousekeeperRoomAssignmentMaxAggregateInputType;
};
export type GetHousekeeperRoomAssignmentAggregateType<T extends HousekeeperRoomAssignmentAggregateArgs> = {
    [P in keyof T & keyof AggregateHousekeeperRoomAssignment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHousekeeperRoomAssignment[P]> : Prisma.GetScalarType<T[P], AggregateHousekeeperRoomAssignment[P]>;
};
export type HousekeeperRoomAssignmentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HousekeeperRoomAssignmentWhereInput;
    orderBy?: Prisma.HousekeeperRoomAssignmentOrderByWithAggregationInput | Prisma.HousekeeperRoomAssignmentOrderByWithAggregationInput[];
    by: Prisma.HousekeeperRoomAssignmentScalarFieldEnum[] | Prisma.HousekeeperRoomAssignmentScalarFieldEnum;
    having?: Prisma.HousekeeperRoomAssignmentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HousekeeperRoomAssignmentCountAggregateInputType | true;
    _min?: HousekeeperRoomAssignmentMinAggregateInputType;
    _max?: HousekeeperRoomAssignmentMaxAggregateInputType;
};
export type HousekeeperRoomAssignmentGroupByOutputType = {
    id: string;
    housekeeperId: string;
    roomId: string;
    assignedBy: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: HousekeeperRoomAssignmentCountAggregateOutputType | null;
    _min: HousekeeperRoomAssignmentMinAggregateOutputType | null;
    _max: HousekeeperRoomAssignmentMaxAggregateOutputType | null;
};
export type GetHousekeeperRoomAssignmentGroupByPayload<T extends HousekeeperRoomAssignmentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<HousekeeperRoomAssignmentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof HousekeeperRoomAssignmentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], HousekeeperRoomAssignmentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], HousekeeperRoomAssignmentGroupByOutputType[P]>;
}>>;
export type HousekeeperRoomAssignmentWhereInput = {
    AND?: Prisma.HousekeeperRoomAssignmentWhereInput | Prisma.HousekeeperRoomAssignmentWhereInput[];
    OR?: Prisma.HousekeeperRoomAssignmentWhereInput[];
    NOT?: Prisma.HousekeeperRoomAssignmentWhereInput | Prisma.HousekeeperRoomAssignmentWhereInput[];
    id?: Prisma.StringFilter<"HousekeeperRoomAssignment"> | string;
    housekeeperId?: Prisma.StringFilter<"HousekeeperRoomAssignment"> | string;
    roomId?: Prisma.StringFilter<"HousekeeperRoomAssignment"> | string;
    assignedBy?: Prisma.StringFilter<"HousekeeperRoomAssignment"> | string;
    isActive?: Prisma.BoolFilter<"HousekeeperRoomAssignment"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"HousekeeperRoomAssignment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"HousekeeperRoomAssignment"> | Date | string;
    housekeeper?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    room?: Prisma.XOR<Prisma.RoomScalarRelationFilter, Prisma.RoomWhereInput>;
    assigner?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type HousekeeperRoomAssignmentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    housekeeperId?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    assignedBy?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    housekeeper?: Prisma.UserOrderByWithRelationInput;
    room?: Prisma.RoomOrderByWithRelationInput;
    assigner?: Prisma.UserOrderByWithRelationInput;
};
export type HousekeeperRoomAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    housekeeperId_roomId?: Prisma.HousekeeperRoomAssignmentHousekeeperIdRoomIdCompoundUniqueInput;
    AND?: Prisma.HousekeeperRoomAssignmentWhereInput | Prisma.HousekeeperRoomAssignmentWhereInput[];
    OR?: Prisma.HousekeeperRoomAssignmentWhereInput[];
    NOT?: Prisma.HousekeeperRoomAssignmentWhereInput | Prisma.HousekeeperRoomAssignmentWhereInput[];
    housekeeperId?: Prisma.StringFilter<"HousekeeperRoomAssignment"> | string;
    roomId?: Prisma.StringFilter<"HousekeeperRoomAssignment"> | string;
    assignedBy?: Prisma.StringFilter<"HousekeeperRoomAssignment"> | string;
    isActive?: Prisma.BoolFilter<"HousekeeperRoomAssignment"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"HousekeeperRoomAssignment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"HousekeeperRoomAssignment"> | Date | string;
    housekeeper?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    room?: Prisma.XOR<Prisma.RoomScalarRelationFilter, Prisma.RoomWhereInput>;
    assigner?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "housekeeperId_roomId">;
export type HousekeeperRoomAssignmentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    housekeeperId?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    assignedBy?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.HousekeeperRoomAssignmentCountOrderByAggregateInput;
    _max?: Prisma.HousekeeperRoomAssignmentMaxOrderByAggregateInput;
    _min?: Prisma.HousekeeperRoomAssignmentMinOrderByAggregateInput;
};
export type HousekeeperRoomAssignmentScalarWhereWithAggregatesInput = {
    AND?: Prisma.HousekeeperRoomAssignmentScalarWhereWithAggregatesInput | Prisma.HousekeeperRoomAssignmentScalarWhereWithAggregatesInput[];
    OR?: Prisma.HousekeeperRoomAssignmentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.HousekeeperRoomAssignmentScalarWhereWithAggregatesInput | Prisma.HousekeeperRoomAssignmentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"HousekeeperRoomAssignment"> | string;
    housekeeperId?: Prisma.StringWithAggregatesFilter<"HousekeeperRoomAssignment"> | string;
    roomId?: Prisma.StringWithAggregatesFilter<"HousekeeperRoomAssignment"> | string;
    assignedBy?: Prisma.StringWithAggregatesFilter<"HousekeeperRoomAssignment"> | string;
    isActive?: Prisma.BoolWithAggregatesFilter<"HousekeeperRoomAssignment"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"HousekeeperRoomAssignment"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"HousekeeperRoomAssignment"> | Date | string;
};
export type HousekeeperRoomAssignmentCreateInput = {
    id?: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    housekeeper: Prisma.UserCreateNestedOneWithoutHousekeeperAssignmentsInput;
    room: Prisma.RoomCreateNestedOneWithoutHousekeeperAssignsInput;
    assigner: Prisma.UserCreateNestedOneWithoutAssignedAssignmentsInput;
};
export type HousekeeperRoomAssignmentUncheckedCreateInput = {
    id?: string;
    housekeeperId: string;
    roomId: string;
    assignedBy: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HousekeeperRoomAssignmentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    housekeeper?: Prisma.UserUpdateOneRequiredWithoutHousekeeperAssignmentsNestedInput;
    room?: Prisma.RoomUpdateOneRequiredWithoutHousekeeperAssignsNestedInput;
    assigner?: Prisma.UserUpdateOneRequiredWithoutAssignedAssignmentsNestedInput;
};
export type HousekeeperRoomAssignmentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    housekeeperId?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HousekeeperRoomAssignmentCreateManyInput = {
    id?: string;
    housekeeperId: string;
    roomId: string;
    assignedBy: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HousekeeperRoomAssignmentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HousekeeperRoomAssignmentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    housekeeperId?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HousekeeperRoomAssignmentListRelationFilter = {
    every?: Prisma.HousekeeperRoomAssignmentWhereInput;
    some?: Prisma.HousekeeperRoomAssignmentWhereInput;
    none?: Prisma.HousekeeperRoomAssignmentWhereInput;
};
export type HousekeeperRoomAssignmentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type HousekeeperRoomAssignmentHousekeeperIdRoomIdCompoundUniqueInput = {
    housekeeperId: string;
    roomId: string;
};
export type HousekeeperRoomAssignmentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    housekeeperId?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    assignedBy?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type HousekeeperRoomAssignmentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    housekeeperId?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    assignedBy?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type HousekeeperRoomAssignmentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    housekeeperId?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    assignedBy?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type HousekeeperRoomAssignmentCreateNestedManyWithoutHousekeeperInput = {
    create?: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateWithoutHousekeeperInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutHousekeeperInput> | Prisma.HousekeeperRoomAssignmentCreateWithoutHousekeeperInput[] | Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutHousekeeperInput[];
    connectOrCreate?: Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutHousekeeperInput | Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutHousekeeperInput[];
    createMany?: Prisma.HousekeeperRoomAssignmentCreateManyHousekeeperInputEnvelope;
    connect?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
};
export type HousekeeperRoomAssignmentCreateNestedManyWithoutAssignerInput = {
    create?: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateWithoutAssignerInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutAssignerInput> | Prisma.HousekeeperRoomAssignmentCreateWithoutAssignerInput[] | Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutAssignerInput[];
    connectOrCreate?: Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutAssignerInput | Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutAssignerInput[];
    createMany?: Prisma.HousekeeperRoomAssignmentCreateManyAssignerInputEnvelope;
    connect?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
};
export type HousekeeperRoomAssignmentUncheckedCreateNestedManyWithoutHousekeeperInput = {
    create?: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateWithoutHousekeeperInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutHousekeeperInput> | Prisma.HousekeeperRoomAssignmentCreateWithoutHousekeeperInput[] | Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutHousekeeperInput[];
    connectOrCreate?: Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutHousekeeperInput | Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutHousekeeperInput[];
    createMany?: Prisma.HousekeeperRoomAssignmentCreateManyHousekeeperInputEnvelope;
    connect?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
};
export type HousekeeperRoomAssignmentUncheckedCreateNestedManyWithoutAssignerInput = {
    create?: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateWithoutAssignerInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutAssignerInput> | Prisma.HousekeeperRoomAssignmentCreateWithoutAssignerInput[] | Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutAssignerInput[];
    connectOrCreate?: Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutAssignerInput | Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutAssignerInput[];
    createMany?: Prisma.HousekeeperRoomAssignmentCreateManyAssignerInputEnvelope;
    connect?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
};
export type HousekeeperRoomAssignmentUpdateManyWithoutHousekeeperNestedInput = {
    create?: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateWithoutHousekeeperInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutHousekeeperInput> | Prisma.HousekeeperRoomAssignmentCreateWithoutHousekeeperInput[] | Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutHousekeeperInput[];
    connectOrCreate?: Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutHousekeeperInput | Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutHousekeeperInput[];
    upsert?: Prisma.HousekeeperRoomAssignmentUpsertWithWhereUniqueWithoutHousekeeperInput | Prisma.HousekeeperRoomAssignmentUpsertWithWhereUniqueWithoutHousekeeperInput[];
    createMany?: Prisma.HousekeeperRoomAssignmentCreateManyHousekeeperInputEnvelope;
    set?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    disconnect?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    delete?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    connect?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    update?: Prisma.HousekeeperRoomAssignmentUpdateWithWhereUniqueWithoutHousekeeperInput | Prisma.HousekeeperRoomAssignmentUpdateWithWhereUniqueWithoutHousekeeperInput[];
    updateMany?: Prisma.HousekeeperRoomAssignmentUpdateManyWithWhereWithoutHousekeeperInput | Prisma.HousekeeperRoomAssignmentUpdateManyWithWhereWithoutHousekeeperInput[];
    deleteMany?: Prisma.HousekeeperRoomAssignmentScalarWhereInput | Prisma.HousekeeperRoomAssignmentScalarWhereInput[];
};
export type HousekeeperRoomAssignmentUpdateManyWithoutAssignerNestedInput = {
    create?: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateWithoutAssignerInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutAssignerInput> | Prisma.HousekeeperRoomAssignmentCreateWithoutAssignerInput[] | Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutAssignerInput[];
    connectOrCreate?: Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutAssignerInput | Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutAssignerInput[];
    upsert?: Prisma.HousekeeperRoomAssignmentUpsertWithWhereUniqueWithoutAssignerInput | Prisma.HousekeeperRoomAssignmentUpsertWithWhereUniqueWithoutAssignerInput[];
    createMany?: Prisma.HousekeeperRoomAssignmentCreateManyAssignerInputEnvelope;
    set?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    disconnect?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    delete?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    connect?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    update?: Prisma.HousekeeperRoomAssignmentUpdateWithWhereUniqueWithoutAssignerInput | Prisma.HousekeeperRoomAssignmentUpdateWithWhereUniqueWithoutAssignerInput[];
    updateMany?: Prisma.HousekeeperRoomAssignmentUpdateManyWithWhereWithoutAssignerInput | Prisma.HousekeeperRoomAssignmentUpdateManyWithWhereWithoutAssignerInput[];
    deleteMany?: Prisma.HousekeeperRoomAssignmentScalarWhereInput | Prisma.HousekeeperRoomAssignmentScalarWhereInput[];
};
export type HousekeeperRoomAssignmentUncheckedUpdateManyWithoutHousekeeperNestedInput = {
    create?: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateWithoutHousekeeperInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutHousekeeperInput> | Prisma.HousekeeperRoomAssignmentCreateWithoutHousekeeperInput[] | Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutHousekeeperInput[];
    connectOrCreate?: Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutHousekeeperInput | Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutHousekeeperInput[];
    upsert?: Prisma.HousekeeperRoomAssignmentUpsertWithWhereUniqueWithoutHousekeeperInput | Prisma.HousekeeperRoomAssignmentUpsertWithWhereUniqueWithoutHousekeeperInput[];
    createMany?: Prisma.HousekeeperRoomAssignmentCreateManyHousekeeperInputEnvelope;
    set?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    disconnect?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    delete?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    connect?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    update?: Prisma.HousekeeperRoomAssignmentUpdateWithWhereUniqueWithoutHousekeeperInput | Prisma.HousekeeperRoomAssignmentUpdateWithWhereUniqueWithoutHousekeeperInput[];
    updateMany?: Prisma.HousekeeperRoomAssignmentUpdateManyWithWhereWithoutHousekeeperInput | Prisma.HousekeeperRoomAssignmentUpdateManyWithWhereWithoutHousekeeperInput[];
    deleteMany?: Prisma.HousekeeperRoomAssignmentScalarWhereInput | Prisma.HousekeeperRoomAssignmentScalarWhereInput[];
};
export type HousekeeperRoomAssignmentUncheckedUpdateManyWithoutAssignerNestedInput = {
    create?: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateWithoutAssignerInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutAssignerInput> | Prisma.HousekeeperRoomAssignmentCreateWithoutAssignerInput[] | Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutAssignerInput[];
    connectOrCreate?: Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutAssignerInput | Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutAssignerInput[];
    upsert?: Prisma.HousekeeperRoomAssignmentUpsertWithWhereUniqueWithoutAssignerInput | Prisma.HousekeeperRoomAssignmentUpsertWithWhereUniqueWithoutAssignerInput[];
    createMany?: Prisma.HousekeeperRoomAssignmentCreateManyAssignerInputEnvelope;
    set?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    disconnect?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    delete?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    connect?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    update?: Prisma.HousekeeperRoomAssignmentUpdateWithWhereUniqueWithoutAssignerInput | Prisma.HousekeeperRoomAssignmentUpdateWithWhereUniqueWithoutAssignerInput[];
    updateMany?: Prisma.HousekeeperRoomAssignmentUpdateManyWithWhereWithoutAssignerInput | Prisma.HousekeeperRoomAssignmentUpdateManyWithWhereWithoutAssignerInput[];
    deleteMany?: Prisma.HousekeeperRoomAssignmentScalarWhereInput | Prisma.HousekeeperRoomAssignmentScalarWhereInput[];
};
export type HousekeeperRoomAssignmentCreateNestedManyWithoutRoomInput = {
    create?: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateWithoutRoomInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutRoomInput> | Prisma.HousekeeperRoomAssignmentCreateWithoutRoomInput[] | Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutRoomInput | Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutRoomInput[];
    createMany?: Prisma.HousekeeperRoomAssignmentCreateManyRoomInputEnvelope;
    connect?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
};
export type HousekeeperRoomAssignmentUncheckedCreateNestedManyWithoutRoomInput = {
    create?: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateWithoutRoomInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutRoomInput> | Prisma.HousekeeperRoomAssignmentCreateWithoutRoomInput[] | Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutRoomInput | Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutRoomInput[];
    createMany?: Prisma.HousekeeperRoomAssignmentCreateManyRoomInputEnvelope;
    connect?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
};
export type HousekeeperRoomAssignmentUpdateManyWithoutRoomNestedInput = {
    create?: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateWithoutRoomInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutRoomInput> | Prisma.HousekeeperRoomAssignmentCreateWithoutRoomInput[] | Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutRoomInput | Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutRoomInput[];
    upsert?: Prisma.HousekeeperRoomAssignmentUpsertWithWhereUniqueWithoutRoomInput | Prisma.HousekeeperRoomAssignmentUpsertWithWhereUniqueWithoutRoomInput[];
    createMany?: Prisma.HousekeeperRoomAssignmentCreateManyRoomInputEnvelope;
    set?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    disconnect?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    delete?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    connect?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    update?: Prisma.HousekeeperRoomAssignmentUpdateWithWhereUniqueWithoutRoomInput | Prisma.HousekeeperRoomAssignmentUpdateWithWhereUniqueWithoutRoomInput[];
    updateMany?: Prisma.HousekeeperRoomAssignmentUpdateManyWithWhereWithoutRoomInput | Prisma.HousekeeperRoomAssignmentUpdateManyWithWhereWithoutRoomInput[];
    deleteMany?: Prisma.HousekeeperRoomAssignmentScalarWhereInput | Prisma.HousekeeperRoomAssignmentScalarWhereInput[];
};
export type HousekeeperRoomAssignmentUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateWithoutRoomInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutRoomInput> | Prisma.HousekeeperRoomAssignmentCreateWithoutRoomInput[] | Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutRoomInput | Prisma.HousekeeperRoomAssignmentCreateOrConnectWithoutRoomInput[];
    upsert?: Prisma.HousekeeperRoomAssignmentUpsertWithWhereUniqueWithoutRoomInput | Prisma.HousekeeperRoomAssignmentUpsertWithWhereUniqueWithoutRoomInput[];
    createMany?: Prisma.HousekeeperRoomAssignmentCreateManyRoomInputEnvelope;
    set?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    disconnect?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    delete?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    connect?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput | Prisma.HousekeeperRoomAssignmentWhereUniqueInput[];
    update?: Prisma.HousekeeperRoomAssignmentUpdateWithWhereUniqueWithoutRoomInput | Prisma.HousekeeperRoomAssignmentUpdateWithWhereUniqueWithoutRoomInput[];
    updateMany?: Prisma.HousekeeperRoomAssignmentUpdateManyWithWhereWithoutRoomInput | Prisma.HousekeeperRoomAssignmentUpdateManyWithWhereWithoutRoomInput[];
    deleteMany?: Prisma.HousekeeperRoomAssignmentScalarWhereInput | Prisma.HousekeeperRoomAssignmentScalarWhereInput[];
};
export type HousekeeperRoomAssignmentCreateWithoutHousekeeperInput = {
    id?: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    room: Prisma.RoomCreateNestedOneWithoutHousekeeperAssignsInput;
    assigner: Prisma.UserCreateNestedOneWithoutAssignedAssignmentsInput;
};
export type HousekeeperRoomAssignmentUncheckedCreateWithoutHousekeeperInput = {
    id?: string;
    roomId: string;
    assignedBy: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HousekeeperRoomAssignmentCreateOrConnectWithoutHousekeeperInput = {
    where: Prisma.HousekeeperRoomAssignmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateWithoutHousekeeperInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutHousekeeperInput>;
};
export type HousekeeperRoomAssignmentCreateManyHousekeeperInputEnvelope = {
    data: Prisma.HousekeeperRoomAssignmentCreateManyHousekeeperInput | Prisma.HousekeeperRoomAssignmentCreateManyHousekeeperInput[];
    skipDuplicates?: boolean;
};
export type HousekeeperRoomAssignmentCreateWithoutAssignerInput = {
    id?: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    housekeeper: Prisma.UserCreateNestedOneWithoutHousekeeperAssignmentsInput;
    room: Prisma.RoomCreateNestedOneWithoutHousekeeperAssignsInput;
};
export type HousekeeperRoomAssignmentUncheckedCreateWithoutAssignerInput = {
    id?: string;
    housekeeperId: string;
    roomId: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HousekeeperRoomAssignmentCreateOrConnectWithoutAssignerInput = {
    where: Prisma.HousekeeperRoomAssignmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateWithoutAssignerInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutAssignerInput>;
};
export type HousekeeperRoomAssignmentCreateManyAssignerInputEnvelope = {
    data: Prisma.HousekeeperRoomAssignmentCreateManyAssignerInput | Prisma.HousekeeperRoomAssignmentCreateManyAssignerInput[];
    skipDuplicates?: boolean;
};
export type HousekeeperRoomAssignmentUpsertWithWhereUniqueWithoutHousekeeperInput = {
    where: Prisma.HousekeeperRoomAssignmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.HousekeeperRoomAssignmentUpdateWithoutHousekeeperInput, Prisma.HousekeeperRoomAssignmentUncheckedUpdateWithoutHousekeeperInput>;
    create: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateWithoutHousekeeperInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutHousekeeperInput>;
};
export type HousekeeperRoomAssignmentUpdateWithWhereUniqueWithoutHousekeeperInput = {
    where: Prisma.HousekeeperRoomAssignmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.HousekeeperRoomAssignmentUpdateWithoutHousekeeperInput, Prisma.HousekeeperRoomAssignmentUncheckedUpdateWithoutHousekeeperInput>;
};
export type HousekeeperRoomAssignmentUpdateManyWithWhereWithoutHousekeeperInput = {
    where: Prisma.HousekeeperRoomAssignmentScalarWhereInput;
    data: Prisma.XOR<Prisma.HousekeeperRoomAssignmentUpdateManyMutationInput, Prisma.HousekeeperRoomAssignmentUncheckedUpdateManyWithoutHousekeeperInput>;
};
export type HousekeeperRoomAssignmentScalarWhereInput = {
    AND?: Prisma.HousekeeperRoomAssignmentScalarWhereInput | Prisma.HousekeeperRoomAssignmentScalarWhereInput[];
    OR?: Prisma.HousekeeperRoomAssignmentScalarWhereInput[];
    NOT?: Prisma.HousekeeperRoomAssignmentScalarWhereInput | Prisma.HousekeeperRoomAssignmentScalarWhereInput[];
    id?: Prisma.StringFilter<"HousekeeperRoomAssignment"> | string;
    housekeeperId?: Prisma.StringFilter<"HousekeeperRoomAssignment"> | string;
    roomId?: Prisma.StringFilter<"HousekeeperRoomAssignment"> | string;
    assignedBy?: Prisma.StringFilter<"HousekeeperRoomAssignment"> | string;
    isActive?: Prisma.BoolFilter<"HousekeeperRoomAssignment"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"HousekeeperRoomAssignment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"HousekeeperRoomAssignment"> | Date | string;
};
export type HousekeeperRoomAssignmentUpsertWithWhereUniqueWithoutAssignerInput = {
    where: Prisma.HousekeeperRoomAssignmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.HousekeeperRoomAssignmentUpdateWithoutAssignerInput, Prisma.HousekeeperRoomAssignmentUncheckedUpdateWithoutAssignerInput>;
    create: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateWithoutAssignerInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutAssignerInput>;
};
export type HousekeeperRoomAssignmentUpdateWithWhereUniqueWithoutAssignerInput = {
    where: Prisma.HousekeeperRoomAssignmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.HousekeeperRoomAssignmentUpdateWithoutAssignerInput, Prisma.HousekeeperRoomAssignmentUncheckedUpdateWithoutAssignerInput>;
};
export type HousekeeperRoomAssignmentUpdateManyWithWhereWithoutAssignerInput = {
    where: Prisma.HousekeeperRoomAssignmentScalarWhereInput;
    data: Prisma.XOR<Prisma.HousekeeperRoomAssignmentUpdateManyMutationInput, Prisma.HousekeeperRoomAssignmentUncheckedUpdateManyWithoutAssignerInput>;
};
export type HousekeeperRoomAssignmentCreateWithoutRoomInput = {
    id?: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    housekeeper: Prisma.UserCreateNestedOneWithoutHousekeeperAssignmentsInput;
    assigner: Prisma.UserCreateNestedOneWithoutAssignedAssignmentsInput;
};
export type HousekeeperRoomAssignmentUncheckedCreateWithoutRoomInput = {
    id?: string;
    housekeeperId: string;
    assignedBy: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HousekeeperRoomAssignmentCreateOrConnectWithoutRoomInput = {
    where: Prisma.HousekeeperRoomAssignmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateWithoutRoomInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutRoomInput>;
};
export type HousekeeperRoomAssignmentCreateManyRoomInputEnvelope = {
    data: Prisma.HousekeeperRoomAssignmentCreateManyRoomInput | Prisma.HousekeeperRoomAssignmentCreateManyRoomInput[];
    skipDuplicates?: boolean;
};
export type HousekeeperRoomAssignmentUpsertWithWhereUniqueWithoutRoomInput = {
    where: Prisma.HousekeeperRoomAssignmentWhereUniqueInput;
    update: Prisma.XOR<Prisma.HousekeeperRoomAssignmentUpdateWithoutRoomInput, Prisma.HousekeeperRoomAssignmentUncheckedUpdateWithoutRoomInput>;
    create: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateWithoutRoomInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateWithoutRoomInput>;
};
export type HousekeeperRoomAssignmentUpdateWithWhereUniqueWithoutRoomInput = {
    where: Prisma.HousekeeperRoomAssignmentWhereUniqueInput;
    data: Prisma.XOR<Prisma.HousekeeperRoomAssignmentUpdateWithoutRoomInput, Prisma.HousekeeperRoomAssignmentUncheckedUpdateWithoutRoomInput>;
};
export type HousekeeperRoomAssignmentUpdateManyWithWhereWithoutRoomInput = {
    where: Prisma.HousekeeperRoomAssignmentScalarWhereInput;
    data: Prisma.XOR<Prisma.HousekeeperRoomAssignmentUpdateManyMutationInput, Prisma.HousekeeperRoomAssignmentUncheckedUpdateManyWithoutRoomInput>;
};
export type HousekeeperRoomAssignmentCreateManyHousekeeperInput = {
    id?: string;
    roomId: string;
    assignedBy: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HousekeeperRoomAssignmentCreateManyAssignerInput = {
    id?: string;
    housekeeperId: string;
    roomId: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HousekeeperRoomAssignmentUpdateWithoutHousekeeperInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    room?: Prisma.RoomUpdateOneRequiredWithoutHousekeeperAssignsNestedInput;
    assigner?: Prisma.UserUpdateOneRequiredWithoutAssignedAssignmentsNestedInput;
};
export type HousekeeperRoomAssignmentUncheckedUpdateWithoutHousekeeperInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HousekeeperRoomAssignmentUncheckedUpdateManyWithoutHousekeeperInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HousekeeperRoomAssignmentUpdateWithoutAssignerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    housekeeper?: Prisma.UserUpdateOneRequiredWithoutHousekeeperAssignmentsNestedInput;
    room?: Prisma.RoomUpdateOneRequiredWithoutHousekeeperAssignsNestedInput;
};
export type HousekeeperRoomAssignmentUncheckedUpdateWithoutAssignerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    housekeeperId?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HousekeeperRoomAssignmentUncheckedUpdateManyWithoutAssignerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    housekeeperId?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HousekeeperRoomAssignmentCreateManyRoomInput = {
    id?: string;
    housekeeperId: string;
    assignedBy: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HousekeeperRoomAssignmentUpdateWithoutRoomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    housekeeper?: Prisma.UserUpdateOneRequiredWithoutHousekeeperAssignmentsNestedInput;
    assigner?: Prisma.UserUpdateOneRequiredWithoutAssignedAssignmentsNestedInput;
};
export type HousekeeperRoomAssignmentUncheckedUpdateWithoutRoomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    housekeeperId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HousekeeperRoomAssignmentUncheckedUpdateManyWithoutRoomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    housekeeperId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HousekeeperRoomAssignmentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    housekeeperId?: boolean;
    roomId?: boolean;
    assignedBy?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    housekeeper?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    assigner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["housekeeperRoomAssignment"]>;
export type HousekeeperRoomAssignmentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    housekeeperId?: boolean;
    roomId?: boolean;
    assignedBy?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    housekeeper?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    assigner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["housekeeperRoomAssignment"]>;
export type HousekeeperRoomAssignmentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    housekeeperId?: boolean;
    roomId?: boolean;
    assignedBy?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    housekeeper?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    assigner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["housekeeperRoomAssignment"]>;
export type HousekeeperRoomAssignmentSelectScalar = {
    id?: boolean;
    housekeeperId?: boolean;
    roomId?: boolean;
    assignedBy?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type HousekeeperRoomAssignmentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "housekeeperId" | "roomId" | "assignedBy" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["housekeeperRoomAssignment"]>;
export type HousekeeperRoomAssignmentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    housekeeper?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    assigner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type HousekeeperRoomAssignmentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    housekeeper?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    assigner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type HousekeeperRoomAssignmentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    housekeeper?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    assigner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $HousekeeperRoomAssignmentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "HousekeeperRoomAssignment";
    objects: {
        housekeeper: Prisma.$UserPayload<ExtArgs>;
        room: Prisma.$RoomPayload<ExtArgs>;
        assigner: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        housekeeperId: string;
        roomId: string;
        assignedBy: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["housekeeperRoomAssignment"]>;
    composites: {};
};
export type HousekeeperRoomAssignmentGetPayload<S extends boolean | null | undefined | HousekeeperRoomAssignmentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$HousekeeperRoomAssignmentPayload, S>;
export type HousekeeperRoomAssignmentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<HousekeeperRoomAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HousekeeperRoomAssignmentCountAggregateInputType | true;
};
export interface HousekeeperRoomAssignmentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['HousekeeperRoomAssignment'];
        meta: {
            name: 'HousekeeperRoomAssignment';
        };
    };
    findUnique<T extends HousekeeperRoomAssignmentFindUniqueArgs>(args: Prisma.SelectSubset<T, HousekeeperRoomAssignmentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__HousekeeperRoomAssignmentClient<runtime.Types.Result.GetResult<Prisma.$HousekeeperRoomAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends HousekeeperRoomAssignmentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, HousekeeperRoomAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__HousekeeperRoomAssignmentClient<runtime.Types.Result.GetResult<Prisma.$HousekeeperRoomAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends HousekeeperRoomAssignmentFindFirstArgs>(args?: Prisma.SelectSubset<T, HousekeeperRoomAssignmentFindFirstArgs<ExtArgs>>): Prisma.Prisma__HousekeeperRoomAssignmentClient<runtime.Types.Result.GetResult<Prisma.$HousekeeperRoomAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends HousekeeperRoomAssignmentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, HousekeeperRoomAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__HousekeeperRoomAssignmentClient<runtime.Types.Result.GetResult<Prisma.$HousekeeperRoomAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends HousekeeperRoomAssignmentFindManyArgs>(args?: Prisma.SelectSubset<T, HousekeeperRoomAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HousekeeperRoomAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends HousekeeperRoomAssignmentCreateArgs>(args: Prisma.SelectSubset<T, HousekeeperRoomAssignmentCreateArgs<ExtArgs>>): Prisma.Prisma__HousekeeperRoomAssignmentClient<runtime.Types.Result.GetResult<Prisma.$HousekeeperRoomAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends HousekeeperRoomAssignmentCreateManyArgs>(args?: Prisma.SelectSubset<T, HousekeeperRoomAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends HousekeeperRoomAssignmentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, HousekeeperRoomAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HousekeeperRoomAssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends HousekeeperRoomAssignmentDeleteArgs>(args: Prisma.SelectSubset<T, HousekeeperRoomAssignmentDeleteArgs<ExtArgs>>): Prisma.Prisma__HousekeeperRoomAssignmentClient<runtime.Types.Result.GetResult<Prisma.$HousekeeperRoomAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends HousekeeperRoomAssignmentUpdateArgs>(args: Prisma.SelectSubset<T, HousekeeperRoomAssignmentUpdateArgs<ExtArgs>>): Prisma.Prisma__HousekeeperRoomAssignmentClient<runtime.Types.Result.GetResult<Prisma.$HousekeeperRoomAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends HousekeeperRoomAssignmentDeleteManyArgs>(args?: Prisma.SelectSubset<T, HousekeeperRoomAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends HousekeeperRoomAssignmentUpdateManyArgs>(args: Prisma.SelectSubset<T, HousekeeperRoomAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends HousekeeperRoomAssignmentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, HousekeeperRoomAssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HousekeeperRoomAssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends HousekeeperRoomAssignmentUpsertArgs>(args: Prisma.SelectSubset<T, HousekeeperRoomAssignmentUpsertArgs<ExtArgs>>): Prisma.Prisma__HousekeeperRoomAssignmentClient<runtime.Types.Result.GetResult<Prisma.$HousekeeperRoomAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends HousekeeperRoomAssignmentCountArgs>(args?: Prisma.Subset<T, HousekeeperRoomAssignmentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], HousekeeperRoomAssignmentCountAggregateOutputType> : number>;
    aggregate<T extends HousekeeperRoomAssignmentAggregateArgs>(args: Prisma.Subset<T, HousekeeperRoomAssignmentAggregateArgs>): Prisma.PrismaPromise<GetHousekeeperRoomAssignmentAggregateType<T>>;
    groupBy<T extends HousekeeperRoomAssignmentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: HousekeeperRoomAssignmentGroupByArgs['orderBy'];
    } : {
        orderBy?: HousekeeperRoomAssignmentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, HousekeeperRoomAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHousekeeperRoomAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: HousekeeperRoomAssignmentFieldRefs;
}
export interface Prisma__HousekeeperRoomAssignmentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    housekeeper<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    room<T extends Prisma.RoomDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RoomDefaultArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    assigner<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface HousekeeperRoomAssignmentFieldRefs {
    readonly id: Prisma.FieldRef<"HousekeeperRoomAssignment", 'String'>;
    readonly housekeeperId: Prisma.FieldRef<"HousekeeperRoomAssignment", 'String'>;
    readonly roomId: Prisma.FieldRef<"HousekeeperRoomAssignment", 'String'>;
    readonly assignedBy: Prisma.FieldRef<"HousekeeperRoomAssignment", 'String'>;
    readonly isActive: Prisma.FieldRef<"HousekeeperRoomAssignment", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"HousekeeperRoomAssignment", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"HousekeeperRoomAssignment", 'DateTime'>;
}
export type HousekeeperRoomAssignmentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeeperRoomAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.HousekeeperRoomAssignmentOmit<ExtArgs> | null;
    include?: Prisma.HousekeeperRoomAssignmentInclude<ExtArgs> | null;
    where: Prisma.HousekeeperRoomAssignmentWhereUniqueInput;
};
export type HousekeeperRoomAssignmentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeeperRoomAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.HousekeeperRoomAssignmentOmit<ExtArgs> | null;
    include?: Prisma.HousekeeperRoomAssignmentInclude<ExtArgs> | null;
    where: Prisma.HousekeeperRoomAssignmentWhereUniqueInput;
};
export type HousekeeperRoomAssignmentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeeperRoomAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.HousekeeperRoomAssignmentOmit<ExtArgs> | null;
    include?: Prisma.HousekeeperRoomAssignmentInclude<ExtArgs> | null;
    where?: Prisma.HousekeeperRoomAssignmentWhereInput;
    orderBy?: Prisma.HousekeeperRoomAssignmentOrderByWithRelationInput | Prisma.HousekeeperRoomAssignmentOrderByWithRelationInput[];
    cursor?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HousekeeperRoomAssignmentScalarFieldEnum | Prisma.HousekeeperRoomAssignmentScalarFieldEnum[];
};
export type HousekeeperRoomAssignmentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeeperRoomAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.HousekeeperRoomAssignmentOmit<ExtArgs> | null;
    include?: Prisma.HousekeeperRoomAssignmentInclude<ExtArgs> | null;
    where?: Prisma.HousekeeperRoomAssignmentWhereInput;
    orderBy?: Prisma.HousekeeperRoomAssignmentOrderByWithRelationInput | Prisma.HousekeeperRoomAssignmentOrderByWithRelationInput[];
    cursor?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HousekeeperRoomAssignmentScalarFieldEnum | Prisma.HousekeeperRoomAssignmentScalarFieldEnum[];
};
export type HousekeeperRoomAssignmentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeeperRoomAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.HousekeeperRoomAssignmentOmit<ExtArgs> | null;
    include?: Prisma.HousekeeperRoomAssignmentInclude<ExtArgs> | null;
    where?: Prisma.HousekeeperRoomAssignmentWhereInput;
    orderBy?: Prisma.HousekeeperRoomAssignmentOrderByWithRelationInput | Prisma.HousekeeperRoomAssignmentOrderByWithRelationInput[];
    cursor?: Prisma.HousekeeperRoomAssignmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HousekeeperRoomAssignmentScalarFieldEnum | Prisma.HousekeeperRoomAssignmentScalarFieldEnum[];
};
export type HousekeeperRoomAssignmentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeeperRoomAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.HousekeeperRoomAssignmentOmit<ExtArgs> | null;
    include?: Prisma.HousekeeperRoomAssignmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateInput>;
};
export type HousekeeperRoomAssignmentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.HousekeeperRoomAssignmentCreateManyInput | Prisma.HousekeeperRoomAssignmentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type HousekeeperRoomAssignmentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeeperRoomAssignmentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HousekeeperRoomAssignmentOmit<ExtArgs> | null;
    data: Prisma.HousekeeperRoomAssignmentCreateManyInput | Prisma.HousekeeperRoomAssignmentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.HousekeeperRoomAssignmentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type HousekeeperRoomAssignmentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeeperRoomAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.HousekeeperRoomAssignmentOmit<ExtArgs> | null;
    include?: Prisma.HousekeeperRoomAssignmentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HousekeeperRoomAssignmentUpdateInput, Prisma.HousekeeperRoomAssignmentUncheckedUpdateInput>;
    where: Prisma.HousekeeperRoomAssignmentWhereUniqueInput;
};
export type HousekeeperRoomAssignmentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.HousekeeperRoomAssignmentUpdateManyMutationInput, Prisma.HousekeeperRoomAssignmentUncheckedUpdateManyInput>;
    where?: Prisma.HousekeeperRoomAssignmentWhereInput;
    limit?: number;
};
export type HousekeeperRoomAssignmentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeeperRoomAssignmentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HousekeeperRoomAssignmentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HousekeeperRoomAssignmentUpdateManyMutationInput, Prisma.HousekeeperRoomAssignmentUncheckedUpdateManyInput>;
    where?: Prisma.HousekeeperRoomAssignmentWhereInput;
    limit?: number;
    include?: Prisma.HousekeeperRoomAssignmentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type HousekeeperRoomAssignmentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeeperRoomAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.HousekeeperRoomAssignmentOmit<ExtArgs> | null;
    include?: Prisma.HousekeeperRoomAssignmentInclude<ExtArgs> | null;
    where: Prisma.HousekeeperRoomAssignmentWhereUniqueInput;
    create: Prisma.XOR<Prisma.HousekeeperRoomAssignmentCreateInput, Prisma.HousekeeperRoomAssignmentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.HousekeeperRoomAssignmentUpdateInput, Prisma.HousekeeperRoomAssignmentUncheckedUpdateInput>;
};
export type HousekeeperRoomAssignmentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeeperRoomAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.HousekeeperRoomAssignmentOmit<ExtArgs> | null;
    include?: Prisma.HousekeeperRoomAssignmentInclude<ExtArgs> | null;
    where: Prisma.HousekeeperRoomAssignmentWhereUniqueInput;
};
export type HousekeeperRoomAssignmentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HousekeeperRoomAssignmentWhereInput;
    limit?: number;
};
export type HousekeeperRoomAssignmentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeeperRoomAssignmentSelect<ExtArgs> | null;
    omit?: Prisma.HousekeeperRoomAssignmentOmit<ExtArgs> | null;
    include?: Prisma.HousekeeperRoomAssignmentInclude<ExtArgs> | null;
};
