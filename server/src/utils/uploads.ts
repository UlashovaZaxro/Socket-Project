import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
        if (allowed.includes(file.mimetype)) {
        cb(null, true);
        } else {
        cb(new Error("Only image files are allowed!"));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB limit
    },
});
