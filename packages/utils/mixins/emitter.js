export default {
    methods: {
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;
            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;
                if (parent) name = parent.$options.name;
            }
            if (parent) parent.$emit.apply(parent, [eventName].concat(params))
            //apply(thisArg,[arg1, arg2, ...])方法中的[eventName].concat(params)作为$emit的参数进行传递 即$emit('form-add',params)
            // if (parent) parent.$emit.call(parent, eventName, params) //call(thisArg, arg1, arg2, ...)写法不同，作用相同
        }
    }
}