import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BookingGuestModel = runtime.Types.Result.DefaultSelection<Prisma.$BookingGuestPayload>;
export type AggregateBookingGuest = {
    _count: BookingGuestCountAggregateOutputType | null;
    _avg: BookingGuestAvgAggregateOutputType | null;
    _sum: BookingGuestSumAggregateOutputType | null;
    _min: BookingGuestMinAggregateOutputType | null;
    _max: BookingGuestMaxAggregateOutputType | null;
};
export type BookingGuestAvgAggregateOutputType = {
    age: number | null;
};
export type BookingGuestSumAggregateOutputType = {
    age: number | null;
};
export type BookingGuestMinAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    fullName: string | null;
    age: number | null;
    gender: string | null;
    idProofNumber: string | null;
};
export type BookingGuestMaxAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    fullName: string | null;
    age: number | null;
    gender: string | null;
    idProofNumber: string | null;
};
export type BookingGuestCountAggregateOutputType = {
    id: number;
    bookingId: number;
    fullName: number;
    age: number;
    gender: number;
    idProofNumber: number;
    _all: number;
};
export type BookingGuestAvgAggregateInputType = {
    age?: true;
};
export type BookingGuestSumAggregateInputType = {
    age?: true;
};
export type BookingGuestMinAggregateInputType = {
    id?: true;
    bookingId?: true;
    fullName?: true;
    age?: true;
    gender?: true;
    idProofNumber?: true;
};
export type BookingGuestMaxAggregateInputType = {
    id?: true;
    bookingId?: true;
    fullName?: true;
    age?: true;
    gender?: true;
    idProofNumber?: true;
};
export type BookingGuestCountAggregateInputType = {
    id?: true;
    bookingId?: true;
    fullName?: true;
    age?: true;
    gender?: true;
    idProofNumber?: true;
    _all?: true;
};
export type BookingGuestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingGuestWhereInput;
    orderBy?: Prisma.BookingGuestOrderByWithRelationInput | Prisma.BookingGuestOrderByWithRelationInput[];
    cursor?: Prisma.BookingGuestWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BookingGuestCountAggregateInputType;
    _avg?: BookingGuestAvgAggregateInputType;
    _sum?: BookingGuestSumAggregateInputType;
    _min?: BookingGuestMinAggregateInputType;
    _max?: BookingGuestMaxAggregateInputType;
};
export type GetBookingGuestAggregateType<T extends BookingGuestAggregateArgs> = {
    [P in keyof T & keyof AggregateBookingGuest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBookingGuest[P]> : Prisma.GetScalarType<T[P], AggregateBookingGuest[P]>;
};
export type BookingGuestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingGuestWhereInput;
    orderBy?: Prisma.BookingGuestOrderByWithAggregationInput | Prisma.BookingGuestOrderByWithAggregationInput[];
    by: Prisma.BookingGuestScalarFieldEnum[] | Prisma.BookingGuestScalarFieldEnum;
    having?: Prisma.BookingGuestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BookingGuestCountAggregateInputType | true;
    _avg?: BookingGuestAvgAggregateInputType;
    _sum?: BookingGuestSumAggregateInputType;
    _min?: BookingGuestMinAggregateInputType;
    _max?: BookingGuestMaxAggregateInputType;
};
export type BookingGuestGroupByOutputType = {
    id: string;
    bookingId: string;
    fullName: string;
    age: number;
    gender: string;
    idProofNumber: string | null;
    _count: BookingGuestCountAggregateOutputType | null;
    _avg: BookingGuestAvgAggregateOutputType | null;
    _sum: BookingGuestSumAggregateOutputType | null;
    _min: BookingGuestMinAggregateOutputType | null;
    _max: BookingGuestMaxAggregateOutputType | null;
};
export type GetBookingGuestGroupByPayload<T extends BookingGuestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BookingGuestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BookingGuestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BookingGuestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BookingGuestGroupByOutputType[P]>;
}>>;
export type BookingGuestWhereInput = {
    AND?: Prisma.BookingGuestWhereInput | Prisma.BookingGuestWhereInput[];
    OR?: Prisma.BookingGuestWhereInput[];
    NOT?: Prisma.BookingGuestWhereInput | Prisma.BookingGuestWhereInput[];
    id?: Prisma.StringFilter<"BookingGuest"> | string;
    bookingId?: Prisma.StringFilter<"BookingGuest"> | string;
    fullName?: Prisma.StringFilter<"BookingGuest"> | string;
    age?: Prisma.IntFilter<"BookingGuest"> | number;
    gender?: Prisma.StringFilter<"BookingGuest"> | string;
    idProofNumber?: Prisma.StringNullableFilter<"BookingGuest"> | string | null;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
};
export type BookingGuestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    idProofNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    booking?: Prisma.BookingOrderByWithRelationInput;
};
export type BookingGuestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.BookingGuestWhereInput | Prisma.BookingGuestWhereInput[];
    OR?: Prisma.BookingGuestWhereInput[];
    NOT?: Prisma.BookingGuestWhereInput | Prisma.BookingGuestWhereInput[];
    bookingId?: Prisma.StringFilter<"BookingGuest"> | string;
    fullName?: Prisma.StringFilter<"BookingGuest"> | string;
    age?: Prisma.IntFilter<"BookingGuest"> | number;
    gender?: Prisma.StringFilter<"BookingGuest"> | string;
    idProofNumber?: Prisma.StringNullableFilter<"BookingGuest"> | string | null;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
}, "id">;
export type BookingGuestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    idProofNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.BookingGuestCountOrderByAggregateInput;
    _avg?: Prisma.BookingGuestAvgOrderByAggregateInput;
    _max?: Prisma.BookingGuestMaxOrderByAggregateInput;
    _min?: Prisma.BookingGuestMinOrderByAggregateInput;
    _sum?: Prisma.BookingGuestSumOrderByAggregateInput;
};
export type BookingGuestScalarWhereWithAggregatesInput = {
    AND?: Prisma.BookingGuestScalarWhereWithAggregatesInput | Prisma.BookingGuestScalarWhereWithAggregatesInput[];
    OR?: Prisma.BookingGuestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BookingGuestScalarWhereWithAggregatesInput | Prisma.BookingGuestScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"BookingGuest"> | string;
    bookingId?: Prisma.StringWithAggregatesFilter<"BookingGuest"> | string;
    fullName?: Prisma.StringWithAggregatesFilter<"BookingGuest"> | string;
    age?: Prisma.IntWithAggregatesFilter<"BookingGuest"> | number;
    gender?: Prisma.StringWithAggregatesFilter<"BookingGuest"> | string;
    idProofNumber?: Prisma.StringNullableWithAggregatesFilter<"BookingGuest"> | string | null;
};
export type BookingGuestCreateInput = {
    id?: string;
    fullName: string;
    age: number;
    gender: string;
    idProofNumber?: string | null;
    booking: Prisma.BookingCreateNestedOneWithoutBookingGuestsInput;
};
export type BookingGuestUncheckedCreateInput = {
    id?: string;
    bookingId: string;
    fullName: string;
    age: number;
    gender: string;
    idProofNumber?: string | null;
};
export type BookingGuestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    gender?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    booking?: Prisma.BookingUpdateOneRequiredWithoutBookingGuestsNestedInput;
};
export type BookingGuestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    gender?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type BookingGuestCreateManyInput = {
    id?: string;
    bookingId: string;
    fullName: string;
    age: number;
    gender: string;
    idProofNumber?: string | null;
};
export type BookingGuestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    gender?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type BookingGuestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    gender?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type BookingGuestListRelationFilter = {
    every?: Prisma.BookingGuestWhereInput;
    some?: Prisma.BookingGuestWhereInput;
    none?: Prisma.BookingGuestWhereInput;
};
export type BookingGuestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BookingGuestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    idProofNumber?: Prisma.SortOrder;
};
export type BookingGuestAvgOrderByAggregateInput = {
    age?: Prisma.SortOrder;
};
export type BookingGuestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    idProofNumber?: Prisma.SortOrder;
};
export type BookingGuestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    age?: Prisma.SortOrder;
    gender?: Prisma.SortOrder;
    idProofNumber?: Prisma.SortOrder;
};
export type BookingGuestSumOrderByAggregateInput = {
    age?: Prisma.SortOrder;
};
export type BookingGuestCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.BookingGuestCreateWithoutBookingInput, Prisma.BookingGuestUncheckedCreateWithoutBookingInput> | Prisma.BookingGuestCreateWithoutBookingInput[] | Prisma.BookingGuestUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.BookingGuestCreateOrConnectWithoutBookingInput | Prisma.BookingGuestCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.BookingGuestCreateManyBookingInputEnvelope;
    connect?: Prisma.BookingGuestWhereUniqueInput | Prisma.BookingGuestWhereUniqueInput[];
};
export type BookingGuestUncheckedCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.BookingGuestCreateWithoutBookingInput, Prisma.BookingGuestUncheckedCreateWithoutBookingInput> | Prisma.BookingGuestCreateWithoutBookingInput[] | Prisma.BookingGuestUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.BookingGuestCreateOrConnectWithoutBookingInput | Prisma.BookingGuestCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.BookingGuestCreateManyBookingInputEnvelope;
    connect?: Prisma.BookingGuestWhereUniqueInput | Prisma.BookingGuestWhereUniqueInput[];
};
export type BookingGuestUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.BookingGuestCreateWithoutBookingInput, Prisma.BookingGuestUncheckedCreateWithoutBookingInput> | Prisma.BookingGuestCreateWithoutBookingInput[] | Prisma.BookingGuestUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.BookingGuestCreateOrConnectWithoutBookingInput | Prisma.BookingGuestCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.BookingGuestUpsertWithWhereUniqueWithoutBookingInput | Prisma.BookingGuestUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.BookingGuestCreateManyBookingInputEnvelope;
    set?: Prisma.BookingGuestWhereUniqueInput | Prisma.BookingGuestWhereUniqueInput[];
    disconnect?: Prisma.BookingGuestWhereUniqueInput | Prisma.BookingGuestWhereUniqueInput[];
    delete?: Prisma.BookingGuestWhereUniqueInput | Prisma.BookingGuestWhereUniqueInput[];
    connect?: Prisma.BookingGuestWhereUniqueInput | Prisma.BookingGuestWhereUniqueInput[];
    update?: Prisma.BookingGuestUpdateWithWhereUniqueWithoutBookingInput | Prisma.BookingGuestUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.BookingGuestUpdateManyWithWhereWithoutBookingInput | Prisma.BookingGuestUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.BookingGuestScalarWhereInput | Prisma.BookingGuestScalarWhereInput[];
};
export type BookingGuestUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.BookingGuestCreateWithoutBookingInput, Prisma.BookingGuestUncheckedCreateWithoutBookingInput> | Prisma.BookingGuestCreateWithoutBookingInput[] | Prisma.BookingGuestUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.BookingGuestCreateOrConnectWithoutBookingInput | Prisma.BookingGuestCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.BookingGuestUpsertWithWhereUniqueWithoutBookingInput | Prisma.BookingGuestUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.BookingGuestCreateManyBookingInputEnvelope;
    set?: Prisma.BookingGuestWhereUniqueInput | Prisma.BookingGuestWhereUniqueInput[];
    disconnect?: Prisma.BookingGuestWhereUniqueInput | Prisma.BookingGuestWhereUniqueInput[];
    delete?: Prisma.BookingGuestWhereUniqueInput | Prisma.BookingGuestWhereUniqueInput[];
    connect?: Prisma.BookingGuestWhereUniqueInput | Prisma.BookingGuestWhereUniqueInput[];
    update?: Prisma.BookingGuestUpdateWithWhereUniqueWithoutBookingInput | Prisma.BookingGuestUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.BookingGuestUpdateManyWithWhereWithoutBookingInput | Prisma.BookingGuestUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.BookingGuestScalarWhereInput | Prisma.BookingGuestScalarWhereInput[];
};
export type BookingGuestCreateWithoutBookingInput = {
    id?: string;
    fullName: string;
    age: number;
    gender: string;
    idProofNumber?: string | null;
};
export type BookingGuestUncheckedCreateWithoutBookingInput = {
    id?: string;
    fullName: string;
    age: number;
    gender: string;
    idProofNumber?: string | null;
};
export type BookingGuestCreateOrConnectWithoutBookingInput = {
    where: Prisma.BookingGuestWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingGuestCreateWithoutBookingInput, Prisma.BookingGuestUncheckedCreateWithoutBookingInput>;
};
export type BookingGuestCreateManyBookingInputEnvelope = {
    data: Prisma.BookingGuestCreateManyBookingInput | Prisma.BookingGuestCreateManyBookingInput[];
    skipDuplicates?: boolean;
};
export type BookingGuestUpsertWithWhereUniqueWithoutBookingInput = {
    where: Prisma.BookingGuestWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookingGuestUpdateWithoutBookingInput, Prisma.BookingGuestUncheckedUpdateWithoutBookingInput>;
    create: Prisma.XOR<Prisma.BookingGuestCreateWithoutBookingInput, Prisma.BookingGuestUncheckedCreateWithoutBookingInput>;
};
export type BookingGuestUpdateWithWhereUniqueWithoutBookingInput = {
    where: Prisma.BookingGuestWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookingGuestUpdateWithoutBookingInput, Prisma.BookingGuestUncheckedUpdateWithoutBookingInput>;
};
export type BookingGuestUpdateManyWithWhereWithoutBookingInput = {
    where: Prisma.BookingGuestScalarWhereInput;
    data: Prisma.XOR<Prisma.BookingGuestUpdateManyMutationInput, Prisma.BookingGuestUncheckedUpdateManyWithoutBookingInput>;
};
export type BookingGuestScalarWhereInput = {
    AND?: Prisma.BookingGuestScalarWhereInput | Prisma.BookingGuestScalarWhereInput[];
    OR?: Prisma.BookingGuestScalarWhereInput[];
    NOT?: Prisma.BookingGuestScalarWhereInput | Prisma.BookingGuestScalarWhereInput[];
    id?: Prisma.StringFilter<"BookingGuest"> | string;
    bookingId?: Prisma.StringFilter<"BookingGuest"> | string;
    fullName?: Prisma.StringFilter<"BookingGuest"> | string;
    age?: Prisma.IntFilter<"BookingGuest"> | number;
    gender?: Prisma.StringFilter<"BookingGuest"> | string;
    idProofNumber?: Prisma.StringNullableFilter<"BookingGuest"> | string | null;
};
export type BookingGuestCreateManyBookingInput = {
    id?: string;
    fullName: string;
    age: number;
    gender: string;
    idProofNumber?: string | null;
};
export type BookingGuestUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    gender?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type BookingGuestUncheckedUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    gender?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type BookingGuestUncheckedUpdateManyWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    age?: Prisma.IntFieldUpdateOperationsInput | number;
    gender?: Prisma.StringFieldUpdateOperationsInput | string;
    idProofNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type BookingGuestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    fullName?: boolean;
    age?: boolean;
    gender?: boolean;
    idProofNumber?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bookingGuest"]>;
