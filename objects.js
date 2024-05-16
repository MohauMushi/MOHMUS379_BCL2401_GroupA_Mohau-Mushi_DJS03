export class Author {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export class Genre {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

export class Book {
    constructor({ id, title, author, image, genres, published, description }) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.image = image;
        this.genres = genres;
        this.published = published;
        this.description = description;
    }
}
