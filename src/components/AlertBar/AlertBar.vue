<template>
  <v-snackbar
    v-model="show"
    :data-test-alert="
      (isSuccess && 'success') || (isError && 'error') || message.type
    "
    id="alertbar"
    class="pa-0"
    :width="message.width"
    :timeout="-1"
    light
    left
  >
    <div
      data-test-alert-bar
      class="alert-container"
      :class="{
        'left-border': message.hasLeftBorder,
        'border-success': isSuccess,
        'border-error': isError,
      }"
    >
      <div class="alert-container-info">
        <!-- title -->
        <div class="alert-container-info-title">
          <span>
            <v-avatar
              class="mr-2"
              :class="{
                success: isSuccess,
                error: isError,
              }"
              size="16"
              v-if="message.hasIconTitle"
            >
              <i id="successIcon" class="fi fi-rr-check" v-if="isSuccess" />
              <i id="errorIcon" class="fi fi-rr-cross" v-else />
            </v-avatar>
            {{ message.title }}
          </span>
        </div>
        <!-- message -->
        <div class="alert-container-info-message">
          <span>
            <strong>{{ message.messagePrefix }}</strong>
            {{ message.description }}
          </span>
        </div>
        <!-- footer -->
        <div class="alert-container-info-footer" v-if="message.hasFooter">
          <slot />
        </div>
      </div>

      <!-- close button -->
      <div class="alert-container-close">
        <v-btn x-small icon @click.prevent="close()">
          <v-icon x-small>fi fi-rr-cross-circle</v-icon>
        </v-btn>
      </div>
    </div>

    <v-progress-linear
      :value="Math.floor(100 * (currentTime / timeout))"
      :color="barColor"
    ></v-progress-linear>
  </v-snackbar>
</template>

<script>
export default {
  name: 'AlertBar',
  data() {
    return {
      show: false,
      interval: null,
      timeout: 5000,
      currentTime: 0,
      message: {
        title: '',
        description: '',
        messagePrefix: '',
        type: 'success',
        width: 300,
        hasLeftBorder: false,
        hasIconTitle: false,
        hasFooter: false,
      },
    }
  },

  beforeMount() {
    this.$root.$on('display-alert', (data) => {
      this.displayAlert(data)
    })
  },

  beforeDestroy() {
    this.$root.$off('display-alert')
  },

  watch: {
    show(v) {
      this.handleShow(v)
    },
  },

  methods: {
    // call alert
    displayAlert(data) {
      this.message = data
      this.currentTime = 0
      this.show = true
    },

    // handle start or close alert
    handleShow(value) {
      if (value) this.startTimer()
      else this.close()
    },

    // start timer
    startTimer() {
      this.interval = setInterval(() => {
        this.handleTimer()
      }, 100)
    },

    // handle progress timer
    handleTimer() {
      this.currentTime += 100
      if (this.timeout <= this.currentTime) this.close()
    },

    // close
    close() {
      clearInterval(this.interval)
      this.show = false
      this.currentTime = 0
      this.timeout = 5000
      this.$emit('closed')
    },
  },
  computed: {
    barColor() {
      if (this.isSuccess) {
        return 'success'
      }
      return 'red'
    },
    isSuccess() {
      return this.message.type === 'success'
    },
    isError() {
      return this.message.type === 'error'
    },
  },
}
</script>

<style src="./style.scss" lang="scss" scoped />
