import { CRUDControllerMixin } from "loopback-component-crud";

import { Estate } from "~/models";
import { Controller } from "~/controller";

import { Permissions } from "~/permissions";

export class EstatesController extends CRUDControllerMixin(
    Estate,
    Controller,
    {
        modelMapper: async (context, models) => models,
        repositoryGetter: (controller) => controller.estateRepository,

        create: {
            authentication: { strategy: "auth0" },
            authorization: {
                scopes: [Permissions.ESTATE_CREATE],
            },
        },
        read: {
            authentication: { strategy: "auth0" },
            authorization: {
                scopes: [Permissions.ESTATE_READ],
            },
        },
        update: {
            authentication: { strategy: "auth0" },
            authorization: {
                scopes: [Permissions.ESTATE_UPDATE],
            },
        },
        delete: {
            authentication: { strategy: "auth0" },
            authorization: {
                scopes: [Permissions.ESTATE_DELETE],
            },
        },

        include: {
            fields: {
                modelMapper: async (context, models) => models,
                repositoryGetter: (controller) => controller.fieldRepository,

                create: {
                    authentication: { strategy: "auth0" },
                    authorization: {},
                },
                read: {
                    authentication: { strategy: "auth0" },
                    authorization: {},
                },
                update: {
                    authentication: { strategy: "auth0" },
                    authorization: {},
                },
                delete: {
                    authentication: { strategy: "auth0" },
                    authorization: {},
                },

                include: {
                    property: {
                        modelMapper: async (context, models) => models,
                        repositoryGetter: (controller) =>
                            controller.propertyRepository,

                        read: {
                            authentication: { strategy: "auth0" },
                            authorization: {},
                        },

                        include: {},
                    },
                },
            },
        },
    },
    ""
) {}
