import { Entity, model, property, hasMany } from "@loopback/repository";

import { Property, PropertyWithRelations } from ".";

@model()
export class Schema extends Entity {
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

    @hasMany(() => Property)
    properties: PropertyWithRelations[];

    constructor(data?: Partial<Schema>) {
        super(data);
    }
}

export interface SchemaRelations {}

export type SchemaWithRelations = Schema & SchemaRelations;
