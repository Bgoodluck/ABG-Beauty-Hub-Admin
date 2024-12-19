// const uploadImage = async (image) => {
//     const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;

//     try {
//         const formData = new FormData();
//         formData.append('file', image);
//         formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

//         const response = await fetch(url, {
//             method: 'POST',
//             body: formData
//         });

//         if (!response.ok) {
//             const errorData = await response.json().catch(() => null);
//             console.error('Upload error details:', errorData);
//             throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error uploading image:', error);
//         throw error;
//     }
// };

// export default uploadImage;


const uploadImage = async (image) => {
    const cloudName = "dmefsl3py";
    const uploadPreset = "jobportfolio";

    if (!cloudName || !uploadPreset) {
        console.error('Cloudinary environment variables are not set');
        throw new Error('Cloudinary configuration is missing');
    }

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    try {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', uploadPreset);

        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('Upload error details:', errorData);
            throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export default uploadImage;