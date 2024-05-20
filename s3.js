require('dotenv').config()

const accessKeyId = process.env.S3_BUCKET_ACCESS_KEY
const secretAccessKey = process.env.S3_BUCKET_ACCESS_SECRET
const region = process.env.S3_BUCKET_REGION
const bucketName = process.env.S3_BUCKET_NAME

const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require("fs")


// client is created once in the global scope.
const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  }
})



async function uploadFile(file){
  try {
    let fileStream = fs.createReadStream(file.path)

      await s3Client.send(new PutObjectCommand({
          Bucket: bucketName,
          Key: file.filename,
          Body: fileStream,
      }))
      console.log("file upload successful")
  } catch (error) {
      console.log("there was an error:", error)
  }
}

exports.uploadFile = uploadFile

// function getFileStream(fileKey) {
//   const downloadParams = {
//       Bucket: bucketName,
//       Key: fileKey,
//   }

//   let fileStream = s3.getObject(downloadParams).createReadStream()
//   return fileStream
// }

async function getFileStream(fileKey){
  try {
      const url = await getSignedUrl(s3Client, new GetObjectCommand({
            Bucket: bucketName,
            Key: fileKey,
      }))
      return url
  } catch (error) {
      console.log("there was an error:", error)
  }
}
exports.getFileStream = getFileStream