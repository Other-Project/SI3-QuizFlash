import {Quiz} from "../models/quiz.models";
import {Question} from "../models/question.models";
import {QuestionType} from "../models/question-type.models";

const QUESTION1: Question = {
  id: "4",
  text: "Avec lequel de ces objets fait-on la cuisine ?",
  type: QuestionType.TextOnly,
  answers: [
    {
      id: "1",
      answerText: "Râteau",
      trueAnswer: false
    },
    {
      id: "2",
      answerText: "Ordinateur",
      trueAnswer: false
    },
    {
      id: "3",
      answerText: "Télécommande",
      trueAnswer: false
    },
    {
      id: "4",
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
      id: "1",
      answerText: "Salle de bain",
      trueAnswer: false
    },
    {
      id: "2",
      answerText: "Cuisine",
      trueAnswer: false
    },
    {
      id: "3",
      answerText: "Chambre",
      trueAnswer: false
    },
    {
      id: "4",
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
      id: "1",
      answerText: "Salle de bain",
      trueAnswer: false
    },
    {
      id: "2",
      answerText: "Cuisine",
      trueAnswer: false
    },
    {
      id: "3",
      answerText: "Chambre",
      trueAnswer: true
    },
    {
      id: "4",
      answerText: "Garage",
      trueAnswer: false
    }
  ],
  imageUrl: "assets/Chambre.jpg",
  soundUrl: ""
}


export const QUIZ1: Quiz = {
  id: "1",
  title: "Les pièces de la maison",
  theme: "La maison",
  thumbnailUrl: "assets/Chambre.jpg",
  questions: [QUESTION1, QUESTION2, QUESTION3]
}
