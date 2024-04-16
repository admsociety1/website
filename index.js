const userName = document.getElementById("name");
const webinarDate = document.getElementById("webinarDate");
const submitBtn = document.getElementById("submitBtn");

const { PDFDocument, rgb, degrees } = PDFLib;

const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

submitBtn.addEventListener("click", () => {
  const name = capitalize(userName.value);
  const date = formatDate(webinarDate.value); // Assuming formatDate formats the date correctly

  if (name.trim() !== "" && userName.checkValidity() && date !== "") {
    generatePDF(name, date);
  } else {
    userName.reportValidity();
  }
});

const formatDate = (inputDate) => {
  // Implement your logic to format the inputDate if necessary
  return inputDate;
};

const generatePDF = async (name, date) => {
    const existingPdfBytes = await fetch("./cert.pdf").then((res) =>
      res.arrayBuffer()
    );
  
    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    // Get font
    const fontBytes = await fetch("./Sanchez-Regular.ttf").then((res) =>
      res.arrayBuffer()
    );
  
    // Embed our custom font in the document
    const SanChezFont = await pdfDoc.embedFont(fontBytes);
  
    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
  
    // Draw name and date on the first page
    firstPage.drawText(name, {
      x: 290,
      y: 290,
      size: 45,
      font: SanChezFont,
      color: rgb(0, 0, 0),
    });
  
    firstPage.drawText(date, { // Draw the date
      x: 495,
      y: 82,
      size: 18,
      font: SanChezFont,
      color: rgb(0, 0, 0),
    });
  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  console.log("Done creating");

  // this was for creating uri and showing in iframe

  // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  // document.getElementById("pdf").src = pdfDataUri;

  var file = new File(
    [pdfBytes],
    "Certificate.pdf",
    {
      type: "application/pdf;charset=utf-8",
    }
  );
 saveAs(file);
};

// init();