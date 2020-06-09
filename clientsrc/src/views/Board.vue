<template>
  <div class="board">
    <h1 v-if="board.title">{{board.title}}</h1>
    <form class="form-inline" v-if="$auth.isAuthenticated" @submit.prevent="addList">
      <div class="form-group">
        <input type="text" class="form-control m-2" placeholder="Title..." v-model="newList.title" />
        <input
          type="text"
          class="form-control m-2"
          placeholder="Description..."
          v-model="newList.description"
        />
      </div>
      <button type="submit" class="btn btn-outline-success">Create New List</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "board",
  mounted() {
    this.$store.dispatch("getBoardById", this.$route.params.id);
  },
  computed: {
    board() {
      //FIXME This does not work on page reload because the activeBoard is empty in the store
      return this.$store.state.activeBoard;
    }
  },
  data() {
    return {
      newList: {
        title: "",
        description: "",
        boardId: this.$store.state.activeBoard.id
      }
    };
  },
  props: ["boardId"]
};
</script>
