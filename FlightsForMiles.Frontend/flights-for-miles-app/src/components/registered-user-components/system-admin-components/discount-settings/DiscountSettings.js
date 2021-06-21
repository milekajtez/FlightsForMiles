import React from "react";
import DiscountTable from "./DiscountTable";
import Disc1200 from "./Disc1200";
import Disc300 from "./Disc300";
import Disc600 from "./Disc600";
import Quick from "./Quick";

function DiscountSettings() {
  return (
    <div style={{ color: "white" }}>
      <DiscountTable />
      <div>
        <Quick />
        <Disc300 />
        <Disc600 />
        <Disc1200 />
      </div>
    </div>
  );
}

export default DiscountSettings;
