import { CardHeader, Grid } from "@material-ui/core";
import { useStoreActions, useStoreState } from "easy-peasy";
import _ from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { EditorContext } from "../../lib/context/EditorContext";
import { Paginate } from "../../utils/Paginate";
import ListGroup from "./ListGroup";
import Pagination from "./Pagination";
import ProductTableHeader from "./ProductTableHeader";
import PTable from "./PTable";

function ProductTable() {
  const { products, categories } = useStoreState((state) => state.vox);
  const { getProduct, getProducts, deleteProduct } = useStoreActions(
    (state) => state.vox
  );

  const [isLoading, setLoading] = useState(false);
  // const [path, setPath] = useState("title");
  // const [order, setOrder] = useState("asc");
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGenre, setCurrentGenre] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleGenreSelect = (genre) => {
    setCurrentGenre(genre);
  };
  const handleOnSort = (path) => {
    // setPath(path);
  };
  const filtered =
    currentGenre && currentGenre.id
      ? products.filter((p) => p.categoryId === currentGenre.id)
      : products;

  // const sorted = _.orderBy(filtered, [path], [order]);
  const Products = Paginate(filtered, currentPage, pageSize);
  const { setOpenthis, setComponent, string, setString } = React.useContext(
    EditorContext
  );

  function handleSearch() {
    if (string != null) {
      var results = _.filter(Products, function (item) {
        return item.title.toLowerCase().indexOf(string.toLowerCase()) > -1;
      });
    }
    setFilteredData(results);
  }
  const data = string === null || string.length < 2 ? Products : filteredData;

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <>
      <CardHeader title="Products" />
      <ProductTableHeader
        setOpenthis={setOpenthis}
        setComponent={setComponent}
        string={string}
        setString={setString}
        isLoading={isLoading}
        setLoading={setLoading}
        getProducts={getProducts}
        handleSearch={handleSearch}
      />

      <Grid container style={{ marginTop: "10px" }}>
        <Grid item xs={2}>
          <ListGroup
            Items={categories}
            onItemSelect={handleGenreSelect}
            selectedItem={currentGenre}
          />
        </Grid>
        <Grid item xs={10}>
          <PTable
            Products={data}
            setLoading={setLoading}
            getProduct={getProduct}
            deleteProduct={deleteProduct}
            onSort={handleOnSort}
          />
        </Grid>
      </Grid>

      <div className="clearfix">
        <Pagination
          ItemsCount={filtered.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          Products={Products}
        />
      </div>
    </>
  );
}

export default ProductTable;
