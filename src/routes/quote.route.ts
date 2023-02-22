import { Router } from "express";
import Quote, { QuoteModel } from "../models/quote.model";
import shortId from "short-uuid";
import { generateInvoiceNumber } from "../utils/quote.utils";
import { getQuoteByIdMiddleWare } from "../middleware/quote.middleware";
import { HttpRequest } from "../models/http.model";

const router = Router();

router.get("/", async (req, res) => {
  // mongodb fetch documents
});

router.post("/", async (req, res) => {
  try {
    // create quote document
    const { title } = req.body;
    // construct quote body
    const payload: QuoteModel = {
      id: `qt_${shortId.generate()}`,
      title,
      date: new Date().toISOString(),
      invoiceNumber: await generateInvoiceNumber(),
      items: [],
      designation: "",
      totalCosts: 0,
    };
    const quote = new Quote(payload);

    await quote.save();

    res.status(200).json({ data: quote.toObject(), message: "Created quote" });
  } catch (e) {
    res.status(500).json({
      errorText: e.toString(),
      message: "Unable to create quote document",
    });
  }
});

router.get("/:id", getQuoteByIdMiddleWare, async (req: HttpRequest, res) => {
  res
    .status(200)
    .json({ message: "Fetched quote", data: req.$currentQuote$.toObject() });
});

router.put("/:id", getQuoteByIdMiddleWare, async (req: HttpRequest, res) => {
  try {
    // first get quote by id
    const quote = req.body;
    console.log(req.body);
    // TODO: CREATE BASIC VALIDATION
    Object.assign(req.$currentQuote$, quote);
    // save quote
    await req.$currentQuote$.save();

    res
      .status(200)
      .json({ data: req.$currentQuote$.toObject(), message: "Quote saved!" });
  } catch (e) {
    res.status(500).json({
      errorText: e.toString(),
      message: "Unable to create quote document",
    });
  }
});

export default router;
