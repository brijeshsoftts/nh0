import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { CreateRoomTypeResponse } from './room-types.types';
export declare class RoomTypesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(files: any, dto: CreateRoomTypeDto): Promise<CreateRoomTypeResponse>;
}
