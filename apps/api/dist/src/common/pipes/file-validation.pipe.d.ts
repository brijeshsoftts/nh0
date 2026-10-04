export declare const fileValidationPipe: (Size: number, Count: number) => {
    limits: {
        fileSize: number;
        files: number;
    };
    fileFilter: (_req: any, file: any, callback: any) => any;
};
