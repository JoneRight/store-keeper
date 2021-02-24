<template>
  <div class="avue-top">
    <div class="top-bar__left">
      <div
        class="avue-breadcrumb"
        :class="[{ 'avue-breadcrumb--active': isCollapse }]"
        v-if="showCollapse"
      >
        <i class="icon-navicon" @click="setCollapse"></i>
      </div>
    </div>
    <div class="top-bar__title">
      <div class="top-bar__item top-bar__item--show" v-if="showMenu">
        <top-menu></top-menu>
      </div>

      <div class="top-bar__item top-bar__item--show top-bar__title_item export">
        <el-dropdown @command="exportClickHandler">
          <el-button type="primary">
            导出模板<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <!-- TODO 这里是否需要根据后台获取参数 -->
            <el-dropdown-item command="员工信息">员工信息</el-dropdown-item>
            <el-dropdown-item command="物料信息">物料信息</el-dropdown-item>
            <el-dropdown-item command="入库单">入库单</el-dropdown-item>
            <el-dropdown-item command="出库单">出库单</el-dropdown-item>
            <el-dropdown-item command="盘点单">盘点单</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div
        class="top-bar__item top-bar__item--show top-bar__title_item message"
      >
        <i class="icon-xiaoxiguanli"></i>
        <span>消息</span>
      </div>
      <div
        class="top-bar__item top-bar__item--show top-bar__title_item message"
      >
        <i class="icon-wenhao"></i>
        <span>帮助</span>
      </div>
      <div
        class="top-bar__item top-bar__item--show top-bar__title_item message"
      >
        <el-dropdown>
          <div>
            <i class="icon-touxaing"></i>
            <!-- TODO 后期要改这里 -->
            <!-- <span>{{ userInfo.username }}</span> -->
            <span>admin</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/">账户设置</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/info/index">修改密码</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div
        class="top-bar__item top-bar__item--show top-bar__title_item message"
        @click="logout"
        divided
      >
        <i class="icon-tuichu"></i>
        <span>退出</span>
      </div>
    </div>
    <div class="top-bar__right">
      <el-tooltip
        v-if="showLock"
        effect="dark"
        content="锁屏"
        placement="bottom"
      >
      </el-tooltip>
      <el-tooltip
        v-if="showFullScren"
        effect="dark"
        :content="isFullScreen ? '退出全屏' : '全屏'"
        placement="bottom"
      >
        <div class="top-bar__item">
          <i
            :class="isFullScreen ? 'icon-zuixiaohua' : 'icon-quanpingzuidahua'"
            @click="handleScreen"
          ></i>
        </div>
      </el-tooltip>
      <!-- <el-dropdown>
        <span class="el-dropdown-link">
          {{ userInfo.username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">首页</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/info/index">个人信息</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout" divided
            >退出系统
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { fullscreenToggel, listenfullscreen } from "@/util/util";
import topMenu from "./top-menu";

export default {
  components: {
    topMenu
  },
  name: "top",
  data() {
    return {};
  },
  filters: {},
  created() {},
  mounted() {
    listenfullscreen(this.setScreen);
  },
  computed: {
    ...mapState({
      showLock: state => state.common.showLock,
      showFullScren: state => state.common.showFullScren,
      showCollapse: state => state.common.showCollapse,
      showMenu: state => state.common.showMenu
    }),
    ...mapGetters([
      "userInfo",
      "isFullScreen",
      "tagWel",
      "tagList",
      "isCollapse",
      "tag",
      "logsLen",
      "logsFlag"
    ])
  },
  methods: {
    handleScreen() {
      fullscreenToggel();
    },
    setCollapse() {
      this.$store.commit("SET_COLLAPSE");
    },
    setScreen() {
      this.$store.commit("SET_FULLSCREN");
    },
    logout() {
      this.$confirm("是否退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          this.$router.push({ path: "/login" });
        });
      });
    },
    exportClickHandler(commend) {
      console.log(`导出${commend}模板`);
    }
  }
};
</script>
<style lang="scss" scoped>
.avue-top {
  .top-bar__item.top-bar__item--show.top-bar__title_item {
    float: left;
    margin-top: 5px;
    margin-right: 20px;
  }
  .message {
    i,
    span {
      line-height: 35px;
    }
  }
  .export {
    margin-left: 715px;
  }
}
</style>
