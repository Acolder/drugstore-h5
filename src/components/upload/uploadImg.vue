<template>
  <div class="upload-wrapper">
    <div v-if="!imgUrl" class="noneData">
      <div class="uploadImg" @click="openLocals">
      </div>
      <form :id="fileName+'Form'" enctype="multipart/form-data" style="display:none;">
        <input type="file"  accept="image/*" :name="fileName" @change="fileChanged"/>
      </form>
    </div>
    <div v-else class="havaData">
     <div class="havaDataimg">
        <img :src="imgUrl" alt="" @click.stop="bigPicture">
        <div class="remove" @click.stop="removePackage" v-show="!isCheck"></div>
     </div>
    </div>
    <div class="maxImg" @click="minImg" v-if="maxImg">
      <img :src="imgUrl" alt="">
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import { Indicator, Toast } from 'mint-ui';
// import axios from 'axios';
// import { intoInquiry } from '@/api/user';
import { webPostObject } from './ossUpload/index.js';
export default {
  data() {
    return {
      maxImg: false,
    };
  },
  props: {
    // file控件名称
    fileName: {
      type: String,
      required: true
    },
    // 图片地址
    imgUrl: {
      type: String,
      default: '',
      required: true
    },
    // 图片地址
    isMaxIMg: {
      type: String,
      default: '',
      required: true
    },
    // 是否只能查看图片
    isCheck: {
      type: [Boolean, String],
      default: false
    }
  },
  methods: {
    // // 在线问诊
    // interrogation() {
    //   intoInquiry();
    // },
    // 处方示例
    examples() {
      this.$router.push('/patSquare/examples');
    },
    // 问客服
    customerService() {
      console.log('问客服');
    },
    // 查看大图
    bigPicture() {
      console.log(this.isMaxIMg);
      if (this.isMaxIMg === '0') {
        return false;
      }
      this.maxImg = true;
    },
    // 恢复小图
    minImg() {
      this.maxImg = false;
    },
    // 删除图片
    removePackage() {
      let _self = this;
      _self.$emit('removeImg');
    },
    // 上传图片
    openLocals() {
      $(`input[type='file'][name='${this.fileName}']`).click();
    },
    fileChanged() {
      this.uploadImg();
    },
    uploadImg() {
      let _self = this;
      let fileElement = $(`input[type='file'][name='${_self.fileName}']`);
      let filename = fileElement.val();
      let ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
      if (ext !== '.jpg' && ext !== '.png' && ext !== '.jpeg' && ext !== '.bmp') {
        Toast({
          message: '仅支持.jpg、.png、.jpeg、.bmp的图片格式',
          position: 'bottom',
          duration: 2000
        });
        return false;
      }
      let file = fileElement[0].files[0];
      let imgSize = Math.ceil(file.size / 1024 / 1024);
      if (imgSize > 20) {
        Toast({
          message: '文件不能大于20MB,重新选择文件',
          position: 'bottom',
          duration: 2000
        });
        _self.$refs.pathClear.value = '';
        return false;
      }
      Indicator.open('图片正在上传中...');
      // 服务器上传
      // let formdata1 = new FormData();
      // formdata1.append('file', file, file.name);
      // let config = {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // };
      // axios.post(`${process.env.UPLOAD_HOST}`, formdata1, config).then((res) => {
      //   console.log(res);
      //   let data = res.data;
      //   Indicator.close();
      //   if (data) {
      //     _self.$emit('uploadSuccess', data[0]);
      //   }
      // }).catch(() => {
      //   Indicator.close();
      //   Toast({
      //     message: '图片上传失败',
      //     position: 'bottom',
      //     duration: 2000
      //   });
      // });
      // oss web直传
      webPostObject(file, file.name).then(data => {
        console.log(data);
        Indicator.close();
        _self.$emit('uploadSuccess', data);
      }).catch(() => {
        Indicator.close();
        Toast({
          message: '图片上传失败',
          position: 'bottom',
          duration: 2000
        });
      });
    },
  },
};
</script>
<style lang="less" scoped>
.upload-wrapper{
  position: relative;
  height: 172px;
}
.noneData,.havaData{
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .uploadImg{
    width: 102px;
    height: 102px;
    background-size: 100% 100%;
    background-image: url(./imgs/xh_pfgy_upload.png);
  }
  .havaDataimg{
    position: relative;
    width: 102px;
    height: 102px;
    img{
      width: 102px;
      height: 102px;
    }
    .remove{
      position: absolute;
      top: 0;
      right: 0;
      width: 18px;
      height: 18px;
      background: url('./imgs/icon_close.png') rgba(255, 255, 255, 0.8) center center no-repeat;
      background-size: cover;
      border-radius: 50%;
    }
  }
}
// 大图效果
.maxImg{
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: auto;
  background-color:rgba(0, 0, 0, 0.5);
  z-index: 100;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
