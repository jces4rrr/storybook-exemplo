import AlertBar from '@/components/AlertBar/AlertBar'
let message = {
  title: 'Title',
  description: 'Description',
  type: 'success',
  hasIconTitle: true,
}
export default {
  title: 'AlertBar',
  component: AlertBar,
  argTypes: {
    locale: {
      options: ['br', 'en'],
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AlertBar },
  template: `<div>
              <AlertBar ref="AlertBar" />
              <button @click="openAlert">
                Alert
              </button>
             </div>`,
  methods: {
    openAlert() {
      this.$refs.AlertBar.displayAlert(message)
    },
  },
})

export const DefaultAlert = Template.bind({})

DefaultAlert.args = {
  locale: 'br',
  ...message,
}
