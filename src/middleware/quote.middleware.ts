import { HttpRequest } from "../models/http.model";
import Quote from "../models/quote.model";

export async function getQuoteByIdMiddleWare(req: HttpRequest, res, next) {
    const quote = await Quote.findOne({ id: req.params.id }).exec();
    if (!quote) {
        return res.status(404).json({message: "Cannot find quote document"})
    }
    // if document exist
    req.$currentQuote$ = quote;
    next();
}