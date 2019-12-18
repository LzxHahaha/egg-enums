import 'egg';

declare module 'egg' {
    interface Application {
        enums: any;
    }
}
