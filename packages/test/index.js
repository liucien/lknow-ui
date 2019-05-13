import LTest from './src/test.vue';

LTest.install = Vue => {
    Vue.component(LTest.name, LTest)
}

export default LTest;