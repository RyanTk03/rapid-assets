import next from "next";

const PORT = Number(process.env.PORT) || 3000;

const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
    port: PORT
});

const nextHandler = nextApp.getRequestHandler();

export { nextApp, nextHandler };
