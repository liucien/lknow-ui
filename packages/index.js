import XrTest from './test';

//所有组件列表
const components = [
    XrTest
]

//定义 install方法。接收vue作为参数
const install = function (Vue) {
    //判断是否安装
    if (install.installed) return
    install.installed = true;
    //遍历注册所有组件
    components.map(component => Vue.use(component));
}

//检测vue是否存在（宿主环境）
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
     // 所有组件，必须具有 install，才能使用 Vue.use()
    ...components
}
