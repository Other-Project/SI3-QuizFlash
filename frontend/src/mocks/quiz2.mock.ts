import {Quiz} from "../models/quiz.models";
import {Question} from "../models/question.models";
import {QuestionType} from "../models/question-type.models";

const QUESTION1: Question = {
  text: "Quel objet trouve-t-on dans la chambre ?",
  type: QuestionType.TextOnly,
  falseAnswers: ["Pelle", "Casserole", "Assiette"],
  trueAnswer: "Lit",
  imageUrl: "",
  soundUrl: ""
}

const QUESTION2: Question = {
  text: "Dans quelle pièce de la maison peut-on garer la voiture ?",
  type: QuestionType.TextOnly,
  falseAnswers: ["Salle de bain", "Cuisine", "Chambre"],
  trueAnswer: "Garage",
  imageUrl: "",
  soundUrl: ""
}

const QUESTION3: Question = {
  text: "Quelle est cette pièce de la maison ?",
  type: QuestionType.Sound,
  falseAnswers: ["Salle de bain", "Cuisine", "Garage"],
  trueAnswer: "Chambre",
  imageUrl: "",
  soundUrl: "test.mp3"
}


export const QUIZ2: Quiz = {
  id: "2",
  title: "Les pièce de la maison 2",
  theme: "La maison",
  questions: [QUESTION1, QUESTION2, QUESTION3]
}
