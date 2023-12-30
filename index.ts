#!/usr/bin/env node
import { program } from "commander";
import fs from "fs";
import OpenAI from "openai";
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const apiKey = process.env.OPENAI_API_KEY;
// console.log("OpenAI API Key:", apiKey); debug

const openai = new OpenAI({
    apiKey: apiKey,
});

const instructionMessage = {
    role: "system",
    content: "Consider yourself a code examiner. Provide the functionality of the given code and also provide the corrected code if you find any bug. And use comments for explanation.",
};

program
    .version('1.0.0')
    .description('CLI App for Code Explanation');

program
    .command('explain <file>')
    .description('Explain the code in the given file')
    .action(async (file) => {
        try {
            console.log('Reading file:', file);
            const code = fs.readFileSync(file, 'utf-8');
            const explanation = await getCodeExplanation(code);
            console.log(explanation);
        } catch (error: any) {
            console.error('Error reading or explaining the code:', error.message);
            // for debugging purposes
            console.error(error.stack);
        }
    });

program.parse(process.argv);

async function getCodeExplanation(code: any) {
    try {
        const messages = prepareMessagesFromCode(code);
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: instructionMessage.content }, ...messages],
        });

        // console.log("OpenAI API Response:", completion); // Debug log
        const explanation = extractExplanationFromCompletion(completion);
        return explanation.trim();
    } catch (error) {
        handleOpenAIError(error);
    }
}

function prepareMessagesFromCode(code: any) {
    return code.split('\n').filter((line: any) => line.trim() !== '').map((line: any) => ({
        role: "user",
        content: line,
    }));
}

function extractExplanationFromCompletion(completion: any) {
    const choices = completion?.choices;

    if (choices && choices.length > 0) {
        return choices[0]?.message?.content || '';
    } else {
        return 'No response or choices from OpenAI API.';
    }
}

function handleOpenAIError(error: any) {
    if (error.response) {
        console.log('OpenAI API Error - Status:', error.response.status);
        console.log('OpenAI API Error - Data:', error.response.data);
    } else {
        console.log('OpenAI API Error:', error.message);
    }
}
