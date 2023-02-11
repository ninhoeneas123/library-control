import { mockClient } from 'aws-sdk-client-mock'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import S3 from '../aws-use-cases.js'
process.env.BUCKET_NAME = 'library-sytem'

describe('Mock AWS Client', () => {
  const s3ClientMock = mockClient(S3Client)

  beforeEach(() => {
    s3ClientMock.reset()
  })
  const bucketName = 'library-sytem'
  const key = 'books/2'

  describe('Test S3 Functions', () => {
    beforeEach(() => {
      s3ClientMock.on(PutObjectCommand).resolves({})
    })
  
    
    it('Must be register an object in AWS S3', async () => {
      await S3.create(bucketName, key, 'TESTE TESTE TESTE')
      expect(s3ClientMock.call(0).args[0].input).toEqual({
        Bucket: bucketName,
        Key: key,
        Body: 'TESTE TESTE TESTE'
      })
    })
    it('should get image to s3', async () => {
      await S3.getFileForTest('library-sytem', 'books/2')
      expect(s3ClientMock.call(0).args[0].input).toEqual({
        Bucket: bucketName,
        Key: key,
      })
    })
  })
})
