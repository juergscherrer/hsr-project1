class Note {
    constructor(id, title, description, date, rate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.rate = rate;
        this.finished = false;
        this.created_at = moment();

    }


    eaten() {
        this.isDead = true;
    }



}