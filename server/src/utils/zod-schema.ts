import { z } from 'zod';

const slotSchema = z.object({
  type: z.enum(['MORNING', 'DAY', 'EVENING', 'NIGHT']),
  cost: z.number().nonnegative(),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  duration: z.number().int().nonnegative(),
  maxBookings: z.number().int().nonnegative(),
});
export const newEquipmentSchema = z.object({
  name: z.string(),
  description: z.string(),
  place: z.string(),
  equipmentSlots: z.array(slotSchema),
});

export const updateEquipmentSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  place: z.string().optional(),
  description: z.string().optional(),
  slotDuration: z.number().nonnegative().int().optional(),
  equipmentSlots: z.array(slotSchema).optional(),
});

export const newSupervisorSchema = z.object({
  name: z.string(),
  email: z
    .string({
      required_error: 'Please input an email to display.',
    })
    .email(),

  departmentId: z.string().uuid(),
  uid: z.string(),
  token: z.number(),
});

export const newStudentSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  roll: z.string(),
  departmentId: z.string().uuid(),
});
export const newAdminSchema = z.object({
  name: z.string(),
  email: z
    .string({
      required_error: 'Please input an email to display.',
    })
    .email(),

  departmentId: z.string().uuid(),
});

export const startMaintenanceSchema = z.object({
  equipmentId: z.string().uuid(),
  reason: z.string(),
  endTime: z.string().datetime(),
});
export const startWorkingSchema = z.object({
  equipmentId: z.string().uuid(),
});

export const createBookingScehma = z.object({
  equipmentId: z.string().uuid(),
  fromSlot: z.string().datetime(),
  toSlot: z.string().datetime(),
  remark: z.string(),
  slotDuration: z.number(),
  userId: z.string().uuid(),
  cost: z.number(),
});

export const transferStudentSchema = z.object({
  studentId: z.string().uuid(),
  supervisorId: z.string().uuid(),
});

export const allotPointsSchema = z.object({
  amount: z.number().nonnegative(),
  userId: z.string().uuid(),
});

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const resetPasswordSchema = z.object({
  userId: z.string().uuid(),
  newPassword: z.string(),
});

export const emailSchema = z.object({
  email: z.string().email(),
});

export const createNewDepartmentSchema = z.object({
  name: z.string(),
});
export const bookingIdSchema = z.object({
  bookingId: z.string(),
});

export const dateRangeSchema = z.object({
  fromDate: z.string().datetime(),
  toDate: z.string().datetime(),
});

export const updateUserSchema = z.object({
  department: z.string().optional(),
  uin: z.string().optional(),
  roll: z.number().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const addDepartmentSchema = z.object({
  name: z.string(),
});
export type NewEquipment = z.infer<typeof newEquipmentSchema>;
export type NewSupervisor = z.infer<typeof newSupervisorSchema>;
