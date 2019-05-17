<template>
  <div class="l-input" :class="{'animation-label':animation}">
    <input
      ref="input"
      :style="{borderColor: message ? '#f56c6c' : ''}"
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
      :class="{
          'label-fixed':animation && (labelFixed || value), //浮动动画控制
          'lable-center':!animation
        }"
    >
      <span>{{label}}</span>
    </label>
    <div v-if="message" class="message">{{message}}</div>
  </div>
</template>
<script>
import Emitter from "~/utils/mixins/emitter";

export default {
  name: "LInput",
  mixins: [Emitter],
  inject: {
    formItmeInitData: {
      from: "formItmeInitData",
      default: {}
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
      labelFixed: false,
      message: ""
    };
  },
  mounted() {
    if (this.formItmeInitData.formLabelId)
      this.$refs.input.id = this.formItmeInitData.formLabelId; //解决多组件嵌套下forId值定位错误
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
  },
  watch: {
    formItmeInitData: {
      handler(val, oldVal) {
        this.message = val.message; //观察值得变化，不然能打印出对象而无法取到具体变化得值（可直接作用于template）
      },
      deep: true
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

  .message {
    font-size: 12px;
    color: #f56c6c;
    display: table;
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