import { BindingKey } from "@loopback/context";
import { TokenService } from "@loopback/authentication";
import { Authorizer } from "@loopback/authorization";

export namespace EstateBindings {
    /**
     * Provider key
     *
     * 1. TokenService
     * 2. AuthorizerProvider
     */
    export const TOKEN_SERVICE = BindingKey.create<TokenService>(
        "estate.providers.token"
    );
    export const AUTHORIZER_PROVIDER = BindingKey.create<Authorizer>(
        "estate.providers.authorizer"
    );
}
