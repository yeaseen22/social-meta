import multer from 'multer';

// ✅ Setup Multer Storage in Memory
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only images are allowed!'));
        }
        cb(null, true);
    },
});

export default upload;
