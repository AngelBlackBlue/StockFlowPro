import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryReponse } from './cloudinary.response';

const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadImage(file: Express.Multer.File): Promise<CloudinaryReponse> {
    const folder = 'stock_flow_pro';
    return new Promise<CloudinaryReponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto', folder, public_id: file.originalname },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
  deleteImage(publicId: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error: any, result: any) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
