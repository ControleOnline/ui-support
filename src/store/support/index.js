import * as customActions from "./actions";
import * as actions from "@controleonline/ui-default/src/store/default/actions";
import * as getters from "@controleonline/ui-default/src/store/default/getters";
import mutations from "@controleonline/ui-default/src/store/default/mutations";

export default {
  namespaced: true,
  state: {
 item:{},
items:[],
    isLoading: false,
  },
  actions: { ...actions, ...customActions },
  getters,
  mutations,
};
