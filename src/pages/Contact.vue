<template>
  <div>
    <div class="my-4" v-if="!loading">
      <h1 class="title-tenant">Contacts: {{ nameContact }}</h1>
    </div>

    <button class="btn btn-info" @click.prevent="create">
      <i class="fas fa-user-plus"></i> New Contact
    </button>
    <contact-form
      :contact="contact"
      :update="update"
      @success="success"
    ></contact-form>

    <div class="my-lists my-4">
      <div class="my-table-header mb-4">
        <div class="text-center"><b>ID</b></div>
        <div class="text-center"><b>Type</b></div>
        <div class="text-center"><b>Value</b></div>
        <div class="text-center"><b>Action</b></div>
      </div>

      <div
        class="my-table"
        v-for="(contact, index) in userContacts"
        :key="index"
      >
        <div class="text-center">{{ index + 1 }}</div>
        <div class="text-center">{{ contact.type }}</div>
        <div class="text-center">{{ contact.value }}</div>
        <div class="text-center">
          <a
            @click.prevent="edit(contact.id)"
            class="btn btn-info btn-sm"
            href="#"
          >
            <i class="fas fa-pencil-alt"></i>
          </a>
          |
          <a
            @click.prevent="confirmDestroy(contact)"
            class="btn btn-danger btn-sm"
            href="#"
          >
            <i class="fas fa-trash"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ContactForm from "./_partials/ContactForm.vue";

export default {
  props: ["idUser"],

  data() {
    return {
      contact: {
        id: "",
        type: "",
        value: "",
        user_id: "",
      },
      update: false,
      loading: false,
      userContacts: {},
      nameContact: "",
    };
  },

  mounted() {
    this.loadContactsByUser();
  },

  methods: {
    loadContactsByUser() {
      this.$store
        .dispatch("loadContactsByUser", this.idUser)
        .then((response) => {
          {
            this.userContacts = response.data[0].contacts;
            this.nameContact = response.data[0].name;
          }
        })
        .catch((error) => console.log(error));
    },

    hideModal() {
      this.$modal.hide("ContactForm");
    },
    showModal() {
      this.$modal.show("ContactForm");
    },

    create() {
      this.update = false;
      this.reset();
      this.showModal();
    },

    edit(id) {
      this.reset();
      this.$store
        .dispatch("loadContact", id)
        .then((response) => {
          this.contact = response;
          this.update = true;
          this.showModal();
        })
        .catch(() => {
          this.$snotify.error("Error");
        });
    },
    confirmDestroy(item) {
      this.$snotify.error(
        `Do you really want to delete ${item.type} - ${item.value}?`,
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
        .dispatch("destroyContact", id)
        .then((response) => {
          this.$snotify.success("Deleted");
          this.loadContactsByUser();
        })
        .catch(() => {
          this.$snotify.error("Error");
        });
    },
    success() {
      this.hideModal();
      this.loadContactsByUser();
    },

    reset() {
      this.contact = {
        id: "",
        type: "",
        value: "",
        user_id: "",
      };
    },
  },
  components: {
    ContactForm,
  },
};
</script>