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
            //apply(this,[params])方法中的[eventName].concat(params)作为$emit的参数进行传递 即$emit('form-add',params)
        }
    }
}