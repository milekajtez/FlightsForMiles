import React from "react";
import DiscountForm from "./DiscountForm";

function FormQuick() {
  return (
    <div style={{ display: "inline-block" }}>
      <span className="box">
        <DiscountForm discountType={"quick"} />
      </span>
    </div>
  );
}

export default FormQuick;
