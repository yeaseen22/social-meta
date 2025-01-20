import { z } from 'zod';

class AuthValidation {
  // region Register Validation
  static registerUser = z.object({
    firstname: z.string().min(1, 'Name is required').max(50, 'Name must be less than 50 characters'),
    lastname: z.string().max(50, 'Name must be less than 50 characters').optional(),
    bio: z.string().optional(),
    birthdate: z.string().min(1, 'Birthdate is required'),
    title: z.string().optional(),
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  });


  // region Login Validation
  static loginUser = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  });
}

export default AuthValidation;