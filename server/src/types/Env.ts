declare namespace NodeJS {
    export interface ProcessEnv {
        ENV: 'dev' | 'prod';
        DB: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
        DB_USER: string;
        DB_PASSWORD: string;
        DB_HOST: string;
        DB_PORT: string;
    }
}
