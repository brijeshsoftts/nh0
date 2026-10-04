import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { AmenitiesService } from './amenities.service';
export declare class AmenitiesController {
    private readonly amenitiesService;
    constructor(amenitiesService: AmenitiesService);
    create(body: CreateAmenityDto): Promise<import("../../types/api.types").ApiResponse<import("./amenities.types").CreateAmenityResponse>>;
    findAll(): Promise<import("../../types/api.types").ApiResponse<import("./amenities.types").AmenityListItemResponse[]>>;
    update(id: string, body: UpdateAmenityDto): Promise<import("../../types/api.types").ApiResponse<import("./amenities.types").UpdateAmenityResponse>>;
    delete(id: string): Promise<import("../../types/api.types").ApiMessageResponse>;
}
