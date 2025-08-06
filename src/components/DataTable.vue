<script setup>
import { ref, onMounted } from "vue";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";

import PocketBase from "pocketbase";
const pb = new PocketBase("https://pb-api.resourcetrackr.com");

const tabLoading = ref(false);
const totalRows = ref(0);
const currentPage = ref(1);
const searchTxt = ref("");
const pageSize = ref(20);
const rows = ref([]);
// Fetch paginated records from the 'posts' collection
const getPaginatedData = async (pagination = null) => {
  tabLoading.value = true;
  // currentPage.value = pagination.current_page;
  // pageSize.value = pagination.pagesize;
  // sortBy.value = pagination.sort_column;
  // sortDir.value = pagination.sort_direction;

  if (pagination) {
    currentPage.value = pagination.current_page;
    pageSize.value = pagination.pagesize;
  }

  try {
    const result = await pb
      .collection("rsmp_data")
      .getList(currentPage.value, pageSize.value, {
        sort: "-created",
      });

    currentPage.value = result.page;
    pageSize.value = result.perPage;
    totalRows.value = result.totalItems;
    rows.value = result.items;
    // result.totalPages
  } catch (error) {
    console.error("Error fetching records:", error.message);
  }
  tabLoading.value = false;
};

// Example usage
// getPaginatedPosts(1, 50);

const cols = ref([
  { field: "Name_of_Organization_Agency", title: "Organization/Agency" },
  { field: "Name_of_Respondent", title: "Respondent Name" },
  { field: "Email_Address_of_Respondent", title: "Respondent Email" },
  { field: "Phone_Number_of_Respondent", title: "Respondent Phone" },
  { field: "Designation_of_respondent", title: "Designation" },
  // {
  //   field: "Type_of_Organization_Agency",
  //   title: "Organization Type",
  //   cellRenderer: (item) => {
  //     return item?.Type_of_Organization_Agency[0];
  //   },
  // },
  { field: "Who_is_the_Funder_of_your_project", title: "Funder" },
  { field: "Status_of_support", title: "Support Status", filter: true }, // Filterable
  {
    field: "Start_date_of_support",
    title: "Start Date",
    cellRenderer: (item) => {
      return formatDate(item.Start_date_of_support);
    },
  },
  {
    field: "End_date_of_support",
    title: "End Date",
    cellRenderer: (item) => {
      return formatDate(item.End_date_of_support);
    },
  },
  // {
  //   field: "Summary_of_Support",
  //   title: "Summary of Support",
  //   cellRenderer: (item) => {
  //     return `${item?.Summary_of_Support.slice(0, 50)} ...`;
  //   },
  // },
  // {
  //   field: "Level_of_support",
  //   title: "Level of Support",
  //   filter: true,
  //   cellRenderer: (item) => {
  //     let cId = "";
  //     item.Level_of_support.forEach((r) => {
  //       cId += `<p><span class="badge bg-slate-500 text-cyan-50 py-1 text-xs">${r}</span></p>`;
  //     });

  //     return cId;
  //   },
  // },
  // {
  //   field: "States_supported",
  //   title: "States Supported",
  //   filter: true,
  //   cellRenderer: (item) => {
  //     let cId = "";
  //     item.States_supported.forEach((r) => {
  //       cId += `<li class="p-1 pl-3 text-xs opacity-60 tracking-wide">${r.state}</li>`;
  //     });
  //     return `<ul class="list bg-base-100 rounded-box shadow-md max-h-[120px] overflow-y-auto">${cId}</ul>`;
  //   },
  // },
  // {
  //   field: "LGA_supported",
  //   title: "LGAs Supported",
  //   cellRenderer: (item) => {
  //     let cId = "";
  //     item.LGA_supported.forEach((r) => {
  //       cId += `<li class="p-1 pl-3 text-xs opacity-60 tracking-wide">${r.lga}</li>`;
  //     });
  //     return `<ul class="list bg-base-100 rounded-box shadow-md max-h-[120px] overflow-y-auto">${cId}</ul>`;
  //   },
  // },
  // { field: "Campaign_Focus", title: "Campaign Focus", filter: true }, // Filterable
  // {
  //   field: "Thematic_areas_supported",
  //   title: "Thematic Areas",
  //   // cellRenderer: (item) => {
  //   //   let cId = "";
  //   //   item.Thematic_areas_supported.forEach((r) => {
  //   //     cId += `<li class="p-1 pl-3 text-xs opacity-60 tracking-wide">${r}</li>`;
  //   //   });
  //   //   return `<ul class="list bg-base-100 rounded-box shadow-md max-h-[120px] overflow-y-auto">${cId}</ul>`;
  //   // },
  // },
  // {
  //   field: "Are_you_collaborating_with_any_other_partners",
  //   title: "Collaborating Partners",
  //   filter: true,
  // }, // Filterable
  // { field: "Type_of_Support", title: "Type of Support" },
]);

const formatDate = (inputDate) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [year, month] = inputDate.split("-");
  const formattedDate = `${months[parseInt(month) - 1]} ${year}`;

  return formattedDate;
};

onMounted(() => {
  getPaginatedData();
});
</script>
<template>
  <div
    class="max-h-[89vh] min-h-[89vh] mt-4 min-w-[92vw] max-w-[92vw] overflow-y-auto"
  >
    <vue3-datatable
      :rows="rows"
      :columns="cols"
      :loading="tabLoading"
      :totalRows="totalRows"
      :page="currentPage"
      :isServerMode="true"
      :search="searchTxt"
      :stickyHeader="true"
      :pageSize="pageSize"
      skin="bh-table-hover"
      @change="getPaginatedData"
    >
    </vue3-datatable>
  </div>
</template>
<style scoped></style>
