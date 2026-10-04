import { Client, ID, Storage } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';

import { env } from './env.config';

export const client = new Client()
  .setEndpoint(env.APPWRITE_ENDPOINT)
  .setProject(env.APPWRITE_PROJECT_ID)
  .setKey(env.APPWRITE_API_KEY);

const storage = new Storage(client);

export const uploadFile = async (
  file,
): Promise<{ url: string; name: string }> => {
  const { $id, name } = await storage.createFile({
    bucketId: env.APPWRITE_BUCKET_ID,
    fileId: ID.unique(),
    file: InputFile.fromBuffer(file.buffer, file.originalname),
  });

  return { url: getFileUrl($id), name };
};

export const getFileUrl = (fileId: string): string =>
  `${env.APPWRITE_ENDPOINT}/storage/buckets/${env.APPWRITE_BUCKET_ID}/files/${fileId}/view?project=${env.APPWRITE_PROJECT_ID}`;