export type BookingGuestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    fullName?: boolean;
    age?: boolean;
    gender?: boolean;
    idProofNumber?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bookingGuest"]>;
export type BookingGuestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    fullName?: boolean;
    age?: boolean;
    gender?: boolean;
    idProofNumber?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bookingGuest"]>;
export type BookingGuestSelectScalar = {
    id?: boolean;
    bookingId?: boolean;
    fullName?: boolean;
    age?: boolean;
    gender?: boolean;
    idProofNumber?: boolean;
};
export type BookingGuestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "bookingId" | "fullName" | "age" | "gender" | "idProofNumber", ExtArgs["result"]["bookingGuest"]>;
export type BookingGuestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
};
export type BookingGuestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
};
export type BookingGuestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
};
export type $BookingGuestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "BookingGuest";
    objects: {
        booking: Prisma.$BookingPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        bookingId: string;
        fullName: string;
        age: number;
        gender: string;
        idProofNumber: string | null;
    }, ExtArgs["result"]["bookingGuest"]>;
    composites: {};
};
export type BookingGuestGetPayload<S extends boolean | null | undefined | BookingGuestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BookingGuestPayload, S>;
export type BookingGuestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BookingGuestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BookingGuestCountAggregateInputType | true;
};
export interface BookingGuestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['BookingGuest'];
        meta: {
            name: 'BookingGuest';
        };
    };
    findUnique<T extends BookingGuestFindUniqueArgs>(args: Prisma.SelectSubset<T, BookingGuestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BookingGuestClient<runtime.Types.Result.GetResult<Prisma.$BookingGuestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BookingGuestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BookingGuestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BookingGuestClient<runtime.Types.Result.GetResult<Prisma.$BookingGuestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BookingGuestFindFirstArgs>(args?: Prisma.SelectSubset<T, BookingGuestFindFirstArgs<ExtArgs>>): Prisma.Prisma__BookingGuestClient<runtime.Types.Result.GetResult<Prisma.$BookingGuestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BookingGuestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BookingGuestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BookingGuestClient<runtime.Types.Result.GetResult<Prisma.$BookingGuestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BookingGuestFindManyArgs>(args?: Prisma.SelectSubset<T, BookingGuestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingGuestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BookingGuestCreateArgs>(args: Prisma.SelectSubset<T, BookingGuestCreateArgs<ExtArgs>>): Prisma.Prisma__BookingGuestClient<runtime.Types.Result.GetResult<Prisma.$BookingGuestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BookingGuestCreateManyArgs>(args?: Prisma.SelectSubset<T, BookingGuestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BookingGuestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BookingGuestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingGuestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BookingGuestDeleteArgs>(args: Prisma.SelectSubset<T, BookingGuestDeleteArgs<ExtArgs>>): Prisma.Prisma__BookingGuestClient<runtime.Types.Result.GetResult<Prisma.$BookingGuestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BookingGuestUpdateArgs>(args: Prisma.SelectSubset<T, BookingGuestUpdateArgs<ExtArgs>>): Prisma.Prisma__BookingGuestClient<runtime.Types.Result.GetResult<Prisma.$BookingGuestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BookingGuestDeleteManyArgs>(args?: Prisma.SelectSubset<T, BookingGuestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BookingGuestUpdateManyArgs>(args: Prisma.SelectSubset<T, BookingGuestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BookingGuestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BookingGuestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingGuestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BookingGuestUpsertArgs>(args: Prisma.SelectSubset<T, BookingGuestUpsertArgs<ExtArgs>>): Prisma.Prisma__BookingGuestClient<runtime.Types.Result.GetResult<Prisma.$BookingGuestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BookingGuestCountArgs>(args?: Prisma.Subset<T, BookingGuestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BookingGuestCountAggregateOutputType> : number>;
    aggregate<T extends BookingGuestAggregateArgs>(args: Prisma.Subset<T, BookingGuestAggregateArgs>): Prisma.PrismaPromise<GetBookingGuestAggregateType<T>>;
    groupBy<T extends BookingGuestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BookingGuestGroupByArgs['orderBy'];
    } : {
        orderBy?: BookingGuestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BookingGuestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGuestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BookingGuestFieldRefs;
}
export interface Prisma__BookingGuestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    booking<T extends Prisma.BookingDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BookingDefaultArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BookingGuestFieldRefs {
    readonly id: Prisma.FieldRef<"BookingGuest", 'String'>;
    readonly bookingId: Prisma.FieldRef<"BookingGuest", 'String'>;
    readonly fullName: Prisma.FieldRef<"BookingGuest", 'String'>;
    readonly age: Prisma.FieldRef<"BookingGuest", 'Int'>;
    readonly gender: Prisma.FieldRef<"BookingGuest", 'String'>;
    readonly idProofNumber: Prisma.FieldRef<"BookingGuest", 'String'>;
}
export type BookingGuestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingGuestSelect<ExtArgs> | null;
    omit?: Prisma.BookingGuestOmit<ExtArgs> | null;
    include?: Prisma.BookingGuestInclude<ExtArgs> | null;
    where: Prisma.BookingGuestWhereUniqueInput;
};
export type BookingGuestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingGuestSelect<ExtArgs> | null;
    omit?: Prisma.BookingGuestOmit<ExtArgs> | null;
    include?: Prisma.BookingGuestInclude<ExtArgs> | null;
    where: Prisma.BookingGuestWhereUniqueInput;
};
export type BookingGuestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingGuestSelect<ExtArgs> | null;
    omit?: Prisma.BookingGuestOmit<ExtArgs> | null;
    include?: Prisma.BookingGuestInclude<ExtArgs> | null;
    where?: Prisma.BookingGuestWhereInput;
    orderBy?: Prisma.BookingGuestOrderByWithRelationInput | Prisma.BookingGuestOrderByWithRelationInput[];
    cursor?: Prisma.BookingGuestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingGuestScalarFieldEnum | Prisma.BookingGuestScalarFieldEnum[];
};
export type BookingGuestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingGuestSelect<ExtArgs> | null;
    omit?: Prisma.BookingGuestOmit<ExtArgs> | null;
    include?: Prisma.BookingGuestInclude<ExtArgs> | null;
    where?: Prisma.BookingGuestWhereInput;
    orderBy?: Prisma.BookingGuestOrderByWithRelationInput | Prisma.BookingGuestOrderByWithRelationInput[];
    cursor?: Prisma.BookingGuestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingGuestScalarFieldEnum | Prisma.BookingGuestScalarFieldEnum[];
};
export type BookingGuestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingGuestSelect<ExtArgs> | null;
    omit?: Prisma.BookingGuestOmit<ExtArgs> | null;
    include?: Prisma.BookingGuestInclude<ExtArgs> | null;
    where?: Prisma.BookingGuestWhereInput;
    orderBy?: Prisma.BookingGuestOrderByWithRelationInput | Prisma.BookingGuestOrderByWithRelationInput[];
    cursor?: Prisma.BookingGuestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingGuestScalarFieldEnum | Prisma.BookingGuestScalarFieldEnum[];
};
export type BookingGuestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingGuestSelect<ExtArgs> | null;
    omit?: Prisma.BookingGuestOmit<ExtArgs> | null;
    include?: Prisma.BookingGuestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookingGuestCreateInput, Prisma.BookingGuestUncheckedCreateInput>;
};
export type BookingGuestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BookingGuestCreateManyInput | Prisma.BookingGuestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BookingGuestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingGuestSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BookingGuestOmit<ExtArgs> | null;
    data: Prisma.BookingGuestCreateManyInput | Prisma.BookingGuestCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BookingGuestIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BookingGuestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingGuestSelect<ExtArgs> | null;
    omit?: Prisma.BookingGuestOmit<ExtArgs> | null;
    include?: Prisma.BookingGuestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookingGuestUpdateInput, Prisma.BookingGuestUncheckedUpdateInput>;
    where: Prisma.BookingGuestWhereUniqueInput;
};
export type BookingGuestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BookingGuestUpdateManyMutationInput, Prisma.BookingGuestUncheckedUpdateManyInput>;
    where?: Prisma.BookingGuestWhereInput;
    limit?: number;
};
export type BookingGuestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingGuestSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BookingGuestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookingGuestUpdateManyMutationInput, Prisma.BookingGuestUncheckedUpdateManyInput>;
    where?: Prisma.BookingGuestWhereInput;
    limit?: number;
    include?: Prisma.BookingGuestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BookingGuestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingGuestSelect<ExtArgs> | null;
    omit?: Prisma.BookingGuestOmit<ExtArgs> | null;
    include?: Prisma.BookingGuestInclude<ExtArgs> | null;
    where: Prisma.BookingGuestWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingGuestCreateInput, Prisma.BookingGuestUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BookingGuestUpdateInput, Prisma.BookingGuestUncheckedUpdateInput>;
};
export type BookingGuestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingGuestSelect<ExtArgs> | null;
    omit?: Prisma.BookingGuestOmit<ExtArgs> | null;
    include?: Prisma.BookingGuestInclude<ExtArgs> | null;
    where: Prisma.BookingGuestWhereUniqueInput;
};
export type BookingGuestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingGuestWhereInput;
    limit?: number;
};
export type BookingGuestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingGuestSelect<ExtArgs> | null;
    omit?: Prisma.BookingGuestOmit<ExtArgs> | null;
    include?: Prisma.BookingGuestInclude<ExtArgs> | null;
};
