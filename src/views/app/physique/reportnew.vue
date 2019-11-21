<template>
  <div class="reportnew-box">
    <div id="page">
      <!--下载页面-->
      <share-header></share-header>
      <ul class="nav-jiedu top" :class="{across:across}">
        <li class="jljd" :class="{active:nav==='jlzs'}" @click.self="tabnav('jlzs')">经络解读</li>
        <li class="tzjd" :class="{active:nav==='tzjd'}" @click.self="tabnav('tzjd')">体质解读</li>
        <li class="jktl" :class="{active:nav==='jktl'}" @click.self="tabnav('jktl')">健康调理</li>
      </ul>
      <div class="container" id="body">
        <advice-header></advice-header>
        <section>
          <h3 class="testTime">测量时间: {{testData}}</h3>
        </section>
        <!--概述-->
        <section class="box1">
          <!--<h1>经检测您的体质倾向于:</h1>-->
          <!--<h2>{{result.constitution_differentiation_explains[0].label}}</h2>-->
          <img src="./img/pic_zfbzqx@3x.png" alt="" v-if="!viOk">
          <!--<br>-->
          <!--<h1>脏腑辩证倾向于:</h1>-->
          <div class="type-box">
            <div class="type" v-for="(itemOut,index) in viscera" v-bind:key="index" v-if="!viOk">
              <li class="item" v-for="(item, n) in itemOut" v-bind:key="n">
                <img :src='"./img/18/"+item.key+"@2x.png"' alt="图片" class="body-ok" @click.prevent="">
                <!--<span class="image" :style="{backgroundImage:'url('+'./img/18/'+item.key+'@2x.png'+')'}"></span>-->
                <span v-show="!viOk" @click="jumpZFBZ">{{item.label}}</span>
              </li>
            </div>
            <div v-if="viOk" class="myviOK">
              <img src='./img/pla_iconfont_zfliang@3x.png' alt="" class="body-ok">
              <!-- <span class="oktext">恭喜您脏腑功能良好</span>-->
            </div>
          </div>
        </section>
        <!--导航页-->
        <ul class="nav-jiedu" :class="{across:across}">
          <li class="jljd" :class="{active:nav==='jlzs'}" @click.self="tabnav('jlzs')">经络解读</li>
          <li class="tzjd" :class="{active:nav==='tzjd'}" @click.self="tabnav('tzjd')">体质解读</li>
          <li class="jktl" :class="{active:nav==='jktl'}" @click.self="tabnav('jktl')">健康调理</li>
        </ul>
        <!--经络指数-->
        <section class="box2" id="jlzs">
          <h1>经络检测指数</h1>
          <div class="tip">数值越接近0越健康</div>
          <ul class="graph" v-if="!jlOK">
            <div class="top">
              <span class="jifa">激发</span>
              <span class="numJia">+100%</span>
            </div>
            <div class="bottom">
              <span class="numJian">-100%</span>
              <span>亏虚</span>
            </div>
            <li class="biaochi">
              <span class="line"></span>
              <span class="num">0</span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="line"></span>
              <span class="name san">
            心包经
             <span class="value" :class="{bellow:result.measurement_result.c0<0}"
                   :style="{
                  height:result.measurement_result.c0>0?(result.measurement_result.c0+'px'):(result.measurement_result.c0*-1+'px'),
                  top:result.measurement_result.c0>0?(-result.measurement_result.c0+'px'):'20px'
              }"></span>
            <span class="valueNum"
                  :style="{
                top:result.measurement_result.c0>0?(-result.measurement_result.c0-20+'px'):
                  -result.measurement_result.c0+20+'px'
                }">
              {{result.measurement_result.c0 | myfilter2}}</span>
          </span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="line"></span>
              <span class="name">
            肝经
            <span class="value" :class="{bellow:result.measurement_result.c1<0}"
                  :style="{
                  height:result.measurement_result.c1>0?(result.measurement_result.c1*1+'px'):(result.measurement_result.c1*-1+'px'),
                  top:result.measurement_result.c1>0?(-result.measurement_result.c1*1+'px'):'20px'
              }"></span>
            <span class="valueNum"
                  :style="{
                top:result.measurement_result.c1>0?(-result.measurement_result.c1*1-20+'px'):
                  -result.measurement_result.c1*1+20+'px'
                }">{{result.measurement_result.c1 | myfilter2}}</span>
          </span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="line"></span>
              <span class="name">
            肾经
             <span class="value" :class="{bellow:result.measurement_result.c2<0}"
                   :style="{
                  height:result.measurement_result.c2>0?(result.measurement_result.c2+'px'):(result.measurement_result.c2*-1+'px'),
                  top:result.measurement_result.c2>0?(-result.measurement_result.c2+'px'):'20px'
              }"></span>
            <span class="valueNum"
                  :style="{
                top:result.measurement_result.c2>0?(-result.measurement_result.c2-20+'px'):
                  -result.measurement_result.c2+20+'px'
                }">{{result.measurement_result.c2 | myfilter2}}</span>
          </span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="line"></span>
              <span class="name">
            脾经
             <span class="value" :class="{bellow:result.measurement_result.c3<0}"
                   :style="{
                  height:result.measurement_result.c3>0?(result.measurement_result.c3*1+'px'):(result.measurement_result.c3*-1+'px'),
                  top:result.measurement_result.c3>0?(-result.measurement_result.c3*1+'px'):'20px'
              }"></span>
            <span class="valueNum"
                  :style="{
                top:result.measurement_result.c3>0?(-result.measurement_result.c3*1-20+'px'):
                  -result.measurement_result.c3*1+20+'px'
                }">{{result.measurement_result.c3 | myfilter2}}</span>
          </span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="line"></span>
              <span class="name">
            肺经
              <span class="value" :class="{bellow:result.measurement_result.c4<0}"
                    :style="{
                  height:result.measurement_result.c4>0?(result.measurement_result.c4*1+'px'):(result.measurement_result.c4*-1+'px'),
                  top:result.measurement_result.c4>0?(-result.measurement_result.c4*1+'px'):'20px'
              }"></span>
            <span class="valueNum"
                  :style="{
                top:result.measurement_result.c4>0?(-result.measurement_result.c4*1-20+'px'):
                  -result.measurement_result.c4*1+20+'px'
                }">{{result.measurement_result.c4 | myfilter2}}</span>
          </span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="line"></span>
              <span class="name">
            胃经
             <span class="value" :class="{bellow:result.measurement_result.c5<0}"
                   :style="{
                  height:result.measurement_result.c5>0?(result.measurement_result.c5*1+'px'):(result.measurement_result.c5*-1+'px'),
                  top:result.measurement_result.c5>0?(-result.measurement_result.c5*1+'px'):'20px'
              }"></span>
            <span class="valueNum"
                  :style="{
                top:result.measurement_result.c5>0?(-result.measurement_result.c5*1-20+'px'):
                  -result.measurement_result.c5*1+20+'px'
                }">{{result.measurement_result.c5 | myfilter2}}</span>
          </span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="line"></span>
              <span class="name">
            胆经
            <span class="value" :class="{bellow:result.measurement_result.c6<0}"
                  :style="{
                  height:result.measurement_result.c6>0?(result.measurement_result.c6*1+'px'):(result.measurement_result.c6*-1+'px'),
                  top:result.measurement_result.c6>0?(-result.measurement_result.c6*1+'px'):'20px'
              }"></span>
            <span class="valueNum"
                  :style="{
                top:result.measurement_result.c6>0?(-result.measurement_result.c6*1-20+'px'):
                  -result.measurement_result.c6*1+20+'px'
                }">{{result.measurement_result.c6 | myfilter2}}</span>
          </span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="line"></span>
              <span class="name san">
            膀胱经
             <span class="value" :class="{bellow:result.measurement_result.c7<0}"
                   :style="{
                  height:result.measurement_result.c7>0?(result.measurement_result.c7*1+'px'):(result.measurement_result.c7*-1+'px'),
                  top:result.measurement_result.c7>0?(-result.measurement_result.c7*1+'px'):'20px'
              }"></span>
            <span class="valueNum"
                  :style="{
                top:result.measurement_result.c7>0?(-result.measurement_result.c7*1-20+'px'):
                  -result.measurement_result.c7*1+20+'px'
                }">
             {{result.measurement_result.c7 | myfilter2}}</span>
          </span>
              <span class="line"></span>
            </li>
          </ul>
          <div class="jlOK" v-if="jlOK">
            <div class="up">
              <img src="./img/lh_iconjl_0_s.png" alt="">
              <div class="textBox">
                <h5>您的经络柔和有力
                </h5>
                <h5>强弱程度偏向平和
                </h5>
              </div>
              <img src="./img/lh_iconjl_0_x.png" alt="">
            </div>
            <ul class="bottom">
              <li class="biaochi">
                <span class="line"></span>
                <span class="num">0</span>
              </li>
              <li class="jl" style="width: 40px">心包经</li>
              <li class="jl">肝经</li>
              <li class="jl">肾经</li>
              <li class="jl">脾经</li>
              <li class="jl">肺经</li>
              <li class="jl">胃经</li>
              <li class="jl">胆经</li>
              <li class="jl" style="width: 40px">膀胱经</li>
            </ul>
          </div>
        </section>
        <!--1.3经络解读-->
        <section class="box2" id="jljd">
          <h1 @click.self="viewJLInfo">经络解读:</h1>
          <h1 class="introduce" @click.self="introduceChanal" style="color: #DD6D47;">经络介绍</h1>
          <div class="body">
            <div class="pa"
                 v-if="result.channels_and_collaterals_explain_notices&&result.channels_and_collaterals_explain_notices.length > 0">
              {{result.channels_and_collaterals_explain_notices[0].content}}
            </div>
            <div class="pa" v-if="result.channels_and_collaterals_explains"
                 v-for="(item,index) in result.channels_and_collaterals_explains" v-bind:key="index">
              <div v-if="result.channels_and_collaterals_strength.length>0" class="label">
                {{result.channels_and_collaterals_strength[index].labels[0].label | myfilter}}
                <div class="jia"
                     v-if="  result.channels_and_collaterals_strength[index].labels[0].label.search(/\+/)>-1"></div>
                <div class="jian"
                     v-if="result.channels_and_collaterals_strength[index].labels[0].label.search(/\-/)>-1"></div>
                <div class="jia"
                     v-if="  result.channels_and_collaterals_strength[index].labels[0].label.search(/\+\+/)>-1"></div>
                <div class="jian"
                     v-if="result.channels_and_collaterals_strength[index].labels[0].label.search(/\-\-/)>-1"></div>
                <div class="jia"
                     v-if="  result.channels_and_collaterals_strength[index].labels[0].label.search(/\+\+\+/)>-1"></div>
                <div class="jian"
                     v-if="result.channels_and_collaterals_strength[index].labels[0].label.search(/\-\-\-/)>-1"></div>
              </div>
              <article>
                {{item.content}}
              </article>
            </div>
            <div class="pa" v-for="item in result.channels_and_collaterals_explain_notices" v-bind:key="item.key">
              <!--<div class="label">提示</div>-->
              <!--<article>-->
              <!--{{item.content}}-->
              <!--</article>-->
              <!--<div style="font-size:13px;color:#868686;margin-top: 20px;">脉象正负20%以内大致正常，请不要过度解读</div>-->
            </div>
          </div>
        </section>
        <!--心率-->
        <section class="box2" id="heartrate">
          <h1>心率(BMP):</h1>
          <div class="content heart">
            <div class="heartNum">
              <span class="num">{{result.measurement_result.app_heart_rate}}</span>
              <span class="text">平均心率</span>
            </div>
            <!--心跳速度-->
            <div id="rate1" class="rate">0</div>
            <div id="rate2" class="rate">过缓</div>
            <div id="rate3" class="rate">50</div>
            <div id="rate4" class="rate">正常</div>
            <div id="rate5" class="rate">110</div>
            <div id="rate6" class="rate">过速</div>
            <div id="rate7" class="rate">200</div>
            <div class="rateValue-box"
                 :style="{transform:'rotate('+(result.measurement_result.app_heart_rate-100)*1.4+'deg)'}">
              <div class="rateValue"></div>
            </div>
          </div>
          <div class="heartNum2">
            <div class="item">
              <div class="num">{{result.measurement_result.app_lowest_heart_rate}}</div>
              <div class="text">最低心率</div>
            </div>
            <div class="item">
              <div class="num">{{result.measurement_result.app_highest_heart_rate}}</div>
              <div class="text">最高心率</div>
            </div>
          </div>
          <!--脉搏波-->
          <div id="maibobo">
            <h1 @click.self="viewMaiboInfo">脉搏波:</h1>
            <div class="body" id="main"></div>
          </div>
        </section>
        <!--1.4中药调理-->
        <!--<section class="box2" id="zytl" v-if="result.prescription&&result.prescription.length>0">-->
        <!--<h1>中药调理:</h1>-->
        <!--<div class="recipe" v-for="(item, index) in result.prescription" v-bind:key="index" v-if="index===0">-->
        <!--<h2>{{item.name ? item.name : ''}}</h2>-->
        <!--<div class="item" v-if="item.prescription">-->
        <!--<div class="label">材料:{{item.prescription}}</div>-->
        <!--&lt;!&ndash;<div class="content">{{item.prescription}}</div>&ndash;&gt;-->
        <!--</div>-->
        <!--<div class="item" v-if="item.effect">-->
        <!--<div class="label">功能与主治：{{item.effect}}</div>-->
        <!--&lt;!&ndash;<div class="content">{{item.effect}}</div>&ndash;&gt;-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="bottom">-->
        <!--<div class="btn-out">-->
        <!--<div class="btn-zxys" @click.self.self="download()">-->
        <!--咨询医生-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</section>-->
        <!--2.1体质-->
        <section class="box2" id="tzjd" style="padding-bottom: 22px;">
          <div class="heartrate-header">
            <img src="./img/xh_icon_man.png" alt="" v-show="gender == 0">
            <img src="./img/xh_icon_woman.png" alt="" v-show="gender == 1">
            <div class="heartrate-headerName">{{physical.label}}</div>
            <div class="heartrate-headerTime">
              <img src="./img/xh_icon_time.png" alt="">
              <span>{{test_date}}</span>
            </div>
          </div>
          <!--体质表现-->
          <div class="heartrate-box">
            <div style="background: #FFF" class="box-nameout">
              <div class="boxname-left"></div>
              <div class="boxname">体质表现</div>
              <div class="boxname-right"></div>
            </div>
            <img src="./img/xh_icon_zk.png" alt="" class="heartrate-boxUp heartrate-imgSize"
                 @click.self="anMore('pan1')"
                 v-show="pan1">
            <img src="./img/xh_icon_sq.png" alt="" class="heartrate-boxUp heartrate-imgSize"
                 @click.self="anMore('pan1')"
                 v-show="!pan1">
            <div class="heartrate-content pan" v-show="pan1"
                 style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
              <p class="heartrate-pan" v-html="physical.content">
              </p>
            </div>
            <div class="heartrate-content" v-show="!pan1">
              <p class="heartrate-pan" v-html="physical.content">
              </p>
            </div>
          </div>
          <!--调理建议-->
          <div class="heartrate-box">
            <div style="background: #FFF" class="box-nameout">
              <div class="boxname-left"></div>
              <div class="boxname">调理建议</div>
              <div class="boxname-right"></div>
            </div>
            <img src="./img/xh_icon_zk.png" alt="" class="heartrate-boxUp heartrate-imgSize"
                 @click.self="anMore('pan2')"
                 v-show="pan2">
            <img src="./img/xh_icon_sq.png" alt="" class="heartrate-boxUp heartrate-imgSize"
                 @click.self="anMore('pan2')"
                 v-show="!pan2">
            <div class="heartrate-content pan" v-show="pan2"
                 style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
              <p class="heartrate-pan" v-html="physical.content2">
              </p>
            </div>
            <div class="heartrate-content" v-show="!pan2">
              <p class="heartrate-pan" v-html="physical.content2">
              </p>
            </div>
          </div>
          <!--体质商品-->
          <ul class="heartrate-box viscera-good" v-show="!viOk" v-if="physical.product&&physical.product.length>0">
            <div style="background: #FFF" class="more-box" @click="more(physical.label)">
              <div class="more-bottom"></div>
              <div class="boxname">更多</div>
              <div class="more-right"></div>
            </div>
            <div style="background: #FFF" class="box-nameout">
              <div class="boxname-left"></div>
              <div class="boxname">养生药膳</div>
              <div class="boxname-right"></div>
            </div>
            <li v-for="goodOk in physical.product" v-bind:key="goodOk.id">
              <p v-html="goodOk.product_introduce">
              </p>
              <div class="viscera-goodImg">
                <img :src="goodOk.product_pic" alt="">
                <div>
                  <span>{{goodOk.product_name}}</span>
                  <p>{{goodOk.description}}</p>
                </div>
              </div>
            </li>
          </ul>
        </section>
        <!--脏腑解读-->
        <section class="box2" id="viscera" style="padding-bottom: 22px;">
          <div class="viscera-header">
            <h5>脏腑解读：</h5>
            <ul>
              <li v-for="item in viscera2" v-bind:key="item.index">
                <img :src='"./img/18/"+item.key+".@2x.png"' alt="" class="body-ok"
                     :style="{width:!viOk?'100px':'127px'}">
                <span v-show="!viOk">{{item.label}}</span>
              </li>
            </ul>
          </div>
          <div v-for="(item, index) in viscera2" v-bind:key="item.key" v-show="!viOk">
            <!--症状表现-->
            <div class="heartrate-box">
              <div style="background: #FFF" class="box-nameout">
                <div class="boxname-left"></div>
                <div class="boxname">{{item.label}}症状表现</div>
                <div class="boxname-right"></div>
              </div>
              <img src="./img/xh_icon_zk.png" alt="" class="heartrate-boxUp heartrate-imgSize"
                   @click.self="viMore(index)"
                   v-show="vi[index].value&&item.content">
              <img src="./img/xh_icon_sq.png" alt="" class="heartrate-boxUp heartrate-imgSize"
                   @click.self="viMore(index)"
                   v-show="vi[index].value == false&&item.content">
              <div class="heartrate-content pan" v-show="vi[index].value"
                   style="overflow : hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
                <p class="heartrate-pan" v-html="item.content">
                </p>
              </div>
              <div class="heartrate-content" v-show="!vi[index].value">
                <p class="heartrate-pan" v-html="item.content">
                </p>
              </div>
            </div>
            <!--养生药食-->
            <!--<ul class="heartrate-box viscera-good" v-show="(item.product) && !viOk">-->
            <!--&lt;!&ndash; <img src="./img/xh_icon_sq.png" alt="" class="heartrate-more heartrate-imgSize" @click.self="viMore(index)"-->
            <!--&gt;&ndash;&gt;-->
            <!--<div style="background: #FFF" class="more-box" @click="more(item.label)">-->
            <!--<div class="more-bottom"></div>-->
            <!--<div class="boxname">更多</div>-->
            <!--<div class="more-right"></div>-->
            <!--</div>-->
            <!--<div style="background: #FFF" class="box-nameout">-->
            <!--<div class="boxname-left"></div>-->
            <!--<div class="boxname">养生药膳</div>-->
            <!--<div class="boxname-right"></div>-->
            <!--</div>-->
            <!--<li v-for="good in item.product" v-bind:key="good.id" @click.self="download">-->
            <!--&lt;!&ndash;<h6>{{good.product_name}}：</h6>&ndash;&gt;-->
            <!--<p v-html="good.product_introduce">-->
            <!--</p>-->
            <!--<div class="viscera-goodImg">-->
            <!--<img :src="good.product_pic" alt="">-->
            <!--<div>-->
            <!--<span>{{good.product_name}}</span>-->
            <!--<p>{{good.description}}</p>-->
            <!--</div>-->
            <!--</div>-->
            <!--</li>-->
            <!--</ul>-->
          </div>
        </section>
        <!--4.1 健康调理-->
        <ul id="jktl" class="box2">
          <li @click="jumpTap2('zytl')" v-show="!soupStoreShow">
            <img src="./img/xh_icon_zytl@3x.png" alt="">
            <h6>中医调理</h6>
          </li>
          <li @click="jumpTap2('ysys')">
            <img src="./img/xh_icon_ysys@3x.png" alt="">
            <h6>药膳饮食</h6>
          </li>
          <li @click="jumpTap2('read')" v-show="!soupStoreShow">
            <img src="./img/xh_icon_ysyd@3x.png" alt="">
            <h6>养生阅读</h6>
          </li>
          <li @click="jumpTap2('movement')" v-show="!soupStoreShow">
            <img src="./img/xh_icon_ydbj@3x.png" alt="">
            <h6>运动保健</h6>
          </li>
        </ul>
        <!--4.2 中医调理-->
        <section class="box2 zytlBox" id="zytl" v-show="!soupStoreShow">
          <div class="zcy-title">
            <img src="./img/xhicon_zytl@3x.png" alt="">
            <div>中医调理</div>
          </div>
          <ul>
            <li>
              <div class="zcyLine-bot" v-for="(item, index) in result.recommends.product" :key="index">
                <div class="zcyLine-botLeft">
                  <h6 @click="download()">{{item.product_name}}</h6>
                  <p>{{item.product_introduce}}</p>
                  <i>{{item.tag_name}}</i>
                </div>
                <div class="zcyLine-botRight">
                  <img :src='item.product_pic' alt="">
                </div>
              </div>
            </li>
            <li>
              <!-- <div class="zcyLine-top">
                 <div class="zcyLine-topLeft"></div>
                 <div class="zcyLine-topCenter">中药方剂</div>
                 <div class="zcyLine-topRight"></div>
               </div>-->
              <div class="zcyLine-bot" v-for="(item, index) in result.recommends.prescriptions" :key="index">
                <div class="zcyLine-botLeft">
                  <div class="zyfjLine-botLeft">
                    <h6 @click="download">{{item.name}}</h6>
                    <i>{{item.tag_name}}</i>
                  </div>
                  <h5 style="color:#000">{{item.prescription}}</h5>
                  <p>{{item.effect}}</p>
                </div>
              </div>
            </li>
            <li>
              <!--<div class="zcyLine-top">
                <div class="zcyLine-topLeft"></div>
                <div class="zcyLine-topCenter">中医理疗</div>
                <div class="zcyLine-topRight"></div>
              </div>-->
              <div class="zcyLine-bot" v-for="(item, index) in result.recommends.physiotherapy" :key="index">
                <div class="zcyLine-botLeft">
                  <h6 @click="download">{{item.programme}}</h6>
                  <p class="info"><span class="orderHome" v-if="item.type === 2">预约到家</span> <span class="orderStroe"  v-if="item.type === 1">预约到店</span>{{item.programme_price}}元/{{item.programme_time}}</p>
                  <p v-html="item.title"></p>
                  <i v-if="item.tag_name">{{item.tag_name}}</i>
                </div>
                <div class="zcyLine-botRight">
                  <img :src="item.img_ico" alt="">
                </div>
              </div>
            </li>
          </ul>
        </section>
        <!--4.3 药膳饮食-->
        <section class="box2 zytlBox" id="ysys">
          <div class="zcy-title">
            <img src="./img/xhicon_ysys@3x.png" alt="">
            <div>药膳饮食</div>
          </div>
          <div class="ysjyBox">
            <!--<div class="zcyLine-top">
              <div class="zcyLine-topLeft"></div>
              <div class="zcyLine-topCenter">饮食建议</div>
              <div class="zcyLine-topRight"></div>
            </div>-->
            <div v-if="result.recommends.ingredients.length > 0">
              <div class="ysjyButton">
                <i :class="{'ysjyChoose':ingredientsActive}"
                   @click="ingredientsClick"><b>饮食宜</b></i>
                <i :class="{'ysjyChoose':!ingredientsActive}"
                   @click="ingredientsClick"><b>饮食忌</b></i>
              </div>
              <div class="ysjyP" v-if="ingredientsActive">
                {{result.recommends.ingredients[0].ingredients_introduce}}
              </div>
              <div class="ysjyP" v-if="!ingredientsActive">
                {{result.recommends.ingredients[1].ingredients_introduce}}
              </div>
            </div>
          </div>
          <ul>
            <li>
              <!--<div class="zcyLine-top">
                <div class="zcyLine-topLeft"></div>
                <div class="zcyLine-topCenter">养生药膳</div>
                <div class="zcyLine-topRight"></div>
              </div>-->
              <div class="zcyLine-bot ysys" v-for="item in result.recommends.soup" :key="item.id">
                <div class="zcyLine-botLeft">
                  <h6 @click="download">{{item.product_name}}</h6>
                  <p>{{item.product_introduce}}</p>
                  <i>{{item.tag_name}}</i>
                </div>
                <div class="zcyLine-botRight">
                  <img :src="item.product_pic" alt="">
                </div>
              </div>
              <!--康美人生-->
              <div class="zcyLine-bot" v-for="item  in result.recommends.life" :key="item.id">
                <div class="zcyLine-botLeft">
                  <h6 @click="download()">{{item.product_name}}</h6>
                  <p>{{item.product_introduce}}</p>
                  <i>{{item.tag_name}}</i>
                </div>
                <div class="zcyLine-botRight">
                  <img :src='item.product_pic' alt="">
                </div>
              </div>
            </li>
          </ul>
        </section>
        <!--4.4 养生阅读-->
        <dl class="box2 zytlBox" id="read" v-if="result.recommends.read.length&&result.recommends.read.length > 0" v-show="!soupStoreShow">
          <dt class="zcy-title">
            <img src="./img/xhicon_ysyd@3x.png" alt="">
          <div>养生阅读</div>
          </dt>
          <dd v-for="(news, index) in result.recommends.read" v-bind:key="index">
            <div>
              <h5 @click="download">{{news.title}}</h5>
              <p>{{news.description}}</p>
              <i class="readI">{{news.tag_name}}</i>
              <div class="span">
                <span>{{news.source_name}}</span>
                <img src="./img/xh_icon_eyes@3x.png" alt="" class="spanImg"
                     style="margin-left: 10px;margin-right: 1px;">
                <span>{{news.reading_quantity}}</span>
                <span style="min-width: 65px;margin-left: 10px;">{{dateDiff(news.release_time)}}</span>
              </div>
            </div>
            <!--<div class="imgIn" v-show="news.news_type == 1">-->
            <div class="imgIn">
              <img :src="news.main_image" alt="">
            </div>
          </dd>
        </dl>
        <!--4.4 运动保健-->
        <dl class="box2 zytlBox" id="movement" v-show="!soupStoreShow">
          <dt class="zcy-title">
            <img src="./img/xhicon_ydbj@3x.png" alt="">
            <div>运动保健</div>
          </dt>
          <dd v-for="(item, index) in result.recommends.motion" v-bind:key="index" @click="download()">
            <div class="movementMore">
              <h5 @click="download">{{item.title}}</h5>
              <p>{{item.description}}</p>
              <i class="readI">{{item.tag_name}}</i>
            </div>
            <div class="imgIn">
              <img :src="item.main_image" alt="">
            </div>
          </dd>
        </dl>
        <!--脉搏说明-->
        <div class="viewMaibo" v-if="showMaiboView">
          <div class="body"><span class="introduce">说明:</span>脉搏波由心脏的搏动(振动)沿动脉血管和血流向外周传播而形成。血液从左心室的周期性喷出，供给一个周期性外力,使得所有的动脉壁保持一个稳定的,分布性的径向方向的周期性振动。
          </div>
          <div class="bottom">
            <div class="btn-close" @click.self="closeViewMaibo">知道了</div>
          </div>
        </div>
        <div class="viewMaibo" v-if="showJLView">
          <div class="body">
            <span class="introduce">说明:</span>1.经络解读仅对异常的经络指数进行解读,可接受的正常指数不做解读;2.脉象正负20%以内大致正常,请不要过度解读;3.人体的气血时刻在变化,多次测量略有波动属于人体正常现象。
          </div>
          <div class="bottom">
            <div class="btn-close" @click.self="closeviewJLInfo">知道了</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ajax from '@/utils/ajax';
