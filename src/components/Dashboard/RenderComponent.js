import { StoreProvider } from "easy-peasy";
import React, { useContext } from "react";
import { store0 } from "../../data/store";
import { DashboardContext } from "../../lib/context/DashboardContext";
import Articles from "../Blog/Articles/Articles";
import Newsletter from "../Blog/NewLetter/Newsletter";
import Carousel from "../Carousel/Carousel";
import Order from "../Order/Order";
import Referees from "../Referees/Referees";
import About from "../Settings/About";
import Credentials from "../Settings/Credentials";
import ReturnsPolicy from "../Settings/ReturnsPolicy";
import Terms from "../Settings/Terms";
import Tesmonials from "../Tesmonials/Testmonials";
import Categories from "./Categories";
import Products from "./Products";
function RenderComponent({ site }) {
  const { component } = useContext(DashboardContext);
  const ComponentGenerator = () => {
    switch (component) {
      case "Products":
        return <Products />;
      case "Categories":
        return <Categories />;
      case "Orders":
        return (
          <StoreProvider store={store0}>
            <Order />
          </StoreProvider>
        );
      case "Articles":
        return <Articles />;
      case "Newsletter":
        return <Newsletter />;
      case "About":
        return <About site={site} />;
      case "Terms and conditions":
        return <Terms />;
      case "Return Policy":
        return <ReturnsPolicy />;
      case "Change Credntials":
        return <Credentials />;
      case "Banners":
        return (
          <StoreProvider store={store0}>
            <Carousel />
          </StoreProvider>
        );
      case "Referees":
        return <Referees />;
      case "Testmonials":
        return <Tesmonials />;
      default:
        return (
          <StoreProvider store={store0}>
            <Carousel />
          </StoreProvider>
        );
    }
  };
  const UseComponentRender = ComponentGenerator();
  return <div>{UseComponentRender}</div>;
}

export default RenderComponent;
