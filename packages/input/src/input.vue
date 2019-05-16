<template>
  <div class="l-input" :class="{'animation-label':animation}">
    <input
      ref="input"
      :type="type"
      :value="value"
      :disabled="disabled"
      :animation="animation"
      v-bind="$attrs"
      @input="handleInput"
      @blur="handleBlur"
    >
    <label
      v-if="label"
      :style="{width:`${labelWidth}px`}"
      :class="{
          'label-fixed':animation && (labelFixed || value), //浮动动画控制
          'lable-center':!animation
        }"
    >
      <span>{{label}}</span>
    </label>
  </div>
</template>
<script>
import Emitter from "~/utils/mixins/emitter";

export default {
  name: "LInput",
  mixins: [Emitter],
  inject:{
    formLabelId:{
      from:'formLabelId',
      default:''
    }
  },
  props: {
    disabled: Boolean,
    animation: Boolean,
    value: [String, Number],
    type: {
      type: String,
      default: "text"
    },
    label: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: [String, Number],
      default: 40
    }
  },
  data() {
    return {
      labelFixed: false
    };
  },
  mounted() {
    if (this.formLabelId) this.$refs.input.id = this.formLabelId; //解决多组件嵌套下forId值定位错误bug
    // if (this.$parent.labelFor) this.$refs.input.id = this.$parent.labelFor;
  },
  methods: {
    handleInput(event) {
      let value = event.target.value;
      this.$emit("input", value); //必须为原生事件传递
      this.dispatch("LFormItem", "form-change", value);

      if (value && this.animation) this.labelFixed = true;
      else this.labelFixed = false;
    },
    handleBlur() {
      this.dispatch("LFormItem", "form-blur", this.value);
    }
  }
};
</script>

<style lang='scss' scoped>
$_height: 40px;
.l-input {
  position: relative;
  color: #979797;
  background: #fff;
  display: inline-block;
  height: $_height;

  input {
    height: $_height;
    color: #979797;
    padding: 0 12px;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    width: 180px;
    outline: 0;
    &:disabled {
      cursor: not-allowed;
      background-color: rgb(245, 247, 250);
    }
  }

  label {
    float: left;
    height: $_height;
  }

  .lable-center {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
  }

  .label-fixed {
    top: -($_height/5);
    font-size: 12px;
    background: #fff;
  }
}

.animation-label {
  input {
    &:hover + label,
    &:focus + label {
      top: -($_height/5);
      font-size: 12px;
      background: #fff;
    }
  }

  label {
    height: $_height/4;
    position: absolute;
    top: $_height/4;
    left: 7px;
    padding: 0 5px;
    transition: top 0.5s, font-size 0.3s;
  }
}
</style>