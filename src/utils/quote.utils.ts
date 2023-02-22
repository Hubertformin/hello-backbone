import Quote from "../models/quote.model";

export async function generateInvoiceNumber(): Promise<string> {
    // Enchird invoice number format: ENC-23/03/0001
    // get count of Quote mongoose documents made during this month
    const date = new Date();
    const query = await Quote.aggregate([
        {
            $group: {
              _id: { $month: date }, // group by the month *number*, mongodb doesn't have a way to format date as month names
              count: { $sum: 1 }
            }
          }
    ]).exec()
    const count = query.length > 0 ? query[0]['count'] : 0;
    // init number and month
    let month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : `0${(date.getMonth() + 1)}`;
    // invoice string
    const invoiceNumber = `ENC-${date.getFullYear().toString().slice(2)}/${month}/${getInvoiceCount(count)}`;
    return invoiceNumber
}

function getInvoiceCount(num: number): string {
    ++num
    const zeros = new Array(Math.abs(4 - num.toString().length)).fill(0);
    return zeros.toString().replace(/,/g, '') + num;
}