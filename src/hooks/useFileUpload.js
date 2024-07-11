export function useFileUpload() {
  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("error", error);
    }
  };

  return { upload };
}
