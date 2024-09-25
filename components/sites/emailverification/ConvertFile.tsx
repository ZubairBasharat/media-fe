import axios from "axios";
import { saveAs } from "file-saver";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ConvertFile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("png");
  const [error, setError] = useState(null);

  const formats = ["png", "jpg", "jpeg", "mp4", "avi", "mp3", "wav"];

  const onDrop = useCallback(
    async (acceptedFiles: any) => {
      setIsLoading(true);
      try {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("format", selectedFormat);

        const response = await axios.post(
          `${process.env.SERVER_URL}/convert-file`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            responseType: "blob", // Indicate that the response contains a file
          }
        );

        const contentDisposition = response.headers["content-disposition"];
        let filename = "compressed_file"; // Default filename
        if (contentDisposition) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, "");
          }
        }

        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        saveAs(blob, filename); // Save the file
      } catch (error) {
        console.error(error);
        setError("Please select the correct format");
      } finally {
        setIsLoading(false);
      }
    },
    [selectedFormat]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (

    <div className="flex justify-center items-center h-screen">
      {/* <SiteHeader /> */}

      <div {...getRootProps()} className="text-center">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-lg font-semibold">Drop the file here ...</p>
        ) : (
          <p className="text-lg font-semibold">
            Drag 'n' drop a file here, or click to select a file
          </p>
        )}
        {isLoading && (
          <div className="flex justify-center items-center mt-4">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
          </div>
        )}
        <div className="mt-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="format"
          >
            Select Format:
          </label>
          <select
            value={selectedFormat}
            onChange={(e) => {
              e.stopPropagation();
              setSelectedFormat(e.target.value);
              setError("");
            }}
            onClick={(e) => e.stopPropagation()}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="format"
          >
            {formats.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
          {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
          {/* Add this line */}
        </div>
      </div>
    </div>
  );
};

export default ConvertFile;
