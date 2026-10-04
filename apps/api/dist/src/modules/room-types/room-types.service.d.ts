import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { RoomTypeQueryDto } from './dto/room-type-query.dto';
import { CreateRoomTypeResponse, RoomTypeListItemResponse } from './room-types.types';
export declare class RoomTypesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(files: any, dto: CreateRoomTypeDto): Promise<CreateRoomTypeResponse>;
    findAll(query: RoomTypeQueryDto): Promise<RoomTypeListItemResponse[]>;
}
