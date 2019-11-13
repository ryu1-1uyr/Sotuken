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

            <nuxt-link :to="'/list/'+i+'/battle'"><b-button class="mybutton" variant="outline">Battle!!</b-button></nuxt-link>
          </b-card>
        </div>

        <div v-for="data in realdata" class="cardElement">
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
              {{data.comment}}
            </b-card-text>
            <b-card-text>
              製作者: {{data.username}}
            </b-card-text>

            <nuxt-link :to="'/list/'+i+'/battle'"><b-button class="mybutton" variant="outline">Battle!!</b-button></nuxt-link>
          </b-card>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import firebase from '~/plugins/firebase'

  //ここで戦闘データ含めたJSONを取ってくる。v-forで回したのちにbattleへはpropsでデータを渡す
  export default {
    name: "index",
    data() {
      return {
        datalist: [...Array(3).keys()],
        realdata: []
      }
    },
    mounted(){
      const db =  firebase.firestore()
      db.collection("craftomy").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.realdata.push(doc.data())
          console.log(doc.data())
        });
      })
      console.log(this.realdata)
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
