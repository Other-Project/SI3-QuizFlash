import {Quiz} from "../models/quiz.models";
import {Question} from "../models/question.models";
import {QuestionType} from "../models/question-type.models";

const QUESTION1: Question = {
  text: "Quel objet trouve-t-on dans la chambre ?",
  type: QuestionType.TextOnly,
  answers: [
    {
      answerText: "Râteau",
      trueAnswer: false,
      hide: false
    },
    {
      answerText: "Pelle",
      trueAnswer: false,
      hide: false
    },
    {
      answerText: "Casserole",
      trueAnswer: false,
      hide: false
    },
    {
      answerText: "Lit",
      trueAnswer: true,
      hide: false
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
      trueAnswer: false,
      hide: false
    },
    {
      answerText: "Cuisine",
      trueAnswer: false,
      hide: false
    },
    {
      answerText: "Chambre",
      trueAnswer: false,
      hide: false
    },
    {
      answerText: "Garage",
      trueAnswer: true,
      hide: false
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
      trueAnswer: false,
      hide: false
    },
    {
      answerText: "Cuisine",
      trueAnswer: false,
      hide: false
    },
    {
      answerText: "Chambre",
      trueAnswer: true,
      hide: false
    },
    {
      answerText: "Garage",
      trueAnswer: false,
      hide: false
    }
  ],
  imageUrl: "",
  soundUrl: "test.mp3"
}


export const QUIZ2: Quiz = {
  id: "2",
  title: "Les pièces de la maison 2",
  theme: "La maison",
  thumbnailUrl: "assets/Chambre.jpg",
  questions: [QUESTION1, QUESTION2, QUESTION3]
}
