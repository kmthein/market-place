import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import Button from "./Button";
import { FaPlus } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { uploadImage } from "../api/product";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadImage = ({ oldProductId, setActiveKey }) => {
  //   const [previewOpen, setPreviewOpen] = useState(false);
  //   const [previewImage, setPreviewImage] = useState("");
  //   const [previewTitle, setPreviewTitle] = useState("");
  //   const [fileList, setFileList] = useState([]);
  //   const handleCancel = () => setPreviewOpen(false);
  //   const handlePreview = async (file) => {
  //     if (!file.url && !file.preview) {
  //       file.preview = await getBase64(file.originFileObj);
  //     }
  //     setPreviewImage(file.url || file.preview);
  //     setPreviewOpen(true);
  //     setPreviewTitle(
  //       file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
  //     );
  //   };
  //   const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  //   const uploadButton = (
  //     <button
  //       style={{
  //         border: 0,
  //         background: "none",
  //       }}
  //       type="button"
  //     >
  //       <PlusOutlined />
  //       <div
  //         style={{
  //           marginTop: 8,
  //         }}
  //       >
  //         Add
  //       </div>
  //     </button>
  //   );

  const [previewImg, setPreviewImg] = useState([]);
  const [images, setImages] = useState([]);

  const onChangeHandler = (e) => {
    const selectedImages = e.target.files;
    const selectedImagesArray = Array.from(selectedImages);
    setImages((prev) => [...prev, ...selectedImagesArray]);

    const previewImagesArray = selectedImagesArray.map((img) => {
      return URL.createObjectURL(img);
    });
    setPreviewImg((prev) => prev.concat(previewImagesArray));
  };

  const uploadSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("product_images", images[i]);
    }
    formData.append("product_id", oldProductId);
    try {
      const response = await uploadImage(formData);
      if (response.success) {
        message.success(response.message);
        setActiveKey("1");
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const deleteHandler = (img) => {
    const indexToDelete = previewImg.findIndex(e => e == img);
    if(indexToDelete != -1) {
    const updatedSelectedImg = [...images];
    updatedSelectedImg.splice(indexToDelete, 1);

    setImages(updatedSelectedImg);
    setPreviewImg(previewImg.filter((e) => e != img));
    URL.revokeObjectURL(img);
    }
  };

  return (
    <>
      <h1 className="text-lg font-semibold mb-4">Upload your product images</h1>
      <form
        method="POST"
        encType="multipart/form-data"
        onSubmit={uploadSubmitHandler}
      >
        {/* <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal> */}
        <label htmlFor="upload">
          <div className=" border-[2px] border-dashed rounded-md w-[300px] flex items-center h-[100px]">
            <FaPlus className="mx-auto text-xl cursor-pointer text-black/50 hover:text-black/70 hover:text-[1.3rem]" />
          </div>
        </label>
        <input
          type="file"
          hidden
          id="upload"
          name="product_images"
          multiple
          onChange={onChangeHandler}
          accept="image/png,image/jpg,image/jpeg"
        />
        <div className=" flex gap-2 mt-4">
          {previewImg &&
            previewImg.map((img, index) => (
              <div className=" basis-1/6 h-32 relative">
                <img
                  src={img}
                  key={index}
                  className="w-full h-full object-cover rounded-md"
                />
                <FaTrashAlt
                  onClick={() => deleteHandler(img)}
                  className="z-50 absolute bottom-2 right-2 text-red-500 text-md cursor-pointer"
                />
              </div>
            ))}
        </div>
        <div className="mt-4">
          <Button>Upload</Button>
        </div>
      </form>
    </>
  );
};
export default UploadImage;
