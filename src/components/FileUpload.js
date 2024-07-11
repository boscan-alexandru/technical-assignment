import { selectTheme } from "@/slices/globalSettingsSlice";
import getFileType from "@/utils/files";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FileUpload = ({ onUploaded, onClear }) => {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("Unknown");
  const [preview, setPreview] = useState(null);
  const theme = useSelector(selectTheme);

  useEffect(() => {
    if (file) {
      if (fileType === "Image" || fileType === "Video" || fileType === "PDF") {
        setPreview(URL.createObjectURL(file));
      }

      if (fileType === "Unknown") {
        setPreview(null);
      }
    }
  }, [file, fileType]);

  const handleFileChange = (e) => {
    const file_selected = e.target.files[0];
    const file_type = getFileType(file_selected);
    if (file_selected) {
      setFile(file_selected);
      setFileType(file_type);

      if (
        file_type === "Image" ||
        file_type === "Video" ||
        file_type === "PDF"
      ) {
        setPreview(URL.createObjectURL(file_selected));
      }

      if (file_type === "Unknown") {
        setPreview(null);
      }

      onUploaded(file_selected);
    }
  };

  const openUploader = () => {
    const image_input = document.getElementById("file-input");
    image_input.click();
  };
  const resetUploader = () => {
    setFile(null);
    setFileType("Unknown");
    setPreview(null);
    onClear();
  };
  return (
    <div className={`file-upload-area${theme}`}>
      {!preview ? (
        <div className={`file-upload-container${theme}`} onClick={openUploader}>
          <input
            id="file-input"
            className="file-input"
            type="file"
            accept="*"
            onChange={handleFileChange}
          />
          <svg className={`icon file-input-icon${theme}`}>
            <use href="images/icons.svg#attachment-icon" />
          </svg>
        </div>
      ) : (
        <div className="file-preview">
          <button className="file-upload-delete" onClick={resetUploader}>
            <svg className="icon-sm image-delete-icon">
              <use href="images/icons.svg#remove-icon" />
            </svg>
          </button>
          {fileType === "Image" ? (
            <Image src={preview} width={130} height={130} alt="preview" />
          ) : (
            <video
              src={preview}
              width={130}
              height={130}
              controls
              alt="preview"
            />
          )}
          {fileType !== "Image" &&
          fileType !== "Video" &&
          fileType !== "PDF" ? (
            <div className="file-type">
              <svg className="icon-sm image-delete-icon">
                <use href="images/icons.svg#remove-icon" />
              </svg>
              {fileType}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
