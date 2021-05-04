/* eslint-disable */

import {
  Box,
  Button,
  ButtonGroup,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import DeleteForeverTwoToneIcon from "@material-ui/icons/DeleteForeverTwoTone";
import EditIcon from "@material-ui/icons/Edit";
import { useStoreActions, useStoreState } from "easy-peasy";
import * as React from "react";
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import CatCreate from "../../components/catCreate";
import CatEdit from "../../components/catEdit";

function CategoryTable() {
  const { categories, products } = useStoreState((state) => state.vox);
  const { getCategories, deleteCategory, getCategory } = useStoreActions(
    (state) => state.vox
  );
  const [openCatCreate, setOpenCatCreate] = useState(false);
  const [openCatEdit, setOpenCatEdit] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const onCloseCatCreateModal = () => {
    setOpenCatCreate(false);
  };
  const onCloseCatEditModal = () => {
    setOpenCatEdit(false);
  };

  return (
    <>
      <CardHeader title="Categories" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell component="th" scope="row">
                  Name
                </TableCell>
                <TableCell>Total Products</TableCell>
                <TableCell>
                  <TableSortLabel>Sales</TableSortLabel>
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories?.map((category) => (
                <TableRow hover key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    {category.id === ""
                      ? products.length
                      : products.filter(
                          (product) => product.genre === category.name
                        ).length}
                  </TableCell>
                  <TableCell>00</TableCell>
                  <TableCell>
                    <ButtonGroup
                      color="primary"
                      size="small"
                      aria-label="outlined primary button group"
                    >
                      <Button
                        onClick={() => {
                          setLoading(true);
                          getCategory(category.id);
                          setTimeout(() => {
                            setOpenCatEdit(true);
                            setLoading(false);
                          }, 1200);
                        }}
                      >
                        <EditIcon color="primary" />
                      </Button>
                      <Button onClick={() => deleteCategory(category.id)}>
                        <DeleteForeverTwoToneIcon color="error" />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 8,
        }}
      >
        <Button
          color="primary"
          size="small"
          variant="contained"
          fullWidth
          onClick={() => {
            setOpenCatCreate(true);
          }}
        >
          Add New Category
        </Button>
      </Box>

      <Modal open={openCatCreate} onClose={onCloseCatCreateModal} center>
        <div
          className="container mt-5"
          style={{ height: "200px", width: "300px" }}
        >
          <CatCreate setOpenCatCreate={setOpenCatCreate} />
        </div>
      </Modal>

      <Modal open={openCatEdit} onClose={onCloseCatEditModal} center>
        <div
          className="container mt-5"
          style={{ height: "200px", width: "300px" }}
        >
          <CatEdit setOpenCatEdit={setOpenCatEdit} />
        </div>
      </Modal>
    </>
  );
}

export default CategoryTable;
