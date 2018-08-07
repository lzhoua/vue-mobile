<template>
  <div class='box'>
    <img class="img-title" src="../assets/index-header-font.gif">
    <img class="img-avator" src="../assets/index-avator.png">
    <div class="img-warp">
      <img class="img-look-bg" src="../assets/index-text-bg.png">
      <img class="img-look" src="../assets/index-look.gif">
      <img class="img-light" src="../assets/index-light-friend.gif">
    </div>
    <img class="img-btn" src="../assets/start-myPlay.png">
  </div>
</template>

<script>
export default {
  // components: {}
  // mixins: []
  data () {
    return {}
  },
  // beforecreate () {},
  // created () {},
  // beforeMount () {},
  mounted () {},
  methods: {}
}
</script>

<style>
.box {
  width: 100vw;
  height: 100vh;
  background-color: #270f1f;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.img-title {
  width: 500px;
  height: 60px;
  margin-top: 170px;
}
.img-avator {
  width: 500px;
  height: 650px;
  margin-left: 85px;
}
.img-warp {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.img-look-bg {
  width: 691px;
  height: 185px;
  position: absolute;
  transform: rotate(1deg);
  top: -120px;
}
.img-look {
  width: 635px;
  height: 127px;
  position: absolute;
  top: -90px;
}
.img-light {
  width: 537px;
  height: 116px;
  margin-top: 30px;
}
.img-btn {
  width: 400px;
  height: 78px;
  margin-top: 100px;
}
</style>
