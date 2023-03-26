<template>
  <div class="list">
    <van-cell-group title="视频列表" inset>
      <van-cell
      v-for="(item, index) in videoList"
      :key="index"
      :title="item.name"
      :url='urlHandler(item.url)'
      icon="video"
      is-link
      >
      <template #right-icon>
        <div class="iconGroup">
          <van-button>
            <i class="iconfont icon-bofang1"></i>
          </van-button>
          <van-button>
            <i class="iconfont icon-download"></i>
          </van-button>
        </div>
      </template>
    </van-cell>
    </van-cell-group>
    <van-loading class="loadingIns" color="#1989fa" v-if="ifLoading" />
  </div>
</template>

<script>
import { Toast } from 'vant'

  export default {
    name: 'videoList',
    data () {
      return {
        videoList: [
          {
            "name": "bbnb.mp4",
            "url":"../video/bbnb.mp4"
          },
          {
            "name":"xxx.webm",
            "url":"../video/xxx.webm"
          },
          {
            "name":"In The End - Linkin Park.webm",
            "url":"../video/In The End - Linkin Park.webm"
          }
        ],
        ifLoading: true,
        // ip: 'http://localhost:7891',
        ip: 'https://new.feena.site:7891',
      }
    },
    methods: {
      urlHandler (str) {
        return `/#/videoPlay?url=${str}`
      }
    },
    mounted () {},
    created () {
      const _self = this
      this.$axios({
        method: 'get',
        url: `${_self.ip}/videoList`,
      }).then((res) => {
        this.ifLoading = false
        this.videoList = res.data.videoList
      }).catch((err) => {
        this.ifLoading = false
        // window.alert(err)
        Toast('获取列表失败')
        console.log(err)
      })
    },
  }
</script>

<style lang="less" scoped>
.van-cell-group__title {
  font-size: 14px;
}
.van-cell {
  height: 6vh;
  display: flex;
  align-items: center;
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
  .van-cell__title {
    text-align: left;
    padding: 0 5vw;
    // margin-right: 30px;
    // overflow: hidden;
    // max-width: 100%;
    >span {
      max-height: 100%;
      display: block;
      width:200px;
      word-break: break-all;
      white-space:nowrap;
      text-overflow:ellipsis;
      overflow: hidden;
    }
  }
}
.loadingIns {
  position: absolute;
  top: 50%;
  left: 50%;
}
.van-icon-video {
  color: blue;
}

.iconGroup {
  i {
    margin-right: 20px;
  }
}
</style>