const { Validator } = require('jsonschema');

module.exports = {
    verifyBook: (book) => {
        if (!book) {
            throw new Error('Cannot create a new book without data');
        }

        let validator = new Validator();

        let bookSchema = {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    minLength: 3
                },
                description: {
                    type: 'string',
                    minLength: 3
                },
                author: {
                    type: 'string',
                    minLength: 1
                },
                year: {
                    type: 'number'
                }
            },
            required: ['title', 'author'],
            additionalProperties: false
        };

        let result = validator.validate(book, bookSchema);

        if (result.errors.length) {
            const errorMessages = result.errors
                .map((error) => {
                    return error.message;
                })
                .join(' ');
            throw new Error(errorMessages);
        }
    }
};