import yhl from '@/utils/javaApiRequest';
import { Toast, Field, MessageBox } from 'mint-ui';
import echarts from 'echarts';
import shareHeader from '@/components/share/shareHeader';
import adviceHeader from '@/components/share/advice';
import { getQueryString } from '@/utils/index';
import wxjs from '@/utils/wxjsInterface';
import { getDateDiff } from '@/api/dateDiff';
// import { weixinLogin } from '@/api/user';
export default {
  name: 'record',
  components: {
    'share-header': shareHeader,
    'advice-header': adviceHeader,
    Field
  },
  data() {
    return {
      moving: false,
      jlOK: false,
      across: false,
      nav: 'jlzs',
      appUrl: 'https://itunes.apple.com/cn/app/id1395275648?mt=8', // app下载地址 默认ios
      isShare: false,
      bodyType: '',
      ingredientsActive: true,
      result: {
        // 脏腑辩证
        syndrome_differentiation_explains: [{ label: '无' }],
        //
        // 体质倾向
        constitution_differentiation_explains: [{ label: '平和质' }],
        measurement_result: {
          c0: 8,
          c1: -6,
          c2: -4,
          c3: 5,
          c4: 2,
          c5: 1,
          c6: 3,
          c7: 2,
        },
        physical_therapy_explain: {
          f0: 70,
          f1: 80,
          f2: 2,
          f3: 3
        },
        recommends: {
          product: [],
          soup: [],
          life: [],
          ingredients: [],
          motion: [],
          physiotherapy: [],
          read: [],
          prescriptions: [],
        }
      }, // 存放结果
      testData: '',
      type: '心包经',
      goodsList: [],
      showMaiboView: false,
      // 经络检测指数,显示图谱
      lineWidth: 262,
      JLHeigh: '',
      siner: 0,
      linePic: [],
      pan1: true,
      pan2: true,
      pan3: true,
      physical: {},
      viscera: [],
      viscera2: [],
      gender: 0,
      test_date: 0,
      vi: [],
      viOk: false,
      resultId: 0,
      readCons: [],
      prescription: [],
      showJLView: false,
      wxUnionId: 0,
      record_id: 0,
      wxopen: false,
      soupStoreShow: false,
      lat: '',
      lon: '',
      provice: '',
      city: '',
      area: ''
    };
  },
  mounted() {
    // 获取报告详情
    this.checkMobileAgent();
    // 获取路径参数
    let record_id = this.$route.query.record_id;
    console.log(record_id, 'idok?');
    if (JSON.parse(record_id).record_id) {
      console.log('进来json');
      this.record_id = JSON.parse(record_id).record_id;
      this.wxopen = JSON.parse(record_id).wxopen;
      this.lat = JSON.parse(record_id).lat ? JSON.parse(record_id).lat : '';
      this.lon = JSON.parse(record_id).lon ? JSON.parse(record_id).lon : '';
      this.provice = JSON.parse(record_id).provice ? JSON.parse(record_id).provice : '';
      this.city = JSON.parse(record_id).city ? JSON.parse(record_id).city : '';
      this.area = JSON.parse(record_id).area ? JSON.parse(record_id).area : '';
    } else {
      console.log('进来普通');
      this.record_id = record_id;
      this.lat = this.$route.query.lat ? this.$route.query.lat : '';
      this.lon = this.$route.query.lon ? this.$route.query.lon : '';
      this.provice = this.$route.query.provice ? this.$route.query.province : '';
      this.city = this.$route.query.city ? this.$route.query.city : '';
      this.area = this.$route.query.area ? this.$route.query.area : '';
    }
    this.getReportResult();
    this.JLHeigh = 200;
    this.lineWidth = 375;
    this.siner = (this.lineWidth - 12) / 200;
    this.isShare = getQueryString('share') === '1';
    let _this = this;
    let body = window.document.getElementById('body');
    body.addEventListener('scroll', function () {
      let scrollTop = body.scrollTop;
      if (scrollTop > 285) {
        _this.across = true;
      } else {
        _this.across = false;
      }
      let tzjdOffsetTop = document.getElementById('tzjd').offsetTop - 120;
      let jktlOffsetTop = document.getElementById('jktl').offsetTop - 120;
      if (scrollTop > tzjdOffsetTop && scrollTop <= jktlOffsetTop) {
        _this.nav = 'tzjd';
      } else if (scrollTop > jktlOffsetTop) {
        _this.nav = 'jktl';
      } else {
        _this.nav = 'jlzs';
      }
    });
    this.moving = 'start';
  },
  filters: {
    myfilter: function (value) {
      return value.replace(/[\+|\-]/g, '');
    },
    myfilter2: function (value) {
      if (value > 0) {
        return '+' + value + '%';
      } else if (value < 0) {
        return value + '%';
      } else {
        return '';
      }
    }
  },
  methods: {
    jumpTap2(key) {
      let body = document.getElementById('body');
      let ele = document.getElementById(key);
      ele.style.webkitOverflowScrolling = 'auto';
      let scrollTop = ele.offsetTop;
      body.scrollTop = scrollTop - 115;
      setTimeout(() => {
        ele.style.webkitOverflowScrolling = 'touch';
      }, 10);
    },
    more(key) {
      window.location.href = './healthfood?key=' + key;
    },
    ingredientsClick() {
      if (this.ingredientsActive) {
        this.ingredientsActive = false;
      } else {
        this.ingredientsActive = true;
      }
    },
    jumpZFBZ() {
      let ele = document.getElementById('viscera');
      let offsetTop = ele.offsetTop;
      let body = document.getElementById('body');
      body.scrollTop = offsetTop - 115;
    },
    touchMovePage() {
      console.info('pagemove');
    },
    touchmove(event) {
      this.moving = true;
      console.info(this.moving);
      console.info('move...', event);
    },
    touchend(event) {
      this.moving = false;
      console.info(this.moving);
      console.info('end...', event);
    },
    introduceChanal() {
      this.$router.push({ path: '/physique/channels' });
    },
    tabnav(type) {
      let body = document.getElementById('body');
      this.nav = type;
      let ele = document.getElementById(type);
      console.log(ele, '健康调理');
      let scrollTop = ele.offsetTop;
      body.scrollTop = scrollTop - 115;
    },
    download() {
      window.location.href = this.appUrl;
    },
    // 检测手机终端
    checkMobileAgent() {
      let _this = this;
      let isAndroid = _this.isAndroid();
      if (isAndroid) {
        _this.appUrl = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.kmyy.intellpharmacy&fromcase=40003';
      }
    },
    // 是否安卓终端
    isAndroid() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
      if (isAndroid) {
        return true;
      }
      return false;
    },
    tap(type) {
      this.type = type;
    },
    // 查看脉搏说明
    viewMaiboInfo() {
      this.showMaiboView = true;
    },
    closeViewMaibo() {
      this.showMaiboView = false;
    },
    viewJLInfo() {
      this.showJLView = true;
    },
    closeviewJLInfo() {
      this.showJLView = false;
    },
    // 获取报告信息
    getReportResult() {
      let _this = this;
      let record_id = this.record_id;
      console.log(this.record_id, 222);
      let lat = this.lat;
      let lon = this.lon;
      let provice = this.provice;
      let city = this.city;
      let area = this.area;
      ajax.post(`/api/jinmu/getUserInnerReportByTempCache/` + record_id, {
        lat: lat,
        lon: lon,
        provice: provice,
        city: city,
        area: area,
      }).then(resp => {
        if (resp.status === 200 && resp.data.code === 0) {
          _this.result = resp.data.data.content;
          // bodyType
          _this.result.syndrome_differentiation_explains.forEach(item => {
            this.bodyType += item.label + ',';
          });
          this.bodyType = this.bodyType.slice(0, this.bodyType.length - 1);
          _this.testData = resp.data.data.test_date;
          console.log(resp.data.data.content, '获取报告信息');
          // measurement_result 设置经络指数
          let measurement = {
            c0: -10,
            c1: 0,
            c2: 30,
            c3: -20,
            c4: 0,
            c5: -10,
            c6: -30,
            c7: 10,
          };
          measurement = resp.data.data.content.measurement_result;
          // 重构
          let str = String(measurement.c0) + String(measurement.c1) + measurement.c2 + measurement.c3 +
            measurement.c4 + measurement.c5 + measurement.c6 + measurement.c7;
          if (Number(str) === 0) {
            this.jlOK = true;
          }
          // 体质判断
          console.log(resp, '报告');
          let result = resp.data.data.content;
          _this.resultId = resp.data.data._id;
          console.log('resp', JSON.stringify(resp));
          // 测量时间
          _this.test_date = resp.data.data.test_date;
          // 性别
          if (result.user_profile) {
            _this.gender = result.user_profile.gender;
          }
          // 体质
          if (result.constitution_differentiation_explains[0]) {
            console.log(result.constitution_differentiation_explains);
            _this.physical = result.constitution_differentiation_explains[0];
          }
          // 脏腑
          if (result.syndrome_differentiation_explains) {
            console.log(result.syndrome_differentiation_explains);
            _this.viscera2 = result.syndrome_differentiation_explains.slice();
            let resultArr = result.syndrome_differentiation_explains;
            let arr2 = [];
            while (resultArr.length > 0) {
              if (resultArr.length > 6) {
                arr2.push(resultArr.slice(0, 4));
                resultArr.splice(0, 4);
              } else if (resultArr.length === 6) {
                arr2.push(resultArr.slice(0, 3));
                resultArr.splice(0, 3);
              } else if (resultArr.length === 5) {
                arr2.push(resultArr.slice(0, 3));
                resultArr.splice(0, 3);
              } else if (resultArr.length < 5) {
                arr2.push(resultArr.slice());
                resultArr.length = 0;
              }
            }
            _this.viscera = arr2;
            for (let m = 0; m < _this.viscera2.length; m++) {
              _this.vi.push({
                value: true
              });
            }
            // 脏腑良好
            if (_this.viscera2[0].key === 'Z0018.0') {
              _this.viOk = true;
            }
          }
          _this.writeLineGraph();
          // 判断是否为汤品
          if (resp.data.data.soup_store_id) {
            this.soupStoreShow = true;
          }
          // this.getRead();
        }
        else {
          Toast(resp.data.message);
        }
      });
    },
    // 获取商品列表 不用来,走李天亮
    getGoodslist() {
      let url = `${process.env.ES_BASE_HOST}/elasticsearch/recommendProduct/getGoldMu`;
      let bodyName = this.result.constitution_differentiation_explains[0].label;
      let bodyType = this.bodyType;
      let lat = this.$route.query.lat;
      let lon = this.$route.query.lon;
      let requestData = {
        bodyName: bodyName,
        bodyType: bodyType,
        page: 0,
        pageSize: 10
      };
      if (lat && lon) {
        requestData = Object.assign(requestData,
          {
            lat: lat,
            lon: lon
          });
      }
      yhl.post(url, requestData).then(resp => {
        console.log(resp);
        if (resp.status === 200 && resp.data.resultCode === '0') {
          console.info('经络推荐商品列表:', resp.data.resultData.content);
          resp.data.resultData.content.map((item) => {
            item.product_markprice = Number(item.product_markprice).toFixed(2);
            return item;
          });
          this.goodsList = resp.data.resultData.content;
        } else {
          Toast(resp.data.message);
        }
      });
    },
    // 写入脉搏波
    writeLineGraph() {
      let partial_pulse_wave = this.result.measurement_result.partial_pulse_wave;
      let option = {
        xAxis: {
          type: 'category',
          show: false
        },
        yAxis: {
          type: 'value',
          scale: true,
          show: false
        },
        series: [
          {
            data: partial_pulse_wave,
            type: 'line',
            lineStyle: {
              width: 1
            }
          }]
      };
      let myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(option);
    },
    drawTaiji(canvas) {
      let taijiFont = document.getElementById('maibobo');
      let width = taijiFont.clientHeight;
      canvas.width = width - 8;
      canvas.height = width - 8;
      canvas.style.marginLeft = -width / 2 + 'px';
      let radius = canvas.clientWidth / 2;
      let xPosition = canvas.clientWidth / 2;
      let yPosition = canvas.clientHeight / 2;
      let contextScreen = canvas.getContext('2d');
      contextScreen.fillStyle = '#fa9a6e';
      contextScreen.beginPath();
      contextScreen.arc(xPosition, yPosition, radius, 0 * Math.PI, (0.5) * Math.PI);
      contextScreen.arc(canvas.width / 2, canvas.width * 0.75, radius / 2, 0.5 * Math.PI, 1.5 * Math.PI);
      contextScreen.fill();
      /* 阴指数 */
      contextScreen.beginPath();
      contextScreen.fillStyle = '#8dcdf0';
      contextScreen.arc(xPosition, yPosition, radius, 0.5 * Math.PI, (0.5 + 0.72) * Math.PI);
      contextScreen.arc(xPosition, canvas.width * 0.25, radius / 2, 0 * Math.PI, 0.3 * Math.PI);
      contextScreen.arc(canvas.width / 2, canvas.width * 0.75, radius / 2, 1.3 * Math.PI, 0.5 * Math.PI, true);
      contextScreen.fill();
      contextScreen.stroke();
    },
    // 展开 收起
    anMore(panName) {
      this[panName] = !this[panName];
    },
    viMore(num) {
      let value = !this.vi[num].value;
      this.$set(this.vi, num, { value: value });
    },
    // 养生阅读
    getRead() {
      let _this = this;
      let url = `${process.env.ES_BASE_HOST}/elasticsearch/commonsearch/advancedquerywithtypes`;
      let requestData = {
        keyword: _this.physical.label,
        devicetype: 'h5',
        accountId: _this.resultId,
        page: 0,
        pageSize: 2,
        types: 'news_info'
      };
      if (_this.$route.query.lat && _this.$route.query.lon) {
        requestData = Object.assign(requestData,
          {
            lat: _this.$route.query.lat,
            lon: _this.$route.query.lon
          });
      }
      yhl.post(url, requestData).then(res => {
        if (res.status === 200 && res.data.resultCode === '0') {
          console.log(res, 'res');
          _this.readCons = res.data.resultData.content;
          console.log(_this.readCons, 'eeee');
        }
        else {
          // Toast(res.data.msg);
        }
      });
    },
    // 1.判断是否微信
    iswx: function () {
      let ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('micromessenger') > 0) { // 微信
        return true;
      }
      else {
        return false;
      }
    },
    // 测试是否绑定微信账号
    checkBindWX() {
      // 1,获取wxUnionId
      // 2.验证是否绑定
      this.isBindReport();
      // 3.确认是否绑定
      // 4.绑定
    },
    // 验证是否绑定
    isBindReport() {
      console.log(this.$route.query, '查看请求参数');
      let that = this;
      let record_id = this.$route.query.record_id;
      if (JSON.parse(record_id).record_id) {
        console.log('进来json-绑定');
        that.record_id = JSON.parse(record_id).record_id;
        that.wxopen = JSON.parse(record_id).wxopen;
      } else {
        console.log('进来普通-绑定');
        that.record_id = record_id;
      }
      console.log(that.wxopen, 'this.wxopen-1');
      ajax.get(`/api/jinmu/GetReportSetPhone/` + that.record_id).then(resp => {
        console.log(resp, 'resp');
        if (resp.data.code === 0 && resp.data.data === true) {
          console.info('true');
        } else {
          // 3.确认是否绑定
          console.log(that.wxopen, 'wxopen');
          if (that.wxopen === true || that.wxopen === 'true') {
            console.log(typeof (that.xopen));
            MessageBox.confirm('是否保存这份脉诊报告,至当前微信账号.   建议保存报告,方便下次查看').then(action => {
              this.bingReport();
            }).catch(err => {
              if (err === 'cancel') {
                // 取消的回调
                console.log('取消保存');
              }
            });
          }
        }
      });
    },
    // bingReport
    bingReport() {
      let record_id = this.record_id;
      let phone = this.wxUnionId;
      console.log(record_id, phone, 'wxUnionId');
      ajax.get(`/api/jinmu/UseReoprtSetPhone/` + record_id + '/' + phone).then(resp => {
        console.log(resp);
        if (resp.data.code === 0) {
          Toast('绑定成功!');
        } else {
          Toast('绑定失败!请稍后重试');
        }
      });
    },
    // 微信初始化
    wxjsInterfaceInit() {
      let _self = this;
      let code = getQueryString('code');
      if (code) {
        wxjs.init(code).then(rs => {
          console.log(rs, 'uid-1');
          if (rs) {
            _self.wx = rs.wx;
            _self.wxResponseConfig = rs.wxconfig;
            if (rs.wxconfig.unionid) {
              _self.wxUnionId = rs.wxconfig.unionid;
              this.isBindReport();
              // sessionStorage.setItem('wxUnionId', unionId);
              /**
              weixinLogin(unionId).then(() => {
                _self.getPrescription();
              });
               **/
            } else {
              /**
              let record_id = this.$route.query.record_id;
              _self.$router.push('/physique/redirect?record_id=' + record_id);
               **/
            }
          } else {
            _self.noData = true;
            _self.showNomore = false;
          }
        });
      } else {
        let record_id = this.$route.query.record_id;
        let wxopen = this.$route.query.wxopen ? this.$route.query.wxopen : false;
        let lat = this.$route.query.lat ? this.$route.query.lat : '';
        let lon = this.$route.query.lon ? this.$route.query.lon : '';
        let province = this.$route.query.province ? this.$route.query.province : '';
        let city = this.$route.query.city ? this.$route.query.city : '';
        let area = this.$route.query.area ? this.$route.query.area : '';
        console.log('重定向参数', '/physique/redirect?record_id=' + record_id + '&wxopen=' + wxopen + '&lat=' + lat + '&lon=' + lon + '&province=' + province + '&city=' + city + '&area=' + area);
        _self.$router.push('/physique/redirect?record_id=' + record_id + '&wxopen=' + wxopen + '&lat=' + lat + '&lon=' + lon + '&province=' + province + '&city=' + city + '&area=' + area);
      }
    },
    // 格式化时间
    dateDiff(timeTemp) {
      return getDateDiff(timeTemp);
    }
  },
  // 微信初始化
  created() {
    document.title = '您有一份脉诊报告';
    let ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('micromessenger') > 0) { // 微信
      this.wxjsInterfaceInit();
    }
    /*    MessageBox({
     title: '',
     message: '是否保存这份脉诊报告,至当前微信账号.   建议保存报告,方便下次查看',
     showCancelButton: true
     }).confirm().then(action => {
     Toast('保存成功')
     }); */
    /*  MessageBox.confirm('是否保存这份脉诊报告,至当前微信账号.   建议保存报告,方便下次查看').then(action => {
     Toast('保存成功');
     });
     */
  }
};
</script>
<style lang="less" scoped>
  html {
    height: auto;
    overflow: auto;
  }
  .reportnew-box {
    width: 100%;
    height: 100%;
  }
  #page {
    height: 100%;
    padding-top: 0;
    &:before {
      height: 100%;
      width: 100%;
      content: ' ';
      position: fixed;
      z-index: -1;
      top: 0;
      left: 0;
      background: #FFF;
    }
  }
  /*录入手机弹窗*/
  .reportnew-phone {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .reportnew-phonebox {
    width: 270px;
    height: 190px;
    background-color: #FFF;
    border-radius: 7px;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 101;
  }
  .reportnew-phonetop {
    padding: 25px 20px;
    font-size: 16px;
    color: #333;
    line-height: 21px;
  }
  .reportnew-phonetop > input {
    width: 100%;
    height: 40px;
    border-radius: 2px;
    border: solid 1px #BFBFBF;
    margin-top: 15px;
    font-size: 15px;
    color: #9A9999;
    padding-left: 10px;
  }
  .reportnew-phonebot {
    border-top: solid 1px #BFBFBF;
    height: 45px;
    width: 100%;
    display: flex;
  }
  .reportnew-phonebot > div {
    width: 50%;
    line-height: 45px;
    font-size: 16px;
    color: #0CCDD3;
    text-align: center;
  }
  .reportnew-phonebot > div:first-child {
    border-right: solid 1px #BFBFBF;
    color: #545454;
  }
  /*总布局*/
  .container {
    width: 100%;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    background-color: #EFF0E8;
    font-family: "SimHei";
    padding: 20px 0;
    /deep/ .download-app {
      top: 0
    }
    /*1.概述*/
    .testTime {
      padding: 10px 10px;
      background-color: #fff;
      text-align: right;
      color: #666;
      font-size: 12px;
      font-weight: 400;
    }
    #first {
      margin-top: 0px;
    }
    .box1 {
      padding: 18px 14px 10px 14px;
      margin-bottom: 15px;
      color: #333;
      background-color: #FFF;
      text-align: center;
      /*h1 {*/
      /*font-size: 15px;*/
      /*font-weight: 100;*/
      /*}*/
      /*h2 {*/
      /*font-size: 20px;*/
      /*text-align: center;*/
      /*color: #665120;*/
      /*margin-top: 20px;*/
      /*font-weight: 100;*/
      /*}*/
      h3 {
        font-size: 12px;
        color: #333;
        font-weight: 100;
        text-align: center;
        margin-top: 10px;
      }
      /*肝肺腑辩证倾向于*/
      .type-box {
        user-select: none;
        cursor: pointer;
      }
      .type {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 0 0;
        justify-content: center;
        .item {
          width: 25%;
          margin-bottom: 10px;
          text-align: center;
          cursor: pointer;
          position: relative;
          .image {
            width: 36%;
            padding-top: 36%;
            background-size: 100% 100%;
          }
          img {
            position: absolute;
            left: 50%;
            margin-left: -18%;
            display: inline-block;
            width: 36%;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
            z-index: 0;
          }
          span {
            position: relative;
            display: inline-block;
            width: 80%;
            padding-top: 40%;
            font-size: 13px;
            color: #665120;
            text-align: center;
            z-index: 2;
          }
        }
      }
    }
    .box1 > img {
      width: 161px;
      height: 40px;
      display: inline-block;
    }
    .box2 {
      background-color: #FFF;
      margin: 15px 10px;
      border-radius: 10px;
      padding: 12px 10px;
      position: relative;
      h1 {
        font-size: 16px;
        font-weight: 400;
      }
    }
  }
  /*导航*/
  .nav-jiedu {
    background-color: #FFF;
    display: flex;
    padding: 0px 15px;
    &.top {
      display: none;
      position: fixed;
      width: 100%;
      margin-top: 60px;
      border-bottom: 1px solid #14665120;
      box-shadow: 1px 1px 2px 2px #14665120;
      z-index: 1000;
    }
    &.top.across {
      display: flex;
    }
    li {
      flex: 1;
      font-size: 15px;
      color: #333;
      padding: 10px 10px;
      position: relative;
      text-align: center;
      &.active {
        color: #665120;
      }
      &.active:after {
        position: absolute;
        left: 50%;
        bottom: 0;
        display: inline-block;
        content: ' ';
        width: 8.5px;
        height: 5px;
        background: url("img/lh-xz.png");
        background-size: 100% 100%;
        vertical-align: text-bottom;
      }
      &.jljd:before {
        display: inline-block;
        content: ' ';
        width: 18px;
        height: 15px;
        background: url("img/lh-jljd-wxz.png");
        background-size: 100% 100%;
        vertical-align: text-bottom;
        margin-right: 8px;
      }
      &.tzjd:before {
        display: inline-block;
        content: ' ';
        width: 18px;
        height: 15px;
        background: url("img/lh-tzjd-wxz.png");
        background-size: 100% 100%;
        vertical-align: text-bottom;
        margin-right: 8px;
      }
      &.jktl:before {
        display: inline-block;
        content: ' ';
        width: 18px;
        height: 15px;
        background: url("img/lh-jktl-wzx.png");
        background-size: 100% 100%;
        vertical-align: text-bottom;
        margin-right: 8px;
      }
    }
  }
  /*1.1心速*/
  #heartrate {
    .tip {
      position: absolute;
      top: 15px;
      right: 10px;
      color: #77716A;
    }
    /*0.心速标尺*/
    .rate {
      position: absolute;
      color: #333;
      &#rate1 {
        left: 0;
        bottom: -5px;
      }
      &#rate2 {
        left: -23%;
        bottom: 21%;
      }
      &#rate3 {
        left: -12%;
        top: 29%;
      }
      &#rate4 {
        left: 19%;
        margin-left: -14px;
        top: -12%;
      }
      &#rate5 {
        right: 23%;
        top: -14%;
      }
      &#rate6 {
        right: -27%;
        bottom: 48%;
      }
      &#rate7 {
        right: -15px;
        bottom: -5px;
      }
    }
    /*1.平均心率*/
    .heart.content {
      position: relative;
      margin: 40px 29% 24px;
      padding-top: 37%;
      background: url("img/lh_xl.png");
      background-size: 100% 100%;
      color: #FFF;
      .heartNum {
        font-size: 30px;
        position: absolute;
        left: 50%;
        top: 85%;
        margin-left: 0px;
        color: #666;
        margin-left: -24px;
        text-align: center;
        font-size: 30px;
        .text {
          display: block;
          font-size: 12px;
          color: #333;
        }
        .num {
          font-size: 30px;
          color: #666;
          display: inline-block;
        }
      }
      .rateValue-box {
        position: absolute;
        width: 100%;
        padding-top: 100%;
        left: 0;
        top: 0;
        transform: rotate(0deg);
        .rateValue {
          position: absolute;
          width: 14px;
          height: 12px;
          background: url('./img/lh-zz.png');
          transform: rotate(180deg);
          left: 50%;
          margin-left: -7px;
          top: 10px;
        }
      }
    }
    /*2.波动心率*/
    .heartNum2 {
      display: flex;
      margin-top: 30px;
      margin-bottom: 36px;
      position: relative;
      .item {
        flex: 1;
        text-align: center;
        position: relative;
        &:first-child:after {
          display: inline-block;
          position: absolute;
          content: ' ';
          width: 1px;
          height: 20px;
          background-color: #FA913C;
          right: 0;
          top: 5px;
        }
        .text {
          display: block;
          font-size: 12px;
          color: #333;
        }
        .num {
          font-size: 25px;
          color: #FA913C;
          display: inline-block;
        }
      }
    }
  }
  /*1.2脉搏波*/
  #maibobo {
    margin-top: 15px;
    width: 100%;
    position: relative;
    h1 {
      position: absolute;
      z-index: 5;
      top: 29px;
    }
    h1:after {
      content: ' ';
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url('img/lh-ts.png');
      background-size: 100% 100%;
      margin-left: 5px;
      vertical-align: text-top;
    }
    #main {
      margin-top: -50px;
      height: 220px;
      margin-bottom: -60px;
    }
  }
  /*1.3经络解读*/
  #jljd {
    position: relative;
    h1 {
      margin-bottom: 20px;
    }
    h1:after {
      content: ' ';
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url('img/lh-ts.png');
      background-size: 16px 16px;
      margin-left: 5px;
      vertical-align: text-top;
    }
    .introduce {
      position: absolute;
      right: 0;
      top: 12px;
      right: 10px;
      color: #665120;
      &:after {
        display: inline-block;
        content: ' ';
        background: url('./img/icon_jljs.png');
        background-size: 100% 100%;
        width: 15px;
        height: 15px;
        vertical-align: text-bottom;
        margin-left: 5px;
      }
    }
    .label {
      font-size: 18px;
      color: #665120;
      margin: 10px 0;
      .jia {
        display: inline-block;
        background: url('./img/icon_jia1@3x.png');
        width: 20px;
        height: 15px;
        background-size: 100% 100%;
      }
      .jian {
        display: inline-block;
        background: url('./img/icon_jian@3x.png');
        background-size: 100% 100%;
        width: 20px;
        height: 6px;
        vertical-align: middle;
      }
    }
    article {
      font-size: 15px;
      color: #333;
    }
  }
  /*1.4中药调理*/
  #zytl {
    .recipe {
      margin-top: 10px;
      h2 {
        font-size: 18px;
        color: #665120;
        margin: 15px 0;
      }
      .item {
        font-size: 15px;
        color: #333;
        .label {
          margin: 5px 0;
        }
        .content {
        }
      }
    }
    .bottom {
      margin: 20px 0 30px 0;
      text-align: center;
      .btn-out {
        display: inline-block;
        padding: 8px;
        background-color: #EAE2D2;
        border-radius: 8px;
        .btn-zxys {
          display: inline-block;
          font-size: 16px;
          line-height: 20px;
          padding: 8px 20px;
          color: #FFF;
          background-color: #835F0C;
          border-radius: 3px;
        }
      }
    }
  }
  /*1.5 经络指数*/
  /*体质结果*/
  .heartrate-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 80px;
      height: 74px;
      text-align: center;
    }
    .heartrate-headerName {
      font-size: 18px;
      color: #665120;
      margin-top: 20px;
    }
    .heartrate-headerTime {
      margin-top: 10px;
      img {
        width: 9px;
        height: 9px;
      }
      span {
        font-size: 11px;
        color: #77716A;
        margin-right: 6px;
      }
    }
  }
  .heartrate-box {
    position: relative;
    border: solid 2px #EBEDDB;
    margin-top: 35px;
    .box-nameout {
      position: absolute;
      top: -11px;
      left: 20px;
      display: flex;
      .boxname-left {
        width: 6px;
        height: 15px;
        background: #FFF;
        margin-top: 10px;
        background: url("./img/title_left.png");
        background-size: 100%;
        background-repeat: no-repeat;
      }
      .boxname {
        white-space: nowrap;
        height: 20px;
        padding-left: 3px;
        padding-right: 3px;
        font-size: 15px;
        color: #333;
        background: url("./img/title_mid.png");
        background-position: 50% 100%;
        background-size: 100% 50%;
        background-repeat: no-repeat;
      }
      .boxname-right {
        width: 6px;
        height: 15px;
        background: #FFF;
        margin-top: 10px;
        background: url("./img/title_right.png");
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    .more-box {
      position: absolute;
      top: -11px;
      right: 13px;
      display: flex;
      height: 40px;
      width: 50px;
      background-color: #FFF;
      .more-bottom {
        position: absolute;
        width: 100%;
        height: 10px;
        background: #FFF;
        margin-top: 10px;
        background: url("./img/xh_more_bg.png");
        background-size: 100%;
        background-repeat: no-repeat;
      }
      .boxname {
        position: absolute;
        right: 13px;
      }
      .more-right {
        position: absolute;
        top: -3px;
        right: 5px;
        width: 6px;
        height: 15px;
        background: #FFF;
        margin-top: 10px;
        background: url("./img/xh_arrow_right.png");
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    .heartrate-imgSize {
      width: 49px;
      height: 22px;
      position: absolute;
      right: 15px;
    }
    .heartrate-boxAn {
      top: -11px;
    }
    .heartrate-boxUp {
      bottom: -11px;
    }
    .more {
      position: absolute;
      right: 15px;
      top: -13px;
      width: 58px;
      text-align: center;
      white-space: nowrap;
      height: 20px;
      padding-left: 3px;
      padding-right: 3px;
      font-size: 15px;
      color: #333;
      background: url("./img/title_mid.png");
      background-position: 50% 100%;
      background-size: 100% 50%;
      background-repeat: no-repeat;
    }
    .heartrate-content {
      line-height: 25px;
      margin: 18px 12px 20px;
      h6 {
        color: #665120;
        font-size: 17px;
      }
      p {
        color: #333;
        font-size: 15px;
        line-height: 25px;
      }
    }
    .pan {
      position: relative;
      /* &:after{
         font-size: 13px;
         content: ' ... ';
         display: inline-block;
         position: absolute;
         right: 7px;
         bottom: 0;
         color: #000;
         background: #fff;
         padding: 2px 4px;
       }*/
    }
  }
  .viscera-header {
    margin: 15px 10px;
    font-size: 15px;
    color: #333;
    ul {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: center;
      margin-top: 15px;
      &:after {
        display: block;
        content: ' ';
        clear: both;
      }
      li {
        text-align: center;
        width: 50%;
        img {
          width: 100px;
          height: 78.64px;
        }
        span {
          display: inline-block;
          text-align: center;
          font-size: 16px;
          color: #665120;
          margin-top: 10px;
          margin-bottom: 10px;
          width: 88px;
        }
      }
    }
  }
  .viscera-good {
    padding: 18px 15px 15px;
    li {
      line-height: 25px;
      h6 {
        font-size: 17px;
        color: #665120;
      }
      p {
        font-size: 14px;
        color: #333;
      }
      .viscera-goodImg {
        display: flex;
        margin: 10px 0 0;
        img {
          width: 111px;
          height: 111px;
          background: #333;
        }
        div {
          flex: 1;
          padding-left: 15px;
          span {
            font-size: 17px;
            color: #333;
          }
          p {
            font-size: 15px;
            color: #77716A;
            line-height: 18px;
            margin-top: 5px;
          }
        }
      }
    }
  }
  #read, #movement {
    padding: 15px 0px 0px 10px;
    dt {
      font-size: 15px;
      color: #333;
      padding-bottom: 15px;
      font-weight: bold;
    }
    dd {
      line-height: 25px;
      padding-top: 15px;
      padding-bottom: 15px;
      border-top: 1px solid #E0E0E0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      div:first-child {
        flex: 1;
        width: 100%;
        margin-right: 15px;
        .span {
          width: 100%;
          display: flex;
          /*justify-content: space-between;*/
          align-items: center;
          span {
            display: inline-block;
            font-size: 13px;
            color: #666;
          }
          .spanImg {
            display: inline-block;
            width: 14px;
            height: 10px;
            margin-right: 0;
          }
        }
      }
      .imgIn {
        width: 100px;
        height: 75px;
        margin-right: 5px;
        img {
          width: 100px;
          height: 75px;
          border: 1px solid #E0E0E0;
          background: red;
          border-radius: 3px;
        }
      }
      h5 {
        font-weight: normal;
        font-size: 16px;
        color: #333;
      }
    }
    dd:nth-child(2) {
      border-top: none;
    }
  }
  #jlzs {
    .tip {
      position: absolute;
      font-size: 11px;
      color: #77716A;
      right: 17px;
      top: 14px;
    }
    .graph {
      display: flex;
      position: relative;
      padding: 45px 8px;
      .top, .bottom {
        position: absolute;
        font-size: 12px;
      }
      .top {
        top: 8px;
        left: -4px;
        text-align: center;
        span {
          display: block;
          line-height: 16px;
        }
      }
      .bottom {
        bottom: 8px;
        left: -4px;
        text-align: center;
        span {
          display: block;
          line-height: 16px;
        }
      }
      .item {
        flex: 1;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 10px;
        margin-left: 5px;
        .name {
          padding: 2px;
          position: relative;
          width: 28px;
          color: #665120;
          &.san {
            width: 40px;
          }
          .value {
            position: absolute;
            width: 12px;
            background: linear-gradient(#D4544A, #FDCE30);
            height: 20px;
            border-radius: 5px;
            left: 50%;
            margin-left: -6px;
            &.bellow {
              background: linear-gradient(#48DFE7, #3AAADB);
            }
          }
          .valueNum {
            position: absolute;
            left: 50%;
            margin-left: -9px;
            top: -40px;
          }
        }
        .line {
          display: inline-block;
          width: 3px;
          height: 100px;
        }
        &:not(:last-child) .name:after {
          content: " ";
          position: absolute;
          right: -5px;
          width: 2px;
          height: 6px;
          background-color: #CCC;
          top: 9px;
        }
      }
      .biaochi {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 12px;
        .line {
          display: inline-block;
          width: 3px;
          height: 100px;
          background-color: #E5E7DC;
        }
      }
    }
  }
  /*3.1 理疗指数 阴阳鱼*/
  #tjt {
    .taiji {
      position: relative;
      margin: 20px 20%;
      padding-top: 60%;
      background: url('./img/pla_icon_yinyang.png');
      background-size: 100% 100%;
      color: #FFF;
      .text {
        position: absolute;
        width: 60%;
        padding: 50%;
        background: url('./img/pla_iconfont_yinyang.png');
        background-size: 100% 100%;
        left: 0;
        top: 0
      }
    }
    h1:after {
      content: ' ';
      display: inline-block;
      width: 18px;
      height: 18px;
      background: url('img/lh_ts.png');
      background-size: 18px 18px;
      margin-left: 5px;
      vertical-align: text-top;
    }
    .mytap {
      display: flex;
      margin-top: 60px;
      .item {
        flex: 1;
        text-align: center;
        position: relative;
        &:first-child:after {
          display: inline-block;
          position: absolute;
          content: ' ';
          width: 1px;
          height: 20px;
          background-color: #FA913C;
          right: 0;
          top: 5px;
        }
        .text {
          display: block;
          font-size: 12px;
          color: #333;
        }
        .num {
          font-size: 25px;
          color: #FA913C;
          display: inline-block;
        }
      }
    }
  }
  /*3.1 理疗指数*/
  #llzs {
    h1:after {
      content: ' ';
      display: inline-block;
      width: 18px;
      height: 18px;
      background: url('img/lh_ts.png');
      background-size: 18px 18px;
      margin-left: 5px;
      vertical-align: text-top;
    }
    .top-box {
      margin-bottom: 15px;
      border-bottom: 1px solid #E5E5E5;
      padding: 0 10px 15px 10px;
    }
    .bottom-box {
      padding: 0 10px 10px 10px;
    }
    .tip {
      color: #77716A;
      font-size: 12px;
    }
    .jindu-box {
      .jindutiao {
        margin: 50px 0;
        background-color: #FFEBC8;
        height: 12px;
        width: 100%;
        border-bottom-left-radius: 2px;
        border-top-left-radius: 2px;
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
        position: relative;
        .num-box {
          position: relative;
          top: 15px;
          display: flex;
          width: 110%;
          left: -5%;
          .num {
            flex: 1;
            text-align: center;
            color: #808080;
          }
        }
        .step {
          position: absolute;
          width: 100px;
          height: 12px;
          background: -webkit-gradient(linear, left bottom, right bottom, from(#D4544A), to(#FDCE30));
          border-bottom-left-radius: 2px;
          border-top-left-radius: 2px;
        }
        .step-icon {
          position: absolute;
          right: -12px;
          top: -30px;
          .icon {
            display: inline-block;
            background: url('./img/pla_iconfont_zhizheng.png');
            width: 18px;
            height: 22px;
            background-size: 100% 100%;
            text-align: center;
            font-size: 12px;
            color: #FFF;
          }
        }
      }
    }
  }
  /*脉搏说明*/
  .viewMaibo {
    position: fixed;
    top: 20%;
    width: 80%;
    left: 10%;
    padding: 20px;
    box-shadow: 1px 1px 2px 2px rgba(16, 30, 8, 0.15);
    border-radius: 10px;
    background: #FFF;
    text-align: center;
    z-index: 1005;
    .title {
      font-size: 22px;
      color: rgb(102, 81, 32);
      margin-bottom: 15px;
    }
    .introduce {
      font-weight: 700;
    }
    .body {
      text-align: left;
      font-size: 16px;
      line-height: 26px;
      color: #333;
      font-weight: 100;
    }
    .bottom {
      .btn-close {
        display: inline-block;
        padding: 5px 10px;
        border: 1px solid #835F0C;
        border-radius: 5px;
      }
    }
  }
  /*下载页*/
  .downBox {
    display: flex;
    position: fixed;
    background: #FFF;
    width: 100%;
    top: 0;
    padding: 10px 10px 5px 10px;
    justify-content: flex-start;
    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    .title {
      margin-top: 5px;
      color: #0CCDD3;
      font-size: 18px;
    }
    .info {
      font-size: 16px;
      color: rgb(102, 102, 102);
      line-height: 28px;
    }
    .right {
      color: #0CCDD3;
      .download {
        position: absolute;
        right: 10px;
        border: 1px solid #0CCDD3;
        padding: 5px 10px;
        border-radius: 5px;
        margin-top: 5px;
        font-size: 14px;
        .donwload-icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          background: url('img/icon_jktt_download@2x.png');
          background-size: 100% 100%;
          margin-right: 5px;
        }
      }
    }
  }
  .myviOK {
    text-align: center;
    position: relative;
    margin: 10px 0 1px;
    img {
      width: 69%;
    }
    .oktext {
      position: absolute;
      width: 130px;
      left: 50%;
      top: 50%;
      color: #FFF;
      margin-top: -13px;
      margin-left: -65px;
    }
  }
  .jlOK {
    text-align: center;
    margin-top: 52px;
    .up {
      .textBox {
        padding: 2px 0px;
        h5 {
          color: #665120;
          font-size: 18px;
          font-weight: 400;
          line-height: 23px;
        }
      }
      img {
        width: 60px;
      }
    }
    .bottom {
      display: flex;
      position: relative;
      padding: 45px 8px;
      .biaochi {
        position: relative;
        width: 10px;
        .line {
          position: absolute;
          display: inline-block;
          width: 3px;
          height: 25px;
          background-color: #E5E7DC;
          top: -27px;
          left: 50%;
          margin-left: -1.5px;
          border-radius: 1px;
        }
      }
      .jl {
        flex-grow: 1;
        align-items: center;
        font-size: 10px;
        margin-left: 5px;
        position: relative;
        width: 28px;
        color: #665120;
        &:not(:last-child):after {
          content: " ";
          position: absolute;
          right: 50%;
          margin-right: -18px;
          width: 2px;
          height: 6px;
          background-color: #CCC;
          top: 50%;
          margin-top: -3px;
        }
        &:nth-child(2)::after {
          content: " ";
          position: absolute;
          right: 50%;
          margin-right: -25px;
          width: 2px;
          height: 6px;
          background-color: #CCC;
          top: 50%;
          margin-top: -3px;
        }
      }
    }
  }
  /*4.1 健康调理*/
  #jktl {
    padding: 15px 0px 15px;
    display: flex;
    justify-content: space-around;
    li {
      img {
        width: 46px;
        height: 46px;
        margin-bottom: 7px;
      }
      h6 {
        font-size: 13px;
        color: #333;
        font-weight: normal;
      }
    }
  }
  /*4.2 中医调理*/
  .zytlBox.box2 {
    padding-right: 0;
  }
  .zytlBox {
    .zcy-title {
      height: 47px;
      line-height: 47px;
      display: flex;
      justify-content: left;
      align-items: center;
      border-bottom: 1px solid #EFF0E8;
      img {
        width: 30px;
        height: 30px;
      }
      div {
        font-size: 18px;
        color: #333;
        font-weight: bold;
        margin-left: 7px;
      }
    }
    ul {
      padding: 0px 10px 0 0;
      li {
        border-bottom: 1px solid #EFF0E8;
        padding: 15px 0 10px 0;
      }
      li:last-child {
        border-bottom: none;
      }
    }
    .zcyLine-top {
      background: rgb(255, 255, 255);
      display: flex;
      .zcyLine-topLeft {
        width: 6px;
        height: 15px;
        background: #FFF;
        margin-top: 10px;
        background: url("./img/title_left.png");
        background-size: 100%;
        background-repeat: no-repeat;
      }
      .zcyLine-topCenter {
        white-space: nowrap;
        height: 20px;
        padding-left: 3px;
        padding-right: 3px;
        font-size: 15px;
        color: #333;
        background: url("./img/title_mid.png");
        background-position: 50% 100%;
        background-size: 100% 50%;
        background-repeat: no-repeat;
      }
      .zcyLine-topRight {
        width: 6px;
        height: 15px;
        background: #FFF;
        margin-top: 10px;
        background: url("./img/title_right.png");
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    .zcyLine-bot {
      margin-top: 15px;
      display: flex;
      .zcyLine-botLeft {
        flex: 1;
        h6 {
          font-size: 15px;
          font-weight: normal;
          color: #333;
        }
        p {
          font-size: 13px;
          color: #666;
          margin-top: 3px;
        }
        i {
          padding: 3px 4px;
          font-size: 10px;
          color: #665120;
          text-align: center;
          background-color: #EEE6D4;
          border-radius: 5px;
          margin-top: 5px;
        }
        .info {
          margin-top: 3!important;
          color:#ff4c56;
        }
        .zyfjLine-botLeft {
          display: flex;
          align-items: center;
          i {
            margin-top: 0;
            margin-left: 7px;
            padding: 1px 3px;
          }
        }
        h5 {
          display: block;
          font-size: 12px;
          color: #666;
          font-weight: normal;
          margin: 5px 0;
        }
      }
      .zcyLine-botRight {
        margin-left: 10px;
        img {
          width: 125px;
          height: 70px;
          border: solid 1px #E0E0E0;
          border-radius: 5px;
        }
      }
    }
  }
  /*4.3 药膳饮食*/
  .ysjyBox {
    padding: 15px 10px 0 0;
    .ysjyButton {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        width: 50%;
        margin-top: 13px;
        margin-bottom: 15px;
        height: 36px;
        background: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
      }
      i.ysjyChoose {
        b {
          height: 36px;
          background: #EEE6D4;
          border-top: 1px solid #D0C2A1;
          border-bottom: 1px solid #D0C2A1;
          line-height: 36px;
          z-index: 1;
        }
        &:after {
          content: ' ';
          position: relative;
          right: 17px;
          width: 34px;
          height: 34px;
          background: #EEE6D4;
          border: 1px solid #D0C2A1;
          border-left: 1px solid transparent;
          -webkit-border-bottom-right-radius: 50%;
          -webkit-border-top-right-radius: 50%;
        }
        &:before {
          content: ' ';
          position: relative;
          left: 17px;
          width: 34px;
          height: 34px;
          background: #EEE6D4;
          border: 1px solid #D0C2A1;
          border-right: 1px solid transparent;
          -webkit-border-bottom-left-radius: 50%;
          -webkit-border-top-left-radius: 50%;
        }
      }
      i:last-child {
        margin-left: 40px;
      }
    }
    .ysjyP {
      font-size: 13px;
      color: #666;
      padding-bottom: 14px;
      border-bottom: 1px solid #EFF0E8;
    }
  }
  .zcyLine-bot.ysys {
    border-bottom: 1px solid #EFF0E8;
    padding-bottom: 10px;
  }
  .zcyLine-bot.ysys:last-child {
    border-bottom: none;
  }
  /*4.4 养生阅读*/
  .readI {
    padding: 3px 4px;
    font-size: 10px;
    color: #665120;
    text-align: center;
    background-color: #EEE6D4;
    border-radius: 5px;
    margin-top: 5px;
  }
  .movementMore {
    h2 {
      font-size: 15px;
      font-weight: normal;
      margin-bottom: 5px;
    }
    h5 {
      font-size: 13px;
    }
  }
  .orderHome {
    width: 50px;
    height: 14px;
    line-height:14px;
    border: 1px solid #ff4c56;
    border-radius: 7px;
    padding: 0 5px;
    margin-right: 5px;
  };
  .orderStroe {
    width: 50px;
    height: 14px;
    border: 1px solid #fa913c;
    border-radius: 7px;
    padding: 0 5px;
    margin-right: 5px;
    color: #fa913c;
  };
</style>
