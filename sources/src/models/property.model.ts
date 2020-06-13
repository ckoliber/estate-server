import { Entity, model, property, belongsTo } from "@loopback/repository";

import { Schema, SchemaWithRelations } from ".";

@model()
export class Property extends Entity {
    @property({
        type: "string",
        defaultFn: "uuidv4",
        id: true,
    })
    id: string;

    @property({
        type: "string",
    })
    name: string;

    @belongsTo(() => Schema)
    schemaId: string;

    constructor(data?: Partial<Property>) {
        super(data);
    }
}

export interface PropertyRelations {
    schema: SchemaWithRelations;
}

export type PropertyWithRelations = Property & PropertyRelations;
