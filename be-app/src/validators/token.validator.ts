import * as zod from "zod";

const tokenPayloadSchema = zod.object({
    sub: zod.string().uuid("Invalid user ID format"),
    role: zod.enum(["customer", "admin"], "Invalid user role"),
    name: zod.string().min(1, "Name cannot be empty").max(100, "Name must be less than 100 characters"),
})

const refreshTokenValueSchema = zod.object({
    userId: zod.string().uuid("Invalid user ID format"),
    refreshToken: zod.string().min(1, "Token hash cannot be empty"),
    jti: zod.string().min(1, "JTI cannot be empty"),
    ip: zod.string().min(1, "IP address cannot be empty"),
    userAgent: zod.string().min(1, "User agent cannot be empty").max(255, "User agent must be less than 255 characters"),
})

export { tokenPayloadSchema, refreshTokenValueSchema };