import { randomIntIncl } from "./math";

// prettier-ignore
const words = [
    "lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit", "ut", "aliquam,", "purus", "sit", "amet", "luctus", "venenatis,", "lectus", "magna", "fringilla", "urna,", "porttitor", "rhoncus", "dolor", "purus", "non", "enim", "praesent", "elementum", "facilisis", "leo,", "vel", "fringilla", "est", "ullamcorper", "eget", "nulla", "facilisi", "etiam", "dignissim", "diam", "quis", "enim", "lobortis", "scelerisque", "fermentum", "dui", "faucibus", "in", "ornare", "quam", "viverra", "orci", "sagittis", "eu", "volutpat", "odio", "facilisis", "mauris", "sit", "amet", "massa", "vitae", "tortor", "condimentum", "lacinia", "quis", "vel", "eros", "donec", "ac", "odio", "tempor", "orci", "dapibus", "ultrices", "in", "iaculis", "nunc", "sed", "augue", "lacus,", "viverra", "vitae", "congue", "eu,", "consequat", "ac", "felis", "donec", "et", "odio", "pellentesque", "diam", "volutpat", "commodo", "sed", "egestas", "egestas", "fringilla", "phasellus", "faucibus", "scelerisque", "eleifend", "donec", "pretium", "vulputate", "sapien", "nec", "sagittis", "aliquam", "malesuada", "bibendum", "arcu", "vitae", "elementum",
    "curabitur", "vitae", "nunc", "sed", "velit", "dignissim", "sodales", "ut", "eu", "sem", "integer", "vitae", "justo", "eget", "magna", "fermentum", "iaculis", "eu", "non", "diam", "phasellus", "vestibulum", "lipsum", "sed", "risus", "ultricies", "tristique", "nulla", "aliquet", "enim", "tortor,", "at", "auctor", "urna", "nunc", "id", "cursus", "metus", "aliquam", "eleifend", "mi", "in", "nulla", "posuere", "sollicitudin", "aliquam", "ultrices", "sagittis", "orci,", "a", "scelerisque", "purus", "semper", "eget", "duis", "at", "tellus", "at", "urna", "condimentum", "mattis", "pellentesque", "id", "nibh", "tortor,", "id", "aliquet", "lectus", "proin", "nibh", "nisl,", "condimentum", "id", "venenatis", "a,", "condimentum", "vitae", "sapien", "pellentesque", "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis", "egestas", "sed", "tempus,", "urna", "et", "pharetra", "pharetra,", "massa", "massa", "ultricies", "mi,", "quis", "hendrerit", "dolor", "magna", "eget", "est", "lipsum", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit", "pellentesque", "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis", "egestas", "integer", "eget", "aliquet", "nibh", "praesent", "tristique", "magna", "sit", "amet", "purus", "gravida", "quis", "blandit", "turpis", "cursus", "in", "hac", "habitasse", "platea", "dictumst", "quisque", "sagittis,", "purus", "sit", "amet", "volutpat", "consequat,", "mauris", "nunc", "congue", "nisi,", "vitae", "suscipit", "tellus", "mauris", "a", "diam",
    "maecenas", "sed", "enim", "ut", "sem", "viverra", "aliquet", "eget", "sit", "amet", "tellus", "cras", "adipiscing", "enim", "eu", "turpis", "egestas", "pretium", "aenean", "pharetra,", "magna", "ac", "placerat", "vestibulum,", "lectus", "mauris", "ultrices", "eros,", "in", "cursus", "turpis", "massa", "tincidunt", "dui", "ut", "ornare", "lectus", "sit", "amet", "est", "placerat", "in", "egestas", "erat", "imperdiet", "sed", "euismod", "nisi", "porta", "lipsum", "mollis", "aliquam", "ut", "porttitor", "leo", "a", "diam", "sollicitudin", "tempor", "id", "eu", "nisl", "nunc", "mi", "ipsum,", "faucibus", "vitae", "aliquet", "nec,", "ullamcorper", "sit", "amet", "risus", "nullam", "eget", "felis", "eget", "nunc", "lobortis", "mattis", "aliquam", "faucibus", "purus", "in", "massa", "tempor", "nec", "feugiat", "nisl", "pretium", "fusce", "id", "velit", "ut", "tortor", "pretium", "viverra", "suspendisse", "potenti", "nullam", "ac", "tortor", "vitae", "purus", "faucibus", "ornare", "suspendisse", "sed", "nisi", "lacus,", "sed", "viverra", "tellus", "in", "hac", "habitasse", "platea", "dictumst", "vestibulum", "rhoncus", "est", "pellentesque", "elit", "ullamcorper", "dignissim", "cras", "tincidunt", "lobortis", "feugiat", "vivamus", "at", "augue", "eget", "arcu", "dictum", "varius", "duis", "at", "consectetur", "lipsum",
    "donec", "massa", "sapien,", "faucibus", "et", "molestie", "ac,", "feugiat", "sed", "lectus", "vestibulum", "mattis", "ullamcorper", "velit", "sed", "ullamcorper", "morbi", "tincidunt", "ornare", "massa,", "eget", "egestas", "purus", "viverra", "accumsan", "in", "nisl", "nisi,", "scelerisque", "eu", "ultrices", "vitae,", "auctor", "eu", "augue", "ut", "lectus", "arcu,", "bibendum", "at", "varius", "vel,", "pharetra", "vel", "turpis", "nunc", "eget", "lipsum", "dolor,", "sed", "viverra", "ipsum", "nunc", "aliquet", "bibendum", "enim,", "facilisis", "gravida", "neque", "convallis", "a", "cras", "semper", "auctor", "neque,", "vitae", "tempus", "quam", "pellentesque", "nec", "nam", "aliquam", "sem", "et", "tortor", "consequat", "id", "porta", "nibh", "venenatis", "cras", "sed", "felis", "eget", "velit", "aliquet", "sagittis", "id", "consectetur", "purus", "ut", "faucibus", "pulvinar", "elementum", "integer", "enim", "neque,", "volutpat", "ac", "tincidunt", "vitae,", "semper", "quis", "lectus", "nulla", "at", "volutpat", "diam", "ut", "venenatis", "tellus", "in", "metus", "vulputate", "eu", "scelerisque", "felis", "imperdiet", "proin", "fermentum", "leo", "vel", "orci", "porta", "non", "pulvinar", "neque", "laoreet", "suspendisse", "interdum", "consectetur", "libero,", "id", "faucibus", "nisl", "tincidunt", "eget", "nullam", "non", "nisi", "est,", "sit", "amet", "facilisis", "magna",
    "etiam", "tempor,", "orci", "eu", "lobortis", "elementum,", "nibh", "tellus", "molestie", "nunc,", "non", "blandit", "massa", "enim", "nec", "dui", "nunc", "mattis", "enim", "ut", "tellus", "elementum", "sagittis", "vitae", "et", "leo", "duis", "ut", "diam", "quam", "nulla", "porttitor", "massa", "id", "neque", "aliquam", "vestibulum", "morbi", "blandit", "cursus", "risus,", "at", "ultrices", "mi", "tempus", "imperdiet", "nulla", "malesuada", "pellentesque", "elit", "eget", "gravida", "cum", "sociis", "natoque", "penatibus", "et", "magnis", "dis", "parturient", "montes,", "nascetur", "ridiculus", "mus", "mauris", "vitae", "ultricies", "leo", "integer", "malesuada", "nunc", "vel", "risus", "commodo", "viverra", "maecenas", "accumsan,", "lacus", "vel", "facilisis", "volutpat,", "est", "velit", "egestas", "dui,", "id", "ornare", "arcu", "odio", "ut", "sem", "nulla", "pharetra", "diam", "sit", "amet", "nisl", "suscipit", "adipiscing", "bibendum", "est", "ultricies", "integer", "quis", "auctor", "elit",
    "sed", "vulputate", "mi", "sit", "amet", "mauris", "commodo", "quis", "imperdiet", "massa", "tincidunt", "nunc", "pulvinar", "sapien", "et", "ligula", "ullamcorper", "malesuada", "proin", "libero", "nunc,", "consequat", "interdum", "varius", "sit", "amet,", "mattis", "vulputate", "enim", "nulla", "aliquet", "porttitor", "lacus,", "luctus", "accumsan", "tortor", "posuere", "ac", "ut", "consequat", "semper", "viverra", "nam", "libero", "justo,", "laoreet", "sit", "amet", "cursus", "sit", "amet,", "dictum", "sit", "amet", "justo", "donec", "enim", "diam,", "vulputate", "ut", "pharetra", "sit", "amet,", "aliquam", "id", "diam", "maecenas", "ultricies", "mi", "eget", "mauris", "pharetra", "et", "ultrices", "neque", "ornare", "aenean", "euismod", "elementum", "nisi,", "quis", "eleifend", "quam", "adipiscing", "vitae", "proin", "sagittis,", "nisl", "rhoncus", "mattis", "rhoncus,", "urna", "neque", "viverra", "justo,", "nec", "ultrices", "dui", "sapien", "eget", "mi", "proin", "sed", "libero", "enim,", "sed", "faucibus", "turpis", "in", "eu", "mi", "bibendum", "neque", "egestas", "congue", "quisque", "egestas", "diam", "in", "arcu", "cursus", "euismod", "quis", "viverra", "nibh", "cras", "pulvinar", "mattis", "nunc,", "sed", "blandit", "libero", "volutpat", "sed", "cras", "ornare", "arcu", "dui", "vivamus", "arcu", "felis,", "bibendum", "ut", "tristique", "et,", "egestas", "quis", "ipsum", "suspendisse", "ultrices", "gravida", "dictum",
    "fusce", "ut", "placerat", "orci", "nulla", "pellentesque", "dignissim", "enim,", "sit", "amet", "venenatis", "urna", "cursus", "eget", "nunc", "scelerisque", "viverra", "mauris,", "in", "aliquam", "sem", "fringilla", "ut", "morbi", "tincidunt", "augue", "interdum", "velit", "euismod", "in", "pellentesque", "massa", "placerat", "duis", "ultricies", "lacus", "sed", "turpis", "tincidunt", "id", "aliquet", "risus", "feugiat", "in", "ante", "metus,", "dictum", "at", "tempor", "commodo,", "ullamcorper", "a", "lacus", "vestibulum", "sed", "arcu", "non", "odio", "euismod", "lacinia", "at", "quis", "risus", "sed", "vulputate", "odio", "ut", "enim", "blandit", "volutpat", "maecenas", "volutpat", "blandit", "aliquam", "etiam", "erat", "velit,", "scelerisque", "in", "dictum", "non,", "consectetur", "a", "erat", "nam", "at", "lectus", "urna", "duis", "convallis", "convallis", "tellus,", "id", "interdum", "velit", "laoreet", "id", "donec", "ultrices", "tincidunt", "arcu,", "non", "sodales", "neque", "sodales", "ut", "etiam", "sit", "amet", "nisl", "purus,", "in", "mollis", "nunc",
    "sed", "id", "semper", "risus", "in", "hendrerit", "gravida", "rutrum", "quisque", "non", "tellus", "orci,", "ac", "auctor", "augue", "mauris", "augue", "neque,", "gravida", "in", "fermentum", "et,", "sollicitudin", "ac", "orci", "phasellus", "egestas", "tellus", "rutrum", "tellus", "pellentesque", "eu", "tincidunt", "tortor", "aliquam", "nulla", "facilisi", "cras", "fermentum,", "odio", "eu", "feugiat", "pretium,", "nibh", "ipsum", "consequat", "nisl,", "vel", "pretium", "lectus", "quam", "id", "leo", "in", "vitae", "turpis", "massa", "sed", "elementum", "tempus", "egestas", "sed", "sed", "risus", "pretium", "quam", "vulputate", "dignissim", "suspendisse", "in", "est", "ante", "in", "nibh", "mauris,", "cursus", "mattis", "molestie", "a,", "iaculis", "at", "erat",
    "pellentesque", "adipiscing", "commodo", "elit,", "at", "imperdiet", "dui", "accumsan", "sit", "amet", "nulla", "facilisi", "morbi", "tempus", "iaculis", "urna,", "id", "volutpat", "lacus", "laoreet", "non", "curabitur", "gravida", "arcu", "ac", "tortor", "dignissim", "convallis", "aenean", "et", "tortor", "at", "risus", "viverra", "adipiscing", "at", "in", "tellus", "integer", "feugiat", "scelerisque", "varius", "morbi", "enim", "nunc,", "faucibus", "a", "pellentesque", "sit", "amet,", "porttitor", "eget", "dolor", "morbi", "non", "arcu", "risus,", "quis", "varius", "quam", "quisque", "id", "diam", "vel", "quam", "elementum", "pulvinar", "etiam", "non", "quam", "lacus", "suspendisse", "faucibus", "interdum", "posuere", "lipsum", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit", "duis", "tristique", "sollicitudin", "nibh", "sit", "amet", "commodo", "nulla", "facilisi",
    "nullam", "vehicula", "ipsum", "a", "arcu", "cursus", "vitae", "congue", "mauris", "rhoncus", "aenean", "vel", "elit", "scelerisque", "mauris", "pellentesque", "pulvinar", "pellentesque", "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis", "egestas", "maecenas", "pharetra", "convallis", "posuere", "morbi", "leo", "urna,", "molestie", "at", "elementum", "eu,", "facilisis", "sed", "odio", "morbi", "quis", "commodo", "odio", "aenean", "sed", "adipiscing", "diam", "donec", "adipiscing", "tristique", "risus", "nec", "feugiat", "in", "fermentum", "posuere", "urna", "nec", "tincidunt", "praesent", "semper", "feugiat", "nibh", "sed", "pulvinar", "proin", "gravida", "hendrerit", "lectus", "a", "molestie",
];

