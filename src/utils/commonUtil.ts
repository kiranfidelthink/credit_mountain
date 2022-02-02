require('dotenv').config;
import Jwt from 'jsonwebtoken';
import { HttpError } from 'routing-controllers';


export const generateToken = (payload, expiry) => {
    const options = {
        expiresIn: expiry,
    };
    const secret = 'JWT_SECRET';
    return (Jwt.sign(payload, secret, options));
}
export const validateToken = (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result: string | Jwt.JwtPayload;
    if (authorizationHeaader) {
        const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
        const options = {
            maxAge: '2d',
        };
        try {
            // verify makes sure that the token hasn't expired and has been issued by us
            result = Jwt.verify(token, 'JWT_SECRET', options);
            // Let's pass back the decoded token to the request object
            req.decoded = result;
            // We call next to pass execution to the subsequent middleware
            next();
        } catch (err) {
            // Throw an error just in case anything goes wrong with verification
            throw new HttpError(401, (err as Error).message);
        }
    } else {
        result = {
            error: `Authentication error. Token required.`,
        };
        res.status(401).send(result);
    }
}
