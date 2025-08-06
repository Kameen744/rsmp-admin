<script setup>
import { ref, computed } from "vue";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";

// Your provided data
const originalData = ref([
  {
    Are_you_collaborating_with_any_other_partners: "Yes",
    Campaign_Focus: [
      "Measles Rubella",
      "HPV",
      "Malaria",
      "Polio",
      "Routine Immunization",
    ],
    Campaign_Focus_Other: "Another Camp Focus",
    Designation_of_respondent: "Dev",
    Email_Address_of_Respondent: "kamalaminu94@gmail.com",
    End_date_of_support: "2025-09-30 00:00:00.000Z",
    Key_Performance_Indicators: "",
    LGA_supported: [
      {
        lga: "Bwari",
        state: "Fct",
      },
      {
        lga: "Kuje",
        state: "Fct",
      },
      {
        lga: "Calabar South",
        state: "Cross River",
      },
      {
        lga: "Biase",
        state: "Cross River",
      },
      {
        lga: "Ikom",
        state: "Cross River",
      },
      {
        lga: "Maradun",
        state: "Zamfara",
      },
      {
        lga: "Bungudu",
        state: "Zamfara",
      },
      {
        lga: "Bukkuyum",
        state: "Zamfara",
      },
    ],
    Level_of_support: ["National", "State", "LGA"],
    List_the_Partners: [
      "CHAI",
      "IVAC",
      "Red Cross",
      "TaskForce for Global Health",
      "AFENET",
      "e-Health Africa",
      "C-WINS",
      "GRID3",
      "McKinsey",
      "Sydani Group",
      "other colab",
    ],
    Name_of_Organization_Agency: "SydaniTech",
    Name_of_Respondent: "Kamal Aminu",
    Phone_Number_of_Respondent: "08034932065",
    Start_date_of_support: "2025-07-01 00:00:00.000Z",
    States_supported: [
      {
        state: "Fct",
      },
      {
        state: "Kaduna",
      },
      {
        state: "Lagos",
      },
      {
        state: "Delta",
      },
    ],
    Status_of_support: "In Progress",
    Summary_of_Support:
      "Let's jump back in!\nPlease resume onboarding to unlock the entire feature suite of daily.dev.\nThe magic awaits inside!",
    Thematic_areas_supported: [
      {
        area: "Planning and Coordination",
        kpi: "planing kpi",
        sub_areas: [
          "Microplanning",
          "Readiness dashboard",
          "Technical Working Group",
          "Other: Another plan",
        ],
        support_level: ["National", "States", "LGAs"],
      },
      {
        area: "Service Delivery",
        kpi: "service kpi",
        sub_areas: [
          "Training",
          "Supportive supervision",
          "Health workers' team deployment",
          "Other: Anothe service",
        ],
        support_level: ["States", "LGAs", "National"],
      },
      {
        area: "ACSM",
        kpi: "acsm kpi",
        sub_areas: [
          "Program Advocacy",
          "Risk and Crisis communication",
          "Media Advocacy",
          "Social Mobilization",
          "Other: another acsm",
        ],
        support_level: ["National", "States"],
      },
      {
        area: "MERLA (Monitoring, Evaluation, Research, Learning and Accountability)",
        kpi: "merla kpi",
        sub_areas: [
          "Data Management",
          "Knowledge management and learning",
          "Research",
        ],
        support_level: ["National", "States", "LGAs"],
      },
    ],
    Type_of_Organization_Agency: ["Implementing Partner"],
    Type_of_Support: [
      {
        deployment_states: [
          {
            state: "Fct",
          },
          {
            state: "Sokoto",
          },
          {
            state: "Akwa Ibom",
          },
          {
            state: "Bayelsa",
          },
        ],
        number_of_personnel: 4,
        personnel_deployed: true,
        support_type: "Technical Support",
      },
      {
        organizations_funded: ["Sydani", "BMGF", "AFunder"],
        support_type: "Funding",
      },
      {
        commodities_supplied: ["Com1", "Com2", "com3 s", "com4. an"],
        support_type: "Provision of Commodities",
      },
    ],
    Who_is_the_Funder_of_your_project: "TestFunder",
    collectionId: "pbc_2837437335",
    collectionName: "rsmp_data",
    created: "2025-08-01 11:16:21.678Z",
    id: "4tm5lhahyptufjw",
    updated: "2025-08-01 11:16:21.678Z",
  },
  // ... add more data objects if you have them
]);

