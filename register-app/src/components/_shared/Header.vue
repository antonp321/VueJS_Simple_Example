<template>
  <div>
    <div class="row pageColor" id="firstLine">
      <div class="col-8">

      </div>
    </div>
    <div class="row" id="upperHeaderLine">
      <div class="col-8">

      </div>
    </div>
    <div class="row" id="mainHeader">
      <div class="col-8">
        <img src="../../assets/css/images/everline.png" height="47" width="150"/><span id="mobile" class="mobile-mobile"><icon name="phone" id="phoneIcon" width="6.5%" height="6.5%"></icon> 08443 913 376</span>
      </div>
    </div>
  </div>
</template>

<script>
  import icon from '../../../node_modules/vue-awesome/components/Icon.vue'
  import 'vue-awesome/icons'

  export default {
    name: 'header',
    components: {
      'icon': icon
    },

    data () {
      return {}
    }
  }
</script>
