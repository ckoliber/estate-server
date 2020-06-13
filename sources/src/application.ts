import { BootMixin } from "@loopback/boot";
import { ServiceMixin } from "@loopback/service-proxy";
import { RepositoryMixin } from "@loopback/repository";
import { ApplicationConfig } from "@loopback/core";
import { RestApplication } from "@loopback/rest";

import {
    registerAuthenticationStrategy,
    AuthenticationComponent,
} from "@loopback/authentication";
import { CRUDComponent } from "loopback-component-crud";
import {
    AuthorizationTags,
    AuthorizationBindings,
    AuthorizationDecision,
    AuthorizationComponent,
} from "@loopback/authorization";
import {
    RestExplorerBindings,
    RestExplorerComponent,
} from "@loopback/rest-explorer";

import { CRUDStrategy, BearerService, AuthorizerProvider } from "~/providers";
import { EstateBindings } from "~/keys";
import { Sequence } from "~/sequence";

import path from "path";

export class EstateApplication extends BootMixin(
    ServiceMixin(RepositoryMixin(RestApplication))
) {
    constructor(options: ApplicationConfig = {}) {
        super(options);

        // Set up the custom sequence
        this.sequence(Sequence);

        // Set up default home page
        this.static("/", path.join(__dirname, "../public"));

        this.bindAuthentication();
        this.bindCRUD();
        this.bindAuthorization();
        this.bindExplorer();

        this.projectRoot = __dirname;
        // Customize @loopback/boot Booter Conventions here
        this.bootOptions = {
            controllers: {
                // Customize ControllerBooter Conventions here
                dirs: ["controllers"],
                extensions: [".controller.js"],
                nested: true,
            },
        };
    }

    private bindAuthentication() {
        registerAuthenticationStrategy(this, CRUDStrategy);

        this.bind(EstateBindings.TOKEN_SERVICE).toClass(BearerService);

        this.component(AuthenticationComponent);
    }

    private bindCRUD() {
        this.component(CRUDComponent);
    }

    private bindAuthorization() {
        this.bind(EstateBindings.AUTHORIZER_PROVIDER)
            .toProvider(AuthorizerProvider)
            .tag(AuthorizationTags.AUTHORIZER);

        this.configure(AuthorizationBindings.COMPONENT).to({
            precedence: AuthorizationDecision.DENY,
            defaultDecision: AuthorizationDecision.DENY,
        });

        this.component(AuthorizationComponent);
    }

    private bindExplorer() {
        this.configure(RestExplorerBindings.COMPONENT).to({
            path: "/explorer",
        });

        this.component(RestExplorerComponent);
    }
}
