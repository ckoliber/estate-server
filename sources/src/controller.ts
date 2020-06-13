import { inject } from "@loopback/context";
import { repository } from "@loopback/repository";
import { Request, Response, RestBindings } from "@loopback/rest";
import { SecurityBindings, UserProfile } from "@loopback/security";
import { CRUDController } from "loopback-component-crud";

// import {} from "~/repositories";

export class Controller extends CRUDController {
    constructor(
        @inject(RestBindings.Http.REQUEST)
        public request: Request,
        @inject(RestBindings.Http.RESPONSE)
        public response: Response,
        @inject(SecurityBindings.USER, { optional: true })
        public session: UserProfile // @repository(AgreementRepository) // public agreementRepository: AgreementRepository,
    ) // @repository(PriorityRepository)
    // public priorityRepository: PriorityRepository,
    // @repository(PlanRepository)
    // public planRepository: PlanRepository,
    // @repository(PlanTypeRepository)
    // public planTypeRepository: PlanTypeRepository,
    {
        super(request, response, session);
    }
}
