import { z } from "zod";

export const serviceSchema = z.enum([
  "ants",
  "termites",
  "rodents",
  "roaches",
  "general",
]);

export const urgencySchema = z.enum(["low", "medium", "high"]);
export const pestTypeSchema = z.enum([
  "ants",
  "termites",
  "rodents",
  "roaches",
  "general",
]);

export const statusSchema = z.enum([
  "New",
  "Contacted",
  "Qualified",
  "InspectionScheduled",
  "Closed",
]);

export const leadInputSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(7, "Phone number is required"),
  email: z.string().email("Use a valid email address"),
  service: serviceSchema,
  message: z.string().min(12, "Describe the issue in a little more detail"),
  city: z.string().min(2, "City is required"),
  preferredTime: z.string().optional().nullable(),
});

export const aiLeadScoreSchema = z.object({
  score: z.number().int().min(0).max(100),
  urgency: urgencySchema,
  pest_type: pestTypeSchema,
  summary: z.string().min(10),
  recommended_reply: z.string().min(10),
  next_action: z.string().min(10),
});

export const statusUpdateSchema = z.object({
  status: statusSchema,
});

export const leadFilterSchema = z.object({
  urgency: urgencySchema.optional(),
  status: statusSchema.optional(),
  service: serviceSchema.optional(),
});

export type LeadInput = z.infer<typeof leadInputSchema>;
export type AiLeadScore = z.infer<typeof aiLeadScoreSchema>;
export type StatusUpdate = z.infer<typeof statusUpdateSchema>;
