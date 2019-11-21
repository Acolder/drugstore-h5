<template>
<div class="equipmentEnterprise">
  <mt-header title="企业合作">
    <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
  </mt-header>
  <div class="equipmentEnterpriseMain">
    <div class="form-item">
      <img src="./imgs/icon_dhyx.png" alt="">
      <input type="text" v-model.trim="addData.MobileEmail" placeholder="请输入您的电话或邮箱">
    </div>
    <div class="form-item">
      <img src="./imgs/icon_xm.png" alt="">
      <input type="text" v-model.trim="addData.UserName" placeholder="请输入您的姓名">
    </div>
    <div class="form-txt">
      <img src="./imgs/icon_ly.png" alt="">
      <textarea class="enterpriseTxt" ref='txt' v-model.trim="addData.Content" placeholder="留言"></textarea>
    </div>
  </div>
  <div class="til">我们会尽快与您联系</div>
  <div class="submission" :class="bgColor?'': 'huisi'" @click="submission">提交</div>
</div>
</template>

<script>
import { Toast } from 'mint-ui';
import ajax from '@/utils/ajax';
export default {
  data() {
    return {
      bgColor: true,
      addData: {
        MobileEmail: '',
        UserName: '',
        Content: '',
      }
    };
  },
  methods: {
    submission() {
      if (this.bgColor === false) {
        return false;
      }
      // 名字正则
      let nameReg = /[^a-zA-Z0-9_\u4e00-\u9fa5]/g;
      // 汉字正则
      let hanziReg = /[\u4E00-\u9FA5]/;
      // 电话或邮箱验证
      if (!this.addData.MobileEmail) {
        Toast({
          message: '请输入电话或邮箱验证！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (hanziReg.test(this.addData.MobileEmail)) {
        Toast({
          message: '电话或邮箱验证不能为汉字！',
          position: 'middle',
          duration: 1500
        });
        return false;
      }
      // 姓名验证
      if (!this.addData.UserName) {
        Toast({
          message: '请输入名字！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (this.addData.UserName.length > 200) {
        Toast({
          message: '姓名不能超过200个字！',
          position: 'middle',
          duration: 1500
        });
        return false;
      } else if (nameReg.test(this.addData.UserName)) {
        Toast({
          message: '姓名不支持特殊符号！',
          position: 'middle',
          duration: 1500
        });
        return false;
      }
      // 留言验证
      if (!this.addData.Content) {
        Toast({
          message: '请输入留言！',
          position: 'middle',
          duration: 1500
        });
        return false;
      }
      console.log('验证通过', this.addData);
      this.bgColor = false;
      ajax.post(`/api/borrow/SumbitCompanyCooperation`, this.addData).then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.code === 0) {
          this.bgColor = true;
          this.$router.push('/equipment/equipmentEnterpriseSuccess');
        } else {
          Toast({
            message: res.data.message,
            position: 'middle',
            duration: 1500
          });
          this.bgColor = true;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.equipmentEnterprise{
  padding-top: 0.1px;
  height: 100%;
  background: #eeeef3;
  .equipmentEnterpriseMain{
    background: #fff;
    padding: 0 10px;
    margin-top: 44px;
    padding-top: 0.1px;
    padding-bottom: 25px;
  }
  .form-item{
    margin-top: 10px;
    height: 45px;
    border: 1px solid #e0e0e0;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
      width: 24px;
      height: 100%;
      margin-right: 10px;
    }
    input{
      flex: 1;
      border: none;
    }
  }
  .form-txt{
    height: 160px;
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #e0e0e0;
    position: relative;
    img{
      top: 10px;
      left: 10px;
      position: absolute;
      width: 24px;
      height: 24px;
    }
    .enterpriseTxt{
      // text-indent:40px;
      padding-top: 10px;
      padding-left: 30px;
      width: 100%;
      height: 100%;
      border: none;
    }
  }
  .til{
    margin-top: 22px;
    height: 34px;
    font-size: 14px;
    line-height: 34px;
    color: #999999;
    text-align: center;
  }
  .submission{
    margin: 0 10px;
    border-radius: 3px;
    height: 40px;
    background:#0ccdd3;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  .equipment-btn.huisi{
    background: #ccc;
  }
}
</style>