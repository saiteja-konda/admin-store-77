/* eslint-disable */

import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";

function Pagination({
  pageSize,
  onPageChange,
  ItemsCount,
  currentPage,
  Products,
}) {
  const pagesCount = Math.ceil(ItemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <>
      <div className="text-center">
        Showing <b>{Products.length}</b> out of <b>{ItemsCount}</b> entries
      </div>
      <div className="d-flex justify-content-end">
        <div>
          <ul className="pagination mt-1">
            {pages?.map((page) => (
              <li
                key={page}
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
              >
                <a className="page-link" onClick={() => onPageChange(page)}>
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

Pagination.propTypes = {
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  ItemsCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  Products: PropTypes.array.isRequired,
};
export default Pagination;
