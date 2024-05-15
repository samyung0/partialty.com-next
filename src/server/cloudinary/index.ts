import 'server-only';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
  secure: true,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadCloudinaryProfilePic = async (imageString: string) => {
  return await cloudinary.uploader.upload(imageString, {
    folder: 'uploadedProfilePic',
  });
};

export const deleteCloudinary = async (public_id: string) => {
  return await cloudinary.uploader.destroy(public_id, {
    invalidate: true,
  });
};
