<template>
  <div>
    <div>
      <div class="container">
        <div v-for="i in datalist" class="cardElement">
          <b-card
            :title="'My battle AI for '+ i "
            img-src="~/assets/sumpleShoot.png"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              This is my team at Craftomy . This is my team at Craftomy . This is my team at Craftomy . This is my team
              at Craftomy .
            </b-card-text>

            <b-button :href="'/list/'+i+'/battle'" class="mybutton" variant="outline">Battle!!</b-button>
          </b-card>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        datalist: [...Array(31).keys()]
      }
    }
  }
</script>

<style scoped>
  .container {
    padding: 30px;
    display: flex;
    flex-wrap: wrap;

    justify-content: center;
    align-items: center;

  }

  .cardElement {
    margin: 20px;
  }

  .mybutton {
    background: rgba(161, 214, 226, 0.76);
  }
</style>
