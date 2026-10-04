import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RoomModel = runtime.Types.Result.DefaultSelection<Prisma.$RoomPayload>;
export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null;
    _avg: RoomAvgAggregateOutputType | null;
    _sum: RoomSumAggregateOutputType | null;
    _min: RoomMinAggregateOutputType | null;
    _max: RoomMaxAggregateOutputType | null;
};
export type RoomAvgAggregateOutputType = {
    floor: number | null;
};
export type RoomSumAggregateOutputType = {
    floor: number | null;
};
export type RoomMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    roomTypeId: string | null;
    roomNumber: string | null;
    floor: number | null;
    description: string | null;
    occupancyStatus: $Enums.OccupancyStatus | null;
    housekeepingStatus: $Enums.HousekeepingStatus | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RoomMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    roomTypeId: string | null;
    roomNumber: string | null;
    floor: number | null;
    description: string | null;
    occupancyStatus: $Enums.OccupancyStatus | null;
    housekeepingStatus: $Enums.HousekeepingStatus | null;
    isActive: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RoomCountAggregateOutputType = {
    id: number;
    name: number;
    roomTypeId: number;
    roomNumber: number;
    floor: number;
    description: number;
    occupancyStatus: number;
    housekeepingStatus: number;
    isActive: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type RoomAvgAggregateInputType = {
    floor?: true;
};
export type RoomSumAggregateInputType = {
    floor?: true;
};
export type RoomMinAggregateInputType = {
    id?: true;
    name?: true;
    roomTypeId?: true;
    roomNumber?: true;
    floor?: true;
    description?: true;
    occupancyStatus?: true;
    housekeepingStatus?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RoomMaxAggregateInputType = {
    id?: true;
    name?: true;
    roomTypeId?: true;
    roomNumber?: true;
    floor?: true;
    description?: true;
    occupancyStatus?: true;
    housekeepingStatus?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RoomCountAggregateInputType = {
    id?: true;
    name?: true;
    roomTypeId?: true;
    roomNumber?: true;
    floor?: true;
    description?: true;
    occupancyStatus?: true;
    housekeepingStatus?: true;
    isActive?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type RoomAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomWhereInput;
    orderBy?: Prisma.RoomOrderByWithRelationInput | Prisma.RoomOrderByWithRelationInput[];
    cursor?: Prisma.RoomWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RoomCountAggregateInputType;
    _avg?: RoomAvgAggregateInputType;
    _sum?: RoomSumAggregateInputType;
    _min?: RoomMinAggregateInputType;
    _max?: RoomMaxAggregateInputType;
};
export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
    [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRoom[P]> : Prisma.GetScalarType<T[P], AggregateRoom[P]>;
};
export type RoomGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomWhereInput;
    orderBy?: Prisma.RoomOrderByWithAggregationInput | Prisma.RoomOrderByWithAggregationInput[];
    by: Prisma.RoomScalarFieldEnum[] | Prisma.RoomScalarFieldEnum;
    having?: Prisma.RoomScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RoomCountAggregateInputType | true;
    _avg?: RoomAvgAggregateInputType;
    _sum?: RoomSumAggregateInputType;
    _min?: RoomMinAggregateInputType;
    _max?: RoomMaxAggregateInputType;
};
export type RoomGroupByOutputType = {
    id: string;
    name: string | null;
    roomTypeId: string;
    roomNumber: string;
    floor: number;
    description: string | null;
    occupancyStatus: $Enums.OccupancyStatus;
    housekeepingStatus: $Enums.HousekeepingStatus;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: RoomCountAggregateOutputType | null;
    _avg: RoomAvgAggregateOutputType | null;
    _sum: RoomSumAggregateOutputType | null;
    _min: RoomMinAggregateOutputType | null;
    _max: RoomMaxAggregateOutputType | null;
};
export type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RoomGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RoomGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RoomGroupByOutputType[P]>;
}>>;
export type RoomWhereInput = {
    AND?: Prisma.RoomWhereInput | Prisma.RoomWhereInput[];
    OR?: Prisma.RoomWhereInput[];
    NOT?: Prisma.RoomWhereInput | Prisma.RoomWhereInput[];
    id?: Prisma.StringFilter<"Room"> | string;
    name?: Prisma.StringNullableFilter<"Room"> | string | null;
    roomTypeId?: Prisma.StringFilter<"Room"> | string;
    roomNumber?: Prisma.StringFilter<"Room"> | string;
    floor?: Prisma.IntFilter<"Room"> | number;
    description?: Prisma.StringNullableFilter<"Room"> | string | null;
    occupancyStatus?: Prisma.EnumOccupancyStatusFilter<"Room"> | $Enums.OccupancyStatus;
    housekeepingStatus?: Prisma.EnumHousekeepingStatusFilter<"Room"> | $Enums.HousekeepingStatus;
    isActive?: Prisma.BoolFilter<"Room"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Room"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Room"> | Date | string;
    roomType?: Prisma.XOR<Prisma.RoomTypeScalarRelationFilter, Prisma.RoomTypeWhereInput>;
    bookingRooms?: Prisma.BookingRoomListRelationFilter;
    housekeepingTasks?: Prisma.HousekeepingTaskListRelationFilter;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentListRelationFilter;
    issues?: Prisma.IssueListRelationFilter;
};
export type RoomOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrder;
    roomNumber?: Prisma.SortOrder;
    floor?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    occupancyStatus?: Prisma.SortOrder;
    housekeepingStatus?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    roomType?: Prisma.RoomTypeOrderByWithRelationInput;
    bookingRooms?: Prisma.BookingRoomOrderByRelationAggregateInput;
    housekeepingTasks?: Prisma.HousekeepingTaskOrderByRelationAggregateInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentOrderByRelationAggregateInput;
    issues?: Prisma.IssueOrderByRelationAggregateInput;
};
export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    roomNumber?: string;
    AND?: Prisma.RoomWhereInput | Prisma.RoomWhereInput[];
    OR?: Prisma.RoomWhereInput[];
    NOT?: Prisma.RoomWhereInput | Prisma.RoomWhereInput[];
    name?: Prisma.StringNullableFilter<"Room"> | string | null;
    roomTypeId?: Prisma.StringFilter<"Room"> | string;
    floor?: Prisma.IntFilter<"Room"> | number;
    description?: Prisma.StringNullableFilter<"Room"> | string | null;
    occupancyStatus?: Prisma.EnumOccupancyStatusFilter<"Room"> | $Enums.OccupancyStatus;
    housekeepingStatus?: Prisma.EnumHousekeepingStatusFilter<"Room"> | $Enums.HousekeepingStatus;
    isActive?: Prisma.BoolFilter<"Room"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Room"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Room"> | Date | string;
    roomType?: Prisma.XOR<Prisma.RoomTypeScalarRelationFilter, Prisma.RoomTypeWhereInput>;
    bookingRooms?: Prisma.BookingRoomListRelationFilter;
    housekeepingTasks?: Prisma.HousekeepingTaskListRelationFilter;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentListRelationFilter;
    issues?: Prisma.IssueListRelationFilter;
}, "id" | "roomNumber">;
export type RoomOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrderInput | Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrder;
    roomNumber?: Prisma.SortOrder;
    floor?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    occupancyStatus?: Prisma.SortOrder;
    housekeepingStatus?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.RoomCountOrderByAggregateInput;
    _avg?: Prisma.RoomAvgOrderByAggregateInput;
    _max?: Prisma.RoomMaxOrderByAggregateInput;
    _min?: Prisma.RoomMinOrderByAggregateInput;
    _sum?: Prisma.RoomSumOrderByAggregateInput;
};
export type RoomScalarWhereWithAggregatesInput = {
    AND?: Prisma.RoomScalarWhereWithAggregatesInput | Prisma.RoomScalarWhereWithAggregatesInput[];
    OR?: Prisma.RoomScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RoomScalarWhereWithAggregatesInput | Prisma.RoomScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Room"> | string;
    name?: Prisma.StringNullableWithAggregatesFilter<"Room"> | string | null;
    roomTypeId?: Prisma.StringWithAggregatesFilter<"Room"> | string;
    roomNumber?: Prisma.StringWithAggregatesFilter<"Room"> | string;
    floor?: Prisma.IntWithAggregatesFilter<"Room"> | number;
    description?: Prisma.StringNullableWithAggregatesFilter<"Room"> | string | null;
    occupancyStatus?: Prisma.EnumOccupancyStatusWithAggregatesFilter<"Room"> | $Enums.OccupancyStatus;
    housekeepingStatus?: Prisma.EnumHousekeepingStatusWithAggregatesFilter<"Room"> | $Enums.HousekeepingStatus;
    isActive?: Prisma.BoolWithAggregatesFilter<"Room"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Room"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Room"> | Date | string;
};
export type RoomCreateInput = {
    id?: string;
    name?: string | null;
    roomNumber: string;
    floor: number;
    description?: string | null;
    occupancyStatus: $Enums.OccupancyStatus;
    housekeepingStatus: $Enums.HousekeepingStatus;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomType: Prisma.RoomTypeCreateNestedOneWithoutRoomsInput;
    bookingRooms?: Prisma.BookingRoomCreateNestedManyWithoutAssignedRoomInput;
    housekeepingTasks?: Prisma.HousekeepingTaskCreateNestedManyWithoutRoomInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentCreateNestedManyWithoutRoomInput;
    issues?: Prisma.IssueCreateNestedManyWithoutRoomInput;
};
export type RoomUncheckedCreateInput = {
    id?: string;
    name?: string | null;
    roomTypeId: string;
    roomNumber: string;
    floor: number;
    description?: string | null;
    occupancyStatus: $Enums.OccupancyStatus;
    housekeepingStatus: $Enums.HousekeepingStatus;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookingRooms?: Prisma.BookingRoomUncheckedCreateNestedManyWithoutAssignedRoomInput;
    housekeepingTasks?: Prisma.HousekeepingTaskUncheckedCreateNestedManyWithoutRoomInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentUncheckedCreateNestedManyWithoutRoomInput;
    issues?: Prisma.IssueUncheckedCreateNestedManyWithoutRoomInput;
};
export type RoomUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    roomNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occupancyStatus?: Prisma.EnumOccupancyStatusFieldUpdateOperationsInput | $Enums.OccupancyStatus;
    housekeepingStatus?: Prisma.EnumHousekeepingStatusFieldUpdateOperationsInput | $Enums.HousekeepingStatus;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomType?: Prisma.RoomTypeUpdateOneRequiredWithoutRoomsNestedInput;
    bookingRooms?: Prisma.BookingRoomUpdateManyWithoutAssignedRoomNestedInput;
    housekeepingTasks?: Prisma.HousekeepingTaskUpdateManyWithoutRoomNestedInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentUpdateManyWithoutRoomNestedInput;
    issues?: Prisma.IssueUpdateManyWithoutRoomNestedInput;
};
export type RoomUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    roomTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    roomNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occupancyStatus?: Prisma.EnumOccupancyStatusFieldUpdateOperationsInput | $Enums.OccupancyStatus;
    housekeepingStatus?: Prisma.EnumHousekeepingStatusFieldUpdateOperationsInput | $Enums.HousekeepingStatus;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookingRooms?: Prisma.BookingRoomUncheckedUpdateManyWithoutAssignedRoomNestedInput;
    housekeepingTasks?: Prisma.HousekeepingTaskUncheckedUpdateManyWithoutRoomNestedInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentUncheckedUpdateManyWithoutRoomNestedInput;
    issues?: Prisma.IssueUncheckedUpdateManyWithoutRoomNestedInput;
};
export type RoomCreateManyInput = {
    id?: string;
    name?: string | null;
    roomTypeId: string;
    roomNumber: string;
    floor: number;
    description?: string | null;
    occupancyStatus: $Enums.OccupancyStatus;
    housekeepingStatus: $Enums.HousekeepingStatus;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RoomUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    roomNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occupancyStatus?: Prisma.EnumOccupancyStatusFieldUpdateOperationsInput | $Enums.OccupancyStatus;
    housekeepingStatus?: Prisma.EnumHousekeepingStatusFieldUpdateOperationsInput | $Enums.HousekeepingStatus;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RoomUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    roomTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    roomNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occupancyStatus?: Prisma.EnumOccupancyStatusFieldUpdateOperationsInput | $Enums.OccupancyStatus;
    housekeepingStatus?: Prisma.EnumHousekeepingStatusFieldUpdateOperationsInput | $Enums.HousekeepingStatus;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RoomListRelationFilter = {
    every?: Prisma.RoomWhereInput;
    some?: Prisma.RoomWhereInput;
    none?: Prisma.RoomWhereInput;
};
export type RoomOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RoomCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrder;
    roomNumber?: Prisma.SortOrder;
    floor?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    occupancyStatus?: Prisma.SortOrder;
    housekeepingStatus?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RoomAvgOrderByAggregateInput = {
    floor?: Prisma.SortOrder;
};
export type RoomMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrder;
    roomNumber?: Prisma.SortOrder;
    floor?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    occupancyStatus?: Prisma.SortOrder;
    housekeepingStatus?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RoomMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrder;
    roomNumber?: Prisma.SortOrder;
    floor?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    occupancyStatus?: Prisma.SortOrder;
    housekeepingStatus?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RoomSumOrderByAggregateInput = {
    floor?: Prisma.SortOrder;
};
export type RoomNullableScalarRelationFilter = {
    is?: Prisma.RoomWhereInput | null;
    isNot?: Prisma.RoomWhereInput | null;
};
export type RoomScalarRelationFilter = {
    is?: Prisma.RoomWhereInput;
    isNot?: Prisma.RoomWhereInput;
};
export type RoomCreateNestedManyWithoutRoomTypeInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutRoomTypeInput, Prisma.RoomUncheckedCreateWithoutRoomTypeInput> | Prisma.RoomCreateWithoutRoomTypeInput[] | Prisma.RoomUncheckedCreateWithoutRoomTypeInput[];
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutRoomTypeInput | Prisma.RoomCreateOrConnectWithoutRoomTypeInput[];
    createMany?: Prisma.RoomCreateManyRoomTypeInputEnvelope;
    connect?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
};
export type RoomUncheckedCreateNestedManyWithoutRoomTypeInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutRoomTypeInput, Prisma.RoomUncheckedCreateWithoutRoomTypeInput> | Prisma.RoomCreateWithoutRoomTypeInput[] | Prisma.RoomUncheckedCreateWithoutRoomTypeInput[];
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutRoomTypeInput | Prisma.RoomCreateOrConnectWithoutRoomTypeInput[];
    createMany?: Prisma.RoomCreateManyRoomTypeInputEnvelope;
    connect?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
};
export type RoomUpdateManyWithoutRoomTypeNestedInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutRoomTypeInput, Prisma.RoomUncheckedCreateWithoutRoomTypeInput> | Prisma.RoomCreateWithoutRoomTypeInput[] | Prisma.RoomUncheckedCreateWithoutRoomTypeInput[];
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutRoomTypeInput | Prisma.RoomCreateOrConnectWithoutRoomTypeInput[];
    upsert?: Prisma.RoomUpsertWithWhereUniqueWithoutRoomTypeInput | Prisma.RoomUpsertWithWhereUniqueWithoutRoomTypeInput[];
    createMany?: Prisma.RoomCreateManyRoomTypeInputEnvelope;
    set?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
    disconnect?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
    delete?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
    connect?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
    update?: Prisma.RoomUpdateWithWhereUniqueWithoutRoomTypeInput | Prisma.RoomUpdateWithWhereUniqueWithoutRoomTypeInput[];
    updateMany?: Prisma.RoomUpdateManyWithWhereWithoutRoomTypeInput | Prisma.RoomUpdateManyWithWhereWithoutRoomTypeInput[];
    deleteMany?: Prisma.RoomScalarWhereInput | Prisma.RoomScalarWhereInput[];
};
export type RoomUncheckedUpdateManyWithoutRoomTypeNestedInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutRoomTypeInput, Prisma.RoomUncheckedCreateWithoutRoomTypeInput> | Prisma.RoomCreateWithoutRoomTypeInput[] | Prisma.RoomUncheckedCreateWithoutRoomTypeInput[];
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutRoomTypeInput | Prisma.RoomCreateOrConnectWithoutRoomTypeInput[];
    upsert?: Prisma.RoomUpsertWithWhereUniqueWithoutRoomTypeInput | Prisma.RoomUpsertWithWhereUniqueWithoutRoomTypeInput[];
    createMany?: Prisma.RoomCreateManyRoomTypeInputEnvelope;
    set?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
    disconnect?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
    delete?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
    connect?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
    update?: Prisma.RoomUpdateWithWhereUniqueWithoutRoomTypeInput | Prisma.RoomUpdateWithWhereUniqueWithoutRoomTypeInput[];
    updateMany?: Prisma.RoomUpdateManyWithWhereWithoutRoomTypeInput | Prisma.RoomUpdateManyWithWhereWithoutRoomTypeInput[];
    deleteMany?: Prisma.RoomScalarWhereInput | Prisma.RoomScalarWhereInput[];
};
export type EnumOccupancyStatusFieldUpdateOperationsInput = {
    set?: $Enums.OccupancyStatus;
};
export type EnumHousekeepingStatusFieldUpdateOperationsInput = {
    set?: $Enums.HousekeepingStatus;
};
export type RoomCreateNestedOneWithoutBookingRoomsInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutBookingRoomsInput, Prisma.RoomUncheckedCreateWithoutBookingRoomsInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutBookingRoomsInput;
    connect?: Prisma.RoomWhereUniqueInput;
};
export type RoomUpdateOneWithoutBookingRoomsNestedInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutBookingRoomsInput, Prisma.RoomUncheckedCreateWithoutBookingRoomsInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutBookingRoomsInput;
    upsert?: Prisma.RoomUpsertWithoutBookingRoomsInput;
    disconnect?: Prisma.RoomWhereInput | boolean;
    delete?: Prisma.RoomWhereInput | boolean;
    connect?: Prisma.RoomWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RoomUpdateToOneWithWhereWithoutBookingRoomsInput, Prisma.RoomUpdateWithoutBookingRoomsInput>, Prisma.RoomUncheckedUpdateWithoutBookingRoomsInput>;
};
export type RoomCreateNestedOneWithoutHousekeepingTasksInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutHousekeepingTasksInput, Prisma.RoomUncheckedCreateWithoutHousekeepingTasksInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutHousekeepingTasksInput;
    connect?: Prisma.RoomWhereUniqueInput;
};
export type RoomUpdateOneRequiredWithoutHousekeepingTasksNestedInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutHousekeepingTasksInput, Prisma.RoomUncheckedCreateWithoutHousekeepingTasksInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutHousekeepingTasksInput;
    upsert?: Prisma.RoomUpsertWithoutHousekeepingTasksInput;
    connect?: Prisma.RoomWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RoomUpdateToOneWithWhereWithoutHousekeepingTasksInput, Prisma.RoomUpdateWithoutHousekeepingTasksInput>, Prisma.RoomUncheckedUpdateWithoutHousekeepingTasksInput>;
};
export type RoomCreateNestedOneWithoutHousekeeperAssignsInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutHousekeeperAssignsInput, Prisma.RoomUncheckedCreateWithoutHousekeeperAssignsInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutHousekeeperAssignsInput;
    connect?: Prisma.RoomWhereUniqueInput;
};
export type RoomUpdateOneRequiredWithoutHousekeeperAssignsNestedInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutHousekeeperAssignsInput, Prisma.RoomUncheckedCreateWithoutHousekeeperAssignsInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutHousekeeperAssignsInput;
    upsert?: Prisma.RoomUpsertWithoutHousekeeperAssignsInput;
    connect?: Prisma.RoomWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RoomUpdateToOneWithWhereWithoutHousekeeperAssignsInput, Prisma.RoomUpdateWithoutHousekeeperAssignsInput>, Prisma.RoomUncheckedUpdateWithoutHousekeeperAssignsInput>;
};
export type RoomCreateNestedOneWithoutIssuesInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutIssuesInput, Prisma.RoomUncheckedCreateWithoutIssuesInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutIssuesInput;
    connect?: Prisma.RoomWhereUniqueInput;
};
export type RoomUpdateOneRequiredWithoutIssuesNestedInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutIssuesInput, Prisma.RoomUncheckedCreateWithoutIssuesInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutIssuesInput;
    upsert?: Prisma.RoomUpsertWithoutIssuesInput;
    connect?: Prisma.RoomWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RoomUpdateToOneWithWhereWithoutIssuesInput, Prisma.RoomUpdateWithoutIssuesInput>, Prisma.RoomUncheckedUpdateWithoutIssuesInput>;
};
export type RoomCreateWithoutRoomTypeInput = {
    id?: string;
    name?: string | null;
    roomNumber: string;
    floor: number;
    description?: string | null;
    occupancyStatus: $Enums.OccupancyStatus;
    housekeepingStatus: $Enums.HousekeepingStatus;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookingRooms?: Prisma.BookingRoomCreateNestedManyWithoutAssignedRoomInput;
    housekeepingTasks?: Prisma.HousekeepingTaskCreateNestedManyWithoutRoomInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentCreateNestedManyWithoutRoomInput;
    issues?: Prisma.IssueCreateNestedManyWithoutRoomInput;
};
export type RoomUncheckedCreateWithoutRoomTypeInput = {
    id?: string;
    name?: string | null;
    roomNumber: string;
    floor: number;
    description?: string | null;
    occupancyStatus: $Enums.OccupancyStatus;
    housekeepingStatus: $Enums.HousekeepingStatus;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookingRooms?: Prisma.BookingRoomUncheckedCreateNestedManyWithoutAssignedRoomInput;
    housekeepingTasks?: Prisma.HousekeepingTaskUncheckedCreateNestedManyWithoutRoomInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentUncheckedCreateNestedManyWithoutRoomInput;
    issues?: Prisma.IssueUncheckedCreateNestedManyWithoutRoomInput;
};
export type RoomCreateOrConnectWithoutRoomTypeInput = {
    where: Prisma.RoomWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomCreateWithoutRoomTypeInput, Prisma.RoomUncheckedCreateWithoutRoomTypeInput>;
};
export type RoomCreateManyRoomTypeInputEnvelope = {
    data: Prisma.RoomCreateManyRoomTypeInput | Prisma.RoomCreateManyRoomTypeInput[];
    skipDuplicates?: boolean;
};
export type RoomUpsertWithWhereUniqueWithoutRoomTypeInput = {
    where: Prisma.RoomWhereUniqueInput;
    update: Prisma.XOR<Prisma.RoomUpdateWithoutRoomTypeInput, Prisma.RoomUncheckedUpdateWithoutRoomTypeInput>;
    create: Prisma.XOR<Prisma.RoomCreateWithoutRoomTypeInput, Prisma.RoomUncheckedCreateWithoutRoomTypeInput>;
};
export type RoomUpdateWithWhereUniqueWithoutRoomTypeInput = {
    where: Prisma.RoomWhereUniqueInput;
    data: Prisma.XOR<Prisma.RoomUpdateWithoutRoomTypeInput, Prisma.RoomUncheckedUpdateWithoutRoomTypeInput>;
};
export type RoomUpdateManyWithWhereWithoutRoomTypeInput = {
    where: Prisma.RoomScalarWhereInput;
    data: Prisma.XOR<Prisma.RoomUpdateManyMutationInput, Prisma.RoomUncheckedUpdateManyWithoutRoomTypeInput>;
};
export type RoomScalarWhereInput = {
    AND?: Prisma.RoomScalarWhereInput | Prisma.RoomScalarWhereInput[];
    OR?: Prisma.RoomScalarWhereInput[];
    NOT?: Prisma.RoomScalarWhereInput | Prisma.RoomScalarWhereInput[];
    id?: Prisma.StringFilter<"Room"> | string;
    name?: Prisma.StringNullableFilter<"Room"> | string | null;
    roomTypeId?: Prisma.StringFilter<"Room"> | string;
    roomNumber?: Prisma.StringFilter<"Room"> | string;
    floor?: Prisma.IntFilter<"Room"> | number;
    description?: Prisma.StringNullableFilter<"Room"> | string | null;
    occupancyStatus?: Prisma.EnumOccupancyStatusFilter<"Room"> | $Enums.OccupancyStatus;
    housekeepingStatus?: Prisma.EnumHousekeepingStatusFilter<"Room"> | $Enums.HousekeepingStatus;
    isActive?: Prisma.BoolFilter<"Room"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Room"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Room"> | Date | string;
};
export type RoomCreateWithoutBookingRoomsInput = {
    id?: string;
    name?: string | null;
    roomNumber: string;
    floor: number;
    description?: string | null;
    occupancyStatus: $Enums.OccupancyStatus;
    housekeepingStatus: $Enums.HousekeepingStatus;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomType: Prisma.RoomTypeCreateNestedOneWithoutRoomsInput;
    housekeepingTasks?: Prisma.HousekeepingTaskCreateNestedManyWithoutRoomInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentCreateNestedManyWithoutRoomInput;
    issues?: Prisma.IssueCreateNestedManyWithoutRoomInput;
};
export type RoomUncheckedCreateWithoutBookingRoomsInput = {
    id?: string;
    name?: string | null;
    roomTypeId: string;
    roomNumber: string;
    floor: number;
    description?: string | null;
    occupancyStatus: $Enums.OccupancyStatus;
    housekeepingStatus: $Enums.HousekeepingStatus;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    housekeepingTasks?: Prisma.HousekeepingTaskUncheckedCreateNestedManyWithoutRoomInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentUncheckedCreateNestedManyWithoutRoomInput;
    issues?: Prisma.IssueUncheckedCreateNestedManyWithoutRoomInput;
};
export type RoomCreateOrConnectWithoutBookingRoomsInput = {
    where: Prisma.RoomWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomCreateWithoutBookingRoomsInput, Prisma.RoomUncheckedCreateWithoutBookingRoomsInput>;
};
export type RoomUpsertWithoutBookingRoomsInput = {
    update: Prisma.XOR<Prisma.RoomUpdateWithoutBookingRoomsInput, Prisma.RoomUncheckedUpdateWithoutBookingRoomsInput>;
    create: Prisma.XOR<Prisma.RoomCreateWithoutBookingRoomsInput, Prisma.RoomUncheckedCreateWithoutBookingRoomsInput>;
    where?: Prisma.RoomWhereInput;
};
export type RoomUpdateToOneWithWhereWithoutBookingRoomsInput = {
    where?: Prisma.RoomWhereInput;
    data: Prisma.XOR<Prisma.RoomUpdateWithoutBookingRoomsInput, Prisma.RoomUncheckedUpdateWithoutBookingRoomsInput>;
};
export type RoomUpdateWithoutBookingRoomsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    roomNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occupancyStatus?: Prisma.EnumOccupancyStatusFieldUpdateOperationsInput | $Enums.OccupancyStatus;
    housekeepingStatus?: Prisma.EnumHousekeepingStatusFieldUpdateOperationsInput | $Enums.HousekeepingStatus;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomType?: Prisma.RoomTypeUpdateOneRequiredWithoutRoomsNestedInput;
    housekeepingTasks?: Prisma.HousekeepingTaskUpdateManyWithoutRoomNestedInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentUpdateManyWithoutRoomNestedInput;
    issues?: Prisma.IssueUpdateManyWithoutRoomNestedInput;
};
export type RoomUncheckedUpdateWithoutBookingRoomsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    roomTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    roomNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occupancyStatus?: Prisma.EnumOccupancyStatusFieldUpdateOperationsInput | $Enums.OccupancyStatus;
    housekeepingStatus?: Prisma.EnumHousekeepingStatusFieldUpdateOperationsInput | $Enums.HousekeepingStatus;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    housekeepingTasks?: Prisma.HousekeepingTaskUncheckedUpdateManyWithoutRoomNestedInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentUncheckedUpdateManyWithoutRoomNestedInput;
    issues?: Prisma.IssueUncheckedUpdateManyWithoutRoomNestedInput;
};
export type RoomCreateWithoutHousekeepingTasksInput = {
    id?: string;
    name?: string | null;
    roomNumber: string;
    floor: number;
    description?: string | null;
    occupancyStatus: $Enums.OccupancyStatus;
    housekeepingStatus: $Enums.HousekeepingStatus;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomType: Prisma.RoomTypeCreateNestedOneWithoutRoomsInput;
    bookingRooms?: Prisma.BookingRoomCreateNestedManyWithoutAssignedRoomInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentCreateNestedManyWithoutRoomInput;
    issues?: Prisma.IssueCreateNestedManyWithoutRoomInput;
};
export type RoomUncheckedCreateWithoutHousekeepingTasksInput = {
    id?: string;
    name?: string | null;
    roomTypeId: string;
    roomNumber: string;
    floor: number;
    description?: string | null;
    occupancyStatus: $Enums.OccupancyStatus;
    housekeepingStatus: $Enums.HousekeepingStatus;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookingRooms?: Prisma.BookingRoomUncheckedCreateNestedManyWithoutAssignedRoomInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentUncheckedCreateNestedManyWithoutRoomInput;
    issues?: Prisma.IssueUncheckedCreateNestedManyWithoutRoomInput;
};
export type RoomCreateOrConnectWithoutHousekeepingTasksInput = {
    where: Prisma.RoomWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomCreateWithoutHousekeepingTasksInput, Prisma.RoomUncheckedCreateWithoutHousekeepingTasksInput>;
};
export type RoomUpsertWithoutHousekeepingTasksInput = {
    update: Prisma.XOR<Prisma.RoomUpdateWithoutHousekeepingTasksInput, Prisma.RoomUncheckedUpdateWithoutHousekeepingTasksInput>;
    create: Prisma.XOR<Prisma.RoomCreateWithoutHousekeepingTasksInput, Prisma.RoomUncheckedCreateWithoutHousekeepingTasksInput>;
    where?: Prisma.RoomWhereInput;
};
export type RoomUpdateToOneWithWhereWithoutHousekeepingTasksInput = {
    where?: Prisma.RoomWhereInput;
    data: Prisma.XOR<Prisma.RoomUpdateWithoutHousekeepingTasksInput, Prisma.RoomUncheckedUpdateWithoutHousekeepingTasksInput>;
};
export type RoomUpdateWithoutHousekeepingTasksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    roomNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occupancyStatus?: Prisma.EnumOccupancyStatusFieldUpdateOperationsInput | $Enums.OccupancyStatus;
    housekeepingStatus?: Prisma.EnumHousekeepingStatusFieldUpdateOperationsInput | $Enums.HousekeepingStatus;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomType?: Prisma.RoomTypeUpdateOneRequiredWithoutRoomsNestedInput;
    bookingRooms?: Prisma.BookingRoomUpdateManyWithoutAssignedRoomNestedInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentUpdateManyWithoutRoomNestedInput;
    issues?: Prisma.IssueUpdateManyWithoutRoomNestedInput;
};
export type RoomUncheckedUpdateWithoutHousekeepingTasksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    roomTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    roomNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occupancyStatus?: Prisma.EnumOccupancyStatusFieldUpdateOperationsInput | $Enums.OccupancyStatus;
    housekeepingStatus?: Prisma.EnumHousekeepingStatusFieldUpdateOperationsInput | $Enums.HousekeepingStatus;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookingRooms?: Prisma.BookingRoomUncheckedUpdateManyWithoutAssignedRoomNestedInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentUncheckedUpdateManyWithoutRoomNestedInput;
    issues?: Prisma.IssueUncheckedUpdateManyWithoutRoomNestedInput;
};
export type RoomCreateWithoutHousekeeperAssignsInput = {
    id?: string;
    name?: string | null;
    roomNumber: string;
    floor: number;
    description?: string | null;
    occupancyStatus: $Enums.OccupancyStatus;
    housekeepingStatus: $Enums.HousekeepingStatus;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomType: Prisma.RoomTypeCreateNestedOneWithoutRoomsInput;
    bookingRooms?: Prisma.BookingRoomCreateNestedManyWithoutAssignedRoomInput;
    housekeepingTasks?: Prisma.HousekeepingTaskCreateNestedManyWithoutRoomInput;
    issues?: Prisma.IssueCreateNestedManyWithoutRoomInput;
};
export type RoomUncheckedCreateWithoutHousekeeperAssignsInput = {
    id?: string;
    name?: string | null;
    roomTypeId: string;
    roomNumber: string;
    floor: number;
    description?: string | null;
    occupancyStatus: $Enums.OccupancyStatus;
    housekeepingStatus: $Enums.HousekeepingStatus;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookingRooms?: Prisma.BookingRoomUncheckedCreateNestedManyWithoutAssignedRoomInput;
    housekeepingTasks?: Prisma.HousekeepingTaskUncheckedCreateNestedManyWithoutRoomInput;
    issues?: Prisma.IssueUncheckedCreateNestedManyWithoutRoomInput;
};
export type RoomCreateOrConnectWithoutHousekeeperAssignsInput = {
    where: Prisma.RoomWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomCreateWithoutHousekeeperAssignsInput, Prisma.RoomUncheckedCreateWithoutHousekeeperAssignsInput>;
};
export type RoomUpsertWithoutHousekeeperAssignsInput = {
    update: Prisma.XOR<Prisma.RoomUpdateWithoutHousekeeperAssignsInput, Prisma.RoomUncheckedUpdateWithoutHousekeeperAssignsInput>;
    create: Prisma.XOR<Prisma.RoomCreateWithoutHousekeeperAssignsInput, Prisma.RoomUncheckedCreateWithoutHousekeeperAssignsInput>;
    where?: Prisma.RoomWhereInput;
};
export type RoomUpdateToOneWithWhereWithoutHousekeeperAssignsInput = {
    where?: Prisma.RoomWhereInput;
    data: Prisma.XOR<Prisma.RoomUpdateWithoutHousekeeperAssignsInput, Prisma.RoomUncheckedUpdateWithoutHousekeeperAssignsInput>;
};
export type RoomUpdateWithoutHousekeeperAssignsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    roomNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occupancyStatus?: Prisma.EnumOccupancyStatusFieldUpdateOperationsInput | $Enums.OccupancyStatus;
    housekeepingStatus?: Prisma.EnumHousekeepingStatusFieldUpdateOperationsInput | $Enums.HousekeepingStatus;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomType?: Prisma.RoomTypeUpdateOneRequiredWithoutRoomsNestedInput;
    bookingRooms?: Prisma.BookingRoomUpdateManyWithoutAssignedRoomNestedInput;
    housekeepingTasks?: Prisma.HousekeepingTaskUpdateManyWithoutRoomNestedInput;
    issues?: Prisma.IssueUpdateManyWithoutRoomNestedInput;
};
export type RoomUncheckedUpdateWithoutHousekeeperAssignsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    roomTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    roomNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occupancyStatus?: Prisma.EnumOccupancyStatusFieldUpdateOperationsInput | $Enums.OccupancyStatus;
    housekeepingStatus?: Prisma.EnumHousekeepingStatusFieldUpdateOperationsInput | $Enums.HousekeepingStatus;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookingRooms?: Prisma.BookingRoomUncheckedUpdateManyWithoutAssignedRoomNestedInput;
    housekeepingTasks?: Prisma.HousekeepingTaskUncheckedUpdateManyWithoutRoomNestedInput;
    issues?: Prisma.IssueUncheckedUpdateManyWithoutRoomNestedInput;
};
export type RoomCreateWithoutIssuesInput = {
    id?: string;
    name?: string | null;
    roomNumber: string;
    floor: number;
    description?: string | null;
    occupancyStatus: $Enums.OccupancyStatus;
    housekeepingStatus: $Enums.HousekeepingStatus;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomType: Prisma.RoomTypeCreateNestedOneWithoutRoomsInput;
    bookingRooms?: Prisma.BookingRoomCreateNestedManyWithoutAssignedRoomInput;
    housekeepingTasks?: Prisma.HousekeepingTaskCreateNestedManyWithoutRoomInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentCreateNestedManyWithoutRoomInput;
};
export type RoomUncheckedCreateWithoutIssuesInput = {
    id?: string;
    name?: string | null;
    roomTypeId: string;
    roomNumber: string;
    floor: number;
    description?: string | null;
    occupancyStatus: $Enums.OccupancyStatus;
    housekeepingStatus: $Enums.HousekeepingStatus;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bookingRooms?: Prisma.BookingRoomUncheckedCreateNestedManyWithoutAssignedRoomInput;
    housekeepingTasks?: Prisma.HousekeepingTaskUncheckedCreateNestedManyWithoutRoomInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentUncheckedCreateNestedManyWithoutRoomInput;
};
export type RoomCreateOrConnectWithoutIssuesInput = {
    where: Prisma.RoomWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomCreateWithoutIssuesInput, Prisma.RoomUncheckedCreateWithoutIssuesInput>;
};
export type RoomUpsertWithoutIssuesInput = {
    update: Prisma.XOR<Prisma.RoomUpdateWithoutIssuesInput, Prisma.RoomUncheckedUpdateWithoutIssuesInput>;
    create: Prisma.XOR<Prisma.RoomCreateWithoutIssuesInput, Prisma.RoomUncheckedCreateWithoutIssuesInput>;
    where?: Prisma.RoomWhereInput;
};
export type RoomUpdateToOneWithWhereWithoutIssuesInput = {
    where?: Prisma.RoomWhereInput;
    data: Prisma.XOR<Prisma.RoomUpdateWithoutIssuesInput, Prisma.RoomUncheckedUpdateWithoutIssuesInput>;
};
export type RoomUpdateWithoutIssuesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    roomNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occupancyStatus?: Prisma.EnumOccupancyStatusFieldUpdateOperationsInput | $Enums.OccupancyStatus;
    housekeepingStatus?: Prisma.EnumHousekeepingStatusFieldUpdateOperationsInput | $Enums.HousekeepingStatus;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomType?: Prisma.RoomTypeUpdateOneRequiredWithoutRoomsNestedInput;
    bookingRooms?: Prisma.BookingRoomUpdateManyWithoutAssignedRoomNestedInput;
    housekeepingTasks?: Prisma.HousekeepingTaskUpdateManyWithoutRoomNestedInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentUpdateManyWithoutRoomNestedInput;
};
export type RoomUncheckedUpdateWithoutIssuesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    roomTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    roomNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occupancyStatus?: Prisma.EnumOccupancyStatusFieldUpdateOperationsInput | $Enums.OccupancyStatus;
    housekeepingStatus?: Prisma.EnumHousekeepingStatusFieldUpdateOperationsInput | $Enums.HousekeepingStatus;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookingRooms?: Prisma.BookingRoomUncheckedUpdateManyWithoutAssignedRoomNestedInput;
    housekeepingTasks?: Prisma.HousekeepingTaskUncheckedUpdateManyWithoutRoomNestedInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentUncheckedUpdateManyWithoutRoomNestedInput;
};
export type RoomCreateManyRoomTypeInput = {
    id?: string;
    name?: string | null;
    roomNumber: string;
    floor: number;
    description?: string | null;
    occupancyStatus: $Enums.OccupancyStatus;
    housekeepingStatus: $Enums.HousekeepingStatus;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RoomUpdateWithoutRoomTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    roomNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occupancyStatus?: Prisma.EnumOccupancyStatusFieldUpdateOperationsInput | $Enums.OccupancyStatus;
    housekeepingStatus?: Prisma.EnumHousekeepingStatusFieldUpdateOperationsInput | $Enums.HousekeepingStatus;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookingRooms?: Prisma.BookingRoomUpdateManyWithoutAssignedRoomNestedInput;
    housekeepingTasks?: Prisma.HousekeepingTaskUpdateManyWithoutRoomNestedInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentUpdateManyWithoutRoomNestedInput;
    issues?: Prisma.IssueUpdateManyWithoutRoomNestedInput;
};
export type RoomUncheckedUpdateWithoutRoomTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    roomNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occupancyStatus?: Prisma.EnumOccupancyStatusFieldUpdateOperationsInput | $Enums.OccupancyStatus;
    housekeepingStatus?: Prisma.EnumHousekeepingStatusFieldUpdateOperationsInput | $Enums.HousekeepingStatus;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookingRooms?: Prisma.BookingRoomUncheckedUpdateManyWithoutAssignedRoomNestedInput;
    housekeepingTasks?: Prisma.HousekeepingTaskUncheckedUpdateManyWithoutRoomNestedInput;
    housekeeperAssigns?: Prisma.HousekeeperRoomAssignmentUncheckedUpdateManyWithoutRoomNestedInput;
    issues?: Prisma.IssueUncheckedUpdateManyWithoutRoomNestedInput;
};
export type RoomUncheckedUpdateManyWithoutRoomTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    roomNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    floor?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    occupancyStatus?: Prisma.EnumOccupancyStatusFieldUpdateOperationsInput | $Enums.OccupancyStatus;
    housekeepingStatus?: Prisma.EnumHousekeepingStatusFieldUpdateOperationsInput | $Enums.HousekeepingStatus;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RoomCountOutputType = {
    bookingRooms: number;
    housekeepingTasks: number;
    housekeeperAssigns: number;
    issues: number;
};
export type RoomCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bookingRooms?: boolean | RoomCountOutputTypeCountBookingRoomsArgs;
    housekeepingTasks?: boolean | RoomCountOutputTypeCountHousekeepingTasksArgs;
    housekeeperAssigns?: boolean | RoomCountOutputTypeCountHousekeeperAssignsArgs;
    issues?: boolean | RoomCountOutputTypeCountIssuesArgs;
};
export type RoomCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomCountOutputTypeSelect<ExtArgs> | null;
};
export type RoomCountOutputTypeCountBookingRoomsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingRoomWhereInput;
};
export type RoomCountOutputTypeCountHousekeepingTasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HousekeepingTaskWhereInput;
};
export type RoomCountOutputTypeCountHousekeeperAssignsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HousekeeperRoomAssignmentWhereInput;
};
export type RoomCountOutputTypeCountIssuesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IssueWhereInput;
};
export type RoomSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    roomTypeId?: boolean;
    roomNumber?: boolean;
    floor?: boolean;
    description?: boolean;
    occupancyStatus?: boolean;
    housekeepingStatus?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    roomType?: boolean | Prisma.RoomTypeDefaultArgs<ExtArgs>;
    bookingRooms?: boolean | Prisma.Room$bookingRoomsArgs<ExtArgs>;
    housekeepingTasks?: boolean | Prisma.Room$housekeepingTasksArgs<ExtArgs>;
    housekeeperAssigns?: boolean | Prisma.Room$housekeeperAssignsArgs<ExtArgs>;
    issues?: boolean | Prisma.Room$issuesArgs<ExtArgs>;
    _count?: boolean | Prisma.RoomCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["room"]>;
