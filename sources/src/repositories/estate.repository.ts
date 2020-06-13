import { inject, Getter } from "@loopback/context";
import {
    repository,
    DefaultCrudRepository,
    HasManyRepositoryFactory,
} from "@loopback/repository";

import { MongoDataSource } from "~/datasources";

import { Estate, EstateRelations, Field } from "~/models";

import { FieldRepository } from ".";

export class EstateRepository extends DefaultCrudRepository<
    Estate,
    typeof Estate.prototype.id,
    EstateRelations
> {
    public readonly fields: HasManyRepositoryFactory<
        Field,
        typeof Estate.prototype.id
    >;

    constructor(
        @inject("datasources.Mongo")
        dataSource: MongoDataSource,
        @repository.getter("FieldRepository")
        getFieldRepository: Getter<FieldRepository>
    ) {
        super(Estate, dataSource);

        this.fields = this.createHasManyRepositoryFactoryFor(
            "fields",
            getFieldRepository
        );

        this.registerInclusionResolver("fields", this.fields.inclusionResolver);
    }
}
