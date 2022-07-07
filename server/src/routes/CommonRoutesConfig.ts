import { Application } from 'express';
/**
 * Allowed values for endpoints.
 */
export enum EndPoints {
    FULLPROFILE = 'fullProfile',
    SEARCHRESULTS = 'searchResults',
}

/**
 * Abstract class to manage routes of an app.
 */
export abstract class CommonRoutesConfig {
    /**
     * Express application.
     */
    private _app: Application;

    /**
     * Represents the name of the CommonRoutesConfig as a string.
     */
    private _name: string;

    /**
     * Constructs the CommonRoutesConfig.
     * @param app - app to configure
     * @param name - name of the routes
     */
    constructor(app: Application, name: string) {
        this._app = app;
        this._name = name;
        this.configureRoutes();
    }

    /**
     * Abstract method to configure the routes of a given app.
     */
    abstract configureRoutes(): Application;

    /**
     * Getter method of the app attribute.
     */
    public get app(): Application {
        return this._app;
    }

    /**
     * Getter method of the name attribute.
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Setter method of the name attribute.
     */
    public set name(newName: string) {
        this._name = newName;
    }
}
