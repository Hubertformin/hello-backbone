import { Request } from "express";
import { QuoteDocument, QuoteModel } from "./quote.model";

export interface HttpRequest extends Request {
  userAgent?: {
    ua: string;
    browser: {
      name?: string;
      version?: string;
      major?: string;
    };
    engine: {
      name?: string;
      version?: string;
    };
    os: {
      name?: string;
      version?: string;
    };
    device: {
      vendor?: string;
      model?: string;
      type?: string;
    };
    cpu: {
      architecture?: string;
    };
  };
  $currentQuote$?: QuoteDocument
}
