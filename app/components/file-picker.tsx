import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { GalleryIcon, IconProps } from "~/components/icons";

type FileTypes =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "image/svg+xml"
  | "application/pdf"
  | "image/*"
  | "*/*";
type Size = { mb: number } | { kb: number };
type Position = "left" | "center" | "right";

export type FilePickerProps = {
  icon?: React.FC<IconProps> | string;
  previewDefault?: string; // Default preview URL
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onGetPreviewUrls?: (urls: string[] | []) => void;
  clearPreview?: boolean;
  isMulti?: boolean;
  maxSize?: Size;
  position?: Position;
  fileTypes?: FileTypes[];
};

export function FilePicker({
  icon: Icon = GalleryIcon,
  previewDefault, // Added here
  onGetPreviewUrls,
  fileTypes,
  maxSize = { mb: 1 },
  isMulti,
  position = "center",
  inputProps,
  clearPreview,
}: FilePickerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const kbToByte = "kb" in maxSize ? maxSize.kb * 1024 : 0;
  const mbToByte = "mb" in maxSize ? maxSize.mb * 1024 * 1024 : 0;
  const totalSize = kbToByte + mbToByte;

  useEffect(() => {
    if (files.length > 0 && inputRef.current) {
      const dataTransfer = new DataTransfer();
      files.forEach((file) => dataTransfer.items.add(file));
      inputRef.current.files = dataTransfer.files;

      if (onGetPreviewUrls) {
        onGetPreviewUrls(files.map((file) => URL.createObjectURL(file)));
      }
    }
  }, [files, onGetPreviewUrls]);

  const showError = (message: string) => {
    toast.error(message);
  };

  const handleFileSelection = (newFiles: FileList) => {
    const fileArray = Array.from(newFiles);

    const validFiles = fileArray.filter((file) => {
      const format = file.type as FileTypes;

      const isValidType = fileTypes
        ? fileTypes.includes("*/*") ||
          fileTypes.includes("image/*") ||
          fileTypes.includes(format)
        : true;

      const isValidSize = maxSize ? file.size <= totalSize : true;

      if (!isValidType) {
        showError(`Invalid file type: ${file.type}`);
      }
      if (!isValidSize) {
        showError(`File size too large: ${file.name}`);
      }

      return isValidType && isValidSize;
    });

    if (isMulti) {
      setFiles((prevFiles) => {
        const mergedFiles = [...prevFiles, ...validFiles];
        // Remove duplicates
        return mergedFiles.filter(
          (file, index, array) =>
            array.findIndex((i) => i.name === file.name) === index,
        );
      });
    } else {
      setFiles(validFiles);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;

    if (droppedFiles && droppedFiles.length > 0) {
      handleFileSelection(droppedFiles);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelection(e.target.files);
    }
  };

  const previewImageSrc = files.length
    ? URL.createObjectURL(files[0]) // Use selected file if available
    : previewDefault; // Fallback to previewDefault if no file is selected

  return (
    <>
      <label
        aria-label={"Drag and drop file"}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex w-fit cursor-pointer items-center justify-center gap-4 rounded-lg border-2 border-dashed p-4 transition-all ${
          isDragging ? "border-primary-cta" : "border-gray-300"
        } ${position === "left" ? "mr-auto" : position === "right" ? "ml-auto" : "mx-auto"}`}
      >
        {previewImageSrc ? (
          <img
            src={previewImageSrc}
            width={48}
            height={48}
            className={"h-12 w-12"}
            alt={"Preview"}
          />
        ) : typeof Icon === "string" ? (
          <img src={Icon} width={58} height={58} alt="icon" />
        ) : (
          <Icon width={58} height={58} fill={"#d1d5db"} />
        )}

        <div>
          <span>Drag file here</span> <br />
          or <br /> <span className={"text-primary-cta"}>Browse files</span>
        </div>

        <input
          type="file"
          multiple={isMulti}
          ref={inputRef}
          onChange={handleInputChange}
          hidden
          aria-label={"Select file"}
          accept={fileTypes?.join(",")}
          {...inputProps}
        />
      </label>
    </>
  );
}
