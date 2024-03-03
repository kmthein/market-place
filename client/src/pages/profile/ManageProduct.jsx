import React, { useEffect, useState } from "react";
import ProductForm from "../../components/ProductForm";

const ManageProduct = ({ setActiveKey, editMode, oldProductId }) => {

  return (
    <ProductForm setActiveKey={setActiveKey} editMode={editMode} oldProductId={oldProductId} />
  );
};

export default ManageProduct;
