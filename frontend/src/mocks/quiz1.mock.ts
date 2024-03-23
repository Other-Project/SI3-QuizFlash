import {Quiz} from "../models/quiz.models";
import {Question} from "../models/question.models";
import {QuestionType} from "../models/question-type.models";


const QUESTION1: Question = {
  text: "Avec lequel de ces objets fait-on la cuisine ?",
  type: QuestionType.TextOnly,
  falseAnswers: ["Râteau", "Ordinateur", "Télécommande"],
  trueAnswer: "Casserole",
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
  type: QuestionType.Image,
  falseAnswers: ["Salle de bain", "Cuisine", "Garage"],
  trueAnswer: "Chambre",
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
