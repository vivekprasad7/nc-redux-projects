import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatients } from "../redux/slices/Patient";
import { getWards } from "../redux/slices/Ward";

const Hospital = () => {
  const patient = useSelector((store) => store.patient);
  const ward = useSelector((store) => store.ward);

  const dispatch = useDispatch();

  console.log("Patient", patient.status, patient.patients);
  console.log("Ward", ward.status, ward.wards);

  useEffect(() => {
    if (patient?.status === "idle") {
      dispatch(getPatients());
    }
  }, [dispatch, patient?.status]);

  useEffect(() => {
    if (ward?.status === "idle") {
      dispatch(getWards());
    }
  }, [dispatch, ward?.status]);

  const occupancyRate = useMemo(() => {
    return ward?.wards?.reduce((acc, curr) => acc + +curr.capacity, 0);
  }, [ward]);

  console.log(occupancyRate);

  return (
    <div>
      <h1>Hospital</h1>
      <h2>
        Total Number of Patients:{" "}
        {patient?.status === "loading" ? "Loading" : patient?.patients?.length}{" "}
      </h2>
      <h2>
        Occupancy Rate:{" "}
        {ward?.status === "loading" ? (
          "Loading"
        ) : (
          <>
            {" "}
            {patient?.patients?.length} / {occupancyRate}{" "}
          </>
        )}
      </h2>
    </div>
  );
};

export default Hospital;
