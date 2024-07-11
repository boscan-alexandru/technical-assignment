const fileTypes = {
  "image/jpeg": "Image",
  "image/png": "Image",
  "image/gif": "Image",
  "application/pdf": "PDF",
  "application/msword": "Word Document",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "Word Document",
  "application/vnd.ms-excel": "Excel Document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    "Excel Document",
  "text/plain": "Text File",
  "video/mp4": "Video",
  "video/mpeg": "Video",
  "video/ogg": "Video",
  "video/webm": "Video",
  "video/quicktime": "Video",
};

const fileExtensions = {
  jpg: "Image",
  jpeg: "Image",
  png: "Image",
  gif: "Image",
  pdf: "PDF",
  doc: "Word Document",
  docx: "Word Document",
  xls: "Excel Document",
  xlsx: "Excel Document",
  txt: "Text File",
  mp4: "Video",
  mpeg: "Video",
  ogg: "Video",
  webm: "Video",
  mov: "Video",
};

function getFileType(file) {
  if (!file || !file.type || !file.name) {
    return "Unknown";
  }

  // Detect type by MIME type
  const mimeType = file.type;
  if (fileTypes[mimeType]) {
    return fileTypes[mimeType];
  }

  // Detect type by file extension
  const fileExtension = file.name.split(".").pop().toLowerCase();
  if (fileExtensions[fileExtension]) {
    return fileExtensions[fileExtension];
  }

  return "Unknown";
}

export default getFileType;
