import { EstateApplication } from "./application";
import { ApplicationConfig } from "@loopback/core";

export { EstateApplication };

export async function main(options: ApplicationConfig = {}) {
    const app = new EstateApplication(options);
    await app.boot();
    await app.start();

    console.log(`Application is running`);

    return app;
}

export async function migrate(args: string[]) {
    const existingSchema = args.includes("--rebuild") ? "drop" : "alter";
    console.log("Migrating schemas (%s existing schema)", existingSchema);

    const app = new EstateApplication();
    await app.boot();
    await app.migrateSchema({ existingSchema });

    // Connectors usually keep a pool of opened connections,
    // this keeps the process running even after all work is done.
    // We need to exit explicitly.
    process.exit(0);
}
