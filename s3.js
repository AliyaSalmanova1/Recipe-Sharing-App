require('dotenv').config()

const accessKeyId = process.env.S3_BUCKET_ACCESS_KEY
const secretAccessKey = process.env.S3_BUCKET_ACCESS_SECRET
const region = process.env.S3_BUCKET_REGION
const bucketName = process.env.S3_BUCKET_NAME

const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require("fs")
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');


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

async function getFileStream(fileKey) {
  const downloadParams = {
    Bucket: bucketName,
    Key: fileKey,
  };

  try {
    const data = await s3Client.send(new GetObjectCommand(downloadParams));
   
    return data.Body; // This is the actual readable stream.
  } catch (err) {
    console.error(`Error getting file stream: ${err.message}`);
    throw err;
  }
}
exports.getFileStream = getFileStream