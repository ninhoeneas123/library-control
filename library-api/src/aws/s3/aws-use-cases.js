import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  region: 'us-east-1'

})
class S3 {
  async create (bucketName, key, file) {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: file
    }
    const command = new PutObjectCommand(params)
    const returna = await s3.send(command)
    return returna
  }

  async getFile (bucketName, key) {
    const params = {
      Bucket: bucketName,
      Key: key
    }
    const command = new GetObjectCommand(params)
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
    return url
  }

  getFileForTest(bucketName, key) {
    const params = {
      Bucket: bucketName,
      Key: key
    }
    const command = new GetObjectCommand(params)
    console.log(  "command", command)
    const returna =  s3.send(command)
    console.log("returna", returna)
  }

  async deleteFile (bucketName, key) {
    const params = {
      Bucket: bucketName,
      Key: key
    }
    return await s3.destroy(params).promise()
  }

  async update (bucketName, key, file) {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: file
    }
    const command = new PutObjectCommand(params)
    return await s3.send(command)
  }
}
export default new S3()
