import { categoryQuestions } from "./categoriesAgrupment";

export function getRandomQuestion(
    category: keyof typeof categoryQuestions
) {
    const questions = categoryQuestions.find(que => que[0] === category);

    if (questions) {
        const randomIndex = Math.floor(
        Math.random() * questions[1].length
    );

    return questions[1][randomIndex];
    }
}