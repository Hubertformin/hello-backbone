import * as path from 'path';
import * as fs from 'fs';
import PDFMakePrinter from 'pdfmake'
import {TDocumentDefinitions} from "pdfmake/interfaces";

const ENCHIRD_LOGO = "https://enchird.com/assets/images/logotype.png"

const fontDescriptors = {
    Roboto: {
        normal: path.join(__dirname, '/fonts/Roboto/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '/fonts/Roboto/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '/fonts/Roboto/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '/fonts/Roboto/Roboto-MediumItalic.ttf')
    }
};

const tableLayouts = {
    enchirdLayout: {
        hLineWidth: function (i, node) {
            if (i === 0 || i === node.table.body.length) {
                return 0;
            }
            return (i === node.table.headerRows) ? 2 : 1;
        },
        vLineWidth: function (i) {
            return 0;
        },
        hLineColor: function (i) {
            return i === 1 ? 'black' : '#aaa';
        },
        paddingLeft: function (i) {
            return i === 0 ? 0 : 8;
        },
        paddingRight: function (i, node) {
            return (i === node.table.widths.length - 1) ? 0 : 8;
        }
    }
};

const printer = new PDFMakePrinter(fontDescriptors);

var docDefinition: TDocumentDefinitions = {
    // a string or { width: number, height: number }
    pageSize: 'A4',
    // by default, we use portrait, you can change it to landscape if you wish
    pageOrientation: 'portrait',
    // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
    pageMargins: [35, 30],
    footer: function (currentPage, pageCount) {
        return {
            pageMargins: [35, 0],
            fillColor: '#045091',
            layout: 'lightHorizontalLines', // optional
            table: {
                headerRows: 1,
                widths: ['49%','2%' , '49%'],
                body: [
                    [
                        {text: '.    ENCHIRD TECHNOLOGIES LTD', color: '#fff', bold: true},
                        {text: `${currentPage.toString()}`, color: '#fff', bold: true},
                        {text: 'RC/YAO/2021/B/788    .', color: '#fff', bold: true, alignment: 'right'}
                    ]
                ]
            },
        }
    },
    content: [
        {
            layout: 'noBorders', // optional
            table: {
                headerRows: 1,
                widths: ['50%', '50%'],
                body: [
                    [{image: "./assets/logo_text.png", width: 160}, ''],
                    ['', ''],
                    [{text: 'Headquarters: Rond-point express', fontSize: 10}, {
                        text: 'Advanced Tech Solutions',
                        fontSize: 10,
                        alignment: 'right',
                        color: '#666666'
                    }],
                    [{text: 'Yaounde - Cameroon', fontSize: 10}, {
                        text: 'Marketing Solutions',
                        fontSize: 10,
                        alignment: 'right',
                        color: '#666666'
                    }],
                    [{text: 'www.enchird.com / info@enchird.com', fontSize: 10}, {
                        text: 'Digital Media',
                        fontSize: 10,
                        alignment: 'right',
                        color: '#666666'
                    }],
                    [{text: 'Tel: +237 673 02 67 55 / 650 39 00 94', fontSize: 10}, {
                        text: 'Consulting',
                        fontSize: 10,
                        alignment: 'right',
                        color: '#666666'
                    }]
                ]
            },
            margin: [0, 0, 0, 24]
        },
        {
            text: 'INVOICE',
            fontSize: 22,
            bold: true,
            alignment: 'center',
            color: '#045aa1',
            margin: [0, 24, 0, 24]
        },
        {
            layout: 'noBorders', // optional
            table: {
                headerRows: 1,
                widths: ['50%', '50%'],
                body: [
                    [{text: 'INVOICE #: ', bold: true}, {
                        text: 'C/O: ',
                        bold: true,
                    }],
                    [{text: 'DATE: ', bold: true}, {
                        text: 'COMPANY: ',
                        bold: true,
                    }],
                ]
            },
            margin: [0, 0, 0, 24]
        },
        {
            layout: 'enchirdLayout', // optional
            table: {
                // headers are automatically repeated if the table spans over multiple pages
                // you can declare how many rows should be treated as headers
                headerRows: 1,
                widths: ['*', 'auto', 100, '*'],

                body: [
                    ['First', 'Second', 'Third', 'The last one'],
                    ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
                    [{text: 'Bold value', bold: true}, 'Val 2', 'Val 3', 'Val 4']
                ]
            }
        }
    ],
    defaultStyle: {
        font: 'Roboto'
    }
};

var pdfDoc = printer.createPdfKitDocument(docDefinition, {tableLayouts});
pdfDoc.pipe(fs.createWriteStream('invoice.pdf'));
pdfDoc.end();
