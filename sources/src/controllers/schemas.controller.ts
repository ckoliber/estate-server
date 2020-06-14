import { CRUDControllerMixin } from "loopback-component-crud";

import { Schema } from "~/models";
import { Controller } from "~/controller";

import { Permissions } from "~/permissions";

export class SchemasController extends CRUDControllerMixin(
    Schema,
    Controller,
    {
        modelMapper: async (context, models) => models,
        repositoryGetter: (controller) => controller.schemaRepository,

        create: {
            authentication: { strategy: "auth0" },
            authorization: {
                scopes: [Permissions.SCHEMA_CREATE],
            },
        },
        read: {
            authentication: { strategy: "auth0" },
            authorization: {
                scopes: [Permissions.SCHEMA_READ],
            },
        },
        update: {
            authentication: { strategy: "auth0" },
            authorization: {
                scopes: [Permissions.SCHEMA_UPDATE],
            },
        },
        delete: {
            authentication: { strategy: "auth0" },
            authorization: {
                scopes: [Permissions.SCHEMA_DELETE],
            },
        },

        include: {
            properties: {
                modelMapper: async (context, models) => models,
                repositoryGetter: (controller) => controller.propertyRepository,

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

                include: {},
            },
        },
    },
    ""
) {}
