<template>
  <div id="app">
    <el-container>
      <el-header style="height: 150px;padding: 0px">
        <div class="header_warp">
          <!--{{ $t('stas') }}-->
          <div class="nav-warp">
            <div class="nav-item" :class="this.$route.path==='/run'?'item-active':''" @click="selectPage('/run')">
              {{$t('tab.tab1')}}
            </div>
            <div class="nav-mid-warp">
              <div class="nav-item" :class="this.$route.path==='/equipment'?'item-active':''"
                   @click="selectPage('/equipment')"> {{$t('tab.tab2')}}
              </div>
              <div class="nav-item" :class="this.$route.path==='/performance'?'item-active':''"
                   @click="selectPage('/performance')">{{$t('tab.tab3')}}
              </div>
            </div>
            <div class="nav-item" :class="this.$route.path==='/test'?'item-active':''" @click="selectPage('/test')">
              {{$t('tab.tab4')}}
            </div>
          </div>
          <div class="setting-warp">
            <img class="eqit" src="../static/img/eqit.png" alt="">
            <el-dropdown class="header_user langbox" trigger="click" @command="langCommand">
              <span class="el-dropdown-link">
                        <!--{{ $t('lang') }}-->
                      <img src="../static/img/lang.png" alt="">
                    </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="cn">简体中文</el-dropdown-item>
                <el-dropdown-item command="ct">繁體中文</el-dropdown-item>
                <el-dropdown-item command="en">English</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="user-name">Administrator</div>

          </div>
        </div>
      </el-header>
      <div class="router-warp" :style="{'minHeight':aheight}">
        <el-container>
          <el-main>
            <transition name="fade">
              <router-view/>
            </transition>
          </el-main>
        </el-container>
      </div>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "App",
    data() {
      return {
        config: {
          // 设置默认侧边栏是否收缩
          isCollapse: true,
          // 设置默认语言
          langdata: "cn",
          aheight: '200px'
        }
      }
    },
    mounted() {
      let height = window.screen.availHeight - 160
      this.$nextTick(() => {
        this.aheight = height + 'px'
      })
      console.log(height);

    },
    methods: {
      selectPage(e) {
        this.$router.push(e)
      },
      langCommand(command) {
        this.$i18n.locale = command;
        this.config.langdata = command;
        localStorage.setItem("config", JSON.stringify(this.config));
        this.$notify({
          title: '提示',
          message: '语言切换为' + command,
          type: 'success',
          offset: 60
        });
      }
    },
    created: function () {
      let config = JSON.parse(localStorage.getItem("config"))
      if (config != null) {
        this.config = config;
        this.config.isCollapse = config.isCollapse;
        this.$i18n.locale = config.langdata;item-btn-warp
      } else {
        localStorage.setItem("config", JSON.stringify(this.config))
      }
    }
  };
</script>

<style>
  body {
    height: 100%;
    margin: 0;
  }

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-width: 1200px;
  }

  .header_warp {
    background: url("/static/img/title-bg.png") 100%;
    background-position: center;
    width: 100%;
    height: 150px;
    position: relative;
    float: left;
  }

  .router-warp {
    height: 100%;
    background: url("/static/img/bg.png") 100% no-repeat;
    background-size: cover;
    width: 100%;
    position: relative;

  }

  .nav-warp {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 720px;
    height: 45px;
    margin: 0 auto;
  }

  .nav-mid-warp {
    position: absolute;
    left: 50%;
    top: 30px;
    transform: translateX(-50%);
    width: 320px;
    height: 45px;
    margin: 0 auto;
  }

  .nav-item {
    float: left;
    font-size: 26px;
    line-height: 50px;
    letter-spacing: 0px;
    color: #2881d4;
    padding: 0 5px;
    cursor: pointer;
  }

  .item-active {
    font-size: 26px;
    color: #4be3ef;
    border-bottom: 3px solid #4be3ef;
  }

  .nav-item:first-child {
    float: left;
  }

  .nav-item:last-child {
    float: right;
  }

  .setting-warp {
    position: absolute;
    right: 30px;
    top: 20px;
    width: 300px;
    height: 45px;
  }

  .eqit {
    float: right;
  }

  .user-name {
    color: #fff;
    float: right;
    margin-right: 20px;
  }

  .header_user {
    float: right;
  }

  .header_user span {
    color: #fff;
    cursor: pointer;
  }

  .langbox {
    margin-right: 20px;
  }


</style>
