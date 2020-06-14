import { CRUDControllerMixin } from "loopback-component-crud";

import { Estate } from "~/models";
import { Controller } from "~/controller";

export class EstatesController extends CRUDControllerMixin(
    Estate,
    Controller,
    {
        modelMapper: async (context, models) => models,
        repositoryGetter: (controller) => controller.estateRepository,

        create: {
            authentication: { strategy: "bearer" },
            authorization: {},
        },
        read: { authentication: { strategy: "bearer" }, authorization: {} },
        update: { authentication: { strategy: "bearer" }, authorization: {} },
        delete: { authentication: { strategy: "bearer" }, authorization: {} },

        include: {},
    },
    ""
) {}
