import {Quiz} from "../models/quiz.models";
import {Question} from "../models/question.models";
import {QuestionType} from "../models/question-type.models";

const QUESTION1: Question = {
  text: "Avec lequel de ces objets fait-on la cuisine ?",
  type: QuestionType.TextOnly,
  answers: [
    {
      answerText: "Râteau",
      trueAnswer: false,
      hide: false
    },
    {
      answerText: "Ordinateur",
      trueAnswer: false,
      hide: false
    },
    {
      answerText: "Télécommande",
      trueAnswer: false,
      hide: false
    },
    {
      answerText: "Casserole",
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
  type: QuestionType.Image,
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
  imageUrl: "Chambre.jpg",
  soundUrl: ""
}


export const QUIZ1: Quiz = {
  id: "1",
  title: "Les pièces de la maison",
  theme: "La maison",
  thumbnailUrl: "assets/Chambre.jpg",
  questions: [QUESTION1, QUESTION2, QUESTION3]
}
