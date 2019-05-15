<template>
  <div class="input">
    <input
      :animation="animation"
      :type="type"
      :disabled="disabled"
      v-bind="$attrs"
      :value="currentValue"
      @input="handleInput"
      ref="input"
    >
    <label
      :style="{width:`${labelWidth}px`}"
      :class="{
          'label-fixed':labelFixed || value,
          'lable-center':!animation
        }"
    >
      <span>{{label}}</span>
    </label>
  </div>
</template>
<script>
export default {
  name: "LvInput",
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
      currentValue:
        this.value === undefined || this.value === null ? "" : this.value,
        labelFixed: false
    };
  },
  watch: {
    value(val, oldVal) {
      this.setCurrentValue(val);
    }
  },
  methods: {
    handleInput(event) {
      const value = event.target.value;
      this.setCurrentValue(value);
      this.$emit("input", value);
      if (value && this.animation) {
        this.labelFixed = true;
      } else {
        this.labelFixed = false;
      }
    },
    setCurrentValue(value) {
      this.currentValue = value;
    }
  }
};
</script>

<style lang='scss' scoped>
$_height: 40px;
.l-input {
  position: relative;
  margin-bottom: 20px;
  color: #979797;
  background: #fff;
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