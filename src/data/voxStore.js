import axios from "axios";
import { action, thunk } from "easy-peasy";
import { baseUrl } from "../utils/urlConfig";
export const voxStore = {
  products: [],
  product: {},
  categories: [{ id: "", name: "All Categories" }],
  category: {},
  error: {},
  tempUrl: "",
  loading: false,
  admin: false,
  site: {},
  orders: [],

  setSite: action((state, payload) => {
    state.site = payload;
  }),
  getSite: thunk(async (actions) => {
    axios.get(`${baseUrl}/site`).then((res) => actions.setSite(res.data));
  }),

  updateSite: action((state, payload) => {
    state.site = payload;
  }),
  siteUpdate: thunk(async (actions, payload) => {
    axios
      .put(`${baseUrl}/site`, payload)
      .then((res) => {
        actions.res(payload);
      })
      .catch((err) => console.log(err));
  }),

  setAdmin: action((state, payload) => {
    state.admin = payload;
  }),

  getUrl: action((state, payload) => {
    state.tempUrl = payload;
  }),

  setUrl: thunk(async (actions, payload) => {
    actions.getUrl(payload);
  }),

  setError: action((state, error) => {
    if (error.hasError === "no") {
      state.error = "no";
    } else {
      state.error = "yes";
    }
  }),

  setProducts: action((state, data) => {
    state.products = data;
  }),

  getProducts: thunk(async (actions) => {
    axios
      .get(`${baseUrl}/products`)
      .then((res) => {
        actions.setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }),

  setProduct: action((state, data) => {
    state.product = data;
  }),

  getProduct: thunk(async (actions, id) => {
    axios
      .get(`${baseUrl}/products/${id}`)
      .then((res) => {
        actions.setProduct(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }),
  performProductUpdate: action((state, data) => {
    const newList = state.products.filter((product) => product.id !== data.id);
    newList.push(data);
    state.products = newList;
  }),
  updateProduct: thunk(async (actions, payload) => {
    axios
      .put(`${baseUrl}/products/${payload.id}`, payload)
      .then((res) => actions.performProductUpdate(res.data))
      .catch((err) => {
        console.error(err);
      });
  }),
  performDeleteProduct: action((state, id) => {
    const newList = state.products.filter((product) => product.id !== id);
    state.products = newList;
  }),

  deleteProduct: thunk(async (actions, id) => {
    axios
      .delete(`${baseUrl}/products/${id}`)
      .then((res) => {
        actions.performDeleteProduct(id);
      })
      .catch((err) => {
        console.error(err);
      });
  }),

  setCategories: action((state, data) => {
    state.categories = [{ id: "", name: "All Categories " }, ...data];
  }),
  getCategories: thunk(async (actions, id) => {
    axios
      .get(`${baseUrl}/categories`)
      .then((res) => actions.setCategories(res.data))
      .catch((err) => {
        console.error(err);
      });
  }),
  setCategory: action((state, data) => {
    state.category = data;
  }),
  getCategory: thunk(async (actions, id) => {
    axios
      .get(`${baseUrl}/categories/${id}`)
      .then((res) => {
        actions.setCategory(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }),
  addCategory: action((state, payload) => {
    state.categories.push(payload);
  }),
  createCategory: thunk(async (actions, payload) => {
    axios
      .post(`${baseUrl}/categories`, payload)
      .then((res) => {
        actions.addCategory(res.data);
      })
      .catch((err) => {
        window.alert(`Category with name ${payload.name} already exists`);
      });
  }),

  performCategoryDelete: action((state, id) => {
    const newList = state.categories.filter((category) => category.id !== id);
    state.categories = newList;
  }),

  performCategoryUpdate: action((state, data) => {
    const newList = state.categories.filter(
      (category) => category.id !== data.id
    );
    newList.push(data);
    state.categories = newList;
  }),

  updateCategory: thunk(async (actions, payload) => {
    axios
      .put(`${baseUrl}/categories/${payload.id}`, payload)
      .then((res) => actions.performCategoryUpdate(res.data))
      .catch((err) => {
        console.log(err);
      });
  }),

  deleteCategory: thunk(async (actions, id) => {
    axios
      .delete(`${baseUrl}/categories/${id}`)
      .then((res) => actions.performCategoryDelete(id))
      .catch((err) => {
        console.error(err);
      });
  }),
};

export default voxStore;
