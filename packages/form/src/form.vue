<template>
  <form v-bind="$attrs">
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: "LForm",
  props: {
    model: Object,
    rules: Object
  },
  data() {
    return {
      fields: []
    };
  },
  provide() {
    return {
      //form 标识，类似于ID
      form: this
    };
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.$on("form-add", field => {
      if (field) this.fields.push(field);
    });

    this.$on("form-remove", field => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field, 1));
    });
  },
  methods: {
    resetFields() {
      this.fields.forEach(field => field.resetField());
    },
    validate(cb) {
      return new Promise(resolve => {
        let valid = true;
        let count = 0;
        this.fields.forEach(field => {
          field.validate("", error => {
            if (error) valid = false;
            if (++count === this.fields.length) {
              resolve(valid);
              if (typeof cb === "function") cb(valid);
            }
          });
        });
      });
    }
  }
};
</script>

<style lang='scss' scoped>
</style>