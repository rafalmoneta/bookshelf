// IMAGES
export const MAX_FILE_SIZE = 1048576;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// CLOUDINARY PRESET FOR UPLOAD
export const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "upload-preset";

// CLOUDINARY IMAGE URL
export const CLOUDINARY_URL =
  process.env.NEXT_PUBLIC_CLOUDINARY_URL ||
  "https://api.cloudinary.com/v1_1/:cloud_name/image/upload";
