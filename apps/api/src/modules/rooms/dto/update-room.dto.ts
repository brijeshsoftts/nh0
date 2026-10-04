import { createZodDto } from 'nestjs-zod';

import { CreateRoomSchema } from './create-room.dto';

export const UpdateRoomSchema = CreateRoomSchema.partial();

export class UpdateRoomDto extends createZodDto(UpdateRoomSchema) {}
