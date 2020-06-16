<template>
  <div class="bug">
    <div class="container">
      <div class="row text-left">
        <div class="col-12 my-1">
          <h5>Title:</h5>
        </div>
        <div class="col-12 my-2">
          <h1>{{bug.title}}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col text-left">
          <h5>Created by:</h5>
          <h4>{{bug.creatorEmail}}</h4>
        </div>
        <div class="col text-right">
          <h5>Status:</h5>
          <h4 style="status">{{bug.status}}</h4>
        </div>
      </div>
      <div class="row border">
        <div class="col text-left my-4">
          <h5>{{bug.description}}</h5>
        </div>
      </div>
      <div class="row my-3">
        <div class="col">
          <button @click="closeBug">Close Bug</button>
        </div>
      </div>
      <div class="row">
        <div class="col my-3">
          <form @submit.prevent="addComment">
            <input type="text" v-model="newComment.title" placeholder="add comment..." />
            <button type="submit">+</button>
          </form>
        </div>
      </div>

      <div class="row">
        <div class="col text-left">
          <div v-for="comment in comments" :key="comment.id" :comment="comment" class="border">
            <h4>{{comment.title}}</h4>
            <h5 class="text-right">
              {{comment.creatorEmail}}
              <button @click="removeComment(comment)">x</button>
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bug",
  data() {
    return {
      newComment: {
        title: "",
        bugId: this.$route.params.bugId
      },
      editBug: {
        decription: "",
        bugId: this.$route.params.bugId
      }
    };
  },

  mounted() {
    // this.$store.dispatch("getLists");
    this.$store.dispatch("getBugById", this.$route.params.bugId);
    this.$store.dispatch("getCommentsbyBugId", this.$route.params.bugId);
  },
  computed: {
    comments() {
      return this.$store.state.comments;
    },
    bug() {
      //FIXME This does not work on page reload because the activeBoard is empty in the store
      return this.$store.state.activeBug;
    }
  },
  methods: {
    addComment() {
      this.$store.dispatch("addComment", this.newComment);
      this.newComment = {
        bugId: this.$store.state.activeBug.id
      };
    },
    removeComment(comment) {
      if (confirm("are you sure?")) {
        this.$store.dispatch("removeComment", comment);
      }
    },
    closeBug() {
      if (confirm("are you sure?")) {
        let update = {
          status: "Closed",
          id: this.$store.state.activeBug.id
        };
        this.$store.dispatch("statusChange", update);
      }
    },
    changeBug() {
      this.$store.dispatch("editBug", this.editBug);
    }
  }
};
0.0;
</script>
<style scoped>
</style>
