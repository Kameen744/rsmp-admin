<script setup lang="ts">
import { ref, computed, onMounted, reactive } from "vue";
import Vue3Datatable from "@bhplugin/vue3-datatable";
import "@bhplugin/vue3-datatable/dist/style.css";

interface LGASupported {
  lga: string;
  state: string;
}

interface StateSupported {
  state: string;
}

interface DeploymentState {
  state: string;
}

interface ThematicArea {
  area: string;
  kpi: string;
  sub_areas: string[];
  support_level: string[];
}

interface SupportType {
  support_type: string;
  personnel_deployed?: boolean;
  number_of_personnel?: number;
  deployment_states?: DeploymentState[];
  organizations_funded?: string[];
  commodities_supplied?: string[];
}

interface PartnershipData {
  Name_of_Organization_Agency: string;
  Name_of_Respondent: string;
  Designation_of_respondent: string;
  Email_Address_of_Respondent: string;
  Phone_Number_of_Respondent: string;
  Type_of_Organization_Agency: string[];
  Who_is_the_Funder_of_your_project: string;
  Are_you_collaborating_with_any_other_partners: string;
  List_the_Partners: string[];
  Campaign_Focus: string[];
  Campaign_Focus_Other: string;
  Start_date_of_support: string;
  End_date_of_support: string;
  Key_Performance_Indicators: string | null;
  Status_of_support: string;
  Summary_of_Support: string;
  Level_of_support: string[];
  States_supported: StateSupported[];
  LGA_supported: LGASupported[];
  Thematic_areas_supported: ThematicArea[];
  Type_of_Support: SupportType[];
}

// Sample data based on the provided JSON
const partnershipData = reactive<PartnershipData>({
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
    { lga: "Bwari", state: "Fct" },
    { lga: "Kuje", state: "Fct" },
    { lga: "Calabar South", state: "Cross River" },
    { lga: "Biase", state: "Cross River" },
    { lga: "Ikom", state: "Cross River" },
    { lga: "Maradun", state: "Zamfara" },
    { lga: "Bungudu", state: "Zamfara" },
    { lga: "Bukkuyum", state: "Zamfara" },
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
    { state: "Fct" },
    { state: "Kaduna" },
    { state: "Lagos" },
    { state: "Delta" },
  ],
  Status_of_support: "In Progress",
  Summary_of_Support:
    "Comprehensive healthcare support across multiple states focusing on immunization campaigns and health system strengthening.",
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
        { state: "Fct" },
        { state: "Sokoto" },
        { state: "Akwa Ibom" },
        { state: "Bayelsa" },
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
});

// Computed properties for different data tables
const lgaTableData = computed(() =>
  partnershipData.LGA_supported.map((item, index) => ({
    id: index + 1,
    lga: item.lga,
    state: item.state,
  }))
);

const thematicAreasTableData = computed(() =>
  partnershipData.Thematic_areas_supported.map((item, index) => ({
    id: index + 1,
    area: item.area,
    kpi: item.kpi,
    sub_areas: item.sub_areas.join(", "),
    support_level: item.support_level.join(", "),
  }))
);

const supportTypeTableData = computed(() =>
  partnershipData.Type_of_Support.map((item, index) => ({
    id: index + 1,
    support_type: item.support_type,
    details: getSupportDetails(item),
  }))
);

const partnersTableData = computed(() =>
  partnershipData.List_the_Partners.map((partner, index) => ({
    id: index + 1,
    partner_name: partner,
  }))
);

