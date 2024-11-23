import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploads = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: folder,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve({
              public_id: result.public_id,
              url: result.url,
            });
          }
        }
      )
      .end(file.buffer);
  });
};

export { uploads, cloudinary };
