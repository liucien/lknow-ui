<template>
  <button
    class="l-button"
    @click="handleClick"
    :disabled="disabled"
    :style="{fontSize:`${fontSize}px`}"
    :class="[
      type ? 'l-button-' + type : '',
      {
        'is-disabled':disabled,
        'jelly-button':animation && !disabled
      }
    ]"
  >
    <i class="iconfont icon-sync l-icon-loading" v-if="loading && disabled"></i>
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "LButton",
  props: {
    type: {
      type: String,
      default: "default"
    },
    fontSize: {
      type: [String, Number],
      default: 14
    },
    loading: Boolean,
    animation: Boolean,
    disabled: Boolean
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    }
  }
};
</script>

<style lang="scss" scoped>
.l-button {
  color: rgba(0, 0, 0, 0.65);
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  padding: 12px 20px;
  // font-size: inherit;
  font-family: inherit;
  cursor: pointer;
  outline: none; //去除原生按钮点击后的蓝框
  position: relative;
  &:hover {
    opacity: 0.9;
  }
  &:after {
    content: "";
    display: block;
    position: absolute;
    //扩大伪类元素4个方向各10px
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    pointer-events: none;
    background-color: #c3c3c3;
    background-repeat: no-repeat;
    background-position: 50%;
    opacity: 0;
    transition: all 0.3s;
  }
  &:active:after {
    opacity: 0.3;
    //设置初始状态
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: 0s;
  }
}

//禁用
.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
  &:hover {
    opacity: 0.5;//hover状态下设为一样，减少逻辑冲突
  }
}

//按钮样式
.l-button-primary {
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
}
.l-button-success {
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
}
.l-button-warning {
    color: #fff;
    background-color: #e6a23c;
    border-color: #e6a23c;
}
.l-button-error {
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;
}
//果冻动画
.jelly-button {
  &:hover {
    animation: jelly 0.5s;
  }
  @keyframes jelly {
    0%,
    100% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(0.9, 1.1);
    }
    50% {
      transform: scale(1.1, 0.9);
    }
    75% {
      transform: scale(0.95, 1.05);
    }
  }
}

.l-icon-loading{
  display: inline-block;
  padding: 0 2px;
  animation: loading 1s ease-in-out infinite;
  @keyframes loading {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
//loading
</style>