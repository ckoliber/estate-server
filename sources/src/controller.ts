import { inject } from "@loopback/context";
import { repository } from "@loopback/repository";
import { Request, Response, RestBindings } from "@loopback/rest";
import { SecurityBindings, UserProfile } from "@loopback/security";
import { CRUDController } from "loopback-component-crud";

import {
    EstateRepository,
    FieldRepository,
    PropertyRepository,
    SchemaRepository,
} from "~/repositories";

export class Controller extends CRUDController {
    constructor(
        @inject(RestBindings.Http.REQUEST)
        public request: Request,
        @inject(RestBindings.Http.RESPONSE)
        public response: Response,
        @inject(SecurityBindings.USER, { optional: true })
        public session: UserProfile,

        @repository(EstateRepository)
        public estateRepository: EstateRepository,
        @repository(FieldRepository)
        public fieldRepository: FieldRepository,
        @repository(PropertyRepository)
        public propertyRepository: PropertyRepository,
        @repository(SchemaRepository)
        public schemaRepository: SchemaRepository
    ) {
        super(request, response, session);
    }
}
