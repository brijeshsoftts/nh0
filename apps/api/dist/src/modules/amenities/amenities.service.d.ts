import { PrismaService } from '../../prisma/prisma.service';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { AmenityListItemResponse, CreateAmenityResponse, UpdateAmenityResponse } from './amenities.types';
export declare class AmenitiesService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(dto: CreateAmenityDto): Promise<CreateAmenityResponse>;
    findAll(): Promise<AmenityListItemResponse[]>;
    update(id: string, dto: UpdateAmenityDto): Promise<UpdateAmenityResponse>;
    delete(id: string): Promise<void>;
}
