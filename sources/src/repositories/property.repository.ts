import { inject, Getter } from "@loopback/context";
import {
    repository,
    DefaultCrudRepository,
    BelongsToAccessor,
} from "@loopback/repository";

import { MongoDataSource } from "~/datasources";

import { Property, PropertyRelations, Schema } from "~/models";

import { SchemaRepository } from ".";

export class PropertyRepository extends DefaultCrudRepository<
    Property,
    typeof Property.prototype.id,
    PropertyRelations
> {
    public readonly schema: BelongsToAccessor<
        Schema,
        typeof Property.prototype.id
    >;

    constructor(
        @inject("datasources.Mongo")
        dataSource: MongoDataSource,
        @repository.getter("SchemaRepository")
        getSchemaRepository: Getter<SchemaRepository>
    ) {
        super(Property, dataSource);

        this.schema = this.createBelongsToAccessorFor(
            "schema",
            getSchemaRepository
        );

        this.registerInclusionResolver("schema", this.schema.inclusionResolver);
    }
}
