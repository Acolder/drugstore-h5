<template>
  <div class="classics-details" :class="{'headLess': from == 'app'}">
    <div v-if="from != 'app'">
      <mt-header fixed :title="drugName">
        <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
      </mt-header>
    </div>
    <div class="classics-details-mian" ref="detailsContent">
    </div>
    <div class="classics-details-mian classics-details-fj" v-show="attffunction !== ''">
      <section>
        <h4>主治功能</h4>
        <p>{{attffunction}}</p>
      </section>
    </div>
  </div>
</template>

<script>
import ajax from '@/utils/ajax';
import { getQueryString } from '@/utils/index';
export default {
  data() {
    return {
      id: this.$route.query.id,
      drugName: '',
      attffunction: ''
    };
  },
  computed: {
    from() {
      return getQueryString('from');
    }
  },
  mounted() {
    // 通过商品id获取商品的详情数据
    ajax.get('/api/medicine/getmedicine', {
      params: {
        'id': this.id
      }
    }).then(data => {
      if (data.status === 200 && data.data.code === 0) {
        let resData = data.data.data;
        this.drugName = resData.name;
        this.$refs.detailsContent.innerHTML = resData.summary;
        if (resData.type_name === '方剂') {
          this.attffunction = resData.maintreat;
        }
      }
    });
  }
};

</script>

<style lang="less">
@white-color: #fff;
.classics-details{
  background: @white-color;
  padding-top: 44px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
  /deep/.mint-header-title {
    overflow: initial;
    text-overflow: initial;
    font-weight: inherit;
  }
  .classics-details-mian{
    >section{
      background: @white-color;
      border-bottom: 1px solid #e1e1e1;
      background: @white-color;
      padding: 16px 10px;
      font-size: 12px;
      margin: 0px;
      h4{
        font-size: 16px;
        color: #0ccdd3;
        margin-bottom: 10px;
      }
      p,dd{
        padding-left: 20px;
        line-height: 20px;
        font-family: PingFang-SC-Regular;
        font-size: 14px;
        letter-spacing: 0px;
        color: #333;
      }
    }
    > section:last-child{
      border: none;
    }
  }
  .classics-details-fj {
    >section {
      border-top: 1px solid #e1e1e1 !important;
    }
  }
}
.classics-details.headLess{
  padding-top: 0px;
}
</style>

