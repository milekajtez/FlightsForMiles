import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadAppDescription } from "../../../redux/avio-admin/help/helpAction";

function DisplayAppDescription() {
  const dispatch = useDispatch();

  const helpData = useSelector((state) => state.help);

  useEffect(() => {
    dispatch(loadAppDescription());
  }, [dispatch]);

  return (
    <div style={{ textAlign: "center", fontSize: '20px' }}>
      <br></br>
      {helpData.appDescription.description}
      <hr style={{ backgroundColor: "aqua" }}></hr>
    </div>
  );
}

export default DisplayAppDescription;
