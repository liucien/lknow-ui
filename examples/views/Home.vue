<template>
  <div>
    <l-button>default</l-button>
    <l-button animation disabled>disabled</l-button>
    <l-button animation>animation</l-button>
    <l-button animation type="primary" fontSize="10" disabled>primary</l-button>
    <l-button animation type="primary" fontSize="10" >primary</l-button>
    <l-button animation type="error" fontSize="10" >primary</l-button>
    <l-button animation type="error" fontSize="10" loading disabled>primary</l-button>
    <l-button animation type="error" fontSize="14" loading disabled circle icon="icon-plus"></l-button>
    <l-button animation type="error" fontSize="16"  circle icon="icon-plus" @click="plus(111)"></l-button>
    <div class="out-line"></div>
    <l-input id="name" @on-change="test" label="标题"></l-input>
    <l-input id="name" @on-change="test" animation label="biaoti"></l-input>
  </div>
</template>

<script>
export default {
  name: "home",
  data(){
    return{
      
    }
  },
  methods:{
    plus(event){
      console.log(event)
    },
    test(e){
      
    }
  }
};
</script>

<style lang="scss" scoped>
.out-line{
  margin-top:30px;
}
</style>

