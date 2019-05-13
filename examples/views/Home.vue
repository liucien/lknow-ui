<template>
  <div>
    <l-button>default</l-button>
    <l-button animation disabled>disabled</l-button>
    <l-button animation>animation</l-button>
    <l-button animation type="primary" fontSize="10" disabled>primary</l-button>
    <l-button animation type="primary" fontSize="10" >primary</l-button>
    <l-button animation type="error" fontSize="10" >primary</l-button>
    <l-button animation type="error" fontSize="10" loading disabled>primary</l-button>
    <l-button animation type="error" fontSize="20" loading disabled circle icon="icon-plus"></l-button>
    <l-button animation type="error" fontSize="20" loading circle icon="icon-search"></l-button>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>
