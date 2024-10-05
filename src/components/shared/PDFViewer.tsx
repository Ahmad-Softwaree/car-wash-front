import React, { useEffect } from "react";

export default function PDFViewer({ data }: { data: Blob | null }) {
  useEffect(() => {
    if (data && data instanceof Blob) {
      const fileURL = URL.createObjectURL(data); // Create URL from Blob
      const iframe = document.querySelector("iframe");
      if (iframe) iframe.src = fileURL;
    }
  }, [data]);

  return (
    <iframe
      title="psula"
      name="psula"
      src=""
      id="myFrame"
      className="w-full h-[600px] mt-5"
    ></iframe>
  );
}
