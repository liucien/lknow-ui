<template>
  <div class="l-form-item">
    <label
      v-if="label"
      :for="formLabelId"
      :class="{
        'l-form-item-label':true,
        'label-required':isRequired
      }"
    >{{label}}</label>
    <slot></slot>
  </div>
</template>

<script>
import Emitter from "~/utils/mixins/emitter";
import AsyncValidator from "async-validator";

export default {
  name: "LFormItem",
  mixins: [Emitter], //混入，来分发 Vue 组件中的可复用功能
  inject: ["form"],
  provide() {
    return {
      formLabelId: this.formLabelId,
      formItmeInitData: this.$data //引用的是$data对象的地址，此时message有响应式getter与setter，可实现响应式
      // message:this.message, //指向的是String字符串，返回是个初始值
    };
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: String
  },
  data() {
    return {
      isRequired: false,
      message: "",
      formLabelId: `input_${Math.random(new Date().valueOf()) * 1e17 +
        new Date().valueOf()}` //生成唯一ID
    };
  },
  computed: {
    fieldValue() {
      return this.form.model[this.prop];
    }
  },
  mounted() {
    if (this.prop) {
      this.dispatch("LForm", "form-add", this);
      this.initialValue = this.fieldValue;
      this.setRules();
    }
  }, //生命周期 - 挂载完成（可以访问DOM元素）
  beforeDestroy() {
    this.dispatch("LForm", "form-remove", this);
  },
  methods: {
    getRules() {
      let formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return formRules;
    },
    setRules() {
      let rules = this.getRules();
      if (rules.length) {
        rules.forEach(rule => {
          if (rule.required !== undefined) this.isRequired = rule.required;
        });
      }
      this.$on("form-blur", this.onFieldBlur);
      this.$on("form-change", this.onFieldChange);
    },
    // 过滤出符合要求的 rule 规则
    getFilteredRule(trigger) {
      const rules = this.getRules(trigger);
      return rules.filter(
        rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      );
    },
    /**
     * 校验表单数据
     * @param trigger 触发校验类型
     * @param callback 回调函数
     */
    validate(trigger, cb) {
      let rules = this.getFilteredRule(trigger);
      if (!rules || rules.length === 0) return true;

      // 使用 async-validator
      let model = { [this.prop]: this.fieldValue };
      const validator = new AsyncValidator({ [this.prop]: rules });
      validator.validate(model, { firstFields: true }, errors => {
        this.message = errors ? errors[0].message : "";
        if (cb) cb(this.message);
      });
    },
    resetField() {
      this.message = "";
      this.form.model[this.prop] = this.initialValue;
    },
    onFieldBlur() {
      this.validate("blur");
    },
    onFieldChange() {
      this.validate("change");
    }
  }
};
</script>

<style lang='scss' scoped>
.l-form-item {
  margin-bottom: 20px;
  .l-form-item-label {
    color: #979797;
    display: inline-block;
  }
  .label-required:before {
    content: "*";
    color: #f56c6c;
  }
}
</style>