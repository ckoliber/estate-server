import { TokenService } from "@loopback/authentication";
import { UserProfile } from "@loopback/security";

export class BearerService implements TokenService {
    async verifyToken(token: string): Promise<UserProfile> {
        return {} as any;
    }

    async generateToken(userProfile: UserProfile): Promise<string> {
        return "";
    }
}
