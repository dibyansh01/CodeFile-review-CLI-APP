#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs_1 = __importDefault(require("fs"));
const openai_1 = __importDefault(require("openai"));
const path = __importStar(require("path"));
const dotenv = __importStar(require("dotenv"));
// dotenv.config({ path: path.resolve(__dirname, '.env') });
const projectRoot = path.resolve(__dirname, '..'); // Assuming that .env is in the root
dotenv.config({ path: path.resolve(projectRoot, '.env') });
const apiKey = process.env.OPENAI_API_KEY;
// console.log("OpenAI API Key:", apiKey); debug
const openai = new openai_1.default({
    apiKey: apiKey,
});
const instructionMessage = {
    role: "system",
    content: "Consider yourself a code examiner. Provide the functionality of the given code and also provide the corrected code if you find any bug. And use comments for explanation.",
};
commander_1.program
    .version('1.0.0')
    .description('CLI App for Code Explanation');
commander_1.program
    .command('explain <file>')
    .description('Explain the code in the given file')
    .action((file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Reading file:', file);
        const code = fs_1.default.readFileSync(file, 'utf-8');
        const explanation = yield getCodeExplanation(code);
        console.log(explanation);
    }
    catch (error) {
        console.error('Error reading or explaining the code:', error.message);
        // for debugging purposes
        console.error(error.stack);
    }
}));
commander_1.program.parse(process.argv);
function getCodeExplanation(code) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const messages = prepareMessagesFromCode(code);
            const completion = yield openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "system", content: instructionMessage.content }, ...messages],
            });
            // console.log("OpenAI API Response:", completion); // Debug log
            const explanation = extractExplanationFromCompletion(completion);
            return explanation.trim();
        }
        catch (error) {
            handleOpenAIError(error);
        }
    });
}
function prepareMessagesFromCode(code) {
    return code.split('\n').filter((line) => line.trim() !== '').map((line) => ({
        role: "user",
        content: line,
    }));
}
function extractExplanationFromCompletion(completion) {
    var _a, _b;
    const choices = completion === null || completion === void 0 ? void 0 : completion.choices;
    if (choices && choices.length > 0) {
        return ((_b = (_a = choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || '';
    }
    else {
        return 'No response or choices from OpenAI API.';
    }
}
function handleOpenAIError(error) {
    if (error.response) {
        console.log('OpenAI API Error - Status:', error.response.status);
        console.log('OpenAI API Error - Data:', error.response.data);
    }
    else {
        console.log('OpenAI API Error:', error.message);
    }
}
