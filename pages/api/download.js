
const chromium = require('chrome-aws-lambda');
// const puppeteer = require('puppeteer');

const { v1: uuidv1 } = require('uuid');

export default function handler(req, res) {
    if (req.method === 'POST') {
        const uuid = uuidv1();
        const pdfId = { pdfId: uuid };
        const data = { ...pdfId, ...req.body };

        const generatePDF = async () => {

            // const browser = await puppeteer.launch({
            //     headless: true,
            //     args: ['--no-sandbox', '--disable-setuid-sandbox'],
            // });

            const browser = await chromium.puppeteer.launch({
                args: [...chromium.args, "--hide-scrollbars", "--disable-web-security", "--font-render-hinting=none"],
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath,
                headless: true,
                ignoreHTTPSErrors: true,
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

            res.send(pdf);
        };
        generatePDF();
    }
}