export type RoomSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    roomTypeId?: boolean;
    roomNumber?: boolean;
    floor?: boolean;
    description?: boolean;
    occupancyStatus?: boolean;
    housekeepingStatus?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    roomType?: boolean | Prisma.RoomTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["room"]>;
export type RoomSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    roomTypeId?: boolean;
    roomNumber?: boolean;
    floor?: boolean;
    description?: boolean;
    occupancyStatus?: boolean;
    housekeepingStatus?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    roomType?: boolean | Prisma.RoomTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["room"]>;
export type RoomSelectScalar = {
    id?: boolean;
    name?: boolean;
    roomTypeId?: boolean;
    roomNumber?: boolean;
    floor?: boolean;
    description?: boolean;
    occupancyStatus?: boolean;
    housekeepingStatus?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type RoomOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "roomTypeId" | "roomNumber" | "floor" | "description" | "occupancyStatus" | "housekeepingStatus" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["room"]>;
export type RoomInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    roomType?: boolean | Prisma.RoomTypeDefaultArgs<ExtArgs>;
    bookingRooms?: boolean | Prisma.Room$bookingRoomsArgs<ExtArgs>;
    housekeepingTasks?: boolean | Prisma.Room$housekeepingTasksArgs<ExtArgs>;
    housekeeperAssigns?: boolean | Prisma.Room$housekeeperAssignsArgs<ExtArgs>;
    issues?: boolean | Prisma.Room$issuesArgs<ExtArgs>;
    _count?: boolean | Prisma.RoomCountOutputTypeDefaultArgs<ExtArgs>;
};
export type RoomIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    roomType?: boolean | Prisma.RoomTypeDefaultArgs<ExtArgs>;
};
export type RoomIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    roomType?: boolean | Prisma.RoomTypeDefaultArgs<ExtArgs>;
};
export type $RoomPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Room";
    objects: {
        roomType: Prisma.$RoomTypePayload<ExtArgs>;
        bookingRooms: Prisma.$BookingRoomPayload<ExtArgs>[];
        housekeepingTasks: Prisma.$HousekeepingTaskPayload<ExtArgs>[];
        housekeeperAssigns: Prisma.$HousekeeperRoomAssignmentPayload<ExtArgs>[];
        issues: Prisma.$IssuePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string | null;
        roomTypeId: string;
        roomNumber: string;
        floor: number;
        description: string | null;
        occupancyStatus: $Enums.OccupancyStatus;
        housekeepingStatus: $Enums.HousekeepingStatus;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["room"]>;
    composites: {};
};
export type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RoomPayload, S>;
export type RoomCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RoomCountAggregateInputType | true;
};
export interface RoomDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Room'];
        meta: {
            name: 'Room';
        };
    };
    findUnique<T extends RoomFindUniqueArgs>(args: Prisma.SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RoomFindFirstArgs>(args?: Prisma.SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RoomFindManyArgs>(args?: Prisma.SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RoomCreateArgs>(args: Prisma.SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RoomCreateManyArgs>(args?: Prisma.SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RoomDeleteArgs>(args: Prisma.SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RoomUpdateArgs>(args: Prisma.SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RoomDeleteManyArgs>(args?: Prisma.SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RoomUpdateManyArgs>(args: Prisma.SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RoomUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RoomUpsertArgs>(args: Prisma.SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RoomCountArgs>(args?: Prisma.Subset<T, RoomCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RoomCountAggregateOutputType> : number>;
    aggregate<T extends RoomAggregateArgs>(args: Prisma.Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>;
    groupBy<T extends RoomGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RoomGroupByArgs['orderBy'];
    } : {
        orderBy?: RoomGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RoomFieldRefs;
}
export interface Prisma__RoomClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    roomType<T extends Prisma.RoomTypeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RoomTypeDefaultArgs<ExtArgs>>): Prisma.Prisma__RoomTypeClient<runtime.Types.Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    bookingRooms<T extends Prisma.Room$bookingRoomsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Room$bookingRoomsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingRoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    housekeepingTasks<T extends Prisma.Room$housekeepingTasksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Room$housekeepingTasksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HousekeepingTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    housekeeperAssigns<T extends Prisma.Room$housekeeperAssignsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Room$housekeeperAssignsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HousekeeperRoomAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    issues<T extends Prisma.Room$issuesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Room$issuesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IssuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RoomFieldRefs {
    readonly id: Prisma.FieldRef<"Room", 'String'>;
    readonly name: Prisma.FieldRef<"Room", 'String'>;
    readonly roomTypeId: Prisma.FieldRef<"Room", 'String'>;
    readonly roomNumber: Prisma.FieldRef<"Room", 'String'>;
    readonly floor: Prisma.FieldRef<"Room", 'Int'>;
    readonly description: Prisma.FieldRef<"Room", 'String'>;
    readonly occupancyStatus: Prisma.FieldRef<"Room", 'OccupancyStatus'>;
    readonly housekeepingStatus: Prisma.FieldRef<"Room", 'HousekeepingStatus'>;
    readonly isActive: Prisma.FieldRef<"Room", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Room", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Room", 'DateTime'>;
}
export type RoomFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
    where: Prisma.RoomWhereUniqueInput;
};
export type RoomFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
    where: Prisma.RoomWhereUniqueInput;
};
export type RoomFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
    where?: Prisma.RoomWhereInput;
    orderBy?: Prisma.RoomOrderByWithRelationInput | Prisma.RoomOrderByWithRelationInput[];
    cursor?: Prisma.RoomWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RoomScalarFieldEnum | Prisma.RoomScalarFieldEnum[];
};
export type RoomFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
    where?: Prisma.RoomWhereInput;
    orderBy?: Prisma.RoomOrderByWithRelationInput | Prisma.RoomOrderByWithRelationInput[];
    cursor?: Prisma.RoomWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RoomScalarFieldEnum | Prisma.RoomScalarFieldEnum[];
};
export type RoomFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
    where?: Prisma.RoomWhereInput;
    orderBy?: Prisma.RoomOrderByWithRelationInput | Prisma.RoomOrderByWithRelationInput[];
    cursor?: Prisma.RoomWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RoomScalarFieldEnum | Prisma.RoomScalarFieldEnum[];
};
export type RoomCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RoomCreateInput, Prisma.RoomUncheckedCreateInput>;
};
export type RoomCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RoomCreateManyInput | Prisma.RoomCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RoomCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    data: Prisma.RoomCreateManyInput | Prisma.RoomCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RoomIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RoomUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RoomUpdateInput, Prisma.RoomUncheckedUpdateInput>;
    where: Prisma.RoomWhereUniqueInput;
};
export type RoomUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RoomUpdateManyMutationInput, Prisma.RoomUncheckedUpdateManyInput>;
    where?: Prisma.RoomWhereInput;
    limit?: number;
};
export type RoomUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RoomUpdateManyMutationInput, Prisma.RoomUncheckedUpdateManyInput>;
    where?: Prisma.RoomWhereInput;
    limit?: number;
    include?: Prisma.RoomIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RoomUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
    where: Prisma.RoomWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomCreateInput, Prisma.RoomUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RoomUpdateInput, Prisma.RoomUncheckedUpdateInput>;
};
export type RoomDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
    where: Prisma.RoomWhereUniqueInput;
};
export type RoomDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomWhereInput;
    limit?: number;
};
export type Room$bookingRoomsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingRoomSelect<ExtArgs> | null;
    omit?: Prisma.BookingRoomOmit<ExtArgs> | null;
    include?: Prisma.BookingRoomInclude<ExtArgs> | null;
    where?: Prisma.BookingRoomWhereInput;
    orderBy?: Prisma.BookingRoomOrderByWithRelationInput | Prisma.BookingRoomOrderByWithRelationInput[];
    cursor?: Prisma.BookingRoomWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingRoomScalarFieldEnum | Prisma.BookingRoomScalarFieldEnum[];
};
export type Room$housekeepingTasksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeepingTaskSelect<ExtArgs> | null;
    omit?: Prisma.HousekeepingTaskOmit<ExtArgs> | null;
    include?: Prisma.HousekeepingTaskInclude<ExtArgs> | null;
    where?: Prisma.HousekeepingTaskWhereInput;
    orderBy?: Prisma.HousekeepingTaskOrderByWithRelationInput | Prisma.HousekeepingTaskOrderByWithRelationInput[];
    cursor?: Prisma.HousekeepingTaskWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HousekeepingTaskScalarFieldEnum | Prisma.HousekeepingTaskScalarFieldEnum[];
};
export type Room$housekeeperAssignsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Room$issuesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type RoomDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
};
