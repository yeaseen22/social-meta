// import { cloudinary, UploadApiResponse } from '@/config';
import { cloudinary, UploadApiResponse } from '../../../config';
import { Readable } from 'stream';

class BlobStorageUtils {
    /**
     * Upload Image directly to Cloudinary from a buffer (via Multer)
     * @param file - The file object from Multer
     * @returns The URL of the uploaded image
     */
    // region Upload Image File
    static async uploadImage(file: Express.Multer.File, folder: string): Promise<string> {
        try {
            const result: UploadApiResponse = await this.uploadFromBuffer(file.buffer, folder);
            return result.secure_url;

        } catch (error: any) {
            console.error('Error uploading image to Cloudinary:', error.message);
            throw new Error('Failed to upload image.');
        }
    }

    /**
     * Upload a buffer to Cloudinary using a readable stream
     * @param buffer - The file buffer to upload
     * @param folder - The target folder in Cloudinary
     * @returns Cloudinary response
     */
    // region Upload-from-buffer
    private static uploadFromBuffer(buffer: Buffer, folder: string): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder, resource_type: 'image' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result as UploadApiResponse);
                }
            );

            // Create a readable stream from the buffer and pipe to Cloudinary
            const readableStream = new Readable();
            readableStream.push(buffer);
            readableStream.push(null);
            readableStream.pipe(uploadStream);
        });
    }

    /**
     * Delete an Image from Cloudinary using the public ID
     * @param imageUrl - The URL of the image to delete
     */
    // region Delete Image
    static async deleteImage(imageUrl: string): Promise<void> {
        try {
            const publicId = BlobStorageUtils.extractPublicId(imageUrl);
            if (!publicId) {
                throw new Error('Invalid image URL.');
            }
            await cloudinary.uploader.destroy(publicId);

        } catch (error: any) {
            console.error('Error deleting image from Cloudinary:', error.message);
            throw new Error('Failed to delete image.');
        }
    }

    /**
     * Get Image Metadata from Cloudinary
     * @param publicId - The public ID of the image
     * @returns The URL of the fetched image
     */
    // region Get Image
    static async getImage(publicId: string): Promise<string> {
        try {
            const result = await cloudinary.api.resource(publicId);
            return result.secure_url;

        } catch (error: any) {
            console.error('Error fetching image from Cloudinary:', error.message);
            throw new Error('Failed to fetch image.');
        }
    }

    /**
     * Extract the public ID from a Cloudinary URL
     * @param imageUrl - The URL of the image
     * @returns The public ID
     */
    // region Extract Public ID
    private static extractPublicId(imageUrl: string): string | null {
        try {
            const parts = imageUrl.split('/');
            const filenameWithExtension = parts.pop();
            const folderPath = parts.slice(parts.indexOf('kotka-app')).join('/');
            if (!filenameWithExtension) return null;
            const filename = filenameWithExtension.split('.')[0];
            return `${folderPath}/${filename}`;

        } catch (error: any) {
            console.error('Error extracting public ID:', error.message);
            return null;
        }
    }
}

export default BlobStorageUtils;
