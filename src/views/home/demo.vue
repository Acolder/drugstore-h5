<template>
  <div>
    <div style="height:50px;">
      <form class="webuploader" name="webuploader_form" enctype="multipart/form-data">
        <input type="file" id="webuploader_file" multiple accept="image/*" v-show="false" class="form-control"
               @change="onUploadFile" name="file"/>
        <label for="webuploader_file" class="addImgBtn">
          <span class="add">upload</span>
        </label>
      </form>
    </div>
      <div>
        <img :src="imgUrl" alt="" style="width:100%">
      </div>
  </div>
</template>

<script>
import ajax from 'axios';
import uploader from './upload.js';
export default {
  data() {
    return {
      imgName: 'tupian.jpg',
      imgBase64: 'iVBORw0KGgoAAAANSUhEUgAAAREAAADPCAYAAADS1+VlAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NUVEN0YyQzVGNDgxMUU4OUI4NkZGODA2ODhCNzVBQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NUVEN0YyRDVGNDgxMUU4OUI4NkZGODA2ODhCNzVBQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk1RUQ3RjJBNUY0ODExRTg5Qjg2RkY4MDY4OEI3NUFCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk1RUQ3RjJCNUY0ODExRTg5Qjg2RkY4MDY4OEI3NUFCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VibCYwAACJdJREFUeNrs3dlqFGkDx+GKUYNLxg13ccUFFdETRVwQr8C7+G7PI08EEcWDEVxwAxH3LRJsddwNmPFfHxWi0+kt3Vn0eaAxM3bS3WXXr956q6rTV6vVRguADs2xCAARAUQEEBFARABEBBARQEQAEQEQEUBEABEBRARARAARAUQEEBEAEQFEBBARQEQAEQEQEUBEABEBRARARAARAUQEEBEAEQFEBBARQEQARAQQEUBEABEBRARARAARAWafuRYB9Xz98qX4/OMWg4ODRX9/v4WCiNC6jx8/FsPDw+XXCxYsEBHszgAiAogIICIAIgKICCAigIgAIgIgIoCIACICiAiAiAAiAogIICIAIgKICCAigIgAiAggIoCIACICICKAiAAiAogIICIAIgKICCAiwJ9irkUwM73/55/i7bt30/b4IyMjY18PDQ0Vc+ZM7/Zm6ZIlxeBff3ljiAjtrMSfPn6cEc/ly+fP0/4cFi1c6E0hIrSjr6+v6O/vn7bHHx0dLb5///7/fd4fo5A8n+leHszQ92qtVhu1GPhV7fXrYnh4uPx685YtxcDAgIVCXSZWAREBRAQQEUBEAEQEEBFARAARARARQEQAEQFEBEBEABEBRAQQEQARAUQEEBFARAARARARQEQAEQFEBEBEABEBRAQQEYCJzLUIqLt16e8v5s2bV37d19dngTChvlqtNmoxAHZnABEBRAQQEQARAUQEEBFARABEBBARQEQAEQEQEUBEABEBRARARAARAUQEEBFARABEBBARQET+dCMjI+Vtpj0n/y6WgYjMkjfq6dOny9tUvGnPnTtXXL9+vaXnlPv+LvKa23k9L168KJfBnTt3vEm7yK/RnOXevXtXvH79upg/f37D+w0PD5d/rlmzpuPH+vTpU/Ho0aOev6bNmzcXCxcubHq/Wq1WvvYEsvqVn4gIbXr+/Hn55+rVqxve7+3bt+WfS5cu7fix8jNu377d89eU59hKRBARuuDJkyflKGT79u1Nt9qxcuXKST/mnj17mj5eJ+7duzclkUJEGLfSvX//vlypq12Wmzdv1r1v7pfYXLx4senPXb58ebF///6G92m0+5C5iqGhoeL48eNGFCLCTHb//v2xOYTI3EDmCBpp9veTlXmTx48fFytWrBAQEWG2jEKqlXXdunXFqVOn/nPfTIZmdHDkyJGWdmcmM0l59erV4tu3b+Wt0ZGTVkY7iAg9khFHDlPWmwupF4CnT5+W901keimhevnyZbFp06Zi8eLFE96vF/Me7R5Kb3Z/R3tE5LeWlTBb+uwyNHuzZ/ciuzBr167teUAyOoply5ZNOPFanc+ya9eurj12zv1od/k1C1lGeLt37/ZmE5GZM3JoRStbv5wwVa2srWj1EPBkXtu1a9fKeZAqHAlF/v+vK2Ged25ZQbs5KkpMu81IRERmjHa2klkZTp482XCFvXHjxoRb+Oow7ngZsVS7NLm1o9FzqUY5Z8+eLR9j/JZ70aJFY8/n0KFDY1v/BCSh6fYW/tixY1Z6Efl9tbOVzGRjI9niZzI1E5LNTnOv5P6Dg4M9eW2Z0M38x6pVq34aWSQUmYPJczxz5kwxMDAw9rx7cX4JIvJb69ZWMitktcuQQ7q/RqTekY7cP/Mh27Zt69nKO9ERlrzmBDQTrRmp9CpkiAgtyPUx2RXISlmdWNaKV69elSOC6jySXsvJbrnlLNpqBJTIZPfmwYMHZfhyVCmjly1bthRLlizxjysiTIWsbDm6kvmFbOFbmaitTvrKCtur+YI8RiZu37x5U85/JByRx9y3b99Puzj5OpPCz549G5tgTRSzC/fr7hAiQg8cPXq0rftXR2Wyxe+VW7dulaHKaCdByG7T+vXry2jlBLdEZvxZqwlFbnv37i2fX0ZKiUlOkZ/MNT3VFcrtcqGfiNBAdYJZtYvRjlYvxT9w4EAZqV8DkDBk1yW3jEo2bNjw00gjPztzNLklNNUcSruqI0+XLl3qaBk5F0REaLBlrq6R6eTs0Fa30Fnx640gEoeMSDLayPU9Ga1kd2znzp3/uX+nI4Hs0lXzLhs3bmzrez98+FA+J0SECWRFrXcNTbOV8sKFC107PX78aCMjk0yonj9/vmuHeavPR8mHLLU7msjcjIiICC2MEtrx999/F1+/fi0OHz7c9edSHZZOTDKJ2g1VRHLkBxFhmlUXzmWU0Olh18uXL5dHaHLhXU6xzy7R+F2XRK2b8w85IhTdihIiQp3dk8yNNNs1qS6cm+xuRi66y65QQlKdCJf/zlxI/i5zJN08EpLoZT7EuSYiQo9U16pkRat3xmoik085ywRsN+Ypxn9/jrgkYDmEm6hk/iFhSVAySplsUDKnkSMzOfKDiNAjO3bsKEcC1eHWTGxWE52ZT7hy5UrPrmeprqmpVvIEJUdqcj5IRhDVod+DBw929PNzwlokRogIPZIVOXMQuSUkOdRajU6yFU9gTpw40ZUPbm4mj1E9ToLy8OHDpr/iYiL5/uqQ8VQ8d0Sk6/MMU/V93TxVffyh1sQkEcmVtRmRdLoidrosMuGak9Q6/Rl3794t/9y6das3pIjMLtkd6OTErXY/davS7LNFJhuTvJ7sVmTeot5JYM3mW6bjVzvkOVcfv+haGxGZdapL26dKs88WmWxMct5G9YlkWTHbOQU8k7Wd7o40khFSdRFfvZFPNVFcjWQQkVml2or/TlHMxGaua8mnpdX7VLSJ5DTzXlxz0mi0l+ebOZxu7+oxeX0/3jyjFsPsk8OcE1270un8RisrZ69/7+1U/F7d6hwaV/GKCDADzLEIABEBRAQQEUBEAEQEEBFARAARARARQEQAEQFEBEBEABEBRAQQEQARAUQEEBFARAARARARQEQAEQFEBEBEABEBRAQQEQARAUQEEBFARABEBBARQEQAEQH+aHN/3P5nMQCd+leAAQDkrUiu+SmooQAAAABJRU5ErkJggg==',
      imgUrl: '',
    };
  },
  methods: {
    uploadFunc() {
      let postData = {
        fileName: this.imgName,
        uploadFile: this.imgBase64,
      };
      let url = process.env.UPLOAD_HOST + '/Base64Upload';
      ajax.request({
        url: url,
        method: 'post',
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Content-Type': 'multipart/form-data',
        },
        data: postData
      }).then((res) => {
        if (res.status === 200) {
          console.log(res.data);
        }
      });
    },
    getwxticket() {
      let access_token = 'HoagFKDcsGMVCIY2vOjf9psmjJ0s8Z8Xy2c4DoU8uBaS9kwfs_UUeRYV033sU0OaEtrGM4xUuxzHGQnRC7P44w';
      let url = `https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token${access_token}`;
      ajax.post(url, {
        expire_seconds: 604800,
        action_name: 'QR_SCENE',
        action_info: {
          scene_id: 123
        }
      }).then((res) => {
        console.log(res);
      });
    },
    onUploadFile(event) {
      let _self = this;
      let uploadFile = event.currentTarget;
      // 转化为MB
      let size = Math.ceil(uploadFile.size / 1024 / 1024);

      // 上传文件大小不能大于15M
      if (size >= 15) {
        alert('上传的文件大于10M, 请重新选择文件');
        return;
      }
      for (let i = 0; i < uploadFile.files.length; i++) {
        uploader.uploadFile(uploadFile.files[i]).then((res) => {
          if (res) {
            _self.imgUrl = res.url;
          }
        });
      }

      document.forms['webuploader_form'].reset();
    },
  },
};
</script>
<style lang="less" scoped>
      .webuploader {
        width: .56rem;
        height: .56rem;
        margin-right: .1rem;
        .add {
          margin-left: 10px;
        }
      }
</style>
