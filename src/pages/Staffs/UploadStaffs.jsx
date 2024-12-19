import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
// import uploadImage from "../../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdOutlineDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { summaryApi } from "../../common";
import staffsCategory from "../../helpers/staffsCategory";
import uploadImage from "../../helpers/uploadImage";

function UploadStaffs({ onClose, fetchData }) {
    const [data, setData] = useState({
        staffName: "",
        staffImage: [],
        staffBrand: "",
        staffPrice: "",
        staffCategory: "",
        staffDiscount: "",
        staffDescription: "",
    });

    const [uploadStaffImageInput, setUploadStaffImageInput] = useState("");
    const [fullScreenImage, setFullScreenImage] = useState("")
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [imagePreview, setImagePreview] = useState("");
    const [isUploading, setIsUploading] = useState(false);




    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUploadStaff = async (e) => {
        try {
            const file = e.target.files[0];
            if (!file) return;

            setIsUploading(true);
            setUploadStaffImageInput(file.name);

            // with this line of code i created an image upload preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);

            // i am uploading to Cloudinary with this line
            const uploadResult = await uploadImage(file);
            console.log("Upload successful:", uploadResult);

            // with this line i added the uploaded image URL to my form data
            setData((prev) => ({
                ...prev,
                staffImage: [...prev.staffImage, uploadResult.secure_url],
            }));
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload image. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteStaffImage = async (index) => {
        const newStaffImage = [...data.staffImage]
        newStaffImage.splice(index, 1)
        setData((prev) => ({
            ...prev,
            staffImage: [...newStaffImage],
        }));

    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log("first", data)

        const response = await fetch(summaryApi.uploadStaff.url,{
            method: summaryApi.uploadStaff.method,
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                staffName: data?.staffName,
                staffImage: data.staffImage,
                staffBrand: data.staffBrand,
                staffPrice: data.staffPrice,
                staffCategory: data.staffCategory,
                staffDiscount: data.staffDiscount,
                staffDescription: data.staffDescription,
            })
        })
        const responseData = await response.json();
        console.log("uploads", responseData)

        if(responseData.success){
            toast.success(responseData?.message)
            onClose()
            fetchData()            
        }

        if (responseData.error) {
            toast.error(responseData?.message)            
        }
        
    }



    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-pink-200 bg-opacity-50">
            <div className="bg-gradient-to-r from-violet-300 to-pink-300 shadow-md p-4 rounded w-full max-w-2xl h-full max-h-[90%] overflow-auto">
                <div className="flex justify-between items-center pb-3 sticky top-0 bg-gradient-to-r from-violet-300 to-pink-300 z-10">
                    <h2>
                        <span className="text-lg font-bold text-violet-900">
                            Upload Staffs
                        </span>
                    </h2>
                    <div
                        onClick={onClose}
                        className="w-fit ml-auto cursor-pointer text-2xl hover:text-pink-900"
                    >
                        <IoCloseCircleOutline />
                    </div>
                </div>

                <form className="grid gap-3 p-4" onSubmit={handleSubmit}>
                    <label htmlFor="staffName">Staff Name :</label>
                    <input
                        type="text"
                        id="staffName"
                        placeholder="Enter Staff Name"
                        value={data?.staffName}
                        onChange={handleOnChange}
                        name="staffName"
                        required
                        className="p-2 bg-pink-200 border rounded"
                    />

                    <label htmlFor="staffImage">Staff Image :</label>
                    <label htmlFor="uploadImageInput">
                        <div className="p-2 bg-pink-200 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                            <div className="text-pink-950 flex justify-center items-center flex-col gap-2">
                                <span className="text-4xl">
                                    <FaCloudUploadAlt />
                                </span>
                                <p className="text-sm">
                                    {isUploading ? "Uploading..." : "Upload Staff Image"}
                                </p>
                                <input
                                    type="file"
                                    id="uploadImageInput"
                                    className="hidden"
                                    onChange={handleUploadStaff}
                                    accept="image/*"
                                />
                            </div>
                        </div>
                    </label>

                    {imagePreview && (
                        <div>
                            <img
                                src={imagePreview}
                                alt="Staff preview"
                                className="w-20 h-20 object-cover bg-pink-200 border"
                            />
                        </div>
                    )}
                    <div>
                        {data?.staffImage[0] ? (
                            <div className="flex items-center gap-2">
                                {
                                    data.staffImage.map((image, index) => {
                                        return (
                                            <div className="relative group">
                                                <img
                                                    key={index}
                                                    src={image}
                                                    alt="Staff preview"
                                                    width={80}
                                                    height={80}
                                                    onClick={() => {
                                                        setOpenFullScreenImage(true);
                                                        setFullScreenImage(image);
                                                    }}
                                                    className="object-cover bg-pink-200 border cursor-pointer"
                                                />
                                                <div
                                                    onClick={() => handleDeleteStaffImage(index)}
                                                    className="absolute bottom-0 right-0 p-1 text-white-500 bg-gradient-to-r from-violet-600 to-pink-600 shadow-md rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 hover:text-pink-950 hidden group-hover:block cursor-pointer">
                                                    <MdOutlineDeleteForever />
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        ) : (
                            <p className="text-pink-950 text-xs">*Please upload staff image</p>
                        )}
                    </div>

                    <label htmlFor="staffBrand">Staff Brand :</label>
                    <input
                        type="text"
                        id="staffBrand"
                        placeholder="Enter Staff Brand"
                        value={data?.staffBrand}
                        name="staffBrand"
                        onChange={handleOnChange}
                        required
                        className="p-2 bg-pink-200 border rounded"
                    />

                    <label htmlFor="staffPrice">Staff Price :</label>
                    <input
                        type="number"
                        id="staffPrice"
                        placeholder="Enter Staff Price"
                        value={data?.staffPrice}
                        name="staffPrice"
                        onChange={handleOnChange}
                        required
                        className="p-2 bg-pink-200 border rounded"
                    />

                    <label htmlFor="staffDiscount">Staff Discount (%) :</label>
                    <input
                        type="number"
                        id="staffDiscount"
                        placeholder="Enter Staff Discount"
                        value={data.staffDiscount}
                        name="staffDiscount"
                        onChange={handleOnChange}
                        required
                        className="p-2 bg-pink-200 border rounded"
                    />


                    <label htmlFor="staffCategory">Staff Category :</label>
                    <select
                        value={data?.staffCategory}
                        onChange={handleOnChange}
                        id="staffCategory"
                        required
                        name="staffCategory"
                        className="p-2 bg-pink-200 border rounded"
                    >
                        <option value={""}>
                                    Select Category
                                </option>
                        {staffsCategory.map((item, index) => {
                            return (
                                <option key={item.value + index} value={item.value}>
                                    {item.label}
                                </option>
                            );
                        })}
                    </select>


                    <label htmlFor="staffDescription">Staff Description :</label>
                    <textarea
                        id="staffDescription"
                        placeholder="Enter Staff Description"
                        value={data?.staffDescription}
                        name="staffDescription"
                        onChange={handleOnChange}
                        className="p-2 bg-pink-200 border rounded min-h-[120px] resize-y"
                    />

                    <div className="sticky bottom-0 bg-gradient-to-r from-violet-300 to-pink-300 pt-4 mt-4">
                        <button
                            type="submit"
                            className="w-full px-6 py-2 rounded-r-full bg-gradient-to-r from-violet-600 to-pink-600
                             text-white transition-all duration-300 hover:shadow-lg hover:scale-105 mb-2"
                        >
                            Upload Staff
                        </button>

                        <button
                            type="button"
                            className="w-full px-6 py-2 rounded-l-full bg-gradient-to-r from-pink-600 to-violet-600
                              text-white transition-all duration-300 hover:shadow-lg hover:scale-105 mb-4"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <div className="text-center pb-2">
                            <p className="text-pink-950 text-sm font-medium">
                                *All fields are required
                            </p>
                        </div>
                    </div>
                </form>
            </div>
            {/* Displaying the productImage full screen */}
            {
                openFullScreenImage && (
                    <div>
                        <DisplayImage
                            onClose={() => setOpenFullScreenImage(false)}
                            imgUrl={fullScreenImage}
                            name={uploadStaffImageInput}
                        />
                        <p className="text-sm font-bold text-gray-600">Name: {uploadStaffImageInput}</p>
                    </div>
                )
            }

        </div>
    );
}

export default UploadStaffs;