import { baseProps } from '@/helpers/componentsBaseProps'
//import variables from '@/styles/scss/_colors.scss'

const baseMixin = {
  mounted() {
    this.$i18n.locale = this.locale
  },
  data() {
    return {
      //variables,
    }
  },
  props: {
    ...baseProps,
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val
    },
  },
}

export { baseMixin }
