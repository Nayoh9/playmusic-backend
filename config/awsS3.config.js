const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");
const dotenv = require('dotenv').config()

const s3Client = new S3Client({
    region: "eu-west-3",
    credentials: {
        accessKeyId: process.env.S3_PUBLIC_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY
    },
})

// List the buckets

// async function listBuckets() {
//     try {
//         const data = await s3Client.send(new ListBucketsCommand({}));
//         console.log("Buckets:", data.Buckets);
//     } catch (error) {
//         console.error("Erreur lors de la liste des buckets:", error);
//     }
// }

module.exports = s3Client;