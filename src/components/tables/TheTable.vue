<template>
  <div class="max-w-full mt-2">
    <div class="text-black tw-shadow tw-overflow-auto tw-bg-primary-500">
      <table class="tw-w-full tw-max-w-full tw-text-left tw-table-auto">
        <thead
          class="w-full rounded font-medium text-base tw-bg-primary-500 tw-text-white"
        >
          <tr
            v-for="headerGroup in instance.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              :colSpan="header.colSpan"
              :class="[
                'tw-p-3 sm:tw-px-6 tw-m-4 ',
                header.column.getCanSort()
                  ? 'tw-cursor-pointer tw-select-none'
                  : '',
              ]"
              @click="header.column.getToggleSortingHandler()?.($event)"
            >
              <div :class="['tw-flex  tw-gap-1 tw-items-center']">
                <template v-if="!header.isPlaceholder">
                  <button
                    v-if="header.column.getCanSort()"
                    @click="() => header.column.toggleSorting()"
                  >
                    <FlexRender
                      :render="header.column.columnDef.header"
                      :props="header.getContext()"
                    />
                  </button>
                  <template v-else>
                    <FlexRender
                      :render="header.column.columnDef.header"
                      :props="header.getContext()"
                  /></template>
                  <template
                    v-if="
                      header.column.getCanSort() && header.column.getIsSorted()
                    "
                  >
                    <SortIcon :dir="header.column.getIsSorted()" />
                  </template>
                </template>
              </div>
            </th>
          </tr>
        </thead>

        <tbody class="">
          <tr
            v-for="row in instance.getRowModel().rows"
            :key="row.id"
            class="tw-border-y tw-border-primary-500"
          >
            <td
              v-for="(cell, index) in row.getVisibleCells()"
              :key="index"
              :class="['tw-p-3 sm:tw-px-6 tw-py-4 tw-bg-primary-engage-light']"
            >
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="!hidePagination"
        class="tw-flex tw-items-center tw-justify-end tw-w-full tw-p-4 tw-bg-primary-500 tw-text-white"
      >
        <select
          :value="instance.getState().pagination.pageSize"
          @click="handlePageSelect"
          class="tw-p-1 tw-mr-6 tw-rounded-3 dark:tw-border-gray-100 tw-bg-white tw-pr-10 tw-text-black tw-outline-none tw-cursor-pointer"
        >
          <option
            v-for="pageSize in DEFAULT_PAGE_SIZES"
            :key="pageSize"
            :value="pageSize"
          >
            Show {{ pageSize }}
          </option>
          <option :value="1000" :key="-1">Show All</option>
        </select>

        <span class="tw-mr-6">
          {{ instance.getState().pagination.pageIndex + 1 }} of{{ " " }}
          {{ instance.getPageCount() }}
        </span>

        <span class="tw-mr-6">
          <span class="tw-mr-1">Go to page:</span>
          <input
            class="tw-border tw-ml-1.5 tw-rounded-3 tw-px-1 tw-py-0.5 tw-w-12 tw-bg-white tw-text-center tw-text-black tw-outline-none"
            :min="1"
            :max="instance.getPageCount()"
            type="number"
            :defaultValue="instance.getState().pagination.pageIndex + 1"
            @click="handleInput"
          />
        </span>
        <button
          @click="() => instance.previousPage()"
          :disabled="!instance.getCanPreviousPage()"
          class="disabled:tw-opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-3 w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          @click="() => instance.nextPage()"
          :disabled="!instance.getCanNextPage()"
          class="disabled:tw-opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FlexRender } from "@tanstack/vue-table";
import type { RowData, Table } from "@tanstack/vue-table";
import SortIcon from "./SortIcon.vue";
// import classResolve from "utils/classResolve";
// import QuestionHelper from "./QuestionHelper/QuestionHelper";
// import SortIcon from "./SortIcon";
/* eslint-disable */

// declare module "@tanstack/table-core" {
//   interface ColumnMeta<TData extends RowData, TValue> {
//     align?: "start" | "end";
//     headerHelperText?: string;
//     valueClasses?: string;
//     headerClasses?: string;
//   }
// }

interface Props {
  instance: Table<any>;
  hidePagination?: boolean;
}

const props = defineProps<Props>();

const DEFAULT_PAGE_SIZES = [10, 20, 30, 40, 50];
const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const page = target.value ? Number(target.value) - 1 : 0;
  props.instance.setPageIndex(page);
};
const handlePageSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const page = Number(target.value);
  props.instance.setPageSize(page);
};
</script>

<style scoped></style>
