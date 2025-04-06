import sharp from 'sharp';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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

const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);
  if (token == null) {
    return res.sendStatus(401);
  }
  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).send({message: 'invalid token'});
  }
};

export { createThumbnail, authenticateToken };
