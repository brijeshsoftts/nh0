import z from "zod";

import { CreateCustomerSchema } from "./createCustomer.schema";

export const UpdateCustomerSchema = CreateCustomerSchema.partial();

export type UpdateCustomer = z.infer<typeof UpdateCustomerSchema>;
