<template>
  <div>
    <l-button>default</l-button>
    <l-button animation :disabled="true" @click="test1()">disabled</l-button>
    <l-button animation>animation</l-button>
    <l-button animation type="primary" fontSize="10" disabled>primary</l-button>
    <l-button animation type="primary" fontSize="10">primary</l-button>
    <l-button animation type="error" fontSize="10">primary</l-button>
    <l-button animation type="error" fontSize="10" loading disabled>primary</l-button>
    <l-button animation type="error" fontSize="14" loading disabled circle icon="icon-plus"></l-button>
    <l-button animation type="error" fontSize="16" circle icon="icon-plus" @click="plus(111)"></l-button>
    <div class="out-line"></div>
    <l-input v-model="testVal" label="标题标题标题" label-width="60"></l-input>
    <div>双向绑定：{{testVal}}</div>
    <l-input @input="test" label="标题" v-model="testVal"></l-input>
    <l-input @input="test" label="密码" type="password" required></l-input>
    <l-input @input="test" label="密码" type="month"></l-input>
    <l-input @input="test" animation label="标题标题标题标题" v-model="animationVal"></l-input>
    <div>{{animationVal}}</div>
    <div class="out-line"></div>
    <l-form ref="form" :model="formData" :rules="rules">
      <l-form-item label="测试：">
        <l-input v-model="formData.test"></l-input>
      </l-form-item>
      <!-- <l-form-item label="名称：" prop="name">
        <l-input v-model="formData.name"></l-input>
      </l-form-item> -->
      <l-form-item label="邮箱：" prop="mail">
        <l-input v-model="formData.mail"></l-input>
      </l-form-item>
      <l-button @click="handleSubmit">提交</l-button>
      <l-button @click="handleReset">重置</l-button>
    </l-form>
  </div>
</template>

<script>
export default {
  components: {},
  name: "home",
  data() {
    return {
      testVal: "",
      animationVal: "",
      formData: {
        name: "",
        mail: "",
        test:''
      },
      rules: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        mail: [
          { required: true, message: "不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    plus(event) {
      console.log(event);
    },
    test(e) {
      console.log(e);
    },
    test1(){
      console.log(111)
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) console.log(this.formData);
        else console.log("校验失败");
      });
    },
    handleReset() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.out-line {
  margin-top: 30px;
}
</style>

