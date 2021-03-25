<template>
  <div class="container">
    <p>Please Wait... </p>
  </div>
</template>


<script>
  import AuthServices from "~/services/Api/AuthService";
  import {
    setUserDetails,
    setAccessToken,
    setRefreshToken,
    getAccessToken
  } from "~/services/Auth";

  export default {
    data() {
      return {
        token: this.$route.query.token ? this.$route.query.token : null
      }
    },
    mounted() {
      AuthServices.loginWithSocial(this.token)
        .then((response) => {
          setAccessToken(this.token)
          console.log(response)
//          window.location.href = '/';
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

</script>
