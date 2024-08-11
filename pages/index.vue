<template>
  <CreateRoleDIalog />
  <easy-data-table :headers="headers" :items="items" show-index hide-footer>
    <template #item-sales="item">
      <v-switch
        color="green"
        :model-value="item.permissions[PermissionIdEnum.SALE].enable"
        @update:model-value="updateRole($event, item, PermissionIdEnum.SALE)"
      />
    </template>
    <template #item-public_sales="item">
      <v-checkbox
        :model-value="
          item.permissions[PermissionIdEnum.SALE].scope[
            PermissionScopeIdEnum.PUBLIC_SALE
          ]
        "
        @update:model-value="
          updateRole(
            $event,
            item,
            PermissionIdEnum.SALE,
            PermissionScopeIdEnum.PUBLIC_SALE
          )
        "
        :disabled="!item.permissions[PermissionIdEnum.SALE].enable"
      />
    </template>

    <template #item-view_report="item">
      <v-switch
        color="green"
        :model-value="item.permissions[PermissionIdEnum.REPORT].enable"
        @update:model-value="updateRole($event, item, PermissionIdEnum.REPORT)"
      />
    </template>
    <template #item-all_customer="item">
      <v-checkbox
        :model-value="
          item.permissions[PermissionIdEnum.REPORT].scope[
            PermissionScopeIdEnum.ALL_CUSTOMER
          ]
        "
        @update:model-value="
          updateRole(
            $event,
            item,
            PermissionIdEnum.REPORT,
            PermissionScopeIdEnum.ALL_CUSTOMER
          )
        "
        :disabled="!item.permissions[PermissionIdEnum.REPORT].enable"
      />
    </template>

    <template #item-price_approval="item">
      <v-switch
        color="green"
        :model-value="
          item.permissions[PermissionIdEnum.PRICE_APPROVAL].enable
        "
        @update:model-value="updateRole($event, item,PermissionIdEnum.PRICE_APPROVAL)"
      />
    </template>

    <template #item-Import="item">
      <v-switch
        color="green"
        :model-value="item.permissions[PermissionIdEnum.IMPORT].enable"
        @update:model-value="updateRole($event, item,PermissionIdEnum.IMPORT)"
      />
    </template>
  </easy-data-table>
</template>

<script setup lang="ts">
import { PermissionIdEnum, PermissionScopeIdEnum } from "~/type/role";
const headers = ref([
  { text: "Name role", value: "name" },
  { text: "Sales", value: "sales" },
  { text: "Public Sales", value: "public_sales" },
  { text: "View Report", value: "view_report" },
  { text: "All Customer", value: "all_customer" },
  { text: "Price Approval", value: "price_approval" },
  { text: "Import", value: "Import" },
]);

const items = ref([
  {
    id: "1",
    name: "Role 1",
    name_th: "Role 1",
    permissions: {
      [PermissionIdEnum.SALE]: {
        enable: true,
        scope: {
          [PermissionScopeIdEnum.PUBLIC_SALE]: true,
        },
      },
      [PermissionIdEnum.REPORT]: {
        enable: true,
        scope: {
          [PermissionScopeIdEnum.ALL_CUSTOMER]: true,
        },
      },
      [PermissionIdEnum.PRICE_APPROVAL]: {
        enable: true,
        scope: null,
      },
      [PermissionIdEnum.IMPORT]: {
        enable: true,
        scope: null,
      },
    },
  },
  {
    id: "2",
    name: "Role 2",
    name_th: "Role 2",
    permissions: {
      [PermissionIdEnum.SALE]: {
        enable: true,
        scope: {
          [PermissionScopeIdEnum.PUBLIC_SALE]: false,
        },
      },
      [PermissionIdEnum.REPORT]: {
        enable: false,
        scope: {
          [PermissionScopeIdEnum.ALL_CUSTOMER]: false,
        },
      },
      [PermissionIdEnum.PRICE_APPROVAL]: {
        enable: false,
        scope: null,
      },
      [PermissionIdEnum.IMPORT]: {
        enable: false,
        scope: null,
      },
    },
  },
]);



const response = [
  {
    id: "SALE",
    enable: true,
    permission_scopes: [
      {
        id: "PUBLIC_SALE",
        enable: false,
      },
    ],
  },
  {
    id: "REPORT",
    enable: true,
    permission_scopes: [
      {
        id: "ALL_CUSTOMER",
        enable: false,
      },
    ],
  },
  {
    id: "PRICE_APPROVAL",
    enable: true,
    permission_scopes: [
    ],
  },
];


onMounted(() => {
  // console.log(transformPermissionToArray(items.value[0].permissions));
  console.log(transformPermissionToObject(response));
});

const updateRole = (
  event: boolean,
  role: any,
  permissionId: PermissionIdEnum,
  permissionScopeId?: PermissionScopeIdEnum
) => {
  if (!permissionScopeId) {
    role.permissions[permissionId].enable = event;
    if (
      (permissionId === PermissionIdEnum.SALE ||
      permissionId === PermissionIdEnum.REPORT) &&
      !event
    ) {
      console.log(Object.keys(role.permissions[permissionId].scope))
      Object.keys(role.permissions[permissionId].scope).forEach(
        (keyPermissionScope) => {
          role.permissions[permissionId].scope[keyPermissionScope] =
            false;
        }
      );
    }
  } else {
    role.permissions[permissionId].scope[permissionScopeId] = event;
  }
  console.log({
    ...role,
    permissions: transformPermissionToArray(role.permissions),
  });
};
</script>
