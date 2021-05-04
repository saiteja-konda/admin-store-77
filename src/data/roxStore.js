import axios from "axios";
import { action, thunk } from "easy-peasy";
import { baseUrl } from "../utils/urlConfig";
export const roxStore = {
  orders: [],
  Promos: [],

  setPromos: action((state, payload) => {
    state.Promos = payload.variants;
  }),
  addNewPromo: action((state, payload) => {
    state.Promos.push(payload);
  }),
  getNewPromo: thunk(async (actions, payload) => {
    actions.addNewPromo(payload.addedImage);
    axios
      .put(`${baseUrl}/promo`, payload.newArray)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }),
  performUpdate: action((state, payload) => {
    state.Promos = payload.cleaned;
  }),
  updatePromo: thunk(async (actions, payload) => {
    axios
      .put(`${baseUrl}/promo`, payload.newArray)
      .then((res) => {
        actions.setPromos(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }),
  getPromos: thunk(async (actions) => {
    axios
      .get(`${baseUrl}/promo`)
      .then((res) => {
        actions.setPromos(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }),

  // Promos

  setOrders: action((state, payload) => {
    state.orders = payload;
  }),
  getOrders: thunk(async (actions) => {
    axios
      .get(`${baseUrl}/orders`)
      .then((res) => {
        actions.setOrders(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }),
};
export default roxStore;
