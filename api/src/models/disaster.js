import { z } from 'zod';

const DisasterSchema = z.object({
  title: z.string().min(3),
  location_name: z.string().min(2),
  location: z.object({
    type: z.literal('Point'),
    coordinates: z.tuple([z.number(), z.number()]),
  }),
  description: z.string(),
  tags: z.array(z.string()),
  owner_id: z.string(),
  audit_trail: z.array(z.object({
    action: z.string(),
    user_id: z.string(),
    timestamp: z.string(),
  })).optional(),
});

export default DisasterSchema;