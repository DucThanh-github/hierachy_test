import { PermissionIdEnum, PermissionScopeIdEnum } from "~/type/role";

export const transformPermissionToArray = (permissionObject) => {
  return Object.values(PermissionIdEnum).map((idPermission) => {
    const id = idPermission;
    const enable = permissionObject[idPermission].enable;
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
        enable: permissionObject[idPermission].scope[permissionScopeItem],
      };
    });
    return {
      id,
      enable,
      permission_scopes,
    };
  });
};

export const transformPermissionToObject = (permissionArray) => {
  const permissionDefault = {
    [PermissionIdEnum.SALE]: {
      enable: false,
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
  };

  if (permissionArray && permissionArray.length) {
    permissionArray.forEach((permissionItem) => {
      permissionDefault[permissionItem.id].enable = permissionItem.enable;
      if (
        permissionItem.permission_scopes &&
        permissionItem.permission_scopes.length
      ) {
        permissionItem.permission_scopes.forEach((permissionScopeItem) => {
          permissionDefault[permissionItem.id].scope[permissionScopeItem.id] =
            permissionScopeItem.enable;
        });
      }
    });
  }
  return permissionDefault;
};
