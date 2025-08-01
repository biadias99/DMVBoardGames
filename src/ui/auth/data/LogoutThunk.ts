import type { BaseThunk } from "../../../framework/state/update/BaseThunk.ts";
import { generateApiThunkWithExternalConfig } from "../../../framework/state/update/api/ApiThunkFactory.ts";
import type { LoginComponentStore } from "../types/LoginComponentStore.ts";
import { getSupabaseClient } from "../SupabaseClient.ts";
import { AuthResponse } from "../types/AuthResponse.ts";

async function retrieveData() {
  const { error } = await getSupabaseClient().auth.signOut();

  if (!error) {
    return new AuthResponse(false);
  } else {
    return defaultResponse.defaultFunction(error.toString());
  }
}

const defaultResponse = {
  defaultFunction: (error: string) => {
    return new AuthResponse(true, {}, error);
  }
};

export function getLoginComponentStoreFromLogoutResponse(): LoginComponentStore {
  return {
    isLoggedIn: false,
    successMessage: ''
  };
}


export const LOGOUT_THUNK: BaseThunk = generateApiThunkWithExternalConfig(
  retrieveData,
  defaultResponse,
).addGlobalStateReducer((loginState: any) => {
  return {
    isLoggedIn: loginState.loggedIn,
  };
});
