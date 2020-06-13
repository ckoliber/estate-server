import { inject } from "@loopback/context";
import { HttpErrors, Request } from "@loopback/rest";
import { AuthenticationStrategy, TokenService } from "@loopback/authentication";

import { EstateBindings } from "~/keys";

export class BearerStrategy implements AuthenticationStrategy {
    name: string = "bearer";

    constructor(
        @inject(EstateBindings.TOKEN_SERVICE)
        public tokenService: TokenService
    ) {}

    async authenticate(request: Request) {
        const token: string = this.extractCredentials(request);

        return await this.tokenService.verifyToken(token);
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