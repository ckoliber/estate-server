import { Entity, model, property, belongsTo } from "@loopback/repository";

import {
    Property,
    PropertyWithRelations,
    Estate,
    EstateWithRelations,
} from ".";

@model()
export class Field extends Entity {
    @property({
        type: "string",
        defaultFn: "uuidv4",
        id: true,
    })
    id: string;

    @property({
        type: "string",
    })
    value: string;

    @belongsTo(() => Property)
    propertyId: string;

    @belongsTo(() => Estate)
    estateId: string;

    constructor(data?: Partial<Field>) {
        super(data);
    }
}

export interface FieldRelations {
    property: PropertyWithRelations;
    estate: EstateWithRelations;
}

export type FieldWithRelations = Field & FieldRelations;
