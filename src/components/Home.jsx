import React from "react";
import { CartState } from "../Context/Context";
import Filters from "./Filters";
import SingleProducts from "./SingleProducts";

const Home = () => {
  const {
    state: { products },
    productState: { byStock, byFastDelivery, sort, byRating, bySearch },
  } = CartState();

  const transform = () => {
    let sortedProduct = products;
    if (sort) {
      sortedProduct = sortedProduct.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProduct = sortedProduct.filter((prod) => prod.inStock);
    }
    if (byFastDelivery) {
      sortedProduct = sortedProduct.filter((prod) => prod.fastDelivery);
    }
    if (byRating) {
      sortedProduct = sortedProduct.filter((prod) => prod.rating >= byRating);
    }
    if (bySearch) {
      sortedProduct = sortedProduct.filter((prod) =>
        prod.name.toLowerCase().includes(bySearch)
      );
    }

    return sortedProduct;
  };

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transform().map((prod) => {
          return <SingleProducts prod={prod} key={prod.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
