import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  console.log(req.file.path);

  const thumbnailPath = `${req.file.path}_thumb.png`;

  try {
    await sharp(req.file.path)
      .resize(160, 160)
      .png()
      .toFile(thumbnailPath);
    console.log(`Thumbnail created at ${thumbnailPath}`);
  } catch (error) {
    console.error('Error creating thumbnail:', error);
  }

  next();
};

export { createThumbnail };
