import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadAppDescription } from "../../../../redux/avio-admin/help/helpAction";
import ChangeDescription from "./ChangeDescription";

function AppDescription() {
  const [changeDescriptionIsOpen, setChangeDescriptionIsOpen] = useState(false);
  const dispatch = useDispatch();

  const helpData = useSelector((state) => state.help);

  useEffect(() => {
    dispatch(loadAppDescription());
  }, [dispatch]);

  return (
    <div
      style={{
        color: "#fff",
        marginLeft: "5%",
        marginTop: "1%",
        marginRight: "5%",
      }}
    >
      <h3>APPLICATION DESCRIPTION</h3>
      <br></br>
      {helpData.appDescription.description}

      <div className="box">
        <button
          type="submit"
          style={{ backgroundColor: "#141e30", textAlign: "center" }}
          onClick={() => setChangeDescriptionIsOpen(true)}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Change app description
        </button>
      </div>
      <ChangeDescription
        changeDescriptionIsOpen={changeDescriptionIsOpen}
        setChangeDescriptionIsOpen={setChangeDescriptionIsOpen}
      />
    </div>
  );
}

export default AppDescription;