// Prepare data for the table
const data = computed(() => {
  return originalData.value.map((item) => ({
    // Basic Information
    organization_agency: item.Name_of_Organization_Agency,
    respondent_name: item.Name_of_Respondent,
    respondent_email: item.Email_Address_of_Respondent,
    respondent_phone: item.Phone_Number_of_Respondent,
    designation: item.Designation_of_respondent,
    org_type: item.Type_of_Organization_Agency.join(", "),
    funder: item.Who_is_the_Funder_of_your_project,

    // Support Details
    status_of_support: item.Status_of_support,
    start_date: new Date(item.Start_date_of_support).toLocaleDateString(),
    end_date: new Date(item.End_date_of_support).toLocaleDateString(),
    summary_of_support: item.Summary_of_Support,
    level_of_support: item.Level_of_support.join(", "),

    // Geographical Support
    states_supported: item.States_supported.map((s) => s.state).join(", "),
    lgas_supported: item.LGA_supported.map((l) => `${l.lga} (${l.state})`).join(
      "; "
    ),

    // Campaign and Thematic Areas
    campaign_focus:
      item.Campaign_Focus.join(", ") +
      (item.Campaign_Focus_Other ? `, ${item.Campaign_Focus_Other}` : ""),
    thematic_areas: item.Thematic_areas_supported.map((area) => {
      let details = `${area.area}`;
      if (area.sub_areas && area.sub_areas.length > 0) {
        details += ` (${area.sub_areas.join(", ")})`;
      }
      if (area.kpi) {
        details += ` [KPI: ${area.kpi}]`;
      }
      if (area.support_level && area.support_level.length > 0) {
        details += ` [Levels: ${area.support_level.join(", ")}]`;
      }
      return details;
    }).join("; "),

    // Collaboration and Type of Support
    collaborating_partners:
      item.Are_you_collaborating_with_any_other_partners === "Yes"
        ? item.List_the_Partners.join(", ")
        : "No",
    type_of_support: item.Type_of_Support.map((ts) => {
      if (ts.support_type === "Technical Support") {
        const deployedStates = ts.deployment_states
          ? ts.deployment_states.map((s) => s.state).join(", ")
          : "N/A";
        return `Technical Support (Personnel: ${
          ts.number_of_personnel
        }, Deployed: ${
          ts.personnel_deployed ? "Yes" : "No"
        }, States: ${deployedStates})`;
      } else if (ts.support_type === "Funding") {
        return `Funding (Organizations: ${
          ts.organizations_funded ? ts.organizations_funded.join(", ") : "N/A"
        })`;
      } else if (ts.support_type === "Provision of Commodities") {
        return `Commodities (Items: ${
          ts.commodities_supplied ? ts.commodities_supplied.join(", ") : "N/A"
        })`;
      }
      return ts.support_type;
    }).join("; "),
  }));
});

// Define table columns
const cols = ref([
  { field: "organization_agency", title: "Organization/Agency" },
  { field: "respondent_name", title: "Respondent Name" },
  { field: "respondent_email", title: "Respondent Email" },
  { field: "respondent_phone", title: "Respondent Phone" },
  { field: "designation", title: "Designation" },
  { field: "org_type", title: "Organization Type" },
  { field: "funder", title: "Funder" },
  { field: "status_of_support", title: "Support Status", filter: true }, // Filterable
  { field: "start_date", title: "Start Date" },
  { field: "end_date", title: "End Date" },
  { field: "summary_of_support", title: "Summary of Support" },
  { field: "level_of_support", title: "Level of Support", filter: true }, // Filterable
  { field: "states_supported", title: "States Supported", filter: true }, // Filterable
  { field: "lgas_supported", title: "LGAs Supported" },
  { field: "campaign_focus", title: "Campaign Focus", filter: true }, // Filterable
  { field: "thematic_areas", title: "Thematic Areas" },
  {
    field: "collaborating_partners",
    title: "Collaborating Partners",
    filter: true,
  }, // Filterable
  { field: "type_of_support", title: "Type of Support" },
]);

// Pagination and Search
const perPage = ref(10);
const currentPage = ref(1);
const totalRows = computed(() => data.value.length);
const searchTerm = ref("");

// Computed property for filtered and paginated data
const paginatedData = computed(() => {
  let filteredData = data.value;

  // Apply search
  if (searchTerm.value) {
    const searchLower = searchTerm.value.toLowerCase();
    filteredData = filteredData.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchLower)
      )
    );
  }

  // Apply column filters (if any are set, not directly managed here but by the datatable itself)
  // The @bhplugin/vue3-datatable component handles its own internal filtering when 'filter: true' is set on columns.

  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return filteredData.slice(start, end);
});

// Handle pagination change (if needed for external pagination control, though datatable handles internal)
const onPageChange = (page: number) => {
  currentPage.value = page;
};

// Handle search input change
const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  searchTerm.value = target.value;
  currentPage.value = 1; // Reset to first page on search
};
</script>

