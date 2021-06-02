const puppeteer = require('puppeteer');
const { v1: uuidv1 } = require('uuid');

async function downloadHandler(req, res) {
    if (req.method === 'POST') {
        const uuid = uuidv1();
        const pdfId = { pdfId: uuid };
        const data = { ...pdfId, ...req.body };

        const generatePDF = async () => {
            // const browser = await puppeteer.launch();
            const browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            });
            const page = await browser.newPage();
            await page.goto(`${process.env.HOST}/preview?export=true#${encodeURIComponent(JSON.stringify(data))}`, {
                waitUntil: 'networkidle2',
            });
            const pdf = await page.pdf({
                printBackground: true,
                format: 'A4',
                width: '210mm',
                height: '297mm',
            });
            await browser.close();

            return pdf;
        };
        const pdfDoc = await generatePDF();
        res.send(pdfDoc);
    }
}

export default downloadHandler;
