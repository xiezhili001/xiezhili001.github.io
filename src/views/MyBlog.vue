<template>
  <div class="zl-MyBlog">
    <el-tabs tab-position="left" style="height: 200px;">
      <el-tab-pane label="全部">
        <div class="blogList" v-show="blogListShow">
          <div class="blogListItem" @click="showDetail">
            <header>js单线程（Event Loop）</header>
            <content>
              同步 - 微任务 - 宏任务
              宏任务和微任务 定时器宏任务 promise 微任务 微任务先执行
              node 1 2 3
              浏览器 1 3 2 微任务会执行在当前队列的末尾（宏任务单独执行）
              多个宏任务浏览器和node执行不一样
            </content>
          </div>
          <div class="blogListItem">
            <header>js单线程（Event Loop）</header>
            <content>
              同步 - 微任务 - 宏任务
              宏任务和微任务 定时器宏任务 promise 微任务 微任务先执行
              node 1 2 3
              浏览器 1 3 2 微任务会执行在当前队列的末尾（宏任务单独执行）
              多个宏任务浏览器和node执行不一样
            </content>
          </div>
        </div>
        <div class="blogdetail markdown-body" v-show="!blogListShow">
          <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
          <div data-v-f49bc018 class="v-note-read-content">
            <blockquote>
              <p>js 运行的顺序 同步→异步（微任务→宏任务）</p>
            </blockquote>
            <p>
              先执行全局的同步代码，在node中从微任务队列中依次取出所有的任务放入调用栈中执行，然后开始宏任务，宏任务队列中的所有任务都取出来执行（
              <strong>在浏览器中，浏览器只取一个，执行完一个宏任务后再执行下一个</strong>），每个宏任务阶段执行完毕后，开始执行微任务，再开始执行下一阶段宏任务，以此构成事件循环
            </p>
            <ul>
              <li>
                <p>node中 同步→所有微任务→所有宏任务（同步→所有微任务→所有宏任务）</p>
              </li>
              <li>
                <p>浏览器中 同步→所有微任务→单个宏任务（同步→所有微任务→单个宏任务)</p>
              </li>
            </ul>
            <h3>
              <a id="_8"></a>宏任务
            </h3>
            <p>一些异步任务的回调会依次进入宏任务队列，等待后续被调用，包括setTimeout setInterval等。</p>
            <h3>
              <a id="_12"></a>微任务
            </h3>
            <p>一些异步任务的回调会依次进入微任务，等待后续被调用，包括process.nextTick (Node独有) Promise.then() Object.observe等。</p>
            <pre><div class="hljs"><code class="lang-js">setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
    <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">3</span>).then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(data))
},<span class="hljs-number">0</span>);
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)
},<span class="hljs-number">0</span>)
<span class="hljs-comment">// node 1 2 3 浏览器 1 3 2</span>
</code></div></pre>
            <h3>
              <a id="_27"></a>总结
            </h3>
            <ul>
              <li>定时器宏任务 promise微任务 微任务先执行</li>
              <li>在浏览器是宏任务单独执行，node中是同时执行的</li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="js">配置管理</el-tab-pane>
      <el-tab-pane label="jq">角色管理</el-tab-pane>
      <el-tab-pane label="css">定时任务补偿</el-tab-pane>
      <el-tab-pane label="vue(1)"></el-tab-pane>
    </el-tabs>
    <div v-show="false">
      <mavonEditor></mavonEditor>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { mavonEditor } from "mavon-editor";
import zlHeader from "../component/Header.vue";
import "mavon-editor/dist/css/index.css";
export default {
  name: "MyBlog",
  data() {
    return {
      blogListShow: true
    };
  },
  components: {
    mavonEditor
  },
  methods: {
    showDetail() {
      this.blogListShow = false;
    }
  }
};
</script>

<style lang="scss">
@import "../static/css/color.scss";
.zl-MyBlog {
  height: 100%;
  .el-tabs--left {
    height: 100% !important;
  }
  .blogdetail {
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    border-radius: 4px;
    height: 100%;
    overflow: auto;
  }
  .blogListItem {
    background: #fff;
    width: 100%;
    border-radius: 4px;
    border-bottom: 1px solid #ededed;
    height: 80px;
    font-size: 14px;
    padding: 6px 10px;
    cursor: pointer;
    &:hover {
      background: #f5f6f7;
    }
    header {
      color: #3d3d3d;
      font-size: 18px;
      font-weight: 700;
    }
    content {
      font-size: 14px;
      color: #6b6b6b;
    }
  }
  .blogList {
    display: flex;
    height: 100%;
    flex-direction: column;
  }
  .el-tab-pane {
    padding-top: 10px;
    padding-right: 10px;
  }
  .el-tabs__nav-scroll {
    width: 120px;
    background: #fff;
  }
  .el-tabs__content {
    overflow: auto;
    height: 100%;
  }
}
</style>
