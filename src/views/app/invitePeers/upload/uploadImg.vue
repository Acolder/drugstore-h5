<template>
<div class="upload-wrapper">
  <div class="uploader">
    <div class="uploader-bd">
      <ul class="uploader-files">
        <!-- 预览图插入到这 -->
        <li v-for="(img, index) in imgList" :key="img" @click="showLargeImg(img, index)"><img :src="img" /></li>
      </ul>
      <div class="uploader-input-wrp">
        <input id="uploaderInput" class="uploader-input" type="file" accept="image/jpg,image/jpeg,image/png,image/gif" multiple="multiple" @change="uploadImg">
      </div>
    </div>
  </div>
  <!-- 显示大图页面 -->
  <div class="preview" v-show="previewShow">
    <div class="preview-mask" @click="hideLargeImg"></div>
    <img class="preview-img" :src="previewImg" alt="" />
    <i class="iconfont back" @click="hideLargeImg"><img src="./../img/back.png" /></i>
    <i class="iconfont delete" @click="deleteImg(previewImg, deleteIndex)"><img src="./../img/delete.png" /></i>
  </div>
</div>
</template>

<script>
import ajax from 'axios';
import { Toast, MessageBox } from 'mint-ui';
export default {
  name: 'upload',
  data() {
    return {
      previewShow: false, // 是否展示大图
      previewImg: '', // 大图路劲
      deleteIndex: '', // 删除文件下标
      // 上传图片
      imgUrlList: '', // 传给父组件的路劲
      images: [], // 保存已上传图片base64路劲
      // imgList: [], // 上传图片(执业医师证)
      allowTypes: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'], // 允许上传的图片类型
      maxSize: 10 * 1024 * 1024, // 10MB
      maxWidth: 300, // 图片最大宽度
      maxCount: 3 // 最大上传图片数量
    };
  },
  computed: {
    // 上传图片(执业医师证)
    imgList: {
      get: function() {
        let urls = this.imgUrlList;
        if (urls) {
          let list = this.imgUrlList.split(',');
          return list;
        } else {
          return [];
        }
      }
    }
  },
  methods: {
    // 显示大图
    showLargeImg(src, index) {
      let _this = this;
      _this.previewImg = src;
      _this.deleteIndex = index;
      _this.previewShow = true;
    },
    // 关闭大图
    hideLargeImg() {
      let _this = this;
      _this.previewImg = '';
      _this.previewShow = false;
    },
    // 添加 imgUrl的图片url
    appendImgUrl(url) {
      let array = this.imgList;
      array.push(url);
      let value = array.join(',');
      this.imgUrlList = value;
    },
    // 删除图片
    deleteImg(url, index) {
      let _this = this;
      MessageBox.confirm('确认删除吗？').then(() => {
        _this.images.splice(index, 1);
        _this.removeImgUrl(url);
        _this.previewImg = '';
        _this.previewShow = false;
        _this.$emit('removeImg', _this.imgUrlList);
      }).catch(() => {
        console.log('取消');
      });
    },
    // 删除 imgUrl的图片url
    removeImgUrl(url) {
      let array = [];
      for (let i = 0; i < this.imgList.length; i++) {
        let item = this.imgList[i];
        if (item !== url) {
          array.push(item);
        }
      }
      let value = array.join(',');
      this.imgUrlList = value;
    },
    // 上传图片
    uploadImg(event) {
      let _this = this;
      let url = process.env.UPLOAD_HOST + '/Base64Upload';
      let files = event.target.files;
      // 如果没有选中文件，直接返回
      if (files.length === 0) {
        return false;
      }
      // 如果选择的文件数量超出最大限度
      if (files.length > _this.maxCount || _this.images.length + files.length > _this.maxCount) {
        Toast(`最多只能上传${_this.maxCount}张图片`);
        return false;
      }
      for (let i = 0, len = files.length; i < len; i++) {
        let file = files[i];
        let reader = new FileReader();
        // 如果类型不在允许的类型范围内
        if (_this.allowTypes.indexOf(file.type) === -1) {
          Toast('该类型不允许上传');
          continue;
        }
        if (file.size > _this.maxSize) {
          Toast('图片太大，不允许上传');
          continue;
        }
        if (_this.images.length >= _this.maxCount) {
          Toast(`最多只能上传${_this.maxCount}张图片`);
          return false;
        }
        reader.onload = function (e) {
          let img = new Image();
          img.onload = function () {
            // 不要超出最大宽度
            let w = Math.min(_this.maxWidth, img.width);
            // 高度按比例计算
            let h = img.height * (w / img.width);
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            // 设置 canvas 的宽度和高度
            canvas.width = w;
            canvas.height = h;
            ctx.drawImage(img, 0, 0, w, h);
            let base64 = canvas.toDataURL('image/png');
            if (_this.images.length > 0 && _this.images.includes(base64)) {
              Toast('不能重复上传相同文件');
              document.getElementById('uploaderInput').value = '';
              return false;
            }
            _this.images.push(base64);

            document.getElementById('uploaderInput').value = '';

            let baseUrl = base64.replace(/^data:image\/(png|jpg);base64,/, '');
            let postData = {
              fileName: 'upload.jpg',
              uploadFile: baseUrl,
            };
            ajax.request({
              url: url,
              method: 'post',
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              data: postData
            }).then((resp) => {
              if (resp.status === 200) {
                _this.appendImgUrl(resp.data.url);
                _this.$emit('uploadSuccess', _this.imgUrlList);
              }
            });
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  }
};
</script>

<style lang="less" scoped>
  .uploader-bd {
    margin-bottom: -4px;
    margin-right: -9px;
    overflow: hidden;
    .uploader-files {
      li {
        float: left;
        margin-right: 8px;
        margin-bottom: 8px;
        width: 80px;
        height: 80px;
        background: no-repeat center center;
        background-size: cover;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .uploader-input-wrp {
      float: left;
      position: relative;
      margin-right: 9px;
      margin-bottom: 9px;
      width: 77px;
      height: 77px;
      border: 1px solid #D9D9D9;
      input {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
      &:before {
        content: " ";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2px;
        height: 40px;
        transform: translate(-50%, -50%);
        background-color: #D9D9D9;
      }
      &:after {
        content: " ";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 2px;
        transform: translate(-50%, -50%);
        background-color: #D9D9D9;
      }
    }
  }
  .preview {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    .preview-mask {
      position: fixed;
      z-index: 9;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.8);
    }
    .preview-img {
      display: block;
      position: absolute;
      z-index: 10;
      top: 50%;
      left: 50%;
      max-width: 90%;
      transform: translate3d(-50%, -50%, 0);
    }
    .iconfont {
      position: absolute;
      z-index: 10;
      width: 40px;
      height: 40px;
      bottom: 30px;
      text-align: center;
      line-height: 40px;
      font-size: 30px;
      color: rgba(255, 255, 255, 0.8);
      background: rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      &.back {
        left: 10px;
        padding: 4px 5px 5px;
      }
      &.delete {
        right: 10px;
        padding: 2px 5px 5px;
        img {
          width: 25px;
        }
      }
      img {
        width: 28px;
      }
    }
  }
</style>
