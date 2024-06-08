<template>
  <input type="checkbox" id="confirm-modal" class="tw-modal-toggle" />
  <label for="confirm-modal" class="tw-modal">
    <label class="tw-modal-box" for="">
      <h2 class="">{{ props.title }}</h2>
      <div>{{ props.message }}</div>
      <div class="tw-modal-action">
        <label
          for="confirm-modal"
          class="tw-btn tw-btn-primary"
          @click="emitAction(`Ok`)"
          >Yes</label
        >
        <label for="confirm-modal" class="tw-btn" @click="emitAction(`Cancel`)"
          >Cancel</label
        >
      </div>
    </label>
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits<{
  (event: "Ok", id?: number): void;
  (event: "Cancel"): void;
}>();

function emitAction(action: string) {
  console.log(action);
  if (action == "Ok") {
    emit("Ok", props.id);
  } else if (action == "Cancel") {
    emit("Cancel");
  }
}
</script>