/**
 * Generate a lorem ipsum paragraph.
 * The amount of words changes each time a sentence is generated.
 * @param minSentences Minimum amount of sentences
 * @param maxSentences Maximum amount of sentences
 * @param minWords Minimum amount of words per sentence
 * @param maxWords Maximum amount of words per sentence
 */
const lipsum = (
    minSentences = 1,
    maxSentences = minSentences,
    minWords = 5,
    maxWords = minWords,
): string[][] => {
    const lorem: string[][] = [];
    const numberOfSentences = randomIntIncl(minSentences, maxSentences);

    for (let i = 0; i < numberOfSentences; i += 1) {
        const count = randomIntIncl(minWords, maxWords);
        const wordIndex = randomIntIncl(0, words.length - count - 1);

        lorem.push(words.slice(wordIndex, wordIndex + count));
    }

    return lorem;
};

/**
 * Turn array of words into sentences
 */
const toText = (data: string[][]): string => {
    let paragraph = "";

    data.forEach((sentence) => {
        sentence.forEach((word, index) => {
            if (index < 1) {
                word = word.substr(0, 1).toUpperCase() + word.substr(1);
            }

            // remove "," and "."
            paragraph += ` ${word.replace(/[.,]/g, "")}`;
        });

        paragraph += `.`;
    });

    return paragraph.trim();
};

export { lipsum, toText };
