<template>
    <ul class="drug-list">
        <li class="display-box">
            <img class="pic" />
            <div class="box-flex drug-info">
                <label class="drug-name">面膜吗面膜面膜吗面膜面膜吗面膜面膜吗面膜</label>
                <div class="else-info">
                    <label class="left drugstore-name">康美智慧药房</label>
                    <label class="right">销量: 1234</label>
                </div>
            </div>
            <div class="drug-price">
                <div class="price">￥888</div>
                <img src="./img/shoppingcart.png" />
            </div>
        </li>
        <li class="display-box">
            <img class="pic" />
            <div class="box-flex drug-info">
                <label class="drug-name">面膜吗面膜面膜吗面膜面膜吗面膜面膜吗面膜</label>
                <div class="else-info">
                    <label class="left drugstore-name">康美智慧药房</label>
                    <label class="right">销量: 1234</label>
                </div>
            </div>
            <div class="drug-price">
                <div class="price">￥888</div>
                <img src="./img/shoppingcart.png" />
            </div>
        </li>
    </ul>
</template>
<style lang="less" scoped>
@color99: #999;
@border-bottom: solid 1px #e6e6e6;
.drug-list{
    padding: 20px 12px 10px;
    li{
        margin-bottom: 15px;
        .pic{
            display: block;
            width: 50px;
            height: 50px;
            margin-right: 8px;
            border: @border-bottom;
        }
        .drug-info{
            font-size: 11px;
        .drug-name{
            line-height: 26px;
        }
        .else-info{
            color: @color99;
        }
        }
        .drug-price{
            width: 80px;
            font-size: 12px;
            color: #fe4d57;
            text-align: right;
        .price{
            font-size: 12px;
            line-height: 26px;
        }
        img{
            float: right;
            width: 20px;
            height: 20px;
        }
        }
    }
}
</style>
