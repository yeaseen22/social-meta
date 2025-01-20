import { Request, Response, NextFunction } from 'express';
import { User } from '../models';
import { errorResponse } from '../lib/common';
import { AuthService } from '../services';
import requestIp from 'request-ip';


class AuthController {
    private readonly authService: AuthService;

    constructor(authService: AuthService = new AuthService()) {
        this.authService = new AuthService();
    }

    /**
     * ---- Register Controller ----
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} _next 
     */
    public async register(req: Request, res: Response, _next: NextFunction) {
        const user = new User(req.body);

        try {
            const docs = await user.save();
            res.status(200).json({
                success: true,
                message: 'User created successfully.',
                user: docs,
            });
        } catch (error) {
            res.json({ success: false, error });
        }
    }

    /**
     * ---- Login Controller ----
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next
     */
    public loginCon = async (req: Request, res: Response, next: NextFunction) => {
        const reqBody = req.body;
        const ipAddress = requestIp.getClientIp(req) || req.ip;
        const userAgent = req.headers['user-agent'];

        try {
            const authLogin = await this.authService.loginUser({
                email: reqBody.email,
                password: reqBody.password,
                ipAddress: ipAddress || 'unknown',
                userAgent: userAgent || 'unknown'
            });
            if (!authLogin.success) return res.status(400).json(authLogin);
            res.status(200).json(authLogin);

        } catch (error) {
            next(error);
        }
    }

    /**
     * ---- Login Controller ----
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    public async login(req: Request, res: Response | any, next: NextFunction) {
        const loginEmail = req.body.email;
        const loginPassword = req.body.password;

        try {
            const user = await User.findOne({ email: loginEmail });
            console.log('user exist', user)

            if (!user) return errorResponse({ status: 404, message: 'User not found!', isAuth: false }, res);

            // compare password with registered user..
            const isMatch = await (user as any).comparePassword(loginPassword);
            if (!isMatch) return errorResponse({ status: 401, message: 'Auth failed! wrong password!', isAuth: false }, res);

            // generate token when user login with fine..
            const token = await (user as any).generateToken();
            res.cookie('auth', token).json({
                isAuth: true,
                id: user._id,
                email: user.email
            });

        } catch (err: unknown) {
            next(err);
        }
    }

    /**
     * ---- Forgot Password Controller ----
     * @param {Request} req 
     * @param {Response} res 
     */
    public async forgotPassword(_req: Request, res: Response) {
        res.status(200).send('Route for forgot password!');
    }

    /**
     * ---- User Logout ----
     * @param {Request} req 
     * @param {Response} res 
     */
    public async logout(req: Request, res: Response) {
        try {
            await (req as any).user.deleteToken();
            res.status(200).json({
                isAuth: false,
                msg: 'Logged-Out, session deleted!'
            });
        } catch (err) {
            res.status(400).send(err);
        }
    }
}

export default AuthController;