<template>
  <div class="data-table-container">
    <h1 class="title">Partner Support Data Overview</h1>

    <div class="controls-section">
      <div class="search-input">
        <label for="search">Search Table:</label>
        <input
          id="search"
          type="text"
          v-model="searchTerm"
          placeholder="Search all fields..."
          @input="handleSearchInput"
        />
      </div>
      <div class="pagination-controls">
        <label for="perPage">Items per page:</label>
        <select id="perPage" v-model="perPage">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>

    <div class="datatable-wrapper">
      <Vue3Datatable
        :rows="data"
        :columns="cols"
        :totalRows="totalRows"
        :perPage="perPage"
        :currentPage="currentPage"
        @page-change="onPageChange"
        :hasCheckbox="true"
        :hover="true"
        :striped="true"
        :compact="false"
        :sortable="true"
        :resizable="true"
        :pagination="true"
        :search="searchTerm"
      >
        <template #header-organization_agency="{ column }">
          <span
            title="The name of the organization or agency providing support"
            >{{ column.title }}</span
          >
        </template>
        <template #header-respondent_name="{ column }">
          <span title="Name of the person who filled out the form">{{
            column.title
          }}</span>
        </template>
        <template #header-status_of_support="{ column }">
          <span
            title="Current status of the support provided (e.g., In Progress, Completed)"
            >{{ column.title }}</span
          >
        </template>
        <template #header-level_of_support="{ column }">
          <span
            title="Geographical level of support (e.g., National, State, LGA)"
            >{{ column.title }}</span
          >
        </template>
        <template #header-states_supported="{ column }">
          <span title="States where support is provided">{{
            column.title
          }}</span>
        </template>
        <template #header-lgas_supported="{ column }">
          <span title="Local Government Areas where support is provided">{{
            column.title
          }}</span>
        </template>
        <template #header-campaign_focus="{ column }">
          <span title="Main focus areas of the campaigns supported">{{
            column.title
          }}</span>
        </template>
        <template #header-thematic_areas="{ column }">
          <span
            title="Specific areas of work being supported, including sub-areas and KPIs"
            >{{ column.title }}</span
          >
        </template>
        <template #header-collaborating_partners="{ column }">
          <span title="List of other partners involved in collaboration">{{
            column.title
          }}</span>
        </template>
        <template #header-type_of_support="{ column }">
          <span
            title="Detailed description of the type of support (e.g., Technical, Funding, Commodities)"
            >{{ column.title }}</span
          >
        </template>

        <template #summary_of_support="{ value }">
          <span :title="value" class="summary-text">{{
            value.substring(0, 50) + (value.length > 50 ? "..." : "")
          }}</span>
        </template>
      </Vue3Datatable>
    </div>
  </div>
</template>

<style scoped>
.data-table-container {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin: 20px;
}

.title {
  color: #343a40;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.2em;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.controls-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap; /* Allows wrapping on smaller screens */
  gap: 15px; /* Spacing between controls */
}

.search-input,
.pagination-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-input label,
.pagination-controls label {
  font-weight: 600;
  color: #555;
  white-space: nowrap; /* Prevents label from wrapping */
}

.search-input input[type="text"] {
  padding: 10px 15px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 1em;
  width: 250px; /* Adjust as needed */
  transition: border-color 0.3s, box-shadow 0.3s;
}

.search-input input[type="text"]:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  outline: none;
}

.pagination-controls select {
  padding: 10px 15px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  background-color: #fff;
  font-size: 1em;
  cursor: pointer;
  appearance: none; /* Remove default select arrow */
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007bff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-6.8%200-13.3%202.6-18.4%207.7s-5.1%2012-1.7%2018.5l128.9%20128.9a17.6%2017.6%200%200%200%2024.7%200l128.9-128.9c3.4-6.5%203.4-14.7%200-21.2z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 10px top 50%;
  background-size: 12px;
}

.datatable-wrapper {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden; /* Ensures borders/shadows don't get cut off */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Custom styles for the datatable component itself */
/* These will override the default @bhplugin/vue3-datatable styles */
:deep(.bh-datatable) {
  width: 100%;
  border-collapse: collapse;
}

:deep(.bh-datatable thead th) {
  background-color: #e9ecef;
  color: #495057;
  font-weight: 700;
  padding: 12px 15px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
  white-space: nowrap; /* Prevent header text from wrapping */
}

:deep(.bh-datatable tbody tr) {
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s ease;
}

:deep(.bh-datatable tbody tr:nth-child(even)) {
  background-color: #f6f6f6; /* Striped rows */
}

:deep(.bh-datatable tbody tr:hover) {
  background-color: #e2f0ff; /* Hover effect */
}

:deep(.bh-datatable tbody td) {
  padding: 12px 15px;
  color: #343a40;
  vertical-align: top; /* Align content to the top */
}

/* Pagination styles */
:deep(.bh-pagination) {
  padding: 15px;
  background-color: #f2f2f2;
  border-top: 1px solid #dee2e6;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

:deep(.bh-pagination button) {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

:deep(.bh-pagination button:hover:not(:disabled)) {
  background-color: #0056b3;
}

:deep(.bh-pagination button:disabled) {
  background-color: #cccccc;
  cursor: not-allowed;
}

:deep(.bh-pagination .active) {
  background-color: #0056b3;
  font-weight: bold;
}

/* Custom summary text styling */
.summary-text {
  max-width: 250px; /* Adjust as needed */
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
</style>
