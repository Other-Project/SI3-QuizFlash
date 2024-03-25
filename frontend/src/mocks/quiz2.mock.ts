import {Quiz} from "../models/quiz.models";
import {Question} from "../models/question.models";
import {QuestionType} from "../models/question-type.models";

const QUESTION1: Question = {
  text: "Quel objet trouve-t-on dans la chambre ?",
  type: QuestionType.TextOnly,
  answers: [
    {
      answerText: "Râteau",
      trueAnswer: false
    },
    {
      answerText: "Pelle",
      trueAnswer: false
    },
    {
      answerText: "Casserole",
      trueAnswer: false
    },
    {
      answerText: "Lit",
      trueAnswer: true
    }
  ],
  imageUrl: "",
  soundUrl: ""
}

const QUESTION2: Question = {
  text: "Dans quelle pièce de la maison peut-on garer la voiture ?",
  type: QuestionType.TextOnly,
  answers: [
    {
      answerText: "Salle de bain",
      trueAnswer: false
    },
    {
      answerText: "Cuisine",
      trueAnswer: false
    },
    {
      answerText: "Chambre",
      trueAnswer: false
    },
    {
      answerText: "Garage",
      trueAnswer: true
    }
  ],
  imageUrl: "",
  soundUrl: ""
}

const QUESTION3: Question = {
  text: "Quelle est cette pièce de la maison ?",
  type: QuestionType.Sound,
  answers: [
    {
      answerText: "Salle de bain",
      trueAnswer: false
    },
    {
      answerText: "Cuisine",
      trueAnswer: false
    },
    {
      answerText: "Chambre",
      trueAnswer: true
    },
    {
      answerText: "Garage",
      trueAnswer: false
    }
  ],
  imageUrl: "",
  soundUrl: "assets/The Rolling Stones - Paint It, Black.mp3"
}


export const QUIZ2: Quiz = {
  id: "2",
  title: "Les pièce de la maison 2",
  theme: "La maison",
  thumbnailUrl: "assets/Chambre.jpg",
  questions: [QUESTION1, QUESTION2, QUESTION3]
}
