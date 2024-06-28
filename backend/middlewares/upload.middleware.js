import multer from 'multer';
import { storage } from '../config/storage.js';

const upload = multer();
const productImage = multer({ storage });

export const uploadSingleFile = upload.single('file');
export const uploadSingleImage = productImage.single('image');
