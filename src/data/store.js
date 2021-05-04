import { createStore, persist } from "easy-peasy";
import rox from "./roxStore";
import vox from "./voxStore";
export const store = createStore(persist({ vox }), {
  mergeStrategy: "mergeShallow",
});

export const store0 = createStore(persist({ rox }), {
  mergeStrategy: "mergeShallow",
});
