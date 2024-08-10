<template>
  <h1>test</h1>
  <easy-data-table :headers="headers" :items="items" show-index hide-footer>
    <template #item-sales="item">
      <!-- sale -->
      <v-switch
        color="green"
        :model-value="item.permissions[PermissionIdEnum.SALE].permission"
        @update:model-value="updateRole($event, item)"
      />
    </template>
  </easy-data-table>
</template>

<script setup lang="ts">
import { PermissionIdEnum, PermissionScopeIdEnum } from "~/type/test";
const headers = ref([
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
        permission: true,
        scope: {
          [PermissionScopeIdEnum.PUBLIC_SALE]: false,
        },
      },
      [PermissionIdEnum.REPORT]: {
        permission: true,
        scope: {
          [PermissionScopeIdEnum.ALL_CUSTOMER]: true,
        },
      },
      [PermissionIdEnum.PRICE_APPROVAL]: {
        permission: true,
        scope: null,
      },
      [PermissionIdEnum.IMPORT]: {
        permission: true,
        scope: null,
      },
    },
  },
]);

const transformPermissionToArray = (permissionObject) => {
  return Object.values(PermissionIdEnum).map((idPermission) => {
    const id = idPermission;
    const enable = permissionObject[idPermission].permission;
    if (
      !permissionObject[idPermission].scope ||
      (permissionObject[idPermission].scope &&
        !Object.keys(permissionObject[idPermission].scope).length)
    ) {
      return {
        id,
        enable,
        permission_scopes: [],
      };
    }
    const keyPermissionScope = Object.keys(
      permissionObject[idPermission].scope
    );
    const permission_scopes = keyPermissionScope.map((permissionScopeItem) => {
      return {
        id: permissionScopeItem,
        enable:
          permissionObject[idPermission].scope[permissionScopeItem],
      };
    });
    return {
      id,
      enable,
      permission_scopes,
    };
  });
};


const response = [
  {
    id: 'SALE',
    enable: true,
    permission_scopes: [
     {
      id: 'PUBLIC_SALE',
      enable: true,
     }
    ]
  },
  {
    id: 'REPORT',
    enable: true,
    permission_scopes: [
     {
      id: 'ALL_CUSTOMER',
      enable: false,
     }
    ]
  }
]


const transformPermissionToObject = (permissionArray) => {
  const permissionDefault = {
      [PermissionIdEnum.SALE]: {
        permission: false,
        scope: {
          [PermissionScopeIdEnum.PUBLIC_SALE]: false,
        },
      },
      [PermissionIdEnum.REPORT]: {
        permission: false,
        scope: {
          [PermissionScopeIdEnum.ALL_CUSTOMER]: false,
        },
      },
      [PermissionIdEnum.PRICE_APPROVAL]: {
        permission: false,
        scope: null,
      },
      [PermissionIdEnum.IMPORT]: {
        permission: false,
        scope: null,
      },
    }


    if(permissionArray && permissionArray.length){
      permissionArray.forEach(permissionItem => {
      permissionDefault[permissionItem.id].permission = permissionItem.enable
      if (permissionItem.permission_scopes && permissionItem.permission_scopes.length) {
        
        permissionItem.permission_scopes.forEach(permissionScopeItem => {
          console.log('scope')
          permissionDefault[permissionItem.id].scope[permissionScopeItem.id] = permissionScopeItem.enable
        })
      }
    })
    }
    return permissionDefault
  }
onMounted(() => {
  console.log(transformPermissionToArray(items.value[0].permissions));
  console.log(transformPermissionToObject(response))
});

const updateRole = (
  event: boolean,
  role: any,
  permissions: PermissionIdEnum,
  permissionScope: PermissionScopeIdEnum
) => {};
</script>
