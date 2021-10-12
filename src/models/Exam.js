export default class Exam {
  constructor({id, name, description, startTime, endTime, questions}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
    this.questions = questions;
  }
}
