import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type HousekeepingTaskModel = runtime.Types.Result.DefaultSelection<Prisma.$HousekeepingTaskPayload>;
export type AggregateHousekeepingTask = {
    _count: HousekeepingTaskCountAggregateOutputType | null;
    _min: HousekeepingTaskMinAggregateOutputType | null;
    _max: HousekeepingTaskMaxAggregateOutputType | null;
};
export type HousekeepingTaskMinAggregateOutputType = {
    id: string | null;
    roomId: string | null;
    assignedTo: string | null;
    taskType: $Enums.TaskType | null;
    status: $Enums.TaskStatus | null;
    scheduledDate: Date | null;
    startedAt: Date | null;
    completedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type HousekeepingTaskMaxAggregateOutputType = {
    id: string | null;
    roomId: string | null;
    assignedTo: string | null;
    taskType: $Enums.TaskType | null;
    status: $Enums.TaskStatus | null;
    scheduledDate: Date | null;
    startedAt: Date | null;
    completedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type HousekeepingTaskCountAggregateOutputType = {
    id: number;
    roomId: number;
    assignedTo: number;
    taskType: number;
    status: number;
    scheduledDate: number;
    startedAt: number;
    completedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type HousekeepingTaskMinAggregateInputType = {
    id?: true;
    roomId?: true;
    assignedTo?: true;
    taskType?: true;
    status?: true;
    scheduledDate?: true;
    startedAt?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type HousekeepingTaskMaxAggregateInputType = {
    id?: true;
    roomId?: true;
    assignedTo?: true;
    taskType?: true;
    status?: true;
    scheduledDate?: true;
    startedAt?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type HousekeepingTaskCountAggregateInputType = {
    id?: true;
    roomId?: true;
    assignedTo?: true;
    taskType?: true;
    status?: true;
    scheduledDate?: true;
    startedAt?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type HousekeepingTaskAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HousekeepingTaskWhereInput;
    orderBy?: Prisma.HousekeepingTaskOrderByWithRelationInput | Prisma.HousekeepingTaskOrderByWithRelationInput[];
    cursor?: Prisma.HousekeepingTaskWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | HousekeepingTaskCountAggregateInputType;
    _min?: HousekeepingTaskMinAggregateInputType;
    _max?: HousekeepingTaskMaxAggregateInputType;
};
export type GetHousekeepingTaskAggregateType<T extends HousekeepingTaskAggregateArgs> = {
    [P in keyof T & keyof AggregateHousekeepingTask]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHousekeepingTask[P]> : Prisma.GetScalarType<T[P], AggregateHousekeepingTask[P]>;
};
export type HousekeepingTaskGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HousekeepingTaskWhereInput;
    orderBy?: Prisma.HousekeepingTaskOrderByWithAggregationInput | Prisma.HousekeepingTaskOrderByWithAggregationInput[];
    by: Prisma.HousekeepingTaskScalarFieldEnum[] | Prisma.HousekeepingTaskScalarFieldEnum;
    having?: Prisma.HousekeepingTaskScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HousekeepingTaskCountAggregateInputType | true;
    _min?: HousekeepingTaskMinAggregateInputType;
    _max?: HousekeepingTaskMaxAggregateInputType;
};
export type HousekeepingTaskGroupByOutputType = {
    id: string;
    roomId: string;
    assignedTo: string;
    taskType: $Enums.TaskType;
    status: $Enums.TaskStatus;
    scheduledDate: Date;
    startedAt: Date | null;
    completedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: HousekeepingTaskCountAggregateOutputType | null;
    _min: HousekeepingTaskMinAggregateOutputType | null;
    _max: HousekeepingTaskMaxAggregateOutputType | null;
};
export type GetHousekeepingTaskGroupByPayload<T extends HousekeepingTaskGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<HousekeepingTaskGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof HousekeepingTaskGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], HousekeepingTaskGroupByOutputType[P]> : Prisma.GetScalarType<T[P], HousekeepingTaskGroupByOutputType[P]>;
}>>;
export type HousekeepingTaskWhereInput = {
    AND?: Prisma.HousekeepingTaskWhereInput | Prisma.HousekeepingTaskWhereInput[];
    OR?: Prisma.HousekeepingTaskWhereInput[];
    NOT?: Prisma.HousekeepingTaskWhereInput | Prisma.HousekeepingTaskWhereInput[];
    id?: Prisma.StringFilter<"HousekeepingTask"> | string;
    roomId?: Prisma.StringFilter<"HousekeepingTask"> | string;
    assignedTo?: Prisma.StringFilter<"HousekeepingTask"> | string;
    taskType?: Prisma.EnumTaskTypeFilter<"HousekeepingTask"> | $Enums.TaskType;
    status?: Prisma.EnumTaskStatusFilter<"HousekeepingTask"> | $Enums.TaskStatus;
    scheduledDate?: Prisma.DateTimeFilter<"HousekeepingTask"> | Date | string;
    startedAt?: Prisma.DateTimeNullableFilter<"HousekeepingTask"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"HousekeepingTask"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"HousekeepingTask"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"HousekeepingTask"> | Date | string;
    room?: Prisma.XOR<Prisma.RoomScalarRelationFilter, Prisma.RoomWhereInput>;
    assignee?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type HousekeepingTaskOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    assignedTo?: Prisma.SortOrder;
    taskType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    scheduledDate?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    room?: Prisma.RoomOrderByWithRelationInput;
    assignee?: Prisma.UserOrderByWithRelationInput;
};
export type HousekeepingTaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.HousekeepingTaskWhereInput | Prisma.HousekeepingTaskWhereInput[];
    OR?: Prisma.HousekeepingTaskWhereInput[];
    NOT?: Prisma.HousekeepingTaskWhereInput | Prisma.HousekeepingTaskWhereInput[];
    roomId?: Prisma.StringFilter<"HousekeepingTask"> | string;
    assignedTo?: Prisma.StringFilter<"HousekeepingTask"> | string;
    taskType?: Prisma.EnumTaskTypeFilter<"HousekeepingTask"> | $Enums.TaskType;
    status?: Prisma.EnumTaskStatusFilter<"HousekeepingTask"> | $Enums.TaskStatus;
    scheduledDate?: Prisma.DateTimeFilter<"HousekeepingTask"> | Date | string;
    startedAt?: Prisma.DateTimeNullableFilter<"HousekeepingTask"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"HousekeepingTask"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"HousekeepingTask"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"HousekeepingTask"> | Date | string;
    room?: Prisma.XOR<Prisma.RoomScalarRelationFilter, Prisma.RoomWhereInput>;
    assignee?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type HousekeepingTaskOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    assignedTo?: Prisma.SortOrder;
    taskType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    scheduledDate?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.HousekeepingTaskCountOrderByAggregateInput;
    _max?: Prisma.HousekeepingTaskMaxOrderByAggregateInput;
    _min?: Prisma.HousekeepingTaskMinOrderByAggregateInput;
};
export type HousekeepingTaskScalarWhereWithAggregatesInput = {
    AND?: Prisma.HousekeepingTaskScalarWhereWithAggregatesInput | Prisma.HousekeepingTaskScalarWhereWithAggregatesInput[];
    OR?: Prisma.HousekeepingTaskScalarWhereWithAggregatesInput[];
    NOT?: Prisma.HousekeepingTaskScalarWhereWithAggregatesInput | Prisma.HousekeepingTaskScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"HousekeepingTask"> | string;
    roomId?: Prisma.StringWithAggregatesFilter<"HousekeepingTask"> | string;
    assignedTo?: Prisma.StringWithAggregatesFilter<"HousekeepingTask"> | string;
    taskType?: Prisma.EnumTaskTypeWithAggregatesFilter<"HousekeepingTask"> | $Enums.TaskType;
    status?: Prisma.EnumTaskStatusWithAggregatesFilter<"HousekeepingTask"> | $Enums.TaskStatus;
    scheduledDate?: Prisma.DateTimeWithAggregatesFilter<"HousekeepingTask"> | Date | string;
    startedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"HousekeepingTask"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"HousekeepingTask"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"HousekeepingTask"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"HousekeepingTask"> | Date | string;
};
export type HousekeepingTaskCreateInput = {
    id?: string;
    taskType: $Enums.TaskType;
    status?: $Enums.TaskStatus;
    scheduledDate: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    room: Prisma.RoomCreateNestedOneWithoutHousekeepingTasksInput;
    assignee: Prisma.UserCreateNestedOneWithoutHousekeepingTasksInput;
};
export type HousekeepingTaskUncheckedCreateInput = {
    id?: string;
    roomId: string;
    assignedTo: string;
    taskType: $Enums.TaskType;
    status?: $Enums.TaskStatus;
    scheduledDate: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HousekeepingTaskUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    taskType?: Prisma.EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    scheduledDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    room?: Prisma.RoomUpdateOneRequiredWithoutHousekeepingTasksNestedInput;
    assignee?: Prisma.UserUpdateOneRequiredWithoutHousekeepingTasksNestedInput;
};
export type HousekeepingTaskUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedTo?: Prisma.StringFieldUpdateOperationsInput | string;
    taskType?: Prisma.EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    scheduledDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HousekeepingTaskCreateManyInput = {
    id?: string;
    roomId: string;
    assignedTo: string;
    taskType: $Enums.TaskType;
    status?: $Enums.TaskStatus;
    scheduledDate: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HousekeepingTaskUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    taskType?: Prisma.EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    scheduledDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HousekeepingTaskUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedTo?: Prisma.StringFieldUpdateOperationsInput | string;
    taskType?: Prisma.EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    scheduledDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HousekeepingTaskListRelationFilter = {
    every?: Prisma.HousekeepingTaskWhereInput;
    some?: Prisma.HousekeepingTaskWhereInput;
    none?: Prisma.HousekeepingTaskWhereInput;
};
export type HousekeepingTaskOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type HousekeepingTaskCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    assignedTo?: Prisma.SortOrder;
    taskType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    scheduledDate?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type HousekeepingTaskMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    assignedTo?: Prisma.SortOrder;
    taskType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    scheduledDate?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type HousekeepingTaskMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    assignedTo?: Prisma.SortOrder;
    taskType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    scheduledDate?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type HousekeepingTaskCreateNestedManyWithoutAssigneeInput = {
    create?: Prisma.XOR<Prisma.HousekeepingTaskCreateWithoutAssigneeInput, Prisma.HousekeepingTaskUncheckedCreateWithoutAssigneeInput> | Prisma.HousekeepingTaskCreateWithoutAssigneeInput[] | Prisma.HousekeepingTaskUncheckedCreateWithoutAssigneeInput[];
    connectOrCreate?: Prisma.HousekeepingTaskCreateOrConnectWithoutAssigneeInput | Prisma.HousekeepingTaskCreateOrConnectWithoutAssigneeInput[];
    createMany?: Prisma.HousekeepingTaskCreateManyAssigneeInputEnvelope;
    connect?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
};
export type HousekeepingTaskUncheckedCreateNestedManyWithoutAssigneeInput = {
    create?: Prisma.XOR<Prisma.HousekeepingTaskCreateWithoutAssigneeInput, Prisma.HousekeepingTaskUncheckedCreateWithoutAssigneeInput> | Prisma.HousekeepingTaskCreateWithoutAssigneeInput[] | Prisma.HousekeepingTaskUncheckedCreateWithoutAssigneeInput[];
    connectOrCreate?: Prisma.HousekeepingTaskCreateOrConnectWithoutAssigneeInput | Prisma.HousekeepingTaskCreateOrConnectWithoutAssigneeInput[];
    createMany?: Prisma.HousekeepingTaskCreateManyAssigneeInputEnvelope;
    connect?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
};
export type HousekeepingTaskUpdateManyWithoutAssigneeNestedInput = {
    create?: Prisma.XOR<Prisma.HousekeepingTaskCreateWithoutAssigneeInput, Prisma.HousekeepingTaskUncheckedCreateWithoutAssigneeInput> | Prisma.HousekeepingTaskCreateWithoutAssigneeInput[] | Prisma.HousekeepingTaskUncheckedCreateWithoutAssigneeInput[];
    connectOrCreate?: Prisma.HousekeepingTaskCreateOrConnectWithoutAssigneeInput | Prisma.HousekeepingTaskCreateOrConnectWithoutAssigneeInput[];
    upsert?: Prisma.HousekeepingTaskUpsertWithWhereUniqueWithoutAssigneeInput | Prisma.HousekeepingTaskUpsertWithWhereUniqueWithoutAssigneeInput[];
    createMany?: Prisma.HousekeepingTaskCreateManyAssigneeInputEnvelope;
    set?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
    disconnect?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
    delete?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
    connect?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
    update?: Prisma.HousekeepingTaskUpdateWithWhereUniqueWithoutAssigneeInput | Prisma.HousekeepingTaskUpdateWithWhereUniqueWithoutAssigneeInput[];
    updateMany?: Prisma.HousekeepingTaskUpdateManyWithWhereWithoutAssigneeInput | Prisma.HousekeepingTaskUpdateManyWithWhereWithoutAssigneeInput[];
    deleteMany?: Prisma.HousekeepingTaskScalarWhereInput | Prisma.HousekeepingTaskScalarWhereInput[];
};
export type HousekeepingTaskUncheckedUpdateManyWithoutAssigneeNestedInput = {
    create?: Prisma.XOR<Prisma.HousekeepingTaskCreateWithoutAssigneeInput, Prisma.HousekeepingTaskUncheckedCreateWithoutAssigneeInput> | Prisma.HousekeepingTaskCreateWithoutAssigneeInput[] | Prisma.HousekeepingTaskUncheckedCreateWithoutAssigneeInput[];
    connectOrCreate?: Prisma.HousekeepingTaskCreateOrConnectWithoutAssigneeInput | Prisma.HousekeepingTaskCreateOrConnectWithoutAssigneeInput[];
    upsert?: Prisma.HousekeepingTaskUpsertWithWhereUniqueWithoutAssigneeInput | Prisma.HousekeepingTaskUpsertWithWhereUniqueWithoutAssigneeInput[];
    createMany?: Prisma.HousekeepingTaskCreateManyAssigneeInputEnvelope;
    set?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
    disconnect?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
    delete?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
    connect?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
    update?: Prisma.HousekeepingTaskUpdateWithWhereUniqueWithoutAssigneeInput | Prisma.HousekeepingTaskUpdateWithWhereUniqueWithoutAssigneeInput[];
    updateMany?: Prisma.HousekeepingTaskUpdateManyWithWhereWithoutAssigneeInput | Prisma.HousekeepingTaskUpdateManyWithWhereWithoutAssigneeInput[];
    deleteMany?: Prisma.HousekeepingTaskScalarWhereInput | Prisma.HousekeepingTaskScalarWhereInput[];
};
export type HousekeepingTaskCreateNestedManyWithoutRoomInput = {
    create?: Prisma.XOR<Prisma.HousekeepingTaskCreateWithoutRoomInput, Prisma.HousekeepingTaskUncheckedCreateWithoutRoomInput> | Prisma.HousekeepingTaskCreateWithoutRoomInput[] | Prisma.HousekeepingTaskUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.HousekeepingTaskCreateOrConnectWithoutRoomInput | Prisma.HousekeepingTaskCreateOrConnectWithoutRoomInput[];
    createMany?: Prisma.HousekeepingTaskCreateManyRoomInputEnvelope;
    connect?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
};
export type HousekeepingTaskUncheckedCreateNestedManyWithoutRoomInput = {
    create?: Prisma.XOR<Prisma.HousekeepingTaskCreateWithoutRoomInput, Prisma.HousekeepingTaskUncheckedCreateWithoutRoomInput> | Prisma.HousekeepingTaskCreateWithoutRoomInput[] | Prisma.HousekeepingTaskUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.HousekeepingTaskCreateOrConnectWithoutRoomInput | Prisma.HousekeepingTaskCreateOrConnectWithoutRoomInput[];
    createMany?: Prisma.HousekeepingTaskCreateManyRoomInputEnvelope;
    connect?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
};
export type HousekeepingTaskUpdateManyWithoutRoomNestedInput = {
    create?: Prisma.XOR<Prisma.HousekeepingTaskCreateWithoutRoomInput, Prisma.HousekeepingTaskUncheckedCreateWithoutRoomInput> | Prisma.HousekeepingTaskCreateWithoutRoomInput[] | Prisma.HousekeepingTaskUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.HousekeepingTaskCreateOrConnectWithoutRoomInput | Prisma.HousekeepingTaskCreateOrConnectWithoutRoomInput[];
    upsert?: Prisma.HousekeepingTaskUpsertWithWhereUniqueWithoutRoomInput | Prisma.HousekeepingTaskUpsertWithWhereUniqueWithoutRoomInput[];
    createMany?: Prisma.HousekeepingTaskCreateManyRoomInputEnvelope;
    set?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
    disconnect?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
    delete?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
    connect?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
    update?: Prisma.HousekeepingTaskUpdateWithWhereUniqueWithoutRoomInput | Prisma.HousekeepingTaskUpdateWithWhereUniqueWithoutRoomInput[];
    updateMany?: Prisma.HousekeepingTaskUpdateManyWithWhereWithoutRoomInput | Prisma.HousekeepingTaskUpdateManyWithWhereWithoutRoomInput[];
    deleteMany?: Prisma.HousekeepingTaskScalarWhereInput | Prisma.HousekeepingTaskScalarWhereInput[];
};
export type HousekeepingTaskUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: Prisma.XOR<Prisma.HousekeepingTaskCreateWithoutRoomInput, Prisma.HousekeepingTaskUncheckedCreateWithoutRoomInput> | Prisma.HousekeepingTaskCreateWithoutRoomInput[] | Prisma.HousekeepingTaskUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.HousekeepingTaskCreateOrConnectWithoutRoomInput | Prisma.HousekeepingTaskCreateOrConnectWithoutRoomInput[];
    upsert?: Prisma.HousekeepingTaskUpsertWithWhereUniqueWithoutRoomInput | Prisma.HousekeepingTaskUpsertWithWhereUniqueWithoutRoomInput[];
    createMany?: Prisma.HousekeepingTaskCreateManyRoomInputEnvelope;
    set?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
    disconnect?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
    delete?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
    connect?: Prisma.HousekeepingTaskWhereUniqueInput | Prisma.HousekeepingTaskWhereUniqueInput[];
    update?: Prisma.HousekeepingTaskUpdateWithWhereUniqueWithoutRoomInput | Prisma.HousekeepingTaskUpdateWithWhereUniqueWithoutRoomInput[];
    updateMany?: Prisma.HousekeepingTaskUpdateManyWithWhereWithoutRoomInput | Prisma.HousekeepingTaskUpdateManyWithWhereWithoutRoomInput[];
    deleteMany?: Prisma.HousekeepingTaskScalarWhereInput | Prisma.HousekeepingTaskScalarWhereInput[];
};
export type EnumTaskTypeFieldUpdateOperationsInput = {
    set?: $Enums.TaskType;
};
export type EnumTaskStatusFieldUpdateOperationsInput = {
    set?: $Enums.TaskStatus;
};
export type HousekeepingTaskCreateWithoutAssigneeInput = {
    id?: string;
    taskType: $Enums.TaskType;
    status?: $Enums.TaskStatus;
    scheduledDate: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    room: Prisma.RoomCreateNestedOneWithoutHousekeepingTasksInput;
};
export type HousekeepingTaskUncheckedCreateWithoutAssigneeInput = {
    id?: string;
    roomId: string;
    taskType: $Enums.TaskType;
    status?: $Enums.TaskStatus;
    scheduledDate: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HousekeepingTaskCreateOrConnectWithoutAssigneeInput = {
    where: Prisma.HousekeepingTaskWhereUniqueInput;
    create: Prisma.XOR<Prisma.HousekeepingTaskCreateWithoutAssigneeInput, Prisma.HousekeepingTaskUncheckedCreateWithoutAssigneeInput>;
};
export type HousekeepingTaskCreateManyAssigneeInputEnvelope = {
    data: Prisma.HousekeepingTaskCreateManyAssigneeInput | Prisma.HousekeepingTaskCreateManyAssigneeInput[];
    skipDuplicates?: boolean;
};
export type HousekeepingTaskUpsertWithWhereUniqueWithoutAssigneeInput = {
    where: Prisma.HousekeepingTaskWhereUniqueInput;
    update: Prisma.XOR<Prisma.HousekeepingTaskUpdateWithoutAssigneeInput, Prisma.HousekeepingTaskUncheckedUpdateWithoutAssigneeInput>;
    create: Prisma.XOR<Prisma.HousekeepingTaskCreateWithoutAssigneeInput, Prisma.HousekeepingTaskUncheckedCreateWithoutAssigneeInput>;
};
export type HousekeepingTaskUpdateWithWhereUniqueWithoutAssigneeInput = {
    where: Prisma.HousekeepingTaskWhereUniqueInput;
    data: Prisma.XOR<Prisma.HousekeepingTaskUpdateWithoutAssigneeInput, Prisma.HousekeepingTaskUncheckedUpdateWithoutAssigneeInput>;
};
export type HousekeepingTaskUpdateManyWithWhereWithoutAssigneeInput = {
    where: Prisma.HousekeepingTaskScalarWhereInput;
    data: Prisma.XOR<Prisma.HousekeepingTaskUpdateManyMutationInput, Prisma.HousekeepingTaskUncheckedUpdateManyWithoutAssigneeInput>;
};
export type HousekeepingTaskScalarWhereInput = {
    AND?: Prisma.HousekeepingTaskScalarWhereInput | Prisma.HousekeepingTaskScalarWhereInput[];
    OR?: Prisma.HousekeepingTaskScalarWhereInput[];
    NOT?: Prisma.HousekeepingTaskScalarWhereInput | Prisma.HousekeepingTaskScalarWhereInput[];
    id?: Prisma.StringFilter<"HousekeepingTask"> | string;
    roomId?: Prisma.StringFilter<"HousekeepingTask"> | string;
    assignedTo?: Prisma.StringFilter<"HousekeepingTask"> | string;
    taskType?: Prisma.EnumTaskTypeFilter<"HousekeepingTask"> | $Enums.TaskType;
    status?: Prisma.EnumTaskStatusFilter<"HousekeepingTask"> | $Enums.TaskStatus;
    scheduledDate?: Prisma.DateTimeFilter<"HousekeepingTask"> | Date | string;
    startedAt?: Prisma.DateTimeNullableFilter<"HousekeepingTask"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"HousekeepingTask"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"HousekeepingTask"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"HousekeepingTask"> | Date | string;
};
export type HousekeepingTaskCreateWithoutRoomInput = {
    id?: string;
    taskType: $Enums.TaskType;
    status?: $Enums.TaskStatus;
    scheduledDate: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assignee: Prisma.UserCreateNestedOneWithoutHousekeepingTasksInput;
};
export type HousekeepingTaskUncheckedCreateWithoutRoomInput = {
    id?: string;
    assignedTo: string;
    taskType: $Enums.TaskType;
    status?: $Enums.TaskStatus;
    scheduledDate: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HousekeepingTaskCreateOrConnectWithoutRoomInput = {
    where: Prisma.HousekeepingTaskWhereUniqueInput;
    create: Prisma.XOR<Prisma.HousekeepingTaskCreateWithoutRoomInput, Prisma.HousekeepingTaskUncheckedCreateWithoutRoomInput>;
};
export type HousekeepingTaskCreateManyRoomInputEnvelope = {
    data: Prisma.HousekeepingTaskCreateManyRoomInput | Prisma.HousekeepingTaskCreateManyRoomInput[];
    skipDuplicates?: boolean;
};
export type HousekeepingTaskUpsertWithWhereUniqueWithoutRoomInput = {
    where: Prisma.HousekeepingTaskWhereUniqueInput;
    update: Prisma.XOR<Prisma.HousekeepingTaskUpdateWithoutRoomInput, Prisma.HousekeepingTaskUncheckedUpdateWithoutRoomInput>;
    create: Prisma.XOR<Prisma.HousekeepingTaskCreateWithoutRoomInput, Prisma.HousekeepingTaskUncheckedCreateWithoutRoomInput>;
};
export type HousekeepingTaskUpdateWithWhereUniqueWithoutRoomInput = {
    where: Prisma.HousekeepingTaskWhereUniqueInput;
    data: Prisma.XOR<Prisma.HousekeepingTaskUpdateWithoutRoomInput, Prisma.HousekeepingTaskUncheckedUpdateWithoutRoomInput>;
};
export type HousekeepingTaskUpdateManyWithWhereWithoutRoomInput = {
    where: Prisma.HousekeepingTaskScalarWhereInput;
    data: Prisma.XOR<Prisma.HousekeepingTaskUpdateManyMutationInput, Prisma.HousekeepingTaskUncheckedUpdateManyWithoutRoomInput>;
};
export type HousekeepingTaskCreateManyAssigneeInput = {
    id?: string;
    roomId: string;
    taskType: $Enums.TaskType;
    status?: $Enums.TaskStatus;
    scheduledDate: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HousekeepingTaskUpdateWithoutAssigneeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    taskType?: Prisma.EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    scheduledDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    room?: Prisma.RoomUpdateOneRequiredWithoutHousekeepingTasksNestedInput;
};
export type HousekeepingTaskUncheckedUpdateWithoutAssigneeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    taskType?: Prisma.EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    scheduledDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HousekeepingTaskUncheckedUpdateManyWithoutAssigneeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    taskType?: Prisma.EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    scheduledDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HousekeepingTaskCreateManyRoomInput = {
    id?: string;
    assignedTo: string;
    taskType: $Enums.TaskType;
    status?: $Enums.TaskStatus;
    scheduledDate: Date | string;
    startedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type HousekeepingTaskUpdateWithoutRoomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    taskType?: Prisma.EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    scheduledDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assignee?: Prisma.UserUpdateOneRequiredWithoutHousekeepingTasksNestedInput;
};
export type HousekeepingTaskUncheckedUpdateWithoutRoomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedTo?: Prisma.StringFieldUpdateOperationsInput | string;
    taskType?: Prisma.EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    scheduledDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HousekeepingTaskUncheckedUpdateManyWithoutRoomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    assignedTo?: Prisma.StringFieldUpdateOperationsInput | string;
    taskType?: Prisma.EnumTaskTypeFieldUpdateOperationsInput | $Enums.TaskType;
    status?: Prisma.EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus;
    scheduledDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type HousekeepingTaskSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roomId?: boolean;
    assignedTo?: boolean;
    taskType?: boolean;
    status?: boolean;
    scheduledDate?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    assignee?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["housekeepingTask"]>;
export type HousekeepingTaskSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roomId?: boolean;
    assignedTo?: boolean;
    taskType?: boolean;
    status?: boolean;
    scheduledDate?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    assignee?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["housekeepingTask"]>;
export type HousekeepingTaskSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roomId?: boolean;
    assignedTo?: boolean;
    taskType?: boolean;
    status?: boolean;
    scheduledDate?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    assignee?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["housekeepingTask"]>;
export type HousekeepingTaskSelectScalar = {
    id?: boolean;
    roomId?: boolean;
    assignedTo?: boolean;
    taskType?: boolean;
    status?: boolean;
    scheduledDate?: boolean;
    startedAt?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type HousekeepingTaskOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "roomId" | "assignedTo" | "taskType" | "status" | "scheduledDate" | "startedAt" | "completedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["housekeepingTask"]>;
export type HousekeepingTaskInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    assignee?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type HousekeepingTaskIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    assignee?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type HousekeepingTaskIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    assignee?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $HousekeepingTaskPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "HousekeepingTask";
    objects: {
        room: Prisma.$RoomPayload<ExtArgs>;
        assignee: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        roomId: string;
        assignedTo: string;
        taskType: $Enums.TaskType;
        status: $Enums.TaskStatus;
        scheduledDate: Date;
        startedAt: Date | null;
        completedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["housekeepingTask"]>;
    composites: {};
};
export type HousekeepingTaskGetPayload<S extends boolean | null | undefined | HousekeepingTaskDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$HousekeepingTaskPayload, S>;
export type HousekeepingTaskCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<HousekeepingTaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HousekeepingTaskCountAggregateInputType | true;
};
export interface HousekeepingTaskDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['HousekeepingTask'];
        meta: {
            name: 'HousekeepingTask';
        };
    };
    findUnique<T extends HousekeepingTaskFindUniqueArgs>(args: Prisma.SelectSubset<T, HousekeepingTaskFindUniqueArgs<ExtArgs>>): Prisma.Prisma__HousekeepingTaskClient<runtime.Types.Result.GetResult<Prisma.$HousekeepingTaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends HousekeepingTaskFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, HousekeepingTaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__HousekeepingTaskClient<runtime.Types.Result.GetResult<Prisma.$HousekeepingTaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends HousekeepingTaskFindFirstArgs>(args?: Prisma.SelectSubset<T, HousekeepingTaskFindFirstArgs<ExtArgs>>): Prisma.Prisma__HousekeepingTaskClient<runtime.Types.Result.GetResult<Prisma.$HousekeepingTaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends HousekeepingTaskFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, HousekeepingTaskFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__HousekeepingTaskClient<runtime.Types.Result.GetResult<Prisma.$HousekeepingTaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends HousekeepingTaskFindManyArgs>(args?: Prisma.SelectSubset<T, HousekeepingTaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HousekeepingTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends HousekeepingTaskCreateArgs>(args: Prisma.SelectSubset<T, HousekeepingTaskCreateArgs<ExtArgs>>): Prisma.Prisma__HousekeepingTaskClient<runtime.Types.Result.GetResult<Prisma.$HousekeepingTaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends HousekeepingTaskCreateManyArgs>(args?: Prisma.SelectSubset<T, HousekeepingTaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends HousekeepingTaskCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, HousekeepingTaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HousekeepingTaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends HousekeepingTaskDeleteArgs>(args: Prisma.SelectSubset<T, HousekeepingTaskDeleteArgs<ExtArgs>>): Prisma.Prisma__HousekeepingTaskClient<runtime.Types.Result.GetResult<Prisma.$HousekeepingTaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends HousekeepingTaskUpdateArgs>(args: Prisma.SelectSubset<T, HousekeepingTaskUpdateArgs<ExtArgs>>): Prisma.Prisma__HousekeepingTaskClient<runtime.Types.Result.GetResult<Prisma.$HousekeepingTaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends HousekeepingTaskDeleteManyArgs>(args?: Prisma.SelectSubset<T, HousekeepingTaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends HousekeepingTaskUpdateManyArgs>(args: Prisma.SelectSubset<T, HousekeepingTaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends HousekeepingTaskUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, HousekeepingTaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HousekeepingTaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends HousekeepingTaskUpsertArgs>(args: Prisma.SelectSubset<T, HousekeepingTaskUpsertArgs<ExtArgs>>): Prisma.Prisma__HousekeepingTaskClient<runtime.Types.Result.GetResult<Prisma.$HousekeepingTaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends HousekeepingTaskCountArgs>(args?: Prisma.Subset<T, HousekeepingTaskCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], HousekeepingTaskCountAggregateOutputType> : number>;
    aggregate<T extends HousekeepingTaskAggregateArgs>(args: Prisma.Subset<T, HousekeepingTaskAggregateArgs>): Prisma.PrismaPromise<GetHousekeepingTaskAggregateType<T>>;
    groupBy<T extends HousekeepingTaskGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: HousekeepingTaskGroupByArgs['orderBy'];
    } : {
        orderBy?: HousekeepingTaskGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, HousekeepingTaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHousekeepingTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: HousekeepingTaskFieldRefs;
}
export interface Prisma__HousekeepingTaskClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    room<T extends Prisma.RoomDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RoomDefaultArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    assignee<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface HousekeepingTaskFieldRefs {
    readonly id: Prisma.FieldRef<"HousekeepingTask", 'String'>;
    readonly roomId: Prisma.FieldRef<"HousekeepingTask", 'String'>;
    readonly assignedTo: Prisma.FieldRef<"HousekeepingTask", 'String'>;
    readonly taskType: Prisma.FieldRef<"HousekeepingTask", 'TaskType'>;
    readonly status: Prisma.FieldRef<"HousekeepingTask", 'TaskStatus'>;
    readonly scheduledDate: Prisma.FieldRef<"HousekeepingTask", 'DateTime'>;
    readonly startedAt: Prisma.FieldRef<"HousekeepingTask", 'DateTime'>;
    readonly completedAt: Prisma.FieldRef<"HousekeepingTask", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"HousekeepingTask", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"HousekeepingTask", 'DateTime'>;
}
export type HousekeepingTaskFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeepingTaskSelect<ExtArgs> | null;
    omit?: Prisma.HousekeepingTaskOmit<ExtArgs> | null;
    include?: Prisma.HousekeepingTaskInclude<ExtArgs> | null;
    where: Prisma.HousekeepingTaskWhereUniqueInput;
};
export type HousekeepingTaskFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeepingTaskSelect<ExtArgs> | null;
    omit?: Prisma.HousekeepingTaskOmit<ExtArgs> | null;
    include?: Prisma.HousekeepingTaskInclude<ExtArgs> | null;
    where: Prisma.HousekeepingTaskWhereUniqueInput;
};
export type HousekeepingTaskFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type HousekeepingTaskFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type HousekeepingTaskFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type HousekeepingTaskCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeepingTaskSelect<ExtArgs> | null;
    omit?: Prisma.HousekeepingTaskOmit<ExtArgs> | null;
    include?: Prisma.HousekeepingTaskInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HousekeepingTaskCreateInput, Prisma.HousekeepingTaskUncheckedCreateInput>;
};
export type HousekeepingTaskCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.HousekeepingTaskCreateManyInput | Prisma.HousekeepingTaskCreateManyInput[];
    skipDuplicates?: boolean;
};
export type HousekeepingTaskCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeepingTaskSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HousekeepingTaskOmit<ExtArgs> | null;
    data: Prisma.HousekeepingTaskCreateManyInput | Prisma.HousekeepingTaskCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.HousekeepingTaskIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type HousekeepingTaskUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeepingTaskSelect<ExtArgs> | null;
    omit?: Prisma.HousekeepingTaskOmit<ExtArgs> | null;
    include?: Prisma.HousekeepingTaskInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HousekeepingTaskUpdateInput, Prisma.HousekeepingTaskUncheckedUpdateInput>;
    where: Prisma.HousekeepingTaskWhereUniqueInput;
};
export type HousekeepingTaskUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.HousekeepingTaskUpdateManyMutationInput, Prisma.HousekeepingTaskUncheckedUpdateManyInput>;
    where?: Prisma.HousekeepingTaskWhereInput;
    limit?: number;
};
export type HousekeepingTaskUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeepingTaskSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.HousekeepingTaskOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HousekeepingTaskUpdateManyMutationInput, Prisma.HousekeepingTaskUncheckedUpdateManyInput>;
    where?: Prisma.HousekeepingTaskWhereInput;
    limit?: number;
    include?: Prisma.HousekeepingTaskIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type HousekeepingTaskUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeepingTaskSelect<ExtArgs> | null;
    omit?: Prisma.HousekeepingTaskOmit<ExtArgs> | null;
    include?: Prisma.HousekeepingTaskInclude<ExtArgs> | null;
    where: Prisma.HousekeepingTaskWhereUniqueInput;
    create: Prisma.XOR<Prisma.HousekeepingTaskCreateInput, Prisma.HousekeepingTaskUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.HousekeepingTaskUpdateInput, Prisma.HousekeepingTaskUncheckedUpdateInput>;
};
export type HousekeepingTaskDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeepingTaskSelect<ExtArgs> | null;
    omit?: Prisma.HousekeepingTaskOmit<ExtArgs> | null;
    include?: Prisma.HousekeepingTaskInclude<ExtArgs> | null;
    where: Prisma.HousekeepingTaskWhereUniqueInput;
};
export type HousekeepingTaskDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HousekeepingTaskWhereInput;
    limit?: number;
};
export type HousekeepingTaskDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HousekeepingTaskSelect<ExtArgs> | null;
    omit?: Prisma.HousekeepingTaskOmit<ExtArgs> | null;
    include?: Prisma.HousekeepingTaskInclude<ExtArgs> | null;
};
