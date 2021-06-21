import React from "react";
import DiscountForm from "./DiscountForm";

function Form600() {
  return (
    <div style={{ display: "inline-block" }}>
      <span className="box">
        <DiscountForm discountType={"600"} />
      </span>
    </div>
  );
}

export default Form600;
