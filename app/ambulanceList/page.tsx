"use client";
import AmbulanceListComponent from "@components/ambulanceList_component";
import { Layout } from "@components/layout.component";
import React from "react";

const AmbulanceList = () => {
  return (
    <>
      <Layout>
        <AmbulanceListComponent />
      </Layout>
    </>
  );
};

export default AmbulanceList;
