/** Fix path mapping in js */
require("better-module-alias")(__dirname);

require("dotenv-safe").config({
    allowEmptyValues: true,
});

// require("@sentry/node").init({
//     dsn: "http://3c8203a4edea44e9b12dcdb21fd2f203@91.92.208.62:9000/2",
// });

const application = require("./dist");

module.exports = application;

if (require.main === module) {
    if (process.argv.indexOf("--migrate") < 0) {
        // Run the application
        const version = process.env.npm_package_version;
        const basePath = `/api/${version}`;
        const debug = process.env.HTTP_DEBUG === "true";
        const config = {
            rest: {
                host: process.env.HTTP_LOCAL_HOST,
                port: parseInt(process.env.HTTP_REST_PORT),
                basePath: basePath,
                homePath: __dirname + "/public",
                gracePeriodForClose: 5000,
                apiExplorer: {
                    disabled: debug ? undefined : true,
                },
                openApiSpec: {
                    disabled: debug ? undefined : true,
                    setServersFromRequest: true,
                },
                cors: {
                    exposedHeaders: ["x-total-count"],
                },
            },
            graphql: {
                host: process.env.HTTP_LOCAL_HOST,
                port: parseInt(process.env.HTTP_GQL_PORT),
            },
        };

        application.main(config).catch((err) => {
            console.error("Cannot start the application.", err);
            process.exit(1);
        });
    } else {
        // Migrate the application database
        application.migrate(process.argv).catch((err) => {
            console.error("Cannot migrate database schema", err);
            process.exit(1);
        });
    }
}
