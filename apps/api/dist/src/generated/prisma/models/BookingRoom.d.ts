import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BookingRoomModel = runtime.Types.Result.DefaultSelection<Prisma.$BookingRoomPayload>;
export type AggregateBookingRoom = {
    _count: BookingRoomCountAggregateOutputType | null;
    _avg: BookingRoomAvgAggregateOutputType | null;
    _sum: BookingRoomSumAggregateOutputType | null;
    _min: BookingRoomMinAggregateOutputType | null;
    _max: BookingRoomMaxAggregateOutputType | null;
};
export type BookingRoomAvgAggregateOutputType = {
    pricePerNight: number | null;
};
export type BookingRoomSumAggregateOutputType = {
    pricePerNight: number | null;
};
export type BookingRoomMinAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    roomTypeId: string | null;
    assignedRoomId: string | null;
    pricePerNight: number | null;
};
export type BookingRoomMaxAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    roomTypeId: string | null;
    assignedRoomId: string | null;
    pricePerNight: number | null;
};
export type BookingRoomCountAggregateOutputType = {
    id: number;
    bookingId: number;
    roomTypeId: number;
    assignedRoomId: number;
    pricePerNight: number;
    _all: number;
};
export type BookingRoomAvgAggregateInputType = {
    pricePerNight?: true;
};
export type BookingRoomSumAggregateInputType = {
    pricePerNight?: true;
};
export type BookingRoomMinAggregateInputType = {
    id?: true;
    bookingId?: true;
    roomTypeId?: true;
    assignedRoomId?: true;
    pricePerNight?: true;
};
export type BookingRoomMaxAggregateInputType = {
    id?: true;
    bookingId?: true;
    roomTypeId?: true;
    assignedRoomId?: true;
    pricePerNight?: true;
};
export type BookingRoomCountAggregateInputType = {
    id?: true;
    bookingId?: true;
    roomTypeId?: true;
    assignedRoomId?: true;
    pricePerNight?: true;
    _all?: true;
};
export type BookingRoomAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingRoomWhereInput;
    orderBy?: Prisma.BookingRoomOrderByWithRelationInput | Prisma.BookingRoomOrderByWithRelationInput[];
    cursor?: Prisma.BookingRoomWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BookingRoomCountAggregateInputType;
    _avg?: BookingRoomAvgAggregateInputType;
    _sum?: BookingRoomSumAggregateInputType;
    _min?: BookingRoomMinAggregateInputType;
    _max?: BookingRoomMaxAggregateInputType;
};
export type GetBookingRoomAggregateType<T extends BookingRoomAggregateArgs> = {
    [P in keyof T & keyof AggregateBookingRoom]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBookingRoom[P]> : Prisma.GetScalarType<T[P], AggregateBookingRoom[P]>;
};
export type BookingRoomGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingRoomWhereInput;
    orderBy?: Prisma.BookingRoomOrderByWithAggregationInput | Prisma.BookingRoomOrderByWithAggregationInput[];
    by: Prisma.BookingRoomScalarFieldEnum[] | Prisma.BookingRoomScalarFieldEnum;
    having?: Prisma.BookingRoomScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BookingRoomCountAggregateInputType | true;
    _avg?: BookingRoomAvgAggregateInputType;
    _sum?: BookingRoomSumAggregateInputType;
    _min?: BookingRoomMinAggregateInputType;
    _max?: BookingRoomMaxAggregateInputType;
};
export type BookingRoomGroupByOutputType = {
    id: string;
    bookingId: string;
    roomTypeId: string;
    assignedRoomId: string | null;
    pricePerNight: number;
    _count: BookingRoomCountAggregateOutputType | null;
    _avg: BookingRoomAvgAggregateOutputType | null;
    _sum: BookingRoomSumAggregateOutputType | null;
    _min: BookingRoomMinAggregateOutputType | null;
    _max: BookingRoomMaxAggregateOutputType | null;
};
export type GetBookingRoomGroupByPayload<T extends BookingRoomGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BookingRoomGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BookingRoomGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BookingRoomGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BookingRoomGroupByOutputType[P]>;
}>>;
export type BookingRoomWhereInput = {
    AND?: Prisma.BookingRoomWhereInput | Prisma.BookingRoomWhereInput[];
    OR?: Prisma.BookingRoomWhereInput[];
    NOT?: Prisma.BookingRoomWhereInput | Prisma.BookingRoomWhereInput[];
    id?: Prisma.StringFilter<"BookingRoom"> | string;
    bookingId?: Prisma.StringFilter<"BookingRoom"> | string;
    roomTypeId?: Prisma.StringFilter<"BookingRoom"> | string;
    assignedRoomId?: Prisma.StringNullableFilter<"BookingRoom"> | string | null;
    pricePerNight?: Prisma.IntFilter<"BookingRoom"> | number;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
    roomType?: Prisma.XOR<Prisma.RoomTypeScalarRelationFilter, Prisma.RoomTypeWhereInput>;
    assignedRoom?: Prisma.XOR<Prisma.RoomNullableScalarRelationFilter, Prisma.RoomWhereInput> | null;
};
export type BookingRoomOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrder;
    assignedRoomId?: Prisma.SortOrderInput | Prisma.SortOrder;
    pricePerNight?: Prisma.SortOrder;
    booking?: Prisma.BookingOrderByWithRelationInput;
    roomType?: Prisma.RoomTypeOrderByWithRelationInput;
    assignedRoom?: Prisma.RoomOrderByWithRelationInput;
};
export type BookingRoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.BookingRoomWhereInput | Prisma.BookingRoomWhereInput[];
    OR?: Prisma.BookingRoomWhereInput[];
    NOT?: Prisma.BookingRoomWhereInput | Prisma.BookingRoomWhereInput[];
    bookingId?: Prisma.StringFilter<"BookingRoom"> | string;
    roomTypeId?: Prisma.StringFilter<"BookingRoom"> | string;
    assignedRoomId?: Prisma.StringNullableFilter<"BookingRoom"> | string | null;
    pricePerNight?: Prisma.IntFilter<"BookingRoom"> | number;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
    roomType?: Prisma.XOR<Prisma.RoomTypeScalarRelationFilter, Prisma.RoomTypeWhereInput>;
    assignedRoom?: Prisma.XOR<Prisma.RoomNullableScalarRelationFilter, Prisma.RoomWhereInput> | null;
}, "id">;
export type BookingRoomOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrder;
    assignedRoomId?: Prisma.SortOrderInput | Prisma.SortOrder;
    pricePerNight?: Prisma.SortOrder;
    _count?: Prisma.BookingRoomCountOrderByAggregateInput;
    _avg?: Prisma.BookingRoomAvgOrderByAggregateInput;
    _max?: Prisma.BookingRoomMaxOrderByAggregateInput;
    _min?: Prisma.BookingRoomMinOrderByAggregateInput;
    _sum?: Prisma.BookingRoomSumOrderByAggregateInput;
};
export type BookingRoomScalarWhereWithAggregatesInput = {
    AND?: Prisma.BookingRoomScalarWhereWithAggregatesInput | Prisma.BookingRoomScalarWhereWithAggregatesInput[];
    OR?: Prisma.BookingRoomScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BookingRoomScalarWhereWithAggregatesInput | Prisma.BookingRoomScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"BookingRoom"> | string;
    bookingId?: Prisma.StringWithAggregatesFilter<"BookingRoom"> | string;
    roomTypeId?: Prisma.StringWithAggregatesFilter<"BookingRoom"> | string;
    assignedRoomId?: Prisma.StringNullableWithAggregatesFilter<"BookingRoom"> | string | null;
    pricePerNight?: Prisma.IntWithAggregatesFilter<"BookingRoom"> | number;
};
export type BookingRoomCreateInput = {
    id?: string;
    pricePerNight: number;
    booking: Prisma.BookingCreateNestedOneWithoutBookingRoomsInput;
    roomType: Prisma.RoomTypeCreateNestedOneWithoutBookingRoomsInput;
    assignedRoom?: Prisma.RoomCreateNestedOneWithoutBookingRoomsInput;
};
export type BookingRoomUncheckedCreateInput = {
    id?: string;
    bookingId: string;
    roomTypeId: string;
    assignedRoomId?: string | null;
    pricePerNight: number;
};
export type BookingRoomUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerNight?: Prisma.IntFieldUpdateOperationsInput | number;
    booking?: Prisma.BookingUpdateOneRequiredWithoutBookingRoomsNestedInput;
    roomType?: Prisma.RoomTypeUpdateOneRequiredWithoutBookingRoomsNestedInput;
    assignedRoom?: Prisma.RoomUpdateOneWithoutBookingRoomsNestedInput;
};
export type BookingRoomUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    roomTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedRoomId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pricePerNight?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type BookingRoomCreateManyInput = {
    id?: string;
    bookingId: string;
    roomTypeId: string;
    assignedRoomId?: string | null;
    pricePerNight: number;
};
export type BookingRoomUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerNight?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type BookingRoomUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    roomTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedRoomId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pricePerNight?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type BookingRoomListRelationFilter = {
    every?: Prisma.BookingRoomWhereInput;
    some?: Prisma.BookingRoomWhereInput;
    none?: Prisma.BookingRoomWhereInput;
};
export type BookingRoomOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BookingRoomCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrder;
    assignedRoomId?: Prisma.SortOrder;
    pricePerNight?: Prisma.SortOrder;
};
export type BookingRoomAvgOrderByAggregateInput = {
    pricePerNight?: Prisma.SortOrder;
};
export type BookingRoomMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrder;
    assignedRoomId?: Prisma.SortOrder;
    pricePerNight?: Prisma.SortOrder;
};
export type BookingRoomMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrder;
    assignedRoomId?: Prisma.SortOrder;
    pricePerNight?: Prisma.SortOrder;
};
export type BookingRoomSumOrderByAggregateInput = {
    pricePerNight?: Prisma.SortOrder;
};
export type BookingRoomCreateNestedManyWithoutRoomTypeInput = {
    create?: Prisma.XOR<Prisma.BookingRoomCreateWithoutRoomTypeInput, Prisma.BookingRoomUncheckedCreateWithoutRoomTypeInput> | Prisma.BookingRoomCreateWithoutRoomTypeInput[] | Prisma.BookingRoomUncheckedCreateWithoutRoomTypeInput[];
    connectOrCreate?: Prisma.BookingRoomCreateOrConnectWithoutRoomTypeInput | Prisma.BookingRoomCreateOrConnectWithoutRoomTypeInput[];
    createMany?: Prisma.BookingRoomCreateManyRoomTypeInputEnvelope;
    connect?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
};
export type BookingRoomUncheckedCreateNestedManyWithoutRoomTypeInput = {
    create?: Prisma.XOR<Prisma.BookingRoomCreateWithoutRoomTypeInput, Prisma.BookingRoomUncheckedCreateWithoutRoomTypeInput> | Prisma.BookingRoomCreateWithoutRoomTypeInput[] | Prisma.BookingRoomUncheckedCreateWithoutRoomTypeInput[];
    connectOrCreate?: Prisma.BookingRoomCreateOrConnectWithoutRoomTypeInput | Prisma.BookingRoomCreateOrConnectWithoutRoomTypeInput[];
    createMany?: Prisma.BookingRoomCreateManyRoomTypeInputEnvelope;
    connect?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
};
export type BookingRoomUpdateManyWithoutRoomTypeNestedInput = {
    create?: Prisma.XOR<Prisma.BookingRoomCreateWithoutRoomTypeInput, Prisma.BookingRoomUncheckedCreateWithoutRoomTypeInput> | Prisma.BookingRoomCreateWithoutRoomTypeInput[] | Prisma.BookingRoomUncheckedCreateWithoutRoomTypeInput[];
    connectOrCreate?: Prisma.BookingRoomCreateOrConnectWithoutRoomTypeInput | Prisma.BookingRoomCreateOrConnectWithoutRoomTypeInput[];
    upsert?: Prisma.BookingRoomUpsertWithWhereUniqueWithoutRoomTypeInput | Prisma.BookingRoomUpsertWithWhereUniqueWithoutRoomTypeInput[];
    createMany?: Prisma.BookingRoomCreateManyRoomTypeInputEnvelope;
    set?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    disconnect?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    delete?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    connect?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    update?: Prisma.BookingRoomUpdateWithWhereUniqueWithoutRoomTypeInput | Prisma.BookingRoomUpdateWithWhereUniqueWithoutRoomTypeInput[];
    updateMany?: Prisma.BookingRoomUpdateManyWithWhereWithoutRoomTypeInput | Prisma.BookingRoomUpdateManyWithWhereWithoutRoomTypeInput[];
    deleteMany?: Prisma.BookingRoomScalarWhereInput | Prisma.BookingRoomScalarWhereInput[];
};
export type BookingRoomUncheckedUpdateManyWithoutRoomTypeNestedInput = {
    create?: Prisma.XOR<Prisma.BookingRoomCreateWithoutRoomTypeInput, Prisma.BookingRoomUncheckedCreateWithoutRoomTypeInput> | Prisma.BookingRoomCreateWithoutRoomTypeInput[] | Prisma.BookingRoomUncheckedCreateWithoutRoomTypeInput[];
    connectOrCreate?: Prisma.BookingRoomCreateOrConnectWithoutRoomTypeInput | Prisma.BookingRoomCreateOrConnectWithoutRoomTypeInput[];
    upsert?: Prisma.BookingRoomUpsertWithWhereUniqueWithoutRoomTypeInput | Prisma.BookingRoomUpsertWithWhereUniqueWithoutRoomTypeInput[];
    createMany?: Prisma.BookingRoomCreateManyRoomTypeInputEnvelope;
    set?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    disconnect?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    delete?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    connect?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    update?: Prisma.BookingRoomUpdateWithWhereUniqueWithoutRoomTypeInput | Prisma.BookingRoomUpdateWithWhereUniqueWithoutRoomTypeInput[];
    updateMany?: Prisma.BookingRoomUpdateManyWithWhereWithoutRoomTypeInput | Prisma.BookingRoomUpdateManyWithWhereWithoutRoomTypeInput[];
    deleteMany?: Prisma.BookingRoomScalarWhereInput | Prisma.BookingRoomScalarWhereInput[];
};
export type BookingRoomCreateNestedManyWithoutAssignedRoomInput = {
    create?: Prisma.XOR<Prisma.BookingRoomCreateWithoutAssignedRoomInput, Prisma.BookingRoomUncheckedCreateWithoutAssignedRoomInput> | Prisma.BookingRoomCreateWithoutAssignedRoomInput[] | Prisma.BookingRoomUncheckedCreateWithoutAssignedRoomInput[];
    connectOrCreate?: Prisma.BookingRoomCreateOrConnectWithoutAssignedRoomInput | Prisma.BookingRoomCreateOrConnectWithoutAssignedRoomInput[];
    createMany?: Prisma.BookingRoomCreateManyAssignedRoomInputEnvelope;
    connect?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
};
export type BookingRoomUncheckedCreateNestedManyWithoutAssignedRoomInput = {
    create?: Prisma.XOR<Prisma.BookingRoomCreateWithoutAssignedRoomInput, Prisma.BookingRoomUncheckedCreateWithoutAssignedRoomInput> | Prisma.BookingRoomCreateWithoutAssignedRoomInput[] | Prisma.BookingRoomUncheckedCreateWithoutAssignedRoomInput[];
    connectOrCreate?: Prisma.BookingRoomCreateOrConnectWithoutAssignedRoomInput | Prisma.BookingRoomCreateOrConnectWithoutAssignedRoomInput[];
    createMany?: Prisma.BookingRoomCreateManyAssignedRoomInputEnvelope;
    connect?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
};
export type BookingRoomUpdateManyWithoutAssignedRoomNestedInput = {
    create?: Prisma.XOR<Prisma.BookingRoomCreateWithoutAssignedRoomInput, Prisma.BookingRoomUncheckedCreateWithoutAssignedRoomInput> | Prisma.BookingRoomCreateWithoutAssignedRoomInput[] | Prisma.BookingRoomUncheckedCreateWithoutAssignedRoomInput[];
    connectOrCreate?: Prisma.BookingRoomCreateOrConnectWithoutAssignedRoomInput | Prisma.BookingRoomCreateOrConnectWithoutAssignedRoomInput[];
    upsert?: Prisma.BookingRoomUpsertWithWhereUniqueWithoutAssignedRoomInput | Prisma.BookingRoomUpsertWithWhereUniqueWithoutAssignedRoomInput[];
    createMany?: Prisma.BookingRoomCreateManyAssignedRoomInputEnvelope;
    set?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    disconnect?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    delete?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    connect?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    update?: Prisma.BookingRoomUpdateWithWhereUniqueWithoutAssignedRoomInput | Prisma.BookingRoomUpdateWithWhereUniqueWithoutAssignedRoomInput[];
    updateMany?: Prisma.BookingRoomUpdateManyWithWhereWithoutAssignedRoomInput | Prisma.BookingRoomUpdateManyWithWhereWithoutAssignedRoomInput[];
    deleteMany?: Prisma.BookingRoomScalarWhereInput | Prisma.BookingRoomScalarWhereInput[];
};
export type BookingRoomUncheckedUpdateManyWithoutAssignedRoomNestedInput = {
    create?: Prisma.XOR<Prisma.BookingRoomCreateWithoutAssignedRoomInput, Prisma.BookingRoomUncheckedCreateWithoutAssignedRoomInput> | Prisma.BookingRoomCreateWithoutAssignedRoomInput[] | Prisma.BookingRoomUncheckedCreateWithoutAssignedRoomInput[];
    connectOrCreate?: Prisma.BookingRoomCreateOrConnectWithoutAssignedRoomInput | Prisma.BookingRoomCreateOrConnectWithoutAssignedRoomInput[];
    upsert?: Prisma.BookingRoomUpsertWithWhereUniqueWithoutAssignedRoomInput | Prisma.BookingRoomUpsertWithWhereUniqueWithoutAssignedRoomInput[];
    createMany?: Prisma.BookingRoomCreateManyAssignedRoomInputEnvelope;
    set?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    disconnect?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    delete?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    connect?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    update?: Prisma.BookingRoomUpdateWithWhereUniqueWithoutAssignedRoomInput | Prisma.BookingRoomUpdateWithWhereUniqueWithoutAssignedRoomInput[];
    updateMany?: Prisma.BookingRoomUpdateManyWithWhereWithoutAssignedRoomInput | Prisma.BookingRoomUpdateManyWithWhereWithoutAssignedRoomInput[];
    deleteMany?: Prisma.BookingRoomScalarWhereInput | Prisma.BookingRoomScalarWhereInput[];
};
export type BookingRoomCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.BookingRoomCreateWithoutBookingInput, Prisma.BookingRoomUncheckedCreateWithoutBookingInput> | Prisma.BookingRoomCreateWithoutBookingInput[] | Prisma.BookingRoomUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.BookingRoomCreateOrConnectWithoutBookingInput | Prisma.BookingRoomCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.BookingRoomCreateManyBookingInputEnvelope;
    connect?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
};
export type BookingRoomUncheckedCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.BookingRoomCreateWithoutBookingInput, Prisma.BookingRoomUncheckedCreateWithoutBookingInput> | Prisma.BookingRoomCreateWithoutBookingInput[] | Prisma.BookingRoomUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.BookingRoomCreateOrConnectWithoutBookingInput | Prisma.BookingRoomCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.BookingRoomCreateManyBookingInputEnvelope;
    connect?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
};
export type BookingRoomUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.BookingRoomCreateWithoutBookingInput, Prisma.BookingRoomUncheckedCreateWithoutBookingInput> | Prisma.BookingRoomCreateWithoutBookingInput[] | Prisma.BookingRoomUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.BookingRoomCreateOrConnectWithoutBookingInput | Prisma.BookingRoomCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.BookingRoomUpsertWithWhereUniqueWithoutBookingInput | Prisma.BookingRoomUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.BookingRoomCreateManyBookingInputEnvelope;
    set?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    disconnect?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    delete?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    connect?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    update?: Prisma.BookingRoomUpdateWithWhereUniqueWithoutBookingInput | Prisma.BookingRoomUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.BookingRoomUpdateManyWithWhereWithoutBookingInput | Prisma.BookingRoomUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.BookingRoomScalarWhereInput | Prisma.BookingRoomScalarWhereInput[];
};
export type BookingRoomUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.BookingRoomCreateWithoutBookingInput, Prisma.BookingRoomUncheckedCreateWithoutBookingInput> | Prisma.BookingRoomCreateWithoutBookingInput[] | Prisma.BookingRoomUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.BookingRoomCreateOrConnectWithoutBookingInput | Prisma.BookingRoomCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.BookingRoomUpsertWithWhereUniqueWithoutBookingInput | Prisma.BookingRoomUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.BookingRoomCreateManyBookingInputEnvelope;
    set?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    disconnect?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    delete?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    connect?: Prisma.BookingRoomWhereUniqueInput | Prisma.BookingRoomWhereUniqueInput[];
    update?: Prisma.BookingRoomUpdateWithWhereUniqueWithoutBookingInput | Prisma.BookingRoomUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.BookingRoomUpdateManyWithWhereWithoutBookingInput | Prisma.BookingRoomUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.BookingRoomScalarWhereInput | Prisma.BookingRoomScalarWhereInput[];
};
export type BookingRoomCreateWithoutRoomTypeInput = {
    id?: string;
    pricePerNight: number;
    booking: Prisma.BookingCreateNestedOneWithoutBookingRoomsInput;
    assignedRoom?: Prisma.RoomCreateNestedOneWithoutBookingRoomsInput;
};
export type BookingRoomUncheckedCreateWithoutRoomTypeInput = {
    id?: string;
    bookingId: string;
    assignedRoomId?: string | null;
    pricePerNight: number;
};
export type BookingRoomCreateOrConnectWithoutRoomTypeInput = {
    where: Prisma.BookingRoomWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingRoomCreateWithoutRoomTypeInput, Prisma.BookingRoomUncheckedCreateWithoutRoomTypeInput>;
};
export type BookingRoomCreateManyRoomTypeInputEnvelope = {
    data: Prisma.BookingRoomCreateManyRoomTypeInput | Prisma.BookingRoomCreateManyRoomTypeInput[];
    skipDuplicates?: boolean;
};
export type BookingRoomUpsertWithWhereUniqueWithoutRoomTypeInput = {
    where: Prisma.BookingRoomWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookingRoomUpdateWithoutRoomTypeInput, Prisma.BookingRoomUncheckedUpdateWithoutRoomTypeInput>;
    create: Prisma.XOR<Prisma.BookingRoomCreateWithoutRoomTypeInput, Prisma.BookingRoomUncheckedCreateWithoutRoomTypeInput>;
};
export type BookingRoomUpdateWithWhereUniqueWithoutRoomTypeInput = {
    where: Prisma.BookingRoomWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookingRoomUpdateWithoutRoomTypeInput, Prisma.BookingRoomUncheckedUpdateWithoutRoomTypeInput>;
};
export type BookingRoomUpdateManyWithWhereWithoutRoomTypeInput = {
    where: Prisma.BookingRoomScalarWhereInput;
    data: Prisma.XOR<Prisma.BookingRoomUpdateManyMutationInput, Prisma.BookingRoomUncheckedUpdateManyWithoutRoomTypeInput>;
};
export type BookingRoomScalarWhereInput = {
    AND?: Prisma.BookingRoomScalarWhereInput | Prisma.BookingRoomScalarWhereInput[];
    OR?: Prisma.BookingRoomScalarWhereInput[];
    NOT?: Prisma.BookingRoomScalarWhereInput | Prisma.BookingRoomScalarWhereInput[];
    id?: Prisma.StringFilter<"BookingRoom"> | string;
    bookingId?: Prisma.StringFilter<"BookingRoom"> | string;
    roomTypeId?: Prisma.StringFilter<"BookingRoom"> | string;
    assignedRoomId?: Prisma.StringNullableFilter<"BookingRoom"> | string | null;
    pricePerNight?: Prisma.IntFilter<"BookingRoom"> | number;
};
export type BookingRoomCreateWithoutAssignedRoomInput = {
    id?: string;
    pricePerNight: number;
    booking: Prisma.BookingCreateNestedOneWithoutBookingRoomsInput;
    roomType: Prisma.RoomTypeCreateNestedOneWithoutBookingRoomsInput;
};
export type BookingRoomUncheckedCreateWithoutAssignedRoomInput = {
    id?: string;
    bookingId: string;
    roomTypeId: string;
    pricePerNight: number;
};
export type BookingRoomCreateOrConnectWithoutAssignedRoomInput = {
    where: Prisma.BookingRoomWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingRoomCreateWithoutAssignedRoomInput, Prisma.BookingRoomUncheckedCreateWithoutAssignedRoomInput>;
};
export type BookingRoomCreateManyAssignedRoomInputEnvelope = {
    data: Prisma.BookingRoomCreateManyAssignedRoomInput | Prisma.BookingRoomCreateManyAssignedRoomInput[];
    skipDuplicates?: boolean;
};
export type BookingRoomUpsertWithWhereUniqueWithoutAssignedRoomInput = {
    where: Prisma.BookingRoomWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookingRoomUpdateWithoutAssignedRoomInput, Prisma.BookingRoomUncheckedUpdateWithoutAssignedRoomInput>;
    create: Prisma.XOR<Prisma.BookingRoomCreateWithoutAssignedRoomInput, Prisma.BookingRoomUncheckedCreateWithoutAssignedRoomInput>;
};
export type BookingRoomUpdateWithWhereUniqueWithoutAssignedRoomInput = {
    where: Prisma.BookingRoomWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookingRoomUpdateWithoutAssignedRoomInput, Prisma.BookingRoomUncheckedUpdateWithoutAssignedRoomInput>;
};
export type BookingRoomUpdateManyWithWhereWithoutAssignedRoomInput = {
    where: Prisma.BookingRoomScalarWhereInput;
    data: Prisma.XOR<Prisma.BookingRoomUpdateManyMutationInput, Prisma.BookingRoomUncheckedUpdateManyWithoutAssignedRoomInput>;
};
export type BookingRoomCreateWithoutBookingInput = {
    id?: string;
    pricePerNight: number;
    roomType: Prisma.RoomTypeCreateNestedOneWithoutBookingRoomsInput;
    assignedRoom?: Prisma.RoomCreateNestedOneWithoutBookingRoomsInput;
};
export type BookingRoomUncheckedCreateWithoutBookingInput = {
    id?: string;
    roomTypeId: string;
    assignedRoomId?: string | null;
    pricePerNight: number;
};
export type BookingRoomCreateOrConnectWithoutBookingInput = {
    where: Prisma.BookingRoomWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingRoomCreateWithoutBookingInput, Prisma.BookingRoomUncheckedCreateWithoutBookingInput>;
};
export type BookingRoomCreateManyBookingInputEnvelope = {
    data: Prisma.BookingRoomCreateManyBookingInput | Prisma.BookingRoomCreateManyBookingInput[];
    skipDuplicates?: boolean;
};
export type BookingRoomUpsertWithWhereUniqueWithoutBookingInput = {
    where: Prisma.BookingRoomWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookingRoomUpdateWithoutBookingInput, Prisma.BookingRoomUncheckedUpdateWithoutBookingInput>;
    create: Prisma.XOR<Prisma.BookingRoomCreateWithoutBookingInput, Prisma.BookingRoomUncheckedCreateWithoutBookingInput>;
};
export type BookingRoomUpdateWithWhereUniqueWithoutBookingInput = {
    where: Prisma.BookingRoomWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookingRoomUpdateWithoutBookingInput, Prisma.BookingRoomUncheckedUpdateWithoutBookingInput>;
};
export type BookingRoomUpdateManyWithWhereWithoutBookingInput = {
    where: Prisma.BookingRoomScalarWhereInput;
    data: Prisma.XOR<Prisma.BookingRoomUpdateManyMutationInput, Prisma.BookingRoomUncheckedUpdateManyWithoutBookingInput>;
};
export type BookingRoomCreateManyRoomTypeInput = {
    id?: string;
    bookingId: string;
    assignedRoomId?: string | null;
    pricePerNight: number;
};
export type BookingRoomUpdateWithoutRoomTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerNight?: Prisma.IntFieldUpdateOperationsInput | number;
    booking?: Prisma.BookingUpdateOneRequiredWithoutBookingRoomsNestedInput;
    assignedRoom?: Prisma.RoomUpdateOneWithoutBookingRoomsNestedInput;
};
export type BookingRoomUncheckedUpdateWithoutRoomTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedRoomId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pricePerNight?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type BookingRoomUncheckedUpdateManyWithoutRoomTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedRoomId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pricePerNight?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type BookingRoomCreateManyAssignedRoomInput = {
    id?: string;
    bookingId: string;
    roomTypeId: string;
    pricePerNight: number;
};
export type BookingRoomUpdateWithoutAssignedRoomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerNight?: Prisma.IntFieldUpdateOperationsInput | number;
    booking?: Prisma.BookingUpdateOneRequiredWithoutBookingRoomsNestedInput;
    roomType?: Prisma.RoomTypeUpdateOneRequiredWithoutBookingRoomsNestedInput;
};
export type BookingRoomUncheckedUpdateWithoutAssignedRoomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    roomTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerNight?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type BookingRoomUncheckedUpdateManyWithoutAssignedRoomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    roomTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerNight?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type BookingRoomCreateManyBookingInput = {
    id?: string;
    roomTypeId: string;
    assignedRoomId?: string | null;
    pricePerNight: number;
};
export type BookingRoomUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pricePerNight?: Prisma.IntFieldUpdateOperationsInput | number;
    roomType?: Prisma.RoomTypeUpdateOneRequiredWithoutBookingRoomsNestedInput;
    assignedRoom?: Prisma.RoomUpdateOneWithoutBookingRoomsNestedInput;
};
export type BookingRoomUncheckedUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedRoomId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pricePerNight?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type BookingRoomUncheckedUpdateManyWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedRoomId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    pricePerNight?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type BookingRoomSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    roomTypeId?: boolean;
    assignedRoomId?: boolean;
    pricePerNight?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    roomType?: boolean | Prisma.RoomTypeDefaultArgs<ExtArgs>;
    assignedRoom?: boolean | Prisma.BookingRoom$assignedRoomArgs<ExtArgs>;
}, ExtArgs["result"]["bookingRoom"]>;
export type BookingRoomSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    roomTypeId?: boolean;
    assignedRoomId?: boolean;
    pricePerNight?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    roomType?: boolean | Prisma.RoomTypeDefaultArgs<ExtArgs>;
    assignedRoom?: boolean | Prisma.BookingRoom$assignedRoomArgs<ExtArgs>;
}, ExtArgs["result"]["bookingRoom"]>;
export type BookingRoomSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    roomTypeId?: boolean;
    assignedRoomId?: boolean;
    pricePerNight?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    roomType?: boolean | Prisma.RoomTypeDefaultArgs<ExtArgs>;
    assignedRoom?: boolean | Prisma.BookingRoom$assignedRoomArgs<ExtArgs>;
}, ExtArgs["result"]["bookingRoom"]>;
export type BookingRoomSelectScalar = {
    id?: boolean;
    bookingId?: boolean;
    roomTypeId?: boolean;
    assignedRoomId?: boolean;
    pricePerNight?: boolean;
};
export type BookingRoomOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "bookingId" | "roomTypeId" | "assignedRoomId" | "pricePerNight", ExtArgs["result"]["bookingRoom"]>;
export type BookingRoomInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    roomType?: boolean | Prisma.RoomTypeDefaultArgs<ExtArgs>;
    assignedRoom?: boolean | Prisma.BookingRoom$assignedRoomArgs<ExtArgs>;
};
export type BookingRoomIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    roomType?: boolean | Prisma.RoomTypeDefaultArgs<ExtArgs>;
    assignedRoom?: boolean | Prisma.BookingRoom$assignedRoomArgs<ExtArgs>;
};
export type BookingRoomIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    roomType?: boolean | Prisma.RoomTypeDefaultArgs<ExtArgs>;
    assignedRoom?: boolean | Prisma.BookingRoom$assignedRoomArgs<ExtArgs>;
};
export type $BookingRoomPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "BookingRoom";
    objects: {
        booking: Prisma.$BookingPayload<ExtArgs>;
        roomType: Prisma.$RoomTypePayload<ExtArgs>;
        assignedRoom: Prisma.$RoomPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        bookingId: string;
        roomTypeId: string;
        assignedRoomId: string | null;
        pricePerNight: number;
    }, ExtArgs["result"]["bookingRoom"]>;
    composites: {};
};
export type BookingRoomGetPayload<S extends boolean | null | undefined | BookingRoomDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BookingRoomPayload, S>;
export type BookingRoomCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BookingRoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BookingRoomCountAggregateInputType | true;
};
export interface BookingRoomDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['BookingRoom'];
        meta: {
            name: 'BookingRoom';
        };
    };
    findUnique<T extends BookingRoomFindUniqueArgs>(args: Prisma.SelectSubset<T, BookingRoomFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BookingRoomClient<runtime.Types.Result.GetResult<Prisma.$BookingRoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BookingRoomFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BookingRoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BookingRoomClient<runtime.Types.Result.GetResult<Prisma.$BookingRoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BookingRoomFindFirstArgs>(args?: Prisma.SelectSubset<T, BookingRoomFindFirstArgs<ExtArgs>>): Prisma.Prisma__BookingRoomClient<runtime.Types.Result.GetResult<Prisma.$BookingRoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BookingRoomFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BookingRoomFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BookingRoomClient<runtime.Types.Result.GetResult<Prisma.$BookingRoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BookingRoomFindManyArgs>(args?: Prisma.SelectSubset<T, BookingRoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingRoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BookingRoomCreateArgs>(args: Prisma.SelectSubset<T, BookingRoomCreateArgs<ExtArgs>>): Prisma.Prisma__BookingRoomClient<runtime.Types.Result.GetResult<Prisma.$BookingRoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BookingRoomCreateManyArgs>(args?: Prisma.SelectSubset<T, BookingRoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BookingRoomCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BookingRoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingRoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BookingRoomDeleteArgs>(args: Prisma.SelectSubset<T, BookingRoomDeleteArgs<ExtArgs>>): Prisma.Prisma__BookingRoomClient<runtime.Types.Result.GetResult<Prisma.$BookingRoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BookingRoomUpdateArgs>(args: Prisma.SelectSubset<T, BookingRoomUpdateArgs<ExtArgs>>): Prisma.Prisma__BookingRoomClient<runtime.Types.Result.GetResult<Prisma.$BookingRoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BookingRoomDeleteManyArgs>(args?: Prisma.SelectSubset<T, BookingRoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BookingRoomUpdateManyArgs>(args: Prisma.SelectSubset<T, BookingRoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BookingRoomUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BookingRoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingRoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BookingRoomUpsertArgs>(args: Prisma.SelectSubset<T, BookingRoomUpsertArgs<ExtArgs>>): Prisma.Prisma__BookingRoomClient<runtime.Types.Result.GetResult<Prisma.$BookingRoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BookingRoomCountArgs>(args?: Prisma.Subset<T, BookingRoomCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BookingRoomCountAggregateOutputType> : number>;
    aggregate<T extends BookingRoomAggregateArgs>(args: Prisma.Subset<T, BookingRoomAggregateArgs>): Prisma.PrismaPromise<GetBookingRoomAggregateType<T>>;
    groupBy<T extends BookingRoomGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BookingRoomGroupByArgs['orderBy'];
    } : {
        orderBy?: BookingRoomGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BookingRoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BookingRoomFieldRefs;
}
export interface Prisma__BookingRoomClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    booking<T extends Prisma.BookingDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BookingDefaultArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    roomType<T extends Prisma.RoomTypeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RoomTypeDefaultArgs<ExtArgs>>): Prisma.Prisma__RoomTypeClient<runtime.Types.Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    assignedRoom<T extends Prisma.BookingRoom$assignedRoomArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BookingRoom$assignedRoomArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BookingRoomFieldRefs {
    readonly id: Prisma.FieldRef<"BookingRoom", 'String'>;
    readonly bookingId: Prisma.FieldRef<"BookingRoom", 'String'>;
    readonly roomTypeId: Prisma.FieldRef<"BookingRoom", 'String'>;
    readonly assignedRoomId: Prisma.FieldRef<"BookingRoom", 'String'>;
    readonly pricePerNight: Prisma.FieldRef<"BookingRoom", 'Int'>;
}
export type BookingRoomFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingRoomSelect<ExtArgs> | null;
    omit?: Prisma.BookingRoomOmit<ExtArgs> | null;
    include?: Prisma.BookingRoomInclude<ExtArgs> | null;
    where: Prisma.BookingRoomWhereUniqueInput;
};
export type BookingRoomFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingRoomSelect<ExtArgs> | null;
    omit?: Prisma.BookingRoomOmit<ExtArgs> | null;
    include?: Prisma.BookingRoomInclude<ExtArgs> | null;
    where: Prisma.BookingRoomWhereUniqueInput;
};
export type BookingRoomFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type BookingRoomFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type BookingRoomFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type BookingRoomCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingRoomSelect<ExtArgs> | null;
    omit?: Prisma.BookingRoomOmit<ExtArgs> | null;
    include?: Prisma.BookingRoomInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookingRoomCreateInput, Prisma.BookingRoomUncheckedCreateInput>;
};
export type BookingRoomCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BookingRoomCreateManyInput | Prisma.BookingRoomCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BookingRoomCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingRoomSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BookingRoomOmit<ExtArgs> | null;
    data: Prisma.BookingRoomCreateManyInput | Prisma.BookingRoomCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BookingRoomIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BookingRoomUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingRoomSelect<ExtArgs> | null;
    omit?: Prisma.BookingRoomOmit<ExtArgs> | null;
    include?: Prisma.BookingRoomInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookingRoomUpdateInput, Prisma.BookingRoomUncheckedUpdateInput>;
    where: Prisma.BookingRoomWhereUniqueInput;
};
export type BookingRoomUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BookingRoomUpdateManyMutationInput, Prisma.BookingRoomUncheckedUpdateManyInput>;
    where?: Prisma.BookingRoomWhereInput;
    limit?: number;
};
export type BookingRoomUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingRoomSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BookingRoomOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookingRoomUpdateManyMutationInput, Prisma.BookingRoomUncheckedUpdateManyInput>;
    where?: Prisma.BookingRoomWhereInput;
    limit?: number;
    include?: Prisma.BookingRoomIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BookingRoomUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingRoomSelect<ExtArgs> | null;
    omit?: Prisma.BookingRoomOmit<ExtArgs> | null;
    include?: Prisma.BookingRoomInclude<ExtArgs> | null;
    where: Prisma.BookingRoomWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingRoomCreateInput, Prisma.BookingRoomUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BookingRoomUpdateInput, Prisma.BookingRoomUncheckedUpdateInput>;
};
export type BookingRoomDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingRoomSelect<ExtArgs> | null;
    omit?: Prisma.BookingRoomOmit<ExtArgs> | null;
    include?: Prisma.BookingRoomInclude<ExtArgs> | null;
    where: Prisma.BookingRoomWhereUniqueInput;
};
export type BookingRoomDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingRoomWhereInput;
    limit?: number;
};
export type BookingRoom$assignedRoomArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
    where?: Prisma.RoomWhereInput;
};
export type BookingRoomDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingRoomSelect<ExtArgs> | null;
    omit?: Prisma.BookingRoomOmit<ExtArgs> | null;
    include?: Prisma.BookingRoomInclude<ExtArgs> | null;
};
