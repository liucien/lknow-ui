<template>
  <div>
    <l-button>default</l-button>
    <l-button animation disabled>disabled</l-button>
    <l-button animation>animation</l-button>
    <l-button animation type="primary" size="10" disabled>primary</l-button>
    <l-button animation type="primary" size="10" >primary</l-button>
    <l-button animation type="error" size="10" >primary</l-button>
    <l-button animation type="error" size="10" loading disabled>primary</l-button>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>
