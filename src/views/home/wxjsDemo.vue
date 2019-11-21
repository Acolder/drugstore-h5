<template>
  <div>
    <a href="javascript:void(0);" @click="uploadImg">上传图片1</a>
    <img v-for="(item,index) in imgUrls" :key="index" :src="item" alt="img"/>
    <a href="javascript:void(0);" @click="uploadImg2">上传图片2</a>
  </div>
</template>
<style lang="less" scoped>
img {
  width: 100px;
  height: 150px;
}
</style>

<script>
import wxjs from '@/utils/wxjsInterface';
import ajax from '@/utils/ajax';
import { getQueryString } from '@/utils/index';
export default {
  data() {
    return {
      // 微信js sdk 实例对象
      wx: null,
      // 请求返回的微信config对象
      wxResponseConfig: {},
      imgUrls: []
    };
  },
  created() {
    let _self = this;
    let code = getQueryString('code');
    wxjs.init(code).then((res) => {
      console.log('init');
      _self.wx = res.wx;
      _self.wxResponseConfig = res.wxconfig;
    });
  },
  methods: {
    iswx: function () {
      let ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('micromessenger') > 0) { // 微信
        return true;
      }
      else {
        return false;
      }
    },
    uploadImg() {
      let _self = this;
      if (_self.iswx()) { // 微信
        _self.wx.ready(function () {
          _self.wx.chooseImage({
            // sizeType: ['compressed'],
            success: function (res) {
              let localIds = res.localIds;
              _self.syncUpload(localIds);
            }
          });
        });
      }
    },
    // 上传图片，采用递归方式解决ios端多图上传不了的问题
    syncUpload(localIds) {
      const _self = this;
      let imglink = localIds.pop();
      _self.wx.uploadImage({
        localId: imglink, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 0, // 默认为1，显示进度提示
        success: function (r) {
          let serverId = r.serverId; // 返回图片的服务器端ID
          let token = _self.wxResponseConfig.access_token;
          ajax.get(`/api/system/UploadWebFile`, {
            params: {
              access_token: token,
              media_id: serverId
            }
          }).then((res) => {
            if (res.status === 200 && res.data.code === 0) {
              let model = JSON.parse(res.data.data);
              _self.imgUrls.push(model.url);
            }
          });
          if (localIds.length > 0) {
            _self.syncUpload(localIds);
          }
        }
      });
    },
    uploadImg2() {
      let _self = this;
      if (_self.iswx()) { // 微信
        _self.wx.ready(function () {
          _self.wx.chooseImage({
            success: function (res) {
              let localIds = res.localIds;
              _self.syncUpload2(localIds);
            }
          });
        });
      }
    },
    // 上传图片 生成缩略图 生成base64
    syncUpload2(localIds) {
      const _self = this;
      let imglink = localIds.pop();
      _self.wx.uploadImage({
        localId: imglink, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 0, // 默认为1，显示进度提示
        success: function (r) {
          let serverId = r.serverId; // 返回图片的服务器端ID
          let token = _self.wxResponseConfig.access_token;
          ajax.get(`/api/system/UploadWebFile`, {
            params: {
              access_token: token,
              media_id: serverId
            }
          }).then((res) => {
            if (res.status === 200 && res.data.code === 0) {
              let model = JSON.parse(res.data.data);
              // model.url 为图片路径
              // TODO 发送图片到对话框 chatInterface.sendMsg(model.url, true, photourl, 2, true);
              // 生成缩略图
              let purl = `/api/system/uploadthumbnail?name=${model.attachment}&path=${model.physicalPath}`;
              ajax.post(purl).then((res) => {
                if (res.status === 200) {
                  let data = res.data.data;
                  if (!!data === false) {
                    return;
                  }
                  let thumbnail_data = JSON.parse(data);
                  // get base64
                  ajax.get(`/api/system/getBase64ByImgUrl`, {
                    params: {
                      url: thumbnail_data.url
                    }
                  }).then((res) => {
                    if (res.status === 200) {
                      let data = res.data;
                      if (data.code === 0) {
                        // thumbnail_data.url 压缩后的图片
                        // data.data  大图base64
                        // TODO 发送图片给对方 rongIM.sendImg(thumbnail_data.url, data.data);
                      }
                    }
                  });
                }
              });
            }
          });
          if (localIds.length > 0) {
            _self.syncUpload(localIds);
          }
        }
      });
    }
  }
};
</script>
