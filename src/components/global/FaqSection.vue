<template>
  <div class="tw-pb-10 tw-pl-0">
    <h6
      class="tw-border-b-2 tw-text-primary-500 tw-border-[#edebfb] tw-p-5 tw-my-2 tw-text-center lg:tw-text-left lg:tw-pt-0 lg:tw-pl-0 lg:tw-mt-0"
    >
      FAQs
    </h6>
    <div class="">
      <q-list>
        <template v-for="(q, index) in faqs" :key="index">
          <q-expansion-item
            group="somegroup"
            label="First"
            header-class="text-primary"
          >
            <template v-slot:header>
              <div class="tw-flex tw-grid-cols- tw-gap-2">
                <div class="">
                  <img src="/assets/messageQuestionMark.svg" class="" alt="" />
                </div>
                <div class="tw-pr-1">
                  <p class="tw-text-xs tw-text-qb-black-2">
                    {{ q.heading }}
                  </p>
                </div>
              </div>
            </template>
            <p class="tw-text-xs tw-text-qb-black-secondary tw-mx-2 tw-px-10">
              {{ q.value }}
            </p>
          </q-expansion-item>
        </template>
      </q-list>
    </div>
    <!-- <div class="tw-grid tw-grid-cols-10 tw-gap-2">
      <div class="">
        <img src="/assets/messageQuestionMark.svg" class="" alt="" />
      </div>
      <div class="tw-col-span-8">
        <p class="tw-text-qb-black-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, qui?
        </p>
        <p class="tw-text-qb-black-secondary">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
          molestias beatae voluptas exercitationem nemo eligendi, vitae, fuga
          delectus itaque nulla dolorem assumenda repellat natus fugit sequi
          asperiores obcaecati dolorum dolor quaerat! Quos recusandae incidunt
          accusamus. Facilis ipsam dignissimos ab blanditiis harum aliquam
          minus, ut perspiciatis neque odio, vero, exercitationem quasi?
        </p>
      </div>
      <div class="tw-p-2">
        <font-awesome-icon icon="fa-solid fa-chevron-down" />
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
const faqs = [
  {
    heading:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, qui?",
    value:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste molestias beatae voluptas exercitationem nemo eligendi, vitae, fuga delectus itaque nulla dolorem assumenda repellat natus fugit sequi asperiores obcaecati dolorum dolor quaerat! Quos recusandae incidunt accusamus. Facilis ipsam dignissimos ab blanditiis harum aliquam minus, ut perspiciatis neque odio, vero, exercitationem quasi?",
  },
  {
    heading:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, qui?",
    value:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste molestias beatae voluptas exercitationem nemo eligendi, vitae, fuga delectus itaque nulla dolorem assumenda repellat natus fugit sequi asperiores obcaecati dolorum dolor quaerat! Quos recusandae incidunt accusamus. Facilis ipsam dignissimos ab blanditiis harum aliquam minus, ut perspiciatis neque odio, vero, exercitationem quasi?",
  },
  {
    heading:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, qui?",
    value:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste molestias beatae voluptas exercitationem nemo eligendi, vitae, fuga delectus itaque nulla dolorem assumenda repellat natus fugit sequi asperiores obcaecati dolorum dolor quaerat! Quos recusandae incidunt accusamus. Facilis ipsam dignissimos ab blanditiis harum aliquam minus, ut perspiciatis neque odio, vero, exercitationem quasi?",
  },
];
</script>

<style scoped></style>
