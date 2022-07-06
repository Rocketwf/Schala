export enum EndPoints {
    FULLPROFILE = 'fullprofile',
    SEARCHRESULTS = 'searchresults',
}

import express from 'express';
export abstract class CommonRoutesConfig {
    private _app: express.Application;
    private _name: string;

    constructor(app: express.Application, name: string) {
        this._app = app;
        this._name = name;
        this.configureRoutes();
    }

    abstract configureRoutes(): express.Application;

    public get app(): express.Application {
        return this._app;
    }

    public get name(): string {
        return this._name;
    }

    public set name(newName: string) {
        this._name = newName;
    }
}
