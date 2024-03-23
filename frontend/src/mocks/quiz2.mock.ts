import {Quiz} from "../models/quiz.models";
import {Question} from "../models/question.models";
import {QuestionType} from "../models/question-type.models";
import {Answer} from "../models/answer.models";

const ANSWER1: Answer = {
  answerText: "Pelle",
  trueAnswer: false
}

const ANSWER2: Answer = {
  answerText: "Assiette",
  trueAnswer: false
}

const ANSWER3: Answer = {
  answerText: "Lit",
  trueAnswer: true
}

const ANSWER4: Answer = {
  answerText: "Casserole",
  trueAnswer: false
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
  text: "Quel objet trouve-t-on dans la chambre ?",
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
  type: QuestionType.Sound,
  answers: [ANSWER5, ANSWER6, ANSWER9, ANSWER10],
  imageUrl: "",
  soundUrl:"test.mp3"
}


export const QUIZ2 : Quiz = {
  id:"2",
  title:"Les pièce de la maison 2",
  theme:"La maison 2",
  thumbnailUrl: "assets/Chambre.jpg",
  questions: [QUESTION1,QUESTION2,QUESTION3]
}
