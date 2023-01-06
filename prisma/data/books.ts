export interface BookType {
  id: number;
  name: string;
  author: string;
  image?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  publisher?: string;
}

export const books = [
  {
    id: 1,
    name: "The Martian",
    author: "Andy Weir",
    image:
      "https://res.cloudinary.com/dapql1ru9/image/upload/v1673037412/bookshelf-app/anu5dje08xpvcmmycsjo.jpg",
    description:
      "Six days ago, astronaut Mark Watney became one of the first people to walk on Mars.\n\nNow, he’s sure he’ll be the first person to die there.\n\nAfter a dust storm nearly kills him and forces his crew to evacuate while thinking him dead, Mark finds himself stranded and completely alone with no way to even signal Earth that he’s alive—and even if he could get word out, his supplies would be gone long before a rescue could arrive.\n\nChances are, though, he won’t have time to starve to death. The damaged machinery, unforgiving environment, or plain-old “human error” are much more likely to kill him first.\n\nBut Mark isn’t ready to give up yet. Drawing on his ingenuity, his engineering skills — and a relentless, dogged refusal to quit — he steadfastly confronts one seemingly insurmountable obstacle after the next. Will his resourcefulness be enough to overcome the impossible odds against him?",
    publisher: "",
    createdAt: "2023-01-06T20:36:54.189Z",
    updatedAt: "2023-01-06T20:36:54.189Z",
  },
  {
    id: 2,
    name: "Ego is the Enemy",
    author: "Ryan Holiday",
    image:
      "https://res.cloudinary.com/dapql1ru9/image/upload/v1673037461/bookshelf-app/fm7pudsmcie3x9bhymsx.jpg",
    description:
      "“While the history books are filled with tales of obsessive, visionary geniuses who remade the world in their image with sheer, almost irrational force, I’ve found that history is also made by individuals who fought their egos at every turn, who eschewed the spotlight, and who put their higher goals above their desire for recognition.” – from the Prologue\n\nMany of us insist the main impediment to a full, successful life is the outside world. In fact, the most common enemy lies within: our ego. Early in our careers, it impedes learning and the cultivation of talent. With success, it can blind us to our faults and sow future problems. In failure, it magnifies each blow and makes recovery more difficult. At every stage, ego holds us back.\n\nThe Ego is the Enemy draws on a vast array of stories and examples, from literature to philosophy to history. We meet fascinating figures like Howard Hughes, Katharine Graham, Bill Belichick, and Eleanor Roosevelt, all of whom reached the highest levels of power and success by conquering their own egos. Their strategies and tactics can be ours as well.\n\nBut why should we bother fighting ego in an era that glorifies social media, reality TV, and other forms of shameless self-promotion?  Armed with the lessons in this book, as Holiday writes, “you will be less invested in the story you tell about your own specialness, and as a result, you will be liberated to accomplish the world-changing work you’ve set out to achieve.”",
    publisher: "",
    createdAt: "2023-01-06T20:37:43.171Z",
    updatedAt: "2023-01-06T20:37:43.171Z",
  },
  {
    id: 3,
    name: "Where the Forest Meets the Stars",
    author: "Glendy Vanderah",
    image:
      "https://res.cloudinary.com/dapql1ru9/image/upload/v1673037501/bookshelf-app/efy804lyygdmpdvrrkvn.jpg",
    description:
      "In this gorgeously stunning debut, a mysterious child teaches two strangers how to love and trust again.\n\nAfter the loss of her mother and her own battle with breast cancer, Joanna Teale returns to her graduate research on nesting birds in rural Illinois, determined to prove that her recent hardships have not broken her. She throws herself into her work from dusk to dawn, until her solitary routine is disrupted by the appearance of a mysterious child who shows up at her cabin barefoot and covered in bruises.\n\nThe girl calls herself Ursa, and she claims to have been sent from the stars to witness five miracles. With concerns about the child’s home situation, Jo reluctantly agrees to let her stay—just until she learns more about Ursa’s past.\n\nJo enlists the help of her reclusive neighbor, Gabriel Nash, to solve the mystery of the charming child. But the more time they spend together, the more questions they have. How does a young girl not only read but understand Shakespeare? Why do good things keep happening in her presence? And why aren’t Jo and Gabe checking the missing children’s website anymore?\n\nThough the three have formed an incredible bond, they know difficult choices must be made. As the summer nears an end and Ursa gets closer to her fifth miracle, her dangerous past closes in. When it finally catches up to them, all of their painful secrets will be forced into the open, and their fates will be left to the stars.",
    publisher: "",
    createdAt: "2023-01-06T20:38:23.436Z",
    updatedAt: "2023-01-06T20:38:23.436Z",
  },
  {
    id: 4,
    name: "Red Rising Saga #1",
    author: "Pierce Brown",
    image:
      "https://res.cloudinary.com/dapql1ru9/image/upload/v1673037533/bookshelf-app/audsf69jqo9prcdc4r20.jpg",
    description:
      '"I live for the dream that my children will be born free," she says. "That they will be what they like. That they will own the land their father gave them."\n\n"I live for you," I say sadly.\n\nEo kisses my cheek. "Then you must live for more."\n\nDarrow is a Red, a member of the lowest caste in the color-coded society of the future. Like his fellow Reds, he works all day, believing that he and his people are making the surface of Mars livable for future generations.\n\nYet he spends his life willingly, knowing that his blood and sweat will one day result in a better world for his children.\n\nBut Darrow and his kind have been betrayed. Soon he discovers that humanity already reached the surface generations ago. Vast cities and sprawling parks spread across the planet. Darrow—and Reds like him—are nothing more than slaves to a decadent ruling class.\n\nInspired by a longing for justice, and driven by the memory of lost love, Darrow sacrifices everything to infiltrate the legendary Institute, a proving ground for the dominant Gold caste, where the next generation of humanity\'s overlords struggle for power. He will be forced to compete for his life and the very future of civilization against the best and most brutal of Society\'s ruling class. There, he will stop at nothing to bring down his enemies... even if it means he has to become one of them to do so.',
    publisher: "",
    createdAt: "2023-01-06T20:38:55.567Z",
    updatedAt: "2023-01-06T20:38:55.567Z",
  },
];
