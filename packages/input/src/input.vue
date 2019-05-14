<template>
  <div class="l-input" :class="[
        {'animation-label':animation}
    ]">
    <label :for="id">标题</label>
    <input
      :disabled="disabled"
      :animation="animation"
      :type="type"
      :id="id"
      v-bind="$attrs"
      v-on="$listeners"
      @input="handleInput"
    >
    <label :for="id" :class="{'label-fixed':labelFixed}">{{label}}</label>
  </div>
</template>
<script>
export default {
  name: "LInput",
  props: {
    disabled: Boolean,
    animation: Boolean,
    type: {
      type: String,
      default: "text"
    },
    id: {
      type: String,
      default: "id"
    },
    label: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      labelFixed: false
    };
  },
  methods: {
    handleInput(event) {
      let value = event.target.value;
      this.$emit("on-change", value);

      if (value && this.animation) {
        this.labelFixed = !this.labelFixed;
      } else {
        this.labelFixed = !this.labelFixed;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.l-input {
  position: relative;
  margin-bottom: 20px;
  color: #979797;
  background: #fff;
  input {
    color: #979797;
    height: 45px;
    padding: 0 12px;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    width: 240px;
    outline: 0;
  }

  label {
    float: left;
    // margin-top: 10px;
  }
  .label-fixed {
    top: -9px;
    font-size: 12px;
    background: #fff;
  }
}
.animation-label {
  input {
    &:hover + label,
    &:focus + label {
      top: -9px;
      font-size: 12px;
      background: #fff;
    }
  }
  label {
    // margin-top: 0;
    position: absolute;
    top: 14px;
    left: 7px;
    padding: 0 5px;
    transition: top 0.5s, font-size 0.3s;
  }
}
</style>