import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 解决乱码
    file.originalname = Buffer.from(file.originalname, 'latin1').toString(
      'utf-8',
    );
    try {
      fs.mkdirSync(path.join(process.cwd(), 'my-uploads'));
    } catch (e) {}

    cb(null, path.join(process.cwd(), 'my-uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export { storage };
