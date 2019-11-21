<template>
  <div class="addAddress-body">
    <ul class="cell-body">
      <li>
        <div class="cell-hd">收货人</div>
        <div class="cell-bd">
          <input type="text" placeholder="名字"/>
        </div>
      </li>
      <li>
        <div class="cell-hd">手机号码</div>
        <div class="cell-bd">
          <input type="text" placeholder="11位手机号码"/>
        </div>
      </li>
      <li>
        <div class="cell-hd">选择地区</div>
        <div class="cell-bd">
          <input type="text" placeholder="地区信息"/>
        </div>
      </li>
      <li>
        <div class="cell-hd">详细地址</div>
        <div class="cell-bd">
          <textarea name="" id="" rows="2" placeholder="街道门牌信息"></textarea>
        </div>
      </li>
    </ul>
    <div class="set-default">
      <span>设为默认</span>
      <div class="set-btn">
        <mt-switch v-model="setDefault"></mt-switch>
      </div>
    </div>
    <mt-button type="primary" size="large">保存</mt-button>
  </div>
</template>

<script>
import { Switch, Button } from 'mint-ui';
export default {
  name: 'addAddress',
  data() {
    return {
      username: '',
      telephone: '',
      address: '',
      detailAddress: '',
      setDefault: false
    };
  },
  components: {
    'mt-switch': Switch,
    'mt-button': Button
  }
};
</script>

<style lang="less" scoped>
  @import '../../styles/mixin.less';
  .addAddress-body {
    background: #fbf9fe;
    min-height: 100%;
  }
  .cell-body {
    padding: 0 12px;
    background: #fff;
    border-bottom: solid 1px @colore5;
    margin-bottom: 20px;
    li {
      display: flex;
      padding: 10px 0;
      border-bottom: solid 1px @colore5;
      font-size: 17px;
      &:last-child {
        border-bottom: none;
      }
      .cell-hd {
        width: 100px;
      }
      .cell-bd {
        flex: 1;
        input {
          width: 100%;
          font-size: 16px;
          border: none;
          background: none;
        }
        textarea {
          width: 100%;
          font-size: 16px;
          border: none;
          background: none;
        }
      }
    }
  }
  .set-default {
    display: flex;
    font-size: 17px;
    padding: 5px 12px;
    background: #fff;
    border-top: solid 1px @colore5;
    border-bottom: solid 1px @colore5;
    margin-bottom: 50px;
    span {
      width: 100%;
      line-height: 30px;
    }
    .set-btn {
      flex: 1;
    }
  }
</style>
