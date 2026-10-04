"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileUrl = exports.uploadFile = exports.client = void 0;
const node_appwrite_1 = require("node-appwrite");
const file_1 = require("node-appwrite/file");
const env_config_1 = require("./env.config");
exports.client = new node_appwrite_1.Client()
    .setEndpoint(env_config_1.env.APPWRITE_ENDPOINT)
    .setProject(env_config_1.env.APPWRITE_PROJECT_ID)
    .setKey(env_config_1.env.APPWRITE_API_KEY);
const storage = new node_appwrite_1.Storage(exports.client);
const uploadFile = async (file) => {
    const { $id, name } = await storage.createFile({
        bucketId: env_config_1.env.APPWRITE_BUCKET_ID,
        fileId: node_appwrite_1.ID.unique(),
        file: file_1.InputFile.fromBuffer(file.buffer, file.originalname),
    });
    return { url: (0, exports.getFileUrl)($id), name };
};
exports.uploadFile = uploadFile;
const getFileUrl = (fileId) => `${env_config_1.env.APPWRITE_ENDPOINT}/storage/buckets/${env_config_1.env.APPWRITE_BUCKET_ID}/files/${fileId}/view?project=${env_config_1.env.APPWRITE_PROJECT_ID}`;
exports.getFileUrl = getFileUrl;
//# sourceMappingURL=appwrite.config.js.map