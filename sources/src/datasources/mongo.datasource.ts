import { inject, lifeCycleObserver, LifeCycleObserver } from "@loopback/core";
import { juggler } from "@loopback/repository";

const config = {
    name: "Mongo",
    connector: "mongodb",
    url: "",
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASS,
    database: "estate",
    useNewUrlParser: true,
};

@lifeCycleObserver("datasource")
export class MongoDataSource extends juggler.DataSource
    implements LifeCycleObserver {
    static dataSourceName = "Mongo";
    static readonly defaultConfig = config;

    constructor(
        @inject("datasources.config.Mongo", { optional: true })
        dsConfig: object = config
    ) {
        super(dsConfig);
    }
}
