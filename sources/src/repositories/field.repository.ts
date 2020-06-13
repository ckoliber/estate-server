import { inject, Getter } from "@loopback/context";
import {
    repository,
    DefaultCrudRepository,
    BelongsToAccessor,
} from "@loopback/repository";

import { MongoDataSource } from "~/datasources";

import { Field, FieldRelations, Property, Estate } from "~/models";

import { PropertyRepository, EstateRepository } from ".";

export class FieldRepository extends DefaultCrudRepository<
    Field,
    typeof Field.prototype.id,
    FieldRelations
> {
    public readonly property: BelongsToAccessor<
        Property,
        typeof Field.prototype.id
    >;
    public readonly estate: BelongsToAccessor<
        Estate,
        typeof Field.prototype.id
    >;

    constructor(
        @inject("datasources.Mongo")
        dataSource: MongoDataSource,
        @repository.getter("PropertyRepository")
        getPropertyRepository: Getter<PropertyRepository>,
        @repository.getter("EstateRepository")
        getEstateRepository: Getter<EstateRepository>
    ) {
        super(Field, dataSource);

        this.property = this.createBelongsToAccessorFor(
            "property",
            getPropertyRepository
        );
        this.estate = this.createBelongsToAccessorFor(
            "estate",
            getEstateRepository
        );

        this.registerInclusionResolver(
            "property",
            this.property.inclusionResolver
        );
        this.registerInclusionResolver("estate", this.estate.inclusionResolver);
    }
}
