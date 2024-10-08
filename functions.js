function ucfisrt(word) {
    const firstLetter = word[0].toUpperCase() + word.slice(1);
    return console.log(firstLetter);
}

ucfisrt('test');

function capitalize(sentence) {
    return sentence
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

console.log(capitalize('bonjour à tous'));

function camelCase(sentence) {
    return sentence
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

console.log(camelCase('Hello world'));

function snake_case(sentence) {
    return sentence
        .split(' ')
        .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
        .join('_');
}

console.log(snake_case('Hellow World'));

function leet(word) {
    return word
        .split('')
        .map((letter) => {
            switch (letter.toUpperCase()) {
                case 'A':
                    return '4';
                case 'E':
                    return '3';
                case 'I':
                    return '1';
                case 'O':
                    return '0';
                case 'U':
                    return '_';
                case 'Y':
                    return '7';
                default:
                    return letter;
            }
        })
        .join('');
}

console.log(leet('Bonjour à tous'));
