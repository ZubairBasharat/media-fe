import { FormCardBody } from "@/components/comon/Form";
import FormSelect from "@/components/comon/Form/FormSelect";
import useToast from "@/components/hooks/useToast";
import { Button } from "@/components/ui/button";
import { useCountryListQuery } from "@/store/features/Website/Country/countryApiSlice";
import { useGetUserInfoQuery, useUserUpdateMutation } from "@/store/features/Website/Signup/SignUpApiSlice";
import useAuthStore from "@/store/zustand/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface FileUploadFormProps { }

const FileUploadForm: React.FC<FileUploadFormProps> = () => {
    const router = useRouter();
    const [userUpdate] = useUserUpdateMutation();
    const { data: countries } = useCountryListQuery();
    const user = useAuthStore((state: any) => state.user);
    const userData = useGetUserInfoQuery(user?.user);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileType, setFileType] = useState<string | null>(null);
    const [fileSize, setFileSize] = useState<string | null>(null);
    const { ToastSuccess, ToastError } = useToast();

    const formSchema = z.object({
        name: z.string().min(1, { message: "This field is required" }),
        email: z.string().min(1, { message: "This field is required" }).email("This is not a valid email."),
        country_id: z.string().min(1, { message: "This field is required" }),
        postcode: z.string().min(1, { message: "This field is required" }),
        phone: z.string().nullable(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            country_id: "1",
            postcode: "",
            phone: ""
        },
    });

    const onSubmitHandler = async (value: any) => {
        let modifyData = { ...value, id: user?.user, image: preview ? preview : "" };
        try {
            const res = await userUpdate(modifyData).unwrap();
            if (res.code === 201) {
                ToastSuccess("Update Successfully");
            } else if (res?.error?.data?.message) {
                ToastError(res?.error?.data?.message);
            }
        } catch (error) {
            console.error("Error occurred during update:", error);
        }
    };

    useEffect(() => {
        form.reset({
            name: userData?.data?.name,
            postcode: userData?.data?.postcode,
            country_id: String(userData?.data?.country_id),
            phone: userData?.data?.phone,
            email: userData?.data?.email
        });
    }, [form.reset, userData]);

    useEffect(() => {
        if (!selectedFile) {
            setPreview(null);
            setFileType(null);
            setFileSize(null);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        setFileType(selectedFile.type.split('/')[0]);
        setFileSize((selectedFile.size / 1024).toFixed(2) + ' KB');
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setSelectedFile(file);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFile(file);
        }
    };

    const handleRemovePreview = () => {
        setSelectedFile(null);
        setPreview(null);
        setFileType(null);
        setFileSize(null);
    };

    return (
        <div>
            <div>
                <div className="bg-[#f8f9fa] p-8">
                    <div className="rounded-md bg-white p-4 shadow-md">
                        <FormCardBody
                            validation={form}
                            onSubmitHandler={form.handleSubmit(onSubmitHandler)}
                        >
                            <div className="space-y-6">
                                <h4 className="text-[18px] font-semibold">File Upload</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 md:col-span-1">
                                        <FormSelect name="country_id" data={[{ id: '1', name: 'image' }, { id: '2', name: 'audio' }, { id: '3', name: 'video' }]} />
                                    </div>
                                    <div
                                        className="flex items-center justify-center w-full"
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={handleDrop}
                                    >
                                        {preview && (
                                            <>
                                                {fileType === 'image' && (
                                                    <div className="relative">
                                                        <img src={preview} alt="Preview" className="max-w-full h-auto mb-4" />
                                                        <button
                                                            className="absolute top-0 right-0 rounded-full bg-white border border-gray-400 p-1"
                                                            onClick={handleRemovePreview}
                                                        >
                                                            <svg
                                                                className="w-4 h-4 text-gray-500"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                )}
                                                <p>File Type: {fileType}</p>
                                                <p>File Size: {fileSize}</p>
                                            </>
                                        )}
                                        {!preview && (
                                            <label
                                                htmlFor="dropzone-file"
                                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                            >
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg
                                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 20 16"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                        ></path>
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                </div>
                                                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileInputChange} />
                                            </label>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center justify-end">
                                    <Button className="inline-block w-[120px]" type="submit">Update</Button>
                                </div>
                            </div>
                        </FormCardBody>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileUploadForm;
