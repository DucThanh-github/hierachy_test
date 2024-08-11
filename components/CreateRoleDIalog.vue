<template>
  <div>
    <v-btn @click="openDialog = true"> Create Role </v-btn>
    <v-dialog v-model="openDialog">
      <v-form class="d-flex align-center">
        <v-card width="50%" class="pa-5">
          <div class="d-flex justify-space-between align-center">
            <span>Role</span>
            <v-btn variant="plain" @click="openDialog = false">
              <v-icon> mdi mdi-close </v-icon>
            </v-btn>
          </div>

          <div class="mt-8">
            <span> Name </span>
            <v-text-field v-model="newRole.name" variant="outlined">
            </v-text-field>
          </div>

          <div class="mt-8">
            <span> Sales </span>
            <div class="d-flex ga-5">
              <v-switch
                v-model="newRole.permissions[PermissionIdEnum.SALE].permission"
                color="green"
                label="Sale"
              />
              <v-checkbox
                v-model="
                  newRole.permissions[PermissionIdEnum.SALE].scope[
                    PermissionScopeIdEnum.PUBLIC_SALE
                  ]
                "
                label="Public sales"
              />
            </div>
          </div>

          <div>
            <span> View </span>
            <div class="d-flex ga-5">
              <v-switch
                v-model="newRole.permissions[PermissionIdEnum.REPORT].permission"
                color="green"
                label="Report"
              />
              <v-checkbox
                v-model="
                  newRole.permissions[PermissionIdEnum.REPORT].scope[
                    PermissionScopeIdEnum.ALL_CUSTOMER
                  ]
                "
                label="All Customer"
              />
            </div>
          </div>

          <div>
            <span> Price Approval </span>
            <div class="d-flex ga-5">
              <v-switch
                v-model="
                  newRole.permissions[PermissionIdEnum.PRICE_APPROVAL].permission
                "
                color="green"
                label="Price Approve"
              />
            </div>
          </div>

          <div>
            <span> Import </span>
            <div class="d-flex ga-5">
              <v-switch
                v-model="newRole.permissions[PermissionIdEnum.IMPORT].permission"
                color="green"
                label="Import Portfolio"
              />
            </div>
          </div>

          <v-card-actions>
            <v-btn @click="openDialog = false"> Cancel </v-btn>
            <v-btn color="primary" variant="tonal" @click="createRole"> Confirm </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { PermissionIdEnum, PermissionScopeIdEnum } from "~/type/role";

const openDialog = ref(false);

const newRoleDefault = {
  name: "",
  name_th: "",
  permissions: {
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
  },
};

const newRole = ref(JSON.parse(JSON.stringify(newRoleDefault)));
const createRole = () => {
    console.log({
        ...newRole.value,
        permissions:transformPermissionToArray(newRole.value.permissions)
    })
}
</script>
