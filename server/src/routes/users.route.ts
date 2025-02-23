import express from 'express';
import { UserController } from '../controllers';
import { imageUpload } from '../middlewares';

const router = express.Router();

// Object instance for UserController Class..
const userController = new UserController();

router.route('/')
    .get(userController.showUsers)
    .patch(userController.updateThemeMode);

router.route('/:userId')
    .get(userController.profileById);

/**
 * ---- Upload Profile Pic and Update Mongo Users Data ----
 */
router.patch('/update-photo', imageUpload.single("file"), userController.uploadProfilePic);
router.patch('/update-cover', imageUpload.single("file"), userController.uploadCoverPic);

export default router;