import { GoogleGenerativeAI } from "@google/generative-ai";
import CONSTANTS from "./constants";

const genAI = new GoogleGenerativeAI(CONSTANTS.GEN_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default model;
