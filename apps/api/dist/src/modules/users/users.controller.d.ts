import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getOne(userId: string): Promise<import("../../types/api.types").ApiResponse<import("./users.types").UserDetails>>;
}
