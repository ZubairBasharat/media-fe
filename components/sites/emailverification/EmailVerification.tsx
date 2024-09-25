"user client";
import ConvertFile from "@/components/sites/emailverification/ConvertFile";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EmailVerificationCheck = () => {
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const searchParams = useSearchParams();
    const token = searchParams?.get("token");
    // const { token } = searchParams;

    console.log("dd", searchParams);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                setIsLoading(true);
                const response = await axios.post(
                    `${process.env.SERVER_URL}/verify-email`,
                    { token }
                );
                if (response.data.status === "success") {
                    setIsTokenValid(true);
                }
            } catch (error) {
                setIsTokenValid(false);
            } finally {
                setIsLoading(false);
            }
        };

        if (token) {
            verifyEmail();
        }
    }, [token]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">

                {isLoading ? (
                    <div className="flex justify-center items-center mt-4">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                    </div>
                ) : isTokenValid ? (
                    <ConvertFile />
                ) : (
                    <p className="text-lg font-semibold">Invalid token</p>
                )}
            </div>
        </div>
    );
};

export default EmailVerificationCheck;
