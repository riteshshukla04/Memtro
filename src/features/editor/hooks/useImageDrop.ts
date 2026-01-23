import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useCanvasActions } from "./useCanvasActions";

export const useImageDrop = () => {
  const { addImageFromUrl, addBackgroundFromUrl } = useCanvasActions();

  const onDropBackground = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          // If canvas has no background image, assume this is the main template background
          addBackgroundFromUrl(result);
        };
        reader.readAsDataURL(file);
      });
    },
    [addBackgroundFromUrl],
  );

  const onDropImage = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          // If canvas has no background image, assume this is the main template background
          addImageFromUrl(result);
        };
        reader.readAsDataURL(file);
      });
    },
    [addImageFromUrl],
  );

  const dropzoneBackground = useDropzone({
    onDrop: onDropBackground,
    accept: { "image/*": [] },
    multiple: false,
  });
  const dropzoneImage = useDropzone({
    onDrop: onDropImage,
    accept: { "image/*": [] },
    multiple: false,
  });

  return {
    dropzoneBackground,
    dropzoneImage,
  };
};
