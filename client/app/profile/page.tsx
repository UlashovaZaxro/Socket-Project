"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useGetSingleUser } from "@/features/login/hooks/useGetSingleUser";

const BASE_URL = "http://localhost:4000";

function ProfilePage() {
    const router = useRouter();

    const [imageURL, setImageURL] = useState<string>(""); // displayed image
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const { data, isLoading } = useGetSingleUser();

    // ====== CHECK TOKEN & LOAD SAVED IMAGE FROM LOCALSTORAGE ======
    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) {
        router.push("/login");
        return;
        }

        setToken(storedToken);

        // load saved image from localStorage (if exists)
        const savedImage = localStorage.getItem("userImg");
        if (savedImage) setImageURL(`${BASE_URL}/${savedImage}`);
    }, [router]);

    // ====== WHEN BACKEND RETURNS USER DATA, UPDATE IMAGE ======
    useEffect(() => {
        if (data?.user?.profileImage) {
        setImageURL(`${BASE_URL}/${data.user.profileImage}`);
        localStorage.setItem("userImg", data.user.profileImage);
        }
    }, [data]);

    // ====== FILE SELECT (PREVIEW) ======
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setSelectedFile(file);

        // local preview
        setImageURL(URL.createObjectURL(file));
        }
    };

    // ====== UPLOAD TO BACKEND ======
    const handleUpload = async () => {
        if (!selectedFile || !token) return;

        const formData = new FormData();
        formData.append("profileImage", selectedFile); // must match backend

        setUploading(true);

        try {
        const res = await axios.put(`${BASE_URL}/api/profile`, formData, {
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
            },
        });

        // success
        const newImagePath = res.data.user.profileImage;

        localStorage.setItem("userImg", newImagePath);
        setImageURL(`${BASE_URL}/${newImagePath}`);

        alert("Profile image updated!");
        } catch (err: any) {
        console.error("Upload error:", err);
        alert("Upload failed. Check backend.");
        } finally {
        setUploading(false);
        setSelectedFile(null);
        }
    };

    if (!token || isLoading) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl p-8 w-full max-w-sm shadow-2xl text-center">

            {/* PROFILE IMAGE */}
            <div className="relative inline-block mx-auto">
            <img
                src={imageURL || "/default-profile.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover mx-auto"
            />

            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full text-xs cursor-pointer hover:bg-blue-700 transition">
                ✏️
                <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                />
            </label>
            </div>

            {/* USER INFO */}
            <div className="mt-6 space-y-2">
            <h2 className="text-2xl font-bold text-white">
                {data?.user?.fullName || "Unknown User"}
            </h2>

            <p className="text-gray-300 text-sm">
                {data?.user?.email}
            </p>

            <p className="text-gray-500 text-xs">
                Member since: {data?.user?.createdAt?.slice(0, 10)}
            </p>
            </div>

            {/* UPLOAD BUTTON */}
            {selectedFile && (
            <button
                onClick={handleUpload}
                disabled={uploading}
                className="mt-5 w-full py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition shadow-lg"
            >
                {uploading ? "Uploading..." : "Save New Image"}
            </button>
            )}
        </div>
        </div>
    );
}

export default ProfilePage;
