class Note {
    constructor(_id, title, description, date, rate) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.rate = rate;
        this.finished = false;
    }
}