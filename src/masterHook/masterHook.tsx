import React, { createContext, useContext } from "react";
import { Pdf, usePdf } from "../hooks/usePdf";
import { usePDF_JSXElements } from "../hooks/usePDFPageJSXElements";
import { UploadTypes, useUploader } from "../hooks/useUploader";

interface UploaderContextProps extends ReturnType<typeof useUploader> {}
interface PDFContextProps extends ReturnType<typeof usePdf> {}
interface attachmentsContextProps
  extends ReturnType<typeof usePDF_JSXElements> {}

const UploaderContext = createContext<UploaderContextProps>(
  {} as UploaderContextProps
);

const PDFContext = createContext<PDFContextProps>({} as PDFContextProps);

const AttachmentsContext = createContext<attachmentsContextProps>(
  {} as attachmentsContextProps
);

export const MasterHookProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const pdf = usePdf();

  const attachments = usePDF_JSXElements();

  const initializePageAndAttachments = (pdfDetails: Pdf) => {
    pdf.initialize(pdfDetails);
    const numberOfPages = pdfDetails.pages.length;
    attachments.reset(numberOfPages);
  };

  const uploader = useUploader({
    use: UploadTypes.PDF,
    afterUploadPdf: initializePageAndAttachments,
  });

  // ---- Other Components -----------------------------------------------------------------

  const hiddenInputs = (
    <>
      <input
        data-testid="pdf-input"
        ref={uploader.inputRef}
        type="file"
        name="pdf"
        id="pdf"
        accept="application/pdf"
        onChange={uploader.upload}
        onClick={uploader.onClick}
        style={{ display: "none" }}
      />
      {/* <input
          ref={imageInput}
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onClick={onImageClick}
          style={{ display: "none" }}
          onChange={uploadImage}
        /> */}
    </>
  );

  // --------------------------------------------------------------------------------------//
  //                                                                                      //
  //                                       Return                                         //
  //                                                                                      //
  // --------------------------------------------------------------------------------------//

  return (
    <UploaderContext.Provider value={uploader}>
      <PDFContext.Provider value={pdf}>
        <AttachmentsContext.Provider value={attachments}>
          {hiddenInputs}
          {children}
        </AttachmentsContext.Provider>
      </PDFContext.Provider>
    </UploaderContext.Provider>
  );
};

export function useUploaderMaster(): UploaderContextProps {
  const context = useContext(UploaderContext);

  if (!context) {
    throw new Error("useX(hookname) must be used within an XProvider");
  }
  return context;
}

export function usePDFMaster(): PDFContextProps {
  const context = useContext(PDFContext);

  if (!context) {
    throw new Error("useX(hookname) must be used within an XProvider");
  }
  return context;
}

export function useAttachmentsMaster(): attachmentsContextProps {
  const context = useContext(AttachmentsContext);

  if (!context) {
    throw new Error("useX(hookname) must be used within an XProvider");
  }
  return context;
}
