import { Provider } from "@loopback/context";
import {
    Authorizer,
    AuthorizationContext,
    AuthorizationMetadata,
    AuthorizationDecision,
} from "@loopback/authorization";

import { getAccess } from "loopback-component-crud";

export class AuthorizerProvider implements Provider<Authorizer> {
    value(): Authorizer {
        return this.authorize.bind(this);
    }

    async authorize(
        context: AuthorizationContext,
        metadata: AuthorizationMetadata
    ) {
        const accessMetadata = getAccess(context.invocationContext) || metadata;

        if (
            (accessMetadata.scopes || []).reduce(
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
