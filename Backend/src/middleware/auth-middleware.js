import { prismaClient } from "../app/database.js"
import jwt from 'jsonwebtoken';
import { logger } from "../app/logging.js";

const authMiddleware = async (req, res, next) => {
    const token = getToken(req)
    if (!token) {
        res.status(401).json({
            errors: 'Unauthorized',
            message: 'No Token'
        }).end()
    } else {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            logger.error(err)
            if (err) {
                return res.status(401).json({
                    errors: 'Unauthorized',
                    message: 'Invalid Token'
                }).end()
            }

            const payloadToken = JSON.parse(
                Buffer.from(token.split('.')[1], 'base64').toString('utf-8'),
            );
            logger.info(payloadToken)

            const user = await prismaClient.user.findUnique({
                where: { id: payloadToken.id }
            })

            if (!user) {
                res.status(401).json({
                    errors: 'Unauthorized',
                    message: 'Invalid Token'
                }).end()
            } else {
                req.user = user
                next()
            }
        })
    }
}

function getToken(req) {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        return req.headers.authorization.split(" ")[1];
    }
    return null;
}

export { authMiddleware }