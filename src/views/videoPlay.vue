<template>
  <div class="home">
    <video
    ref="video"
    loop="loop"
    :controls="controls"
    :poster="current.thumbnail"
    preload="metadata">
      <source :src="current.url" type="video/mp4"/>
    </video>
    <div class="info">
      <div>
        <i class="iconfont icon-duomeit"></i>
        <span>{{current.name}}</span>
      </div>
      <button>
        <i class="iconfont icon-download" @click="download(current)"></i>
      </button>
    </div>
    <van-divider />
    <div class="recommend">
      <h4>更多推荐</h4>
      <div class="container">
        <div
        class="item"
        v-for="(item, index) in videoList"
        :key="index"
        @click="jumpTo(item.cv)">
          <img :src="item.thumbnail" alt="">
          <h3>{{ item.name }}</h3>
        </div>
      </div>
    </div>
    <van-loading class="loadingIns" color="#1989fa" v-if="ifLoading" />
  </div>
</template>

<script>
import { Toast } from 'vant'
import { mapState } from 'vuex'
// @ is an alias to /src

export default {
  name: 'videoPlay',
  computed: {
    ...mapState(['ip'])
  },
  data () {
    return {
      current: {
        url: '',
        name: '',
        cv: '',
        thumbnail: '',
      },
      controls: {
        type: Boolean,
        required: false,
        default: true
      },
      videoList: [
        // {
        //   "name": "bbnb",
        //   "url":"../video/bbnb.mp4"
        // },
        // {
        //   "name":"xxx",
        //   "url":"../video/xxx.webm"
        // },
        // {
        //   "name":"In The End - Linkin Park11111111",
        //   "url":"../video/In The End - Linkin Park.webm"
        // }
      ],
      ifLoading: true,
    }
  },
  methods: {
    init () {
      const _self = this
      // test
      // this.current = this.videoList[0]
      // console.log(this.current)
      // 获取视频列表
      this.$axios({
        method: 'get',
        url: `${_self.ip}/videoList`,
      }).then((res) => {
        this.ifLoading = false

        const cv = Number(this.$route.path.split('/cv')[1])
        const arr = res.data.videoList
        if (arr.length < cv) {
          Toast('当前视频不存在')
          this.videoList = arr
        } else {
          this.current = arr[cv]
          arr.splice(cv, 1)
          this.videoList = arr

          this.$refs['video'].load()

          console.log(this.current)
        }
      }).catch((err) => {
        this.ifLoading = false
        // window.alert(err)
        Toast('获取列表失败')
        console.log(err)
      })
    },
    jumpTo (v) {
      this.$router.push('/videoPlay/cv' + v)
    },
    download (obj) {
      if ('download' in document.createElement('a')) {
        const elink = document.createElement('a')
        elink.download = obj.name
        elink.style.display = 'none'
        elink.href = obj.url
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href)
        document.body.removeChild(elink)
      }
    }
  },
  created () {
    this.init()
  },
  watch: {
    '$route': function () {
      this.init()
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  video {
    display: block;
    width: 100vw;
    height: 50vh;
    background-color: black;
    // object-fit: cover;
    &:focus {
      outline: -webkit-focus-ring-color auto 0px;
    }
  }
  .info {
    width: 100%;
    padding: 20px 40px;
    color: #000000;
    font-size: 34px;
    display: flex;
    justify-content: space-between;
    >div {
      display: flex;
      flex: 1;
      align-items: center;
      i {
        font-size: 48px;
        margin-right: 12px;
        color: blue;
      }
      span {
        width: 450px;
        padding-right: 20px;
        word-break: break-all;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
      }
    }
    >button {
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ececec;
      border-radius: 50%;
      cursor: pointer;
      // box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.1);
      i {
        color: #000;
        font-size: 30px;  
      }
    }
  }
  .recommend {
    padding-top: 40px;
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    h4 {
      font-size: 24px;
      color: #666;
    }
    .container {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      .item {
        width: 290px;
        height: auto;
        margin-right: 40px;
        margin-bottom: 30px;
        img {
          width: 100%;
          height: 189px;
          border: 0px;
          border-radius: 5px;
        }
        h3 {
          margin-top: 40px;
          color: #000;
          height: 120px;
          max-height: 120px;
          font-size: 34px;
          font-weight: 500;
          word-break: break-all;
          white-space:nowrap;
          text-overflow:ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
.loadingIns {
  position: absolute;
  top: 50%;
  left: 50%;
}

.van-divider {
  width: 100%;
  margin: 0;
}
</style>