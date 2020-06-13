import { inject, Getter } from "@loopback/context";
import {
    repository,
    DefaultCrudRepository,
    HasManyRepositoryFactory,
} from "@loopback/repository";

import { MongoDataSource } from "~/datasources";

import { Schema, SchemaRelations, Property } from "~/models";

import { PropertyRepository } from ".";

export class SchemaRepository extends DefaultCrudRepository<
    Schema,
    typeof Schema.prototype.id,
    SchemaRelations
> {
    public readonly properties: HasManyRepositoryFactory<
        Property,
        typeof Schema.prototype.id
    >;

    constructor(
        @inject("datasources.Mongo")
        dataSource: MongoDataSource,
        @repository.getter("PropertyRepository")
        getPropertyRepository: Getter<PropertyRepository>
    ) {
        super(Schema, dataSource);

        this.properties = this.createHasManyRepositoryFactoryFor(
            "properties",
            getPropertyRepository
        );

        this.registerInclusionResolver(
            "properties",
            this.properties.inclusionResolver
        );
    }
}
