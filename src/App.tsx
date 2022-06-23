import { BackspaceIcon, TrashIcon } from "@heroicons/react/solid";
import "./App.css";
import PDFDocumentWrapper from "./components/PDFHandling/PDFDocumentWrapper";
import { PDFPage } from "./components/PDFHandling/PDFPage";
import {
  useAttachmentsMaster,
  usePDFMaster,
  useUploaderMaster,
} from "./masterHook/masterHook";
import { classNames } from "./utils/classNames";
import { render } from "./utils/render";

function App() {
  const {
    allPageElements,
    update: updateElement,
    reset: resetElements,
  } = useAttachmentsMaster();

  const {
    dimensions,
    setDimensions,
    nextPage,
    previousPage,

    pageIndex,
    pages,
    reset: resetPDF,
  } = usePDFMaster();

  const {} = useUploaderMaster();

  return (
    <div className="App">
      <div className="relative w-full">
        <PDFDocumentWrapper
          {...{
            dimensions,
            nextPage,
            previousPage,
            totalPages: (pages as any[]).length,
          }}
        >
          {(pages as any[]).map((pdfPage: any, index) => {
            return (
              <div className="relative" key={index}>
                <PDFPage
                  pageElements={allPageElements[index]}
                  dimensions={dimensions}
                  updateDimensions={setDimensions}
                  updateElement={updateElement}
                  page={pdfPage}
                  pageIndex={index}
                />
              </div>
            );
          })}
        </PDFDocumentWrapper>
        <div className="absolute top-0 w-full h-16 bg-neutral-600/50 backdrop-blur-lg shadow-lg">
          <div className="grid grid-cols-3 h-full">
            <div className=""></div>
            <div className="flex flex-1 justify-center items-center">
              <span className="text-white center font-semibold">
                Página {pageIndex + 1} de {(pages as any[]).length}
              </span>
            </div>
            <div className="flex flex-1 h-full items-center">
              {render(
                allPageElements && (
                  <div
                    className={classNames(
                      "ml-auto mr-1",
                      !allPageElements.some(
                        (item: any[]) => item.length !== 0
                      ) && "invisible"
                    )}
                  >
                    <button
                      className="bg-gray-200/30 hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
                      onClick={() => {
                        resetElements((pages as any[]).length);
                      }}
                    >
                      <BackspaceIcon className="h-5 w-5 text-white" />
                    </button>
                  </div>
                )
              )}
              <div className="ml-5 mr-5">
                <button
                  className="bg-gray-200/30 hover:bg-gray-300 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => {
                    resetElements((pages as any[]).length);
                    resetPDF();
                  }}
                >
                  <TrashIcon className="h-5 w-5 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
