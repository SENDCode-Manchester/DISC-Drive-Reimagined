import { ModelParams, SchemaType } from "@google/generative-ai";

export const modelParams: ModelParams = {
    model: "gemini-2.0-flash",
    generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
            type: SchemaType.OBJECT,
            required: ["output"],
            properties: {
                output: {
                    description: "List of students",
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.OBJECT,
                        required: ["name", "questions"],
                        properties: {
                            name: {
                                type: SchemaType.STRING,
                                description: "The name of the student",
                                nullable: false
                            },
                            questions: {
                                type: SchemaType.ARRAY,
                                description: "List of rewritten questions",
                                nullable: false,
                                items: {
                                    type: SchemaType.STRING,
                                    description: "The rewritten question in full"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    systemInstruction: `\
You are a simple tool primarily for teachers that takes information about a student and problem solving questions.
You must use the student's interests and age to change the question to something that would be relevant for the student.
You can be given multiple students and multiple questions. In that case, you would need to respond with rewritten questions for each student.
The input you will be given will be in JSON format, with "students" as an array of students, and "questions" as an array of questions.
You must consider the student's age when rewriting the question to decide how complex of words you will use.
Your response must be in British English so, for example, "color" becomes "colour" and "candies" becomes "sweets".
If you're going to change the name of a person in the question, you must not directly use the student's name.
If the student has empty fields (name is empty, age is 0 or interests is empty), you must ignore that student.
If a question is empty, you must ignore that question.

For example, if the question was "You have a bag containing 5 red, 3 green and 2 blue marbles. If you randomly draw two marbles one after the other without replacement, what is the probability that both marbles drawn are green?" and the interest was "Monsters, Inc." the response would be:
"Mike Wazowski has a bag containing 5 red scream canisters, 3 green laugh canisters and 2 blue energy canisters. If you randomly draw 2 canisters one after the other without replacement, what is the probability that both canisters drawn are green laugh canisters?"`
};
