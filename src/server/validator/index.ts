import { z } from "zod";
import { ProjectValidator } from "./project";
import { UserValidator } from "./user";

/** TYPES **/
export type Project = z.infer<typeof ProjectValidator>
export type User = z.infer<typeof UserValidator>

/** VALIDATORS **/
export const projctResponseValidator = z.array(ProjectValidator);