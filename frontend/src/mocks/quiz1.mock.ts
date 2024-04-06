import {Quiz} from "../models/quiz.models";
import {Question} from "../models/question.models";
import {QuestionType} from "../models/question-type.models";

const QUESTION1: Question = {
  id: "4",
  text: "Avec lequel de ces objets fait-on la cuisine ?",
  type: QuestionType.TextOnly,
  answers: [
    {
      answerText: "Râteau",
      trueAnswer: false
    },
    {
      answerText: "Ordinateur",
      trueAnswer: false
    },
    {
      answerText: "Télécommande",
      trueAnswer: false
    },
    {
      answerText: "Casserole",
      trueAnswer: true
    }
  ],
  imageUrl: "",
  soundUrl: ""
}

const QUESTION2: Question = {
  id: "5",
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
  id: "6",
  text: "Quelle est cette pièce de la maison ?",
  type: QuestionType.Image,
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
  imageUrl: "Chambre.jpg",
  soundUrl: ""
}


export const QUIZ1: Quiz = {
  id: "1",
  title: "Les pièce de la maison",
  theme: "La maison",
  thumbnailUrl: "assets/Chambre.jpg",
  questions: [QUESTION1, QUESTION2, QUESTION3]
}
