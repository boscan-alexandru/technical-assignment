import { v4 as uuidv4 } from "uuid";
import stream from "stream";
import Storage from "../../interfaces/storage";

export default class Minio extends Storage {
  constructor(minioClient) {
    super();
    this.minioClient = minioClient;
  }

  async upload(file) {
    const bucketName = process.env.MINIO_BUCKET_NAME;
    const objectName = `${uuidv4()}`;
    const originalFileName = file.originalname;

    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);

    return new Promise((resolve, reject) => {
      this.minioClient.putObject(
        bucketName,
        objectName,
        bufferStream,
        file.size,
        (err, etag) => {
          if (err) {
            return reject(err);
          }

          const fileUrl = `${
            process.env.MINIO_USE_SSL === "true" ? "https" : "http"
          }://${process.env.MINIO_ENDPOINT}/${bucketName}/${objectName}`;
          resolve({ fileUrl, name: originalFileName });
        }
      );
    });
  }
}
