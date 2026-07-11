import { chromium } from 'playwright';
import { readFile, mkdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const root = resolve(process.cwd());
const css = await readFile(join(root, 'styles.css'), 'utf8');
const logo = await readFile(join(root, 'assets', 'servicelink-logo.svg'));
const logoUri = `data:image/svg+xml;base64,${logo.toString('base64')}`;
const documents = [
  ['resume.html', 'Russell-Dudek-ServiceLink-Resume.pdf'],
  ['cover-letter.html', 'Russell-Dudek-ServiceLink-Cover-Letter.pdf'],
  ['interview-brief.html', 'Russell-Dudek-ServiceLink-Interview-Brief.pdf'],
  ['ai-dispatch-ticket.html', 'Russell-Dudek-ServiceLink-AI-Dispatch-Ticket.pdf'],
];

await mkdir(join(root, 'docs'), { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
for (const [htmlName, pdfName] of documents) {
  let html = await readFile(join(root, htmlName), 'utf8');
  html = html.replace('<link rel="stylesheet" href="styles.css">', `<style>${css}</style>`);
  html = html.replaceAll('src="assets/servicelink-logo.svg"', `src="${logoUri}"`);
  await page.setContent(html, { waitUntil: 'load' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({
    path: join(root, 'docs', pdfName),
    format: 'Letter',
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
    margin: { top: '0in', right: '0in', bottom: '0in', left: '0in' },
  });
  console.log(`Generated docs/${pdfName}`);
}
await browser.close();
