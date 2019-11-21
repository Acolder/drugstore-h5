import axios from 'axios';

/**
 * 获取文件类型
 * @param {*} file
 */
let getFileTypeByContentType = function (file) {
  let type = file.type.substr(0, 5);

  // 图片
  if (type === 'image') {
    return 'Image';
  }
  // 音频
  else if (type === 'audio') {
    return 'Audio';
  }
  // 音频
  else if (type === 'video') {
    return 'Video';
  }
  // 文件
  else {
    return 'File';
  }

};

function uploadFile(file) {
  if (!window.File || !window.FileList || !window.FileReader) {
    alert('您的浏览器不支持File Api');
    return;
  }
  let filename = file.name;
  let ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
  if (ext !== '.jpg' && ext !== '.png' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.bmp') {
    alert('仅支持.jpg、.png、.gif、.jpeg、.bmp的图片格式');
    return;
  }
  let fileSize = file.size;
  let fileType = getFileTypeByContentType(file);
  console.debug('upload file', file);
  console.info('fileSize: ' + fileSize);
  console.info('fileType: ' + fileType);

  let form_data = new FormData();
  form_data.append('file', file, file.name);
  return axios.post(`${process.env.UPLOAD_HOST}`, form_data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((res) => {
    let data = res.data;
    if (data && data.length > 0) {
      return data[0];
    }
  });
}

export default{
  uploadFile
};
