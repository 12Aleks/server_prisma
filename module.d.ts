declare namespace NodeJS{
    export interface ProcessEnv{
        PORT_NUMBER:number;
        JWT_SECRET_KEY: string;
        JWT_SECRET_REFRESH_KEY: string;
        DATABASE_URL: string;
    }
}