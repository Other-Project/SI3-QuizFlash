const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "QuizFlash",
        description: "Backend API used by QuizFlash"
    },
    host: "localhost:9428",
    basePath: "/api/",

    definitions: {
        User: {
            $access: "User",
            $lastname: "Martin",
            $firstname: "Bernard",
            $birthDate: "1939-06-14",
            pictureUrl: "data:image/jpeg;base64,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",

            hobbies: ["peinture", "lecture"],
            dementiaLevel: "High",
            fontSize: 1.25,
            removeAnswers: true,
            automatedSkip: true,
            answerHint: false,
            numberOfQuestion: 3,
            replayAtEnd: false,
            soundQuestion: false,
            autoStartAudio: false,

            password: ""
        },
        Quiz: {
            $title: "Les pièces de la maison",
            $theme: "La maison",
            thumbnailUrl: "assets/Chambre.jpg",
            questions: [
                {
                    $ref: "#/definitions/Question"
                }
            ]
        },
        Question: {
            $quizId: 1,
            $text: "Quelle est cette pièce de la maison ?",
            $type: "Image",
            imageUrl: "assets/Chambre.jpg",
            soundUrl: "",
            answers: [
                {
                    $ref: "#/definitions/Answer"
                }
            ]
        },
        Answer: {
            $questionId: 1,
            $answerText: "Salle de bain",
            $trueAnswer: false
        },
        QuizStats: {
            $quizId: 1715588161488,
            $userId: 1715587751837,
            $date: "2024-05-12",
            $id: 7715019314381,
            $questionsStats: [
                {
                    $ref: "#/definitions/QuestionStats"
                }
            ]
        },
        QuestionStats: {
            $quizStatId: 7715019314381,
            $questionId: 1715589671681,
            $success: true,
            $id: 8215992101452,
            $attempts: [
                {
                    $ref: "#/definitions/Attempt"
                }
            ]
        },
        Attempt: {
            $questionStatId: 8215992101452,
            $chosenAnswerId: 1715591143361,
            $timeSpent: 2.2,
            $answerHint: false,
            $hiddenAnswers: [1, 2],
            $id: 3647848313510
        },
        SuccessStats: {
            data: {
                dataType: "success",
                answerHintRate: 15.3,
                successRate: 75
            },
            graphData: [
                {
                    key: "2024-02-01",
                    value: 50
                },
                {
                    key: "2023-07-10",
                    value: 100
                }
            ]
        },
        UserParticipation: [
            {
                id: 4715528161488,
                title: "Les pièces de la maison 2"
            },
            {
                id: 3715518126798,
                title: "Quelle est cette pièce de la maison ?"
            }
        ]
    }
};

const outputFile = "./openapi.json";
const routes = ["./api/index.js"];

module.exports = () => swaggerAutogen(outputFile, routes, doc);