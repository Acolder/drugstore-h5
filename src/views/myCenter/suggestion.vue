<template>
  <div class="has-header suggestion-body">
    <mt-header fixed title="意见反馈">
      <a href="javascript:void(0);" @click="$router.go(-1);" slot="left">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div class="suggestion-container">
      <textarea class="suggest-text" v-model="suggestText" placeholder="输入您的意见或建议，我们将为您不断改进"></textarea>
      <div class="email">
        <span>*</span>您的邮箱
        <input type="text" v-model="email" placeholder="必填，以便我们给您回复">
      </div>
      <mt-button type="primary" size="large" @click="suggestSubmit">提交</mt-button>
    </div>
  </div>
</template>

<script>

import { Button, Toast } from 'mint-ui';
import { validateEmail } from '@/utils/validate';
import ajax from '@/utils/ajax';
import { goLogin } from '@/api/user';

export default {
  name: 'suggestion',
  data() {
    return {
      suggestText: '',
      email: ''
    };
  },
  components: {
    'mt-button': Button
  },
  methods: {
    suggestSubmit() {
      let sugText = this.suggestText;
      let email = this.email;
      sugText = sugText.replace(/(^\s*)|(\s*$)/g, ''); // 去除字符串两边的空格
      email = email.replace(/(^\s*)|(\s*$)/g, ''); // 去除字符串两边的空格
      if (sugText.length === 0) {
        Toast('内容不能为空！');
        return false;
      }
      if (!validateEmail(email)) {
        Toast('请输入正确邮箱！');
        return false;
      }
      ajax.post('/api/suggest/sumbitsuggest', {
        Content: sugText,
        Email: email
      }).then(resp => {
        if (resp.status === 200 && resp.data.code === 0) {
          this.suggestText = '';
          this.email = '';
          Toast('提交成功！');
        } else if (resp.data.code === -2) {
          Toast('请先登录！');
          goLogin();
        } else {
          Toast(resp.data.message);
        }
      }).catch(() => {
        Toast('提交失败！');
      });
    }
  }
};
</script>

<style lang="less" scoped>
  @color-ef3: #eeeef3;
  .suggestion-body {
    min-height: 100%;
    background: @color-ef3;
  }
  .suggestion-container {
    padding: 0 12px;
    .suggest-text {
      padding: 15px 10px;
      margin: 15px 0;
      width: 100%;
      height: 250px;
      font-size: 16px;
      background: #fff;
      border-radius: 5px;
      border: none;
    }
    .email {
      position: relative;
      padding: 15px 10px 15px 30px;
      background: #fff;
      border-radius: 5px;
      text-align: left;
      font-size: 16px;
      margin-bottom: 70px;
      display: flex;
      span {
        position: absolute;
        left: 15px;
        top: 50%;
        margin-top: -7px;
        color: #f75858;
        font-size: 25px;
        vertical-align: middle;
        margin-right: 5px;
      }
      input {
        flex: 1;
        margin-left: 10px;
        font-size: 15px;
        border: none;
      }
    }
  }
</style>
