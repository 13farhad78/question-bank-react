// samle questions for testing purposes

export const sampleQuestions = [
    {
        question_type: "multiple_choice",
        question_data: {
            question_stem: "گزینه ی صحیح را انتخاب کنید.",
            question_text: "My father will buy a new car, ---------------?",
            options: [
                {
                    text: "Will my father",
                    isCorrect: false,
                },
                {
                    text: "Won't he",
                    isCorrect: true,
                },
                {
                    text: "Will he",
                    isCorrect: false,
                },
                {
                    text: "Won't mt father",
                    isCorrect: false,
                },
            ],
        },
        basic_info: {
            grade: 12,
            lesson: 1,
            difficulty: "easy",
        },
        questionSource: {
            isFinal: true,
            year: 1401,
            month: "Dey",
        },
        score_value: 0.5,
        is_active: true,
        _id: "6902004a5c145252ec032fb2",
        createdAt: "2025-10-29T11:53:46.470Z",
        __v: 0,
    },

    {
        question_data: {
            question_stem: "شکل صحیح فعل داخل پرانتز را بنویسید",
            question_text:
                "Many products like light bulb, camera and telephone --------------- each year. (To develop)",
            answer_slots: [
                {
                    correct_word: "are",
                },
                {
                    correct_word: "developed",
                },
            ],
        },
        basic_info: {
            grade: 12,
            lesson: 1,
            difficulty: "easy",
        },
        language_skills: {
            focus: "Grammar",
        },
        questionSource: {
            isFinal: true,
            year: 1402,
            month: "Shahrivar",
        },
        score_value: 0.5,
        question_type: "fill_in_the_blank",
    },
    {
        question_data: {
            
            question_stem: "متن زیر را بخوانید و به سوالات پاسخ دهید.",
            reading_passage:
                "Donating is a great way to help others by giving something to someone who needs it more than us. It could be clothes, food, toys, or even our time. People donate clothes and other items to some stores, and others can buy them at less price. The money from these sales often goes to help people in need.  \nAnother place to donate is a place that collects food for people who don’t have enough to eat. By donating food, we can help someone have enough to eat. Sometimes, we can give money. Some organizations use the money to build schools, provide medical help, or even protect the environment. We can also donate our time by helping or using our skills to help those who need it. Whether reading to children at a library or cleaning up a park, our help can bring joy and make our community. Donating is a generous act. It teaches us to think of others and be kind. So, let’s remember the power of donating and keep giving what we can to make the world a better place.",
            questions: [
                {
                    type: "true_false",
                    question_text:
                        "Some people in need donate clothes to stores.",
                    correct_answer: "True",
                },
                {
                    type: "true_false",
                    question_text:
                        " People learn to think of others and be kind through donating.",
                    correct_answer: "False",
                },
                {
                    type: "multi_choice",
                    question_text:
                        "Which of the following is true about donating? ",
                    options: [
                        {
                            text: " People donate to learn skills.",
                            isCorrect: false,
                        },
                        {
                            text: " Donating food is more important than money.",
                            isCorrect: false,
                        },
                        {
                            text: "Donating takes different shapes.",
                            isCorrect: true,
                        },
                        {
                            text: "People should eat enough food to donate others. ",
                            isCorrect: false,
                        },
                    ],
                },
                {
                    type: "multi_choice",
                    question_text:
                        "People should eat enough food to donate others. ",
                    options: [
                        {
                            text: "using skills to help those who need it",
                            isCorrect: true,
                        },
                        {
                            text: "using money to build schools  ",
                            isCorrect: false,
                        },
                        {
                            text: "giving something to someone on time ",
                            isCorrect: false,
                        },
                        {
                            text: "providing medical help",
                            isCorrect: false,
                        },
                    ],
                },
                {
                    type: "short_answer",
                    question_text:
                        "What does donating mean according to the passage?",
                    short_answer: "giving people what they need",
                },
                {
                    type: "short_answer",
                    question_text:
                        "What can some organizations do with the money which people donate?",
                    short_answer: "buy clothes",
                },
            ],
        },
        basic_info: {
            grade: 12,
            lesson: 1,
            difficulty: "medium",
        },
        language_skills: {
            focus: "Reading",
        },
        question_type: "reading",
        questionSource: {
            isFinal: true,
            year: 1402,
            month: "Shahrivar",
        },
        score_value: 2,
    },
];
