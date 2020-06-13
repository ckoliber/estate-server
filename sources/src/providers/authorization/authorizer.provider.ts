import { Provider } from "@loopback/context";
import {
    Authorizer,
    AuthorizationContext,
    AuthorizationMetadata,
    AuthorizationDecision,
} from "@loopback/authorization";

export class AuthorizerProvider implements Provider<Authorizer> {
    value(): Authorizer {
        return this.authorize.bind(this);
    }

    async authorize(
        context: AuthorizationContext,
        metadata: AuthorizationMetadata
    ) {
        if (
            (metadata.scopes || []).reduce(
                (accumulate, item) =>
                    accumulate &&
                    (context.principals[0].permissions || []).indexOf(item) >=
                        0,
                true
            )
        ) {
            return AuthorizationDecision.ALLOW;
        } else {
            return AuthorizationDecision.DENY;
        }
    }
}
