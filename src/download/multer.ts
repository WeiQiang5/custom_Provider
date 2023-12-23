import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
const image = ['gif', 'png', 'jpg', 'jpeg', 'bmp', 'webp'];
const video = ['mp4', 'webm'];
const audio = ['mp3', 'wav', 'ogg'];
const work = ['txt', 'rtf', 'pdf', 'xls', 'xlsx', 'doc', 'docx', 'ppt', 'pptx'];

// 检测文件夹是否存在
const checkDirAndCreate = (filePath: string) => {
  const pathArr = filePath.split('/');
  let checkPath = '.';
  let item: string;
  for (item of pathArr) {
    checkPath += `/${item}`;
    if (!fs.existsSync(checkPath)) {
      fs.mkdirSync(checkPath);
    }
  }
};

// 配置文件上传
const multerOption: MulterOptions = {
  // 配置文件的存储
  storage: diskStorage({
    // 存储地址，配置文件上传后的文件夹路径
    destination: (req, file, cb) => {
      console.log('req: ' + req);
      console.log('file: ' + JSON.stringify(file));

      // 根据上传的文件类型将图片视频音频和其他类型文件分别存储到对应文件夹
      const minmeType = file.mimetype.split('/')[1]; //文件类型
      let temp = 'other';
      if (image.includes(minmeType)) {
        temp = 'image';
      } else if (video.includes(minmeType)) {
        temp = 'video';
      } else if (audio.includes(minmeType)) {
        temp = 'audio';
      } else if (work.includes(minmeType)) {
        temp = 'work';
      }
      const filePath = `./public/upload/${temp}/`;
      checkDirAndCreate(filePath);
      console.log('mimetype: ' + minmeType);
      return cb(null, `./${filePath}`);
    },
    // 存储名称
    filename: (req, file, callback) => {
      //   const suffix = path.extname(file.originalname); //获取文件后缀
      const docName = Date.now(); //自定义文件名
      return callback(
        null,
        `${docName}_${Math.round(Math.random() * 1e9)}_${file.originalname}`,
      );
    },
  }),
  // 过滤存储的文件
  fileFilter: (_req, file, callback) => {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString(
      'utf-8',
    );
    callback(null, true);
  },
  //   限制文件大小
  limits: {
    // 限制文件大小为10mb
    fileSize: 10 * 1024 * 1024,
    // 限制文件名长度为50bytes
    fieldNameSize: 50,
  },
};

export { multerOption };
