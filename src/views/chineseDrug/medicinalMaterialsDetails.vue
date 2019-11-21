<template>
  <div class="medicinalMaterialsDetails">
    <mt-header fixed :title="drugName">
      <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
    </mt-header>
    <div class="detailsTab">
      <div @click="classificationAction('概述')"  :class="listType==='概述'?'selected':''">
        <div>概述</div>
      </div>
      <div @click="classificationAction('常用方')" :class="listType==='常用方'?'selected':''">
        <div>常用方</div>
      </div>
      <div @click="classificationAction('饮片')" :class="listType==='饮片'?'selected':''">
        <div>饮片</div>
      </div>
      <div @click="classificationAction('加工')" :class="listType==='加工'?'selected':''">
        <div>加工</div>
      </div>
    </div>
    <div class="detailsMain">
      <div v-show="listType==='概述'">
        <img :src="details.icon" alt="" class="detailsImg">
        <div ref="summary" class="summary"></div>
      </div>
      <div v-show="listType==='常用方'" class="commonParty" ref="commonParty">
      </div>
      <div v-show="listType==='饮片'" class="decoctionPieces" ref="decoctionPieces">
      </div>
      <div v-show="listType==='加工'" class="machining" ref="machining">
      </div>
    </div>
  </div>
</template>

<script>
import javaAjax from '@/utils/javaApiRequest';
export default {
  data() {
    return {
      id: this.$route.query.id,
      drugName: '白术',
      listType: '概述',
      details: {}
    };
  },
  methods: {
    // tab切换
    classificationAction(res) {
      this.listType = res;
      // this.getData();
    },
  },
  mounted() {
    // 获取详情数据
    javaAjax.post(`/mall/back/medicinal/queryDetailById`, { mId: this.id })
      .then((res) => {
        if (res.status === 200 && res.data.resultCode === '0') {
          let resData = res.data.resultData;
          this.drugName = resData.name;
          this.details = resData;
          console.log(resData);
          this.$refs.summary.innerHTML = resData.content ? resData.content : '抱歉，暂时没有概述的数据';
          this.$refs.commonParty.innerHTML = resData.commonParty ? resData.commonParty : '抱歉，暂时没有常用方的数据';
          this.$refs.decoctionPieces.innerHTML = resData.decoctionPieces ? resData.decoctionPieces : '抱歉，暂时没有饮片的数据';
          this.$refs.machining.innerHTML = resData.machining ? resData.machining : '抱歉，暂时没有加工的数据';
        }
      })
      .catch((msg) => {
        console.log('msg');
      });
  }
};

</script>

<style lang="less">
.medicinalMaterialsDetails{
  background: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  overflow-x: hidden;
  padding-top: 44px;
  z-index: 5;
  color: #333333;
  .detailsTab{
    display: flex;
    height: 46px;
    border-bottom: 1px solid #e0e0e0;
    >div{
      width: 25%;
      height: 100%;
      padding: 6px 0;
      >div{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #e0e0e0;
      }
    }
    >div.selected{
      color: #0fcbd6;
      border-bottom: 2px solid #0ccdd3;
    }
    >div:nth-child(1){
        div{
          border: none;
        }
      }
  }
  .detailsImg{
    width: 100%;
    height: 350px;
  }
  .summary,.commonParty,.decoctionPieces,.machining{
    padding: 20px 10px;
  }
}
</style>