<template>
  <div>
    <l-button>default</l-button>
    <l-button animation disabled>disabled</l-button>
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
    <l-input @input="test" animation label="biaoti" v-model="animationVal"></l-input>
    <div>{{animationVal}}</div>
  </div>
</template>

<script>
export default {
  components:{
    
  },
  name: "home",
  data() {
    return {
      testVal:'',
      animationVal: "test"
    };
  },
  methods: {
    plus(event) {
      console.log(event);
    },
    test(e) {
      console.log(e)
    }
  }
};
</script>

<style lang="scss" scoped>
.out-line {
  margin-top: 30px;
}
</style>

