import {faker} from "@faker-js/faker/locale/ru";

export const cards = [];

function createCard () {
    return {
        id: faker.random.numeric(2),
        title: faker.music.songName(),
        isSaved: faker.datatype.boolean(),
        image: faker.image.unsplash.image(364),
        duration: "1ч 45м"
    }
}

Array.from({length: 11}).forEach(() => {
    cards.push(createCard());
})