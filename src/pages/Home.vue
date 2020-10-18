<template>
  <div>
    <div class="my-4">
      <h1 class="title-tenant">My Contacts</h1>
      <button class="btn btn-info" @click.prevent="create">
        <i class="fas fa-user-plus"></i> New Person
      </button>
      <person-form
        :user="user"
        :update="update"
        @success="success"
      ></person-form>
    </div>

    <div class="my-lists my-4">
      <div class="my-table-header mb-6">
        <div class="text-center"><b>ID</b></div>
        <div class="text-center"><b>Name</b></div>
        <div class="text-center"><b>City</b></div>
        <div class="text-center"><b>Actions</b></div>
      </div>

      <div class="my-table" v-for="(user, index) in users.data" :key="index">
        <div class="text-center">{{ user.id }}</div>
        <div class="text-center">{{ user.name }}</div>

        <div class="text-center">{{ user.city }}</div>
        <div class="text-center">
          <a
            @click.prevent="edit(user.id)"
            class="btn btn-info btn-sm"
            href="#"
          >
            <i class="fas fa-pencil-alt"></i>
          </a>
          |
          <a
            @click.prevent="confirmDestroy(user)"
            class="btn btn-danger btn-sm"
            href="#"
          >
            <i class="fas fa-trash"></i>
          </a>
        </div>
        <div class="text-center">
          <router-link
            :to="{ name: 'contacts', params: { idUser: user.id } }"
            class="btn btn-secondary"
          >
            <i class="fas fa-address-book"></i> Contacts</router-link
          >
        </div>
      </div>
    </div>
  </div>
  <!-- details order -->
</template>

<script>
import { mapActions } from "vuex";
import PersonForm from "./_partials/PersonForm";

export default {
  data() {
    return {
      user: {
        id: "",
        name: "",
        city: "",
      },
      update: false,
    };
  },
  mounted() {
    this.getUsers();
  },

  computed: {
    users() {
      return this.$store.state.users.items;
    },
  },

  methods: {
    ...mapActions(["getUsers"]),

    hideModal() {
      this.$modal.hide("PersonForm");
    },
    showModal() {
      this.$modal.show("PersonForm");
    },

    create() {
      this.update = false;
      this.reset();
      this.showModal();
    },

    edit(id) {
      this.reset();
      this.$store
        .dispatch("loadUser", id)
        .then((response) => {
          this.user = response;
          this.update = true;
          this.showModal();
        })
        .catch(() => {
          this.$snotify.error("Error");
        });
    },

    confirmDestroy(item) {
      this.$snotify.error(
        `Do you really want to delete ${item.name} and their contacts?`,
        "Confirm?",
        {
          timeout: 1900,
          showProgressBar: true,
          pauseOnHover: true,
          closeOnClick: true,
          buttons: [{ text: "Yes", action: () => this.destroy(item.id) }],
        }
      );
    },
    destroy(id) {
      this.$store
        .dispatch("destroyUser", id)
        .then((response) => {
          this.$snotify.success("Deleted");
          this.getUsers();
        })
        .catch(() => {
          this.$snotify.error("Error");
        });
    },
    success() {
      this.hideModal();
      this.getUsers();
    },

    reset() {
      this.user = {
        id: "",
        name: "",
        city: "",
      };
    },
  },

  components: {
    PersonForm,
  },
};
</script>