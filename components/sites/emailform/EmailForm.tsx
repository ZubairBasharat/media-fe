import axios from "axios";
import { useState } from "react";

const SERVER_URL = process.env.SERVER_URL;

const EmailForm = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setMessage("");
        setIsLoading(true);

        try {
            const response = await axios.post(
                `${SERVER_URL}/validate-email`,
                { email }
            );

            await axios.post(
                `${SERVER_URL}/save-user`,
                { email }
            );

            setMessage(response.data.message);
        } catch (error) {
            setMessage("An error occurred. Please try again later."); // Provide a more generic error message
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={isLoading}
                >
                    {isLoading ? "Submitting..." : "Submit"}
                </button>
                {isLoading && (
                    <div className="flex justify-center items-center mt-4">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                    </div>
                )}
                {message && <p className="mt-4 text-center">{message}</p>}
            </form>
        </div>
    );
};

export default EmailForm;
