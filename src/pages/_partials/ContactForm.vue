<template>
  <modal
    name="ContactForm"
    height="auto"
    width="80%"
    :maxWidth="680"
    :adaptive="true"
  >
    <div class="card" style="margin-bottom: 0px">
      <div class="card-header">
        <h3 class="card-title text-white">
          {{ this.update ? "Update Contact" : "New Contact" }}
        </h3>
      </div>
      <!-- /.card-header -->
      <!-- form start -->
      <form class="form-horizontal" @submit.prevent>
        <div class="card-body">
          <div :class="['form-group row', { 'has-error': errors.type }]">
            <label for="type" class="col-sm-2 col-form-label">Type</label>
            <div class="col-sm-10">
              <div v-if="errors.type">{{ errors.type[0] }}</div>
              <select v-model="contact.type" class="form-control" id="type">
                <option value="wpp">Whatsapp</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
              </select>
            </div>
          </div>

          <div :class="['form-group row', { 'has-error': errors.value }]">
            <label for="value" class="col-sm-2 col-form-label">Value</label>
            <div class="col-sm-10">
              <div v-if="errors.value">{{ errors.value[0] }}</div>
              <input
                v-model="contact.value"
                type="text"
                class="form-control"
                id="Value"
                placeholder="Value"
              />
            </div>
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          <button @click="$modal.hide('ContactForm')" class="btn btn-danger">
            Cancel
          </button>
          <input
            v-if="checkFields"
            @click.prevent="onSubmit()"
            type="submit"
            class="btn btn-info float-right"
            value="Send"
          />
        </div>
        <!-- /.card-footer -->
      </form>
    </div>
  </modal>
</template>
<script>
import axios from "axios";
export default {
  props: {
    update: {
      require: false,
      type: Boolean,
      default: false,
    },
    contact: {
      require: false,
      type: Object,
    },
  },
  data() {
    return {
      errors: {},
    };
  },
  methods: {
    onSubmit() {
      let action = this.update ? "updateContact" : "storeContact";
      this.contact.user_id = this.$route.params.idUser;
      this.$store
        .dispatch(action, this.contact)
        .then(() => {
          this.$snotify.success("Success");
          this.$emit("success");
        })
        .catch((error) => {
          this.errors = error.errors;
        });
    },
  },

  computed: {
    checkFields() {
      if (this.contact.type !== "" && this.contact.value !== "") return true;
      return false;
    },
  },
};
</script>
<style scoped>
</style>