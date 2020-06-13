import { HttpErrors } from "@loopback/rest";
import { TokenService } from "@loopback/authentication";
import { UserProfile } from "@loopback/security";

import axios from "axios";

export class BearerService implements TokenService {
    async verifyToken(token: string): Promise<UserProfile> {
        if (!token) {
            throw new HttpErrors.Unauthorized(
                `Error verifying token: 'token' is null`
            );
        }

        try {
            const profile = await axios.get(
                `${process.env.PROCESSMAKER_URL}/extrarest/user/edit`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return profile.data;
        } catch (error) {
            throw new HttpErrors.Unauthorized(
                `Error verifying token: ${error.message}`
            );
        }
    }

    async generateToken(userProfile: UserProfile): Promise<string> {
        try {
            const session = await axios.post(
                `${process.env.PROCESSMAKER_URL}/oauth2/token`,
                {
                    grant_type: "password",
                    scope: "*",
                    client_id: userProfile.client_id,
                    client_secret: userProfile.client_secret,
                    username: userProfile.usr_username,
                    password: userProfile.usr_password,
                }
            );

            return session.data.access_token;
        } catch (error) {
            throw new HttpErrors.NotFound(`User not found`);
        }
    }
}
