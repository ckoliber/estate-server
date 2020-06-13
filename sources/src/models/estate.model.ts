import { Entity, model, property, hasMany } from "@loopback/repository";

import { Field, FieldWithRelations } from ".";

@model()
export class Estate extends Entity {
    @property({
        type: "string",
        defaultFn: "uuidv4",
        id: true,
    })
    id: string;

    @property({
        type: "string",
        required: true,
    })
    code: string;

    @property({
        type: "string",
    })
    area: string;

    @property({
        type: "date",
    })
    date: Date;

    @property({
        type: "string",
    })
    address: string;

    @property({
        type: "string",
    })
    location: string;

    @property({
        type: "string",
    })
    province: string;

    @property({
        type: "string",
    })
    document: string;

    @property({
        type: "string",
        jsonSchema: {
            pattern: `^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$`,
        },
    })
    phone: string;

    @property({
        type: "string",
        jsonSchema: {
            enum: ["Available", "Unavailable"],
        },
    })
    state: string;

    @hasMany(() => Field)
    fields: FieldWithRelations[];

    constructor(data?: Partial<Estate>) {
        super(data);
    }
}

export interface EstateRelations {}

export type EstateWithRelations = Estate & EstateRelations;
