import { HttpErrors, Request } from "@loopback/rest";
import { AuthenticationStrategy } from "@loopback/authentication";
import { UserProfile } from "@loopback/security";

import jwt from "jsonwebtoken";
import jwksRsa from "jwks-rsa";

export class Auth0Strategy implements AuthenticationStrategy {
    name: string = "auth0";

    private jwksClient = jwksRsa({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.AUTH0_URI as string,
    });

    async authenticate(request: Request): Promise<UserProfile> {
        const token = this.extractCredentials(request);

        return new Promise<UserProfile>((resolve, reject) =>
            jwt.verify(
                token,
                (header, callback) =>
                    this.jwksClient.getSigningKey(
                        header.kid || "",
                        (err, key: any) =>
                            callback(err, key.publicKey || key.rsaPublicKey)
                    ),
                {
                    issuer: process.env.AUTH0_ISSUER,
                    audience: process.env.AUTH0_AUDIENCE,
                    algorithms: ["RS256"],
                },
                (error, profile) => {
                    if (!error) {
                        resolve(profile as any);
                    }

                    reject(
                        new HttpErrors.Unauthorized(
                            `Authorization header is not valid, ${error}`
                        )
                    );
                }
            )
        );
    }

    private extractCredentials(request: Request) {
        if (request.headers.authorization) {
            // for example: Bearer xyz
            const authHeaderValue = request.headers.authorization;

            if (!authHeaderValue.startsWith("Bearer")) {
                throw new HttpErrors.Unauthorized(
                    `Authorization header is not of type 'Bearer'.`
                );
            }

            //split the string into 2 parts: 'Bearer ' and the `xyz`
            const parts = authHeaderValue.split(" ");
            if (parts.length !== 2) {
                throw new HttpErrors.Unauthorized(
                    `Authorization header value has too many parts. It must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.`
                );
            }

            return parts[1];
        } else if (request.query.access_token) {
            // for example: xyz
            const authHeaderValue = request.query.access_token as string;

            return authHeaderValue;
        } else {
            throw new HttpErrors.Unauthorized(
                `Authorization header not found.`
            );
        }
    }
}
