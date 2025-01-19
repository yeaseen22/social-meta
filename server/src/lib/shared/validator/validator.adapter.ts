import { z, ZodError } from 'zod';

class ZodAdapter {
    // Method for validating incoming data
    static validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
        try {
            return schema.parse(data);
        } catch (error) {
            if (error instanceof ZodError) {
                throw new Error(JSON.stringify(error.errors));
            }
            throw error;
        }
    }
}

export default ZodAdapter;