import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';

export class S3Service {
  private s3Client: S3Client;
  private bucket: string;
  constructor() {
    console.log('AWS_ACCESS_KEY_ID:::', process.env.S3_ACCESS_KEY_ID);
    console.log('AWS_SECRET_ACCESS_KEY:::', process.env.S3_SECRET_ACCESS_KEY);
    console.log('S3_PREVIEW_URL:::', process.env.S3_PREVIEW_URL);
    console.log('S3_BUCKET:::', process.env.S3_BUCKET);
    this.s3Client = new S3Client({
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
      region: 'auto',
      endpoint: `${process.env.S3_PREVIEW_URL}.cloudflarestorage.com`,
    });
    this.bucket = process.env.S3_BUCKET!;
  }

  /**
   * Upload a base64 image string to S3.
   * @param base64DataUri - The full base64 image string (e.g. data:image/png;base64,...)
   * @param key - The S3 key to save the image as (e.g. uploads/image.png)
   */
  async uploadBase64Image(base64DataUri: string, key: string): Promise<string> {
    try {
      const a = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucket,
          Key: key,
          Body: Buffer.from(base64DataUri, 'base64'),
          ContentEncoding: 'base64',
          ContentType: this.detectMimeType(base64DataUri),
          ACL: 'public-read',
        })
      );
    } catch (error) {
      console.error('Error uploading image to S3:', error);
      throw new Error('Failed to upload image');
    }

    return encodeURI(`${process.env.S3_URL}/${key}`);
  }

  /**
   * Check if a key exists in S3
   */
  async keyExists(key: string): Promise<boolean> {
    try {
      await this.s3Client.send(
        new HeadObjectCommand({
          Bucket: this.bucket,
          Key: key,
        })
      );
      return true;
    } catch (error: any) {
      if (
        error.name === 'NotFound' ||
        error.$metadata?.httpStatusCode === 404
      ) {
        return false;
      }
      throw error;
    }
  }

  detectMimeType(b64: any) {
    const signatures: any = {
      JVBERi0: 'application/pdf',
      R0lGODdh: 'image/gif',
      R0lGODlh: 'image/gif',
      iVBORw0KGgo: 'image/png',
      '/9j/': 'image/jpg',
    };
    for (const s in signatures) {
      if (b64.indexOf(s) === 0) {
        return signatures[s];
      }
    }
  }
}

// Export singleton
export const s3Service = new S3Service();
export default s3Service;
