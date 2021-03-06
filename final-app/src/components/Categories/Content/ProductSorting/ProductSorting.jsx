import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./ProductSorting.css";

class ProductSorting extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { pagination, onClick, sorting } = this.props;
    console.log("PRODUCT SORTING:", sorting);
    let totalPage = 0;
    let pageNumber;
    let pages = [];
    let classNextButton = "page_next";
    if (pagination) {
      totalPage = Math.floor(
        (pagination.total + pagination.limit - 1) / pagination.limit
      );
      if (pagination.skip === 0) {
        pageNumber = 1;
      } else {
        pageNumber = Math.floor(pagination.skip / pagination.limit) + 1;
      }
    }
    for (let index = 1; index <= totalPage; index++) {
      const objPageNumber = {
        id: Math.floor(Math.random() * 1000) + 1,
        value: index
      }
      pages.push(objPageNumber);
    }

    if (pageNumber === totalPage) {
      classNextButton = "page_next_hidden";
    }

    return (
      <div className="product_sorting_container product_sorting_container_top">
        <ul className="product_sorting">
          <li>
            <span className="type_sorting_text">
              {sorting.caseProductSorting.toString()}
            </span>
            <i className="fa fa-angle-down" />
            <ul className="sorting_type">
              <li
                className="type_sorting_btn"
                onClick={() => {
                  onClick("Default Sorting");
                }}
              >
                <span>Default Sorting</span>
              </li>
              <li
                className="type_sorting_btn"
                onClick={() => {
                  onClick("Price");
                }}
              >
                <span>Price</span>
              </li>
              <li
                className="type_sorting_btn"
                onClick={() => {
                  onClick("name");
                }}
              >
                <span>Product Name</span>
              </li>
            </ul>
          </li>
          <li>
            <span>Show</span>
            <span className="num_sorting_text">
              {sorting.numberRecord.toString()}
            </span>
            <i className="fa fa-angle-down" />
            <ul className="sorting_num">
              <li
                className="num_sorting_btn"
                onClick={() => {
                  onClick(...[, 6]);
                }}
              >
                <span>6</span>
              </li>
              <li
                className="num_sorting_btn"
                className="num_sorting_btn"
                onClick={() => {
                  onClick(...[, 12]);
                }}
              >
                <span>12</span>
              </li>
              <li
                className="num_sorting_btn"
                className="num_sorting_btn"
                onClick={() => {
                  onClick(...[, 24]);
                }}
              >
                <span>24</span>
              </li>
            </ul>
          </li>
        </ul>
        <div className="pages d-flex flex-row align-items-center">
          <div className="page_current">
            <span>{pageNumber.toString()}</span>
            <ul className="page_selection">
              {pages.map(item => (
                <li
                  key={item.id}
                  onClick={() => {
                    onClick(
                      ...[
                        ,
                        pagination.limit,
                        pagination.limit * (item.value - 1)
                      ]
                    );
                  }}
                >
                  <a href="#">{item.value}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="page_total">
            <span>of</span>
            {totalPage.toString()}
          </div>
          <div
            id="next_page"
            className={classNextButton}
            onClick={() => {
              onClick(...[, pagination.limit, pageNumber * pagination.limit]);
            }}
          >
            <a href="#">
              <i className="fa fa-long-arrow-right" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

ProductSorting.propTypes = {
  pagination: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  sorting: PropTypes.object.isRequired
};

ProductSorting.defaultProps = {
  sorting: {
    caseProductSorting: "Default Sorting",
    numberRecord: 6
  },
  pagination:{
    skip:0,
    limit:6,
    total:0
  }
};

export default ProductSorting;
