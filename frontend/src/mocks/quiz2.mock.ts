import {Quiz} from "../models/quiz.models";
import {Question} from "../models/question.models";
import {QuestionType} from "../models/question-type.models";

const QUESTION1: Question = {
  id: "1",
  text: "Quel objet trouve-t-on dans la chambre ?",
  type: QuestionType.TextOnly,
  answers: [
    {
      id: "1",
      answerText: "Râteau",
      trueAnswer: false
    },
    {
      id: "2",
      answerText: "Pelle",
      trueAnswer: false
    },
    {
      id: "3",
      answerText: "Casserole",
      trueAnswer: false
    },
    {
      id: "4",
      answerText: "Lit",
      trueAnswer: true
    }
  ],
  imageUrl: "",
  soundUrl: ""
}

const QUESTION2: Question = {
  id: "2",
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
  id: "3",
  text: "Quelle est cette chanson ?",
  type: QuestionType.Sound,
  answers: [
    {
      id: "1",
      answerText: "La bohème",
      trueAnswer: false
    },
    {
      id: "2",
      answerText: "Non, je ne regrette rien",
      trueAnswer: false
    },
    {
      id: "3",
      answerText: "La vie en rose",
      trueAnswer: true
    },
    {
      id: "4",
      answerText: "Allumer le feu",
      trueAnswer: false
    }
  ],
  imageUrl: "",
  soundUrl: "assets/Edith Piaf - La vie en rose.mp3"
}


export const QUIZ2: Quiz = {
  id: "2",
  title: "Les pièces de la maison 2",
  tags: [],
  thumbnailUrl: "assets/Chambre.jpg",
  questions: [QUESTION1, QUESTION2, QUESTION3]
}