function getSupportDetails(support: SupportType): string {
  if (support.support_type === "Technical Support") {
    return `${support.number_of_personnel} personnel deployed to ${support.deployment_states?.length} states`;
  } else if (support.support_type === "Funding") {
    return `Funding ${support.organizations_funded?.length} organizations`;
  } else if (support.support_type === "Provision of Commodities") {
    return `Supplying ${support.commodities_supplied?.length} types of commodities`;
  }
  return "Details not available";
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "in progress":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// Table configurations
const lgaColumns = ref([
  { field: "id", title: "S/N", sortable: true, width: "80px" },
  { field: "lga", title: "Local Government Area", sortable: true },
  { field: "state", title: "State", sortable: true },
]);

const thematicColumns = ref([
  { field: "id", title: "S/N", sortable: true, width: "80px" },
  { field: "area", title: "Thematic Area", sortable: true },
  { field: "kpi", title: "KPI", sortable: true },
  { field: "sub_areas", title: "Sub Areas", sortable: false },
  { field: "support_level", title: "Support Level", sortable: true },
]);

const supportColumns = ref([
  { field: "id", title: "S/N", sortable: true, width: "80px" },
  { field: "support_type", title: "Support Type", sortable: true },
  { field: "details", title: "Details", sortable: false },
]);

const partnersColumns = ref([
  { field: "id", title: "S/N", sortable: true, width: "80px" },
  { field: "partner_name", title: "Partner Organization", sortable: true },
]);

const activeTab = ref("overview");

const tabs = [
  { id: "overview", name: "Overview", icon: "📊" },
  { id: "coverage", name: "Geographic Coverage", icon: "🗺️" },
  { id: "thematic", name: "Thematic Areas", icon: "🎯" },
  { id: "support", name: "Support Types", icon: "🤝" },
  { id: "partners", name: "Partners", icon: "👥" },
];
</script>

<template>
  <div
    class="healthcare-dashboard min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-4xl font-bold text-gray-800 mb-2">
              {{ partnershipData.Name_of_Organization_Agency }}
            </h1>
            <p class="text-lg text-gray-600"
              >Healthcare Partnership Dashboard</p
            >
          </div>
          <div class="text-right">
            <div class="flex items-center space-x-2 mb-2">
              <span class="text-sm font-medium text-gray-500">Status:</span>
              <span
                :class="`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  partnershipData.Status_of_support
                )}`"
              >
                {{ partnershipData.Status_of_support }}
              </span>
            </div>
            <p class="text-sm text-gray-500">
              {{ formatDate(partnershipData.Start_date_of_support) }} -
              {{ formatDate(partnershipData.End_date_of_support) }}
            </p>
          </div>
        </div>

        <!-- Key Metrics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div
            class="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white"
          >
            <div class="text-2xl font-bold">{{
              partnershipData.States_supported.length
            }}</div>
            <div class="text-blue-100">States Supported</div>
          </div>
          <div
            class="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white"
          >
            <div class="text-2xl font-bold">{{
              partnershipData.LGA_supported.length
            }}</div>
            <div class="text-green-100">LGAs Covered</div>
          </div>
          <div
            class="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white"
          >
            <div class="text-2xl font-bold">{{
              partnershipData.List_the_Partners.length
            }}</div>
            <div class="text-purple-100">Partner Organizations</div>
          </div>
          <div
            class="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white"
          >
            <div class="text-2xl font-bold">{{
              partnershipData.Campaign_Focus.length
            }}</div>
            <div class="text-orange-100">Campaign Focus Areas</div>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gray-50 p-6 rounded-xl">
            <h3 class="text-lg font-semibold text-gray-800 mb-4"
              >Primary Contact</h3
            >
            <div class="space-y-2">
              <p
                ><span class="font-medium">Name:</span>
                {{ partnershipData.Name_of_Respondent }}</p
              >
              <p
                ><span class="font-medium">Designation:</span>
                {{ partnershipData.Designation_of_respondent }}</p
              >
              <p
                ><span class="font-medium">Email:</span>
                {{ partnershipData.Email_Address_of_Respondent }}</p
              >
              <p
                ><span class="font-medium">Phone:</span>
                {{ partnershipData.Phone_Number_of_Respondent }}</p
              >
            </div>
          </div>
          <div class="bg-gray-50 p-6 rounded-xl">
            <h3 class="text-lg font-semibold text-gray-800 mb-4"
              >Project Details</h3
            >
            <div class="space-y-2">
              <p
                ><span class="font-medium">Organization Type:</span>
                {{ partnershipData.Type_of_Organization_Agency.join(", ") }}</p
              >
              <p
                ><span class="font-medium">Funder:</span>
                {{ partnershipData.Who_is_the_Funder_of_your_project }}</p
              >
              <p
                ><span class="font-medium">Collaboration:</span>
                {{
                  partnershipData.Are_you_collaborating_with_any_other_partners
                }}</p
              >
              <p
                ><span class="font-medium">Support Levels:</span>
                {{ partnershipData.Level_of_support.join(", ") }}</p
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div class="border-b border-gray-200">
          <nav class="flex space-x-8 px-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`"
            >
              <span class="mr-2">{{ tab.icon }}</span>
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-8">
          <!-- Overview Tab -->
          <div v-if="activeTab === 'overview'" class="space-y-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div
                class="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl"
              >
                <h3 class="text-xl font-semibold text-gray-800 mb-4"
                  >Campaign Focus Areas</h3
                >
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="focus in partnershipData.Campaign_Focus"
                    :key="focus"
                    class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {{ focus }}
                  </span>
                </div>
              </div>
              <div
                class="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl"
              >
                <h3 class="text-xl font-semibold text-gray-800 mb-4"
                  >States Supported</h3
                >
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="state in partnershipData.States_supported"
                    :key="state.state"
                    class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {{ state.state }}
                  </span>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 p-6 rounded-xl">
              <h3 class="text-xl font-semibold text-gray-800 mb-4"
                >Summary of Support</h3
              >
              <p class="text-gray-700 leading-relaxed">{{
                partnershipData.Summary_of_Support
              }}</p>
            </div>
          </div>

          <!-- Geographic Coverage Tab -->
          <div v-if="activeTab === 'coverage'">
            <div class="mb-6">
              <h2 class="text-2xl font-bold text-gray-800 mb-4"
                >Local Government Areas (LGAs) Supported</h2
              >
              <p class="text-gray-600"
                >Comprehensive coverage across
                {{ partnershipData.LGA_supported.length }} LGAs in multiple
                states</p
              >
            </div>
            <div class="bg-white rounded-xl overflow-hidden shadow-sm border">
              <!-- <DataTable
                :columns="lgaColumns"
                :data="lgaTableData"
                :sortable="true"
                :searchable="true"
                class="min-w-full"
              /> -->
              <vue3-datatable :rows="lgaTableData" :columns="lgaColumns">
              </vue3-datatable>
            </div>
          </div>

          <!-- Thematic Areas Tab -->
          <div v-if="activeTab === 'thematic'">
            <div class="mb-6">
              <h2 class="text-2xl font-bold text-gray-800 mb-4"
                >Thematic Areas of Support</h2
              >
              <p class="text-gray-600"
                >Detailed breakdown of thematic areas, KPIs, and support
                levels</p
              >
            </div>
            <div class="bg-white rounded-xl overflow-hidden shadow-sm border">
              <DataTable
                :columns="thematicColumns"
                :data="thematicAreasTableData"
                :sortable="true"
                :searchable="true"
                class="min-w-full"
              />
            </div>
          </div>

          <!-- Support Types Tab -->
          <div v-if="activeTab === 'support'">
            <div class="mb-6">
              <h2 class="text-2xl font-bold text-gray-800 mb-4"
                >Types of Support Provided</h2
              >
              <p class="text-gray-600"
                >Overview of different support mechanisms and their scope</p
              >
            </div>
            <div class="bg-white rounded-xl overflow-hidden shadow-sm border">
              <DataTable
                :columns="supportColumns"
                :data="supportTypeTableData"
                :sortable="true"
                :searchable="true"
                class="min-w-full"
              />
            </div>
          </div>

          <!-- Partners Tab -->
          <div v-if="activeTab === 'partners'">
            <div class="mb-6">
              <h2 class="text-2xl font-bold text-gray-800 mb-4"
                >Collaborative Partners</h2
              >
              <p class="text-gray-600"
                >Network of organizations working together for healthcare
                improvement</p
              >
            </div>
            <div class="bg-white rounded-xl overflow-hidden shadow-sm border">
              <DataTable
                :columns="partnersColumns"
                :data="partnersTableData"
                :sortable="true"
                :searchable="true"
                class="min-w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.healthcare-dashboard {
  font-family: "Inter", system-ui, -apple-system, sans-serif;
}

/* Custom scrollbar for better UX */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Data table custom styling */
:deep(.datatable) {
  border-radius: 12px;
  overflow: hidden;
}

:deep(.datatable thead th) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  padding: 16px 12px;
  text-align: left;
  border: none;
}

:deep(.datatable tbody td) {
  padding: 12px;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: top;
}

:deep(.datatable tbody tr:hover) {
  background-color: #f8fafc;
}

:deep(.datatable tbody tr:nth-child(even)) {
  background-color: #f9fafb;
}

:deep(.datatable tbody tr:nth-child(even):hover) {
  background-color: #f1f5f9;
}

/* Search input styling */
:deep(.search-input) {
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  padding: 8px 12px;
  margin-bottom: 16px;
  transition: border-color 0.2s;
}

:deep(.search-input:focus) {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .healthcare-dashboard {
    padding: 16px;
  }

  :deep(.datatable) {
    font-size: 14px;
  }

  :deep(.datatable thead th),
  :deep(.datatable tbody td) {
    padding: 8px;
  }
}
</style>
