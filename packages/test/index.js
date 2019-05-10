import XrTest from './src/test.vue';

XrTest.install = Vue => {
    Vue.component(XrTest.name, XrTest)
}

export default XrTest;