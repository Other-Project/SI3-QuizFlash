import {Quiz} from "../models/quiz.models";
import {Question} from "../models/question.models";
import {QuestionType} from "../models/question-type.models";
import {Answer} from "../models/answer.models";


const ANSWER1: Answer = {
  answerText: "Râteau",
  trueAnswer: false
}

const ANSWER2: Answer = {
  answerText: "Ordinateur",
  trueAnswer: false
}

const ANSWER3: Answer = {
  answerText: "Télécommande",
  trueAnswer: false
}

const ANSWER4: Answer = {
  answerText: "Casserole",
  trueAnswer: true
}

const ANSWER5: Answer = {
  answerText: "Salle de bain",
  trueAnswer: false
}

const ANSWER6: Answer = {
  answerText: "Cuisine",
  trueAnswer: false
}

const ANSWER7: Answer = {
  answerText: "Chambre",
  trueAnswer: false
}

const ANSWER8: Answer = {
  answerText: "Garage",
  trueAnswer: true
}

const ANSWER9: Answer = {
  answerText: "Chambre",
  trueAnswer: true
}

const ANSWER10: Answer = {
  answerText: "Garage",
  trueAnswer: false
}

const QUESTION1 : Question = {
  text: "Avec lequel de ces objets fait-on la cuisine ?",
  type: QuestionType.TextOnly,
  answers: [ANSWER1, ANSWER2, ANSWER3, ANSWER4],
  imageUrl: "",
  soundUrl:""
}

const QUESTION2 : Question = {
  text: "Dans quelle pièce de la maison est garer la voiture ?",
  type: QuestionType.TextOnly,
  answers: [ANSWER5, ANSWER6, ANSWER7, ANSWER8],
  imageUrl: "",
  soundUrl:""
}

const QUESTION3 : Question = {
  text: "Quelle est cette pièce de la maison ?",
  type: QuestionType.Image,
  answers: [ANSWER5, ANSWER6, ANSWER9, ANSWER10],
  imageUrl: "Chambre.jpg",
  soundUrl:""
}


export const QUIZ1 : Quiz = {
  id:"1",
  title:"Les pièce de la maison",
  theme:"La maison",
  questions: [QUESTION1,QUESTION2,QUESTION3]
}
