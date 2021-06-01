<template>
  <div class="footer-nav">
    <span
      v-if="leftNav"
      class="footer-nav-link footer-nav-left"
      @click="handleNavClick('prev')">
      <i class="el-icon-arrow-left"></i>
      {{ leftNav.title || leftNav.name }}
    </span>
    <span
      v-if="rightNav"
      class="footer-nav-link footer-nav-right"
      @click="handleNavClick('next')">
      {{ rightNav.title || rightNav.name }}
      <i class="el-icon-arrow-right"></i>
    </span>
  </div>
</template>

<style lang="scss">
  .footer-nav {
    padding: 40px 0;
    color: #333;
    font-size: 14px;
    
    &::after {
      content: '';
      display: block;
      clear: both;
    }
     
    & i {
      transition: .3s;
      color: #999;
      vertical-align: baseline;
    }
  }
  
  .footer-nav-link {
    cursor: pointer;
    transition: .3s;
    
    &:hover {
      color: #409EFF;
     
      & i {
        color: #409EFF;
      }
    }
  }
  
  .footer-nav-left {
    float: left;
    margin-left: -4px;
  }
  
  .footer-nav-right {
    float: right;
    margin-right: -4px;
  }
</style>

<script>
  import navConfig from '../nav.config.json';
  // 深度遍历对象,并执行一些操作
  function traversal(obj, hooks) {
    const _toString = Object.prototype.toString;
    const n = undefined;
    // null, undefined, non-object, function
    if (!obj || typeof obj !== 'object') {
      return n;
    }

    // DOM Node
    if (obj.nodeType && 'cloneNode' in obj) {
      return n;
    }

    // Date
    if (_toString.call(obj) === '[object Date]') {
      return n;
    }

    // RegExp
    if (_toString.call(obj) === '[object RegExp]') {
      return n;
    }

    // const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}

    for (const key in obj) {
      if (hooks[key]) {
        hooks[key](obj);
      }
      traversal(obj[key], hooks);
    }
    return n;
  }
  export default {
    data() {
      return {
        currentComponent: null,
        nav: [],
        currentIndex: -1,
        leftNav: null,
        rightNav: null
      };
    },

    computed: {
      lang() {
        return this.$route.meta.lang;
      }
    },

    watch: {
      '$route.path'() {
        this.setNav();
        this.updateNav();
      }
    },

    methods: {
      setNav() {
        let nav = navConfig[this.lang];
        const arr = [];
        traversal(nav, {
          path: (data)=>{
            arr.push(data);
          }
        });
        this.nav = arr;
      },

      updateNav() {
        this.currentComponent = '/' + this.$route.path.split('/')[3];
        for (let i = 0, len = this.nav.length; i < len; i++) {
          if (this.nav[i].path === this.currentComponent) {
            this.currentIndex = i;
            break;
          }
        }
        this.leftNav = this.nav[this.currentIndex - 1];
        this.rightNav = this.nav[this.currentIndex + 1];
      },

      handleNavClick(direction) {
        this.$router.push(`/${ this.lang }/component${ direction === 'prev' ? this.leftNav.path : this.rightNav.path }`);
      }
    },

    created() {
      this.setNav();
      this.updateNav();
    }
  };
</script>