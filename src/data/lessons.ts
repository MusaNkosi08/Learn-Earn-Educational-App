export interface Question {
  front: string;
  options: string[];
  correct: number;
  reward: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  reward: number;
  questions: Question[];
}

export const lessonsData: { [language: string]: Lesson[] } = {
  isiZulu: [
    {
      id: 'zulu-greetings',
      title: 'Greetings',
      description: 'Learn basic greetings',
      reward: 0.5,
      questions: [
        {
          front: 'What does "Sawubona" mean?',
          options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
          correct: 0,
          reward: 0.125,
        },
        {
          front: 'How do you say "Thank you" in isiZulu?',
          options: ['Hamba kahle', 'Ngiyabonga', 'Unjani', 'Yebo'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What does "Unjani?" mean?',
          options: ['What is your name?', 'How are you?', 'Where are you from?', 'See you later'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'How do you say "Goodbye" in isiZulu?',
          options: ['Sawubona', 'Ngiyabonga', 'Hamba kahle', 'Yebo'],
          correct: 2,
          reward: 0.125,
        },
      ],
    },
    {
      id: 'zulu-numbers',
      title: 'Numbers',
      description: 'Count from 1 to 100',
      reward: 0.5,
      questions: [
        {
          front: 'What is "1" in isiZulu?',
          options: ['Kunye', 'Mbili', 'Thathu', 'Nye'],
          correct: 0,
          reward: 0.125,
        },
        {
          front: 'What is "5" in isiZulu?',
          options: ['Thathu', 'Ne', 'Hlanu', 'Isithupha'],
          correct: 2,
          reward: 0.125,
        },
        {
          front: 'What does "Ishumi" mean?',
          options: ['Five', 'Ten', 'Twenty', 'Hundred'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What is "3" in isiZulu?',
          options: ['Mbili', 'Thathu', 'Ne', 'Hlanu'],
          correct: 1,
          reward: 0.125,
        },
      ],
    },
    {
      id: 'zulu-phrases',
      title: 'Common Phrases',
      description: 'Everyday expressions',
      reward: 0.5,
      questions: [
        {
          front: 'How do you say "Please" in isiZulu?',
          options: ['Ngiyacela', 'Ngiyabonga', 'Uxolo', 'Yebo'],
          correct: 0,
          reward: 0.125,
        },
        {
          front: 'What does "Yebo" mean?',
          options: ['No', 'Yes', 'Maybe', 'Please'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'How do you say "Sorry" in isiZulu?',
          options: ['Ngiyabonga', 'Uxolo', 'Ngiyacela', 'Hamba'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What does "Ngiyaphila" mean?',
          options: ['I am fine', 'I am tired', 'I am hungry', 'I am lost'],
          correct: 0,
          reward: 0.125,
        },
      ],
    },
    {
      id: 'zulu-family',
      title: 'Family',
      description: 'Family members and relations',
      reward: 0.5,
      questions: [
        {
          front: 'What is "Mother" in isiZulu?',
          options: ['Ubaba', 'Umama', 'Udadewethu', 'Umfowethu'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What is "Father" in isiZulu?',
          options: ['Ubaba', 'Umama', 'Ugogo', 'Umkhulu'],
          correct: 0,
          reward: 0.125,
        },
        {
          front: 'What does "Umfowethu" mean?',
          options: ['Sister', 'Brother', 'Grandmother', 'Grandfather'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What is "Grandmother" in isiZulu?',
          options: ['Ugogo', 'Umama', 'Udadewethu', 'Umkhulu'],
          correct: 0,
          reward: 0.125,
        },
      ],
    },
    {
      id: 'zulu-food',
      title: 'Food & Drinks',
      description: 'Popular dishes and beverages',
      reward: 0.75,
      questions: [
        {
          front: 'What is "Water" in isiZulu?',
          options: ['Ubisi', 'Amanzi', 'Utshwala', 'Itiye'],
          correct: 1,
          reward: 0.1875,
        },
        {
          front: 'What does "Ukudla" mean?',
          options: ['Food', 'Drink', 'Plate', 'Spoon'],
          correct: 0,
          reward: 0.1875,
        },
        {
          front: 'What is "Milk" in isiZulu?',
          options: ['Amanzi', 'Ubisi', 'Itiye', 'Ikhofi'],
          correct: 1,
          reward: 0.1875,
        },
        {
          front: 'What does "Isinkwa" mean?',
          options: ['Rice', 'Bread', 'Meat', 'Vegetables'],
          correct: 1,
          reward: 0.1875,
        },
      ],
    },
    {
      id: 'zulu-directions',
      title: 'Directions',
      description: 'Navigate and ask for help',
      reward: 0.75,
      questions: [
        {
          front: 'How do you say "Where is...?" in isiZulu?',
          options: ['Ikuphi...?', 'Kanjani...?', 'Yini...?', 'Ngubani...?'],
          correct: 0,
          reward: 0.1875,
        },
        {
          front: 'What does "Kwesokudla" mean?',
          options: ['Left', 'Right', 'Straight', 'Back'],
          correct: 1,
          reward: 0.1875,
        },
        {
          front: 'What is "Left" in isiZulu?',
          options: ['Kwesokudla', 'Kwesokunxele', 'Phambili', 'Emuva'],
          correct: 1,
          reward: 0.1875,
        },
        {
          front: 'What does "Phambili" mean?',
          options: ['Back', 'Left', 'Right', 'Straight/Forward'],
          correct: 3,
          reward: 0.1875,
        },
      ],
    },
  ],
  Afrikaans: [
    {
      id: 'afr-greetings',
      title: 'Greetings',
      description: 'Learn basic greetings',
      reward: 0.5,
      questions: [
        {
          front: 'What does "Hallo" mean?',
          options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
          correct: 0,
          reward: 0.125,
        },
        {
          front: 'How do you say "Thank you" in Afrikaans?',
          options: ['Asseblief', 'Dankie', 'Totsiens', 'Hallo'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What does "Hoe gaan dit?" mean?',
          options: ['What is your name?', 'How are you?', 'Where are you?', 'Goodbye'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'How do you say "Goodbye" in Afrikaans?',
          options: ['Hallo', 'Dankie', 'Totsiens', 'Ja'],
          correct: 2,
          reward: 0.125,
        },
      ],
    },
    {
      id: 'afr-numbers',
      title: 'Numbers',
      description: 'Count from 1 to 100',
      reward: 0.5,
      questions: [
        {
          front: 'What is "1" in Afrikaans?',
          options: ['Een', 'Twee', 'Drie', 'Vier'],
          correct: 0,
          reward: 0.125,
        },
        {
          front: 'What is "5" in Afrikaans?',
          options: ['Drie', 'Vier', 'Vyf', 'Ses'],
          correct: 2,
          reward: 0.125,
        },
        {
          front: 'What does "Tien" mean?',
          options: ['Five', 'Ten', 'Twenty', 'Hundred'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What is "3" in Afrikaans?',
          options: ['Twee', 'Drie', 'Vier', 'Vyf'],
          correct: 1,
          reward: 0.125,
        },
      ],
    },
    {
      id: 'afr-phrases',
      title: 'Common Phrases',
      description: 'Everyday expressions',
      reward: 0.5,
      questions: [
        {
          front: 'How do you say "Please" in Afrikaans?',
          options: ['Asseblief', 'Dankie', 'Jammer', 'Ja'],
          correct: 0,
          reward: 0.125,
        },
        {
          front: 'What does "Ja" mean?',
          options: ['No', 'Yes', 'Maybe', 'Please'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'How do you say "Sorry" in Afrikaans?',
          options: ['Dankie', 'Jammer', 'Asseblief', 'Nee'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What does "Goed" mean?',
          options: ['Bad', 'Good', 'Maybe', 'Never'],
          correct: 1,
          reward: 0.125,
        },
      ],
    },
    {
      id: 'afr-family',
      title: 'Family',
      description: 'Family members and relations',
      reward: 0.5,
      questions: [
        {
          front: 'What is "Mother" in Afrikaans?',
          options: ['Pa', 'Ma', 'Suster', 'Broer'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What is "Father" in Afrikaans?',
          options: ['Pa', 'Ma', 'Ouma', 'Oupa'],
          correct: 0,
          reward: 0.125,
        },
        {
          front: 'What does "Broer" mean?',
          options: ['Sister', 'Brother', 'Grandmother', 'Grandfather'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What is "Grandmother" in Afrikaans?',
          options: ['Ouma', 'Ma', 'Suster', 'Oupa'],
          correct: 0,
          reward: 0.125,
        },
      ],
    },
    {
      id: 'afr-food',
      title: 'Food & Drinks',
      description: 'Popular dishes and beverages',
      reward: 0.75,
      questions: [
        {
          front: 'What is "Water" in Afrikaans?',
          options: ['Melk', 'Water', 'Bier', 'Tee'],
          correct: 1,
          reward: 0.1875,
        },
        {
          front: 'What does "Kos" mean?',
          options: ['Food', 'Drink', 'Plate', 'Spoon'],
          correct: 0,
          reward: 0.1875,
        },
        {
          front: 'What is "Milk" in Afrikaans?',
          options: ['Water', 'Melk', 'Tee', 'Koffie'],
          correct: 1,
          reward: 0.1875,
        },
        {
          front: 'What does "Brood" mean?',
          options: ['Rice', 'Bread', 'Meat', 'Vegetables'],
          correct: 1,
          reward: 0.1875,
        },
      ],
    },
    {
      id: 'afr-directions',
      title: 'Directions',
      description: 'Navigate and ask for help',
      reward: 0.75,
      questions: [
        {
          front: 'How do you say "Where is...?" in Afrikaans?',
          options: ['Waar is...?', 'Hoe is...?', 'Wat is...?', 'Wie is...?'],
          correct: 0,
          reward: 0.1875,
        },
        {
          front: 'What does "Regs" mean?',
          options: ['Left', 'Right', 'Straight', 'Back'],
          correct: 1,
          reward: 0.1875,
        },
        {
          front: 'What is "Left" in Afrikaans?',
          options: ['Regs', 'Links', 'Reguit', 'Terug'],
          correct: 1,
          reward: 0.1875,
        },
        {
          front: 'What does "Reguit" mean?',
          options: ['Back', 'Left', 'Right', 'Straight'],
          correct: 3,
          reward: 0.1875,
        },
      ],
    },
  ],
  Sesotho: [
    {
      id: 'ses-greetings',
      title: 'Greetings',
      description: 'Learn basic greetings',
      reward: 0.5,
      questions: [
        {
          front: 'What does "Dumela" mean?',
          options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
          correct: 0,
          reward: 0.125,
        },
        {
          front: 'How do you say "Thank you" in Sesotho?',
          options: ['Sala hantle', 'Kea leboha', 'O phela joang', 'Ee'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What does "O phela joang?" mean?',
          options: ['What is your name?', 'How are you?', 'Where are you?', 'Goodbye'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'How do you say "Goodbye" in Sesotho?',
          options: ['Dumela', 'Kea leboha', 'Sala hantle', 'Ee'],
          correct: 2,
          reward: 0.125,
        },
      ],
    },
    {
      id: 'ses-numbers',
      title: 'Numbers',
      description: 'Count from 1 to 100',
      reward: 0.5,
      questions: [
        {
          front: 'What is "1" in Sesotho?',
          options: ['Nngwe', 'Pedi', 'Tharo', 'Nne'],
          correct: 0,
          reward: 0.125,
        },
        {
          front: 'What is "5" in Sesotho?',
          options: ['Tharo', 'Nne', 'Hlano', 'Tshela'],
          correct: 2,
          reward: 0.125,
        },
        {
          front: 'What does "Leshome" mean?',
          options: ['Five', 'Ten', 'Twenty', 'Hundred'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What is "3" in Sesotho?',
          options: ['Pedi', 'Tharo', 'Nne', 'Hlano'],
          correct: 1,
          reward: 0.125,
        },
      ],
    },
    {
      id: 'ses-phrases',
      title: 'Common Phrases',
      description: 'Everyday expressions',
      reward: 0.5,
      questions: [
        {
          front: 'How do you say "Please" in Sesotho?',
          options: ['Ka kopo', 'Kea leboha', 'Tshwarelo', 'Ee'],
          correct: 0,
          reward: 0.125,
        },
        {
          front: 'What does "Ee" mean?',
          options: ['No', 'Yes', 'Maybe', 'Please'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'How do you say "Sorry" in Sesotho?',
          options: ['Kea leboha', 'Tshwarelo', 'Ka kopo', 'Tjhe'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What does "Kea phela" mean?',
          options: ['I am fine', 'I am tired', 'I am hungry', 'I am lost'],
          correct: 0,
          reward: 0.125,
        },
      ],
    },
    {
      id: 'ses-family',
      title: 'Family',
      description: 'Family members and relations',
      reward: 0.5,
      questions: [
        {
          front: 'What is "Mother" in Sesotho?',
          options: ['Ntate', 'Mme', 'Kgaitsedi', 'Abuti'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What is "Father" in Sesotho?',
          options: ['Ntate', 'Mme', 'Nkoko', 'Ntatemoholo'],
          correct: 0,
          reward: 0.125,
        },
        {
          front: 'What does "Abuti" mean?',
          options: ['Sister', 'Brother', 'Grandmother', 'Grandfather'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What is "Grandmother" in Sesotho?',
          options: ['Nkoko', 'Mme', 'Kgaitsedi', 'Ntatemoholo'],
          correct: 0,
          reward: 0.125,
        },
      ],
    },
    {
      id: 'ses-food',
      title: 'Food & Drinks',
      description: 'Popular dishes and beverages',
      reward: 0.75,
      questions: [
        {
          front: 'What is "Water" in Sesotho?',
          options: ['Lebese', 'Metsi', 'Jwala', 'Tee'],
          correct: 1,
          reward: 0.1875,
        },
        {
          front: 'What does "Dijo" mean?',
          options: ['Food', 'Drink', 'Plate', 'Spoon'],
          correct: 0,
          reward: 0.1875,
        },
        {
          front: 'What is "Milk" in Sesotho?',
          options: ['Metsi', 'Lebese', 'Tee', 'Kofi'],
          correct: 1,
          reward: 0.1875,
        },
        {
          front: 'What does "Bohobe" mean?',
          options: ['Rice', 'Bread', 'Meat', 'Vegetables'],
          correct: 1,
          reward: 0.1875,
        },
      ],
    },
    {
      id: 'ses-directions',
      title: 'Directions',
      description: 'Navigate and ask for help',
      reward: 0.75,
      questions: [
        {
          front: 'How do you say "Where is...?" in Sesotho?',
          options: ['...o hokae?', '...o joang?', '...ke eng?', '...ke mang?'],
          correct: 0,
          reward: 0.1875,
        },
        {
          front: 'What does "Ka letona" mean?',
          options: ['Left', 'Right', 'Straight', 'Back'],
          correct: 1,
          reward: 0.1875,
        },
        {
          front: 'What is "Left" in Sesotho?',
          options: ['Ka letona', 'Ka letsohadi', 'Pele', 'Morao'],
          correct: 1,
          reward: 0.1875,
        },
        {
          front: 'What does "Pele" mean?',
          options: ['Back', 'Left', 'Right', 'Forward/Ahead'],
          correct: 3,
          reward: 0.1875,
        },
      ],
    },
  ],
  isiXhosa: [
    {
      id: 'xho-greetings',
      title: 'Greetings',
      description: 'Learn basic greetings',
      reward: 0.5,
      questions: [
        {
          front: 'What does "Molo" mean?',
          options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
          correct: 0,
          reward: 0.125,
        },
        {
          front: 'How do you say "Thank you" in isiXhosa?',
          options: ['Hamba kakuhle', 'Enkosi', 'Kunjani', 'Ewe'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What does "Kunjani?" mean?',
          options: ['What is your name?', 'How are you?', 'Where are you?', 'Goodbye'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'How do you say "Goodbye" in isiXhosa?',
          options: ['Molo', 'Enkosi', 'Hamba kakuhle', 'Ewe'],
          correct: 2,
          reward: 0.125,
        },
      ],
    },
    {
      id: 'xho-numbers',
      title: 'Numbers',
      description: 'Count from 1 to 100',
      reward: 0.5,
      questions: [
        {
          front: 'What is "1" in isiXhosa?',
          options: ['Nye', 'Zimbini', 'Zintathu', 'Zine'],
          correct: 0,
          reward: 0.125,
        },
        {
          front: 'What is "5" in isiXhosa?',
          options: ['Zintathu', 'Zine', 'Zintlanu', 'Zintandathu'],
          correct: 2,
          reward: 0.125,
        },
        {
          front: 'What does "Ishumi" mean?',
          options: ['Five', 'Ten', 'Twenty', 'Hundred'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What is "3" in isiXhosa?',
          options: ['Zimbini', 'Zintathu', 'Zine', 'Zintlanu'],
          correct: 1,
          reward: 0.125,
        },
      ],
    },
    {
      id: 'xho-phrases',
      title: 'Common Phrases',
      description: 'Everyday expressions',
      reward: 0.5,
      questions: [
        {
          front: 'How do you say "Please" in isiXhosa?',
          options: ['Nceda', 'Enkosi', 'Uxolo', 'Ewe'],
          correct: 0,
          reward: 0.125,
        },
        {
          front: 'What does "Ewe" mean?',
          options: ['No', 'Yes', 'Maybe', 'Please'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'How do you say "Sorry" in isiXhosa?',
          options: ['Enkosi', 'Uxolo', 'Nceda', 'Hayi'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What does "Ndiphilile" mean?',
          options: ['I am fine', 'I am tired', 'I am hungry', 'I am lost'],
          correct: 0,
          reward: 0.125,
        },
      ],
    },
    {
      id: 'xho-family',
      title: 'Family',
      description: 'Family members and relations',
      reward: 0.5,
      questions: [
        {
          front: 'What is "Mother" in isiXhosa?',
          options: ['Utata', 'Umama', 'Udade', 'Umfowethu'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What is "Father" in isiXhosa?',
          options: ['Utata', 'Umama', 'Umakhulu', 'Utatomkhulu'],
          correct: 0,
          reward: 0.125,
        },
        {
          front: 'What does "Umfowethu" mean?',
          options: ['Sister', 'Brother', 'Grandmother', 'Grandfather'],
          correct: 1,
          reward: 0.125,
        },
        {
          front: 'What is "Grandmother" in isiXhosa?',
          options: ['Umakhulu', 'Umama', 'Udade', 'Utatomkhulu'],
          correct: 0,
          reward: 0.125,
        },
      ],
    },
    {
      id: 'xho-food',
      title: 'Food & Drinks',
      description: 'Popular dishes and beverages',
      reward: 0.75,
      questions: [
        {
          front: 'What is "Water" in isiXhosa?',
          options: ['Ubisi', 'Amanzi', 'Utywala', 'Iti'],
          correct: 1,
          reward: 0.1875,
        },
        {
          front: 'What does "Ukutya" mean?',
          options: ['Food', 'Drink', 'Plate', 'Spoon'],
          correct: 0,
          reward: 0.1875,
        },
        {
          front: 'What is "Milk" in isiXhosa?',
          options: ['Amanzi', 'Ubisi', 'Iti', 'Ikofu'],
          correct: 1,
          reward: 0.1875,
        },
        {
          front: 'What does "Isonka" mean?',
          options: ['Rice', 'Bread', 'Meat', 'Vegetables'],
          correct: 1,
          reward: 0.1875,
        },
      ],
    },
    {
      id: 'xho-directions',
      title: 'Directions',
      description: 'Navigate and ask for help',
      reward: 0.75,
      questions: [
        {
          front: 'How do you say "Where is...?" in isiXhosa?',
          options: ['Iphi...?', 'Unjani...?', 'Yintoni...?', 'Ngubani...?'],
          correct: 0,
          reward: 0.1875,
        },
        {
          front: 'What does "Ekunene" mean?',
          options: ['Left', 'Right', 'Straight', 'Back'],
          correct: 1,
          reward: 0.1875,
        },
        {
          front: 'What is "Left" in isiXhosa?',
          options: ['Ekunene', 'Ekhohlo', 'Phambili', 'Emva'],
          correct: 1,
          reward: 0.1875,
        },
        {
          front: 'What does "Phambili" mean?',
          options: ['Back', 'Left', 'Right', 'Forward/Ahead'],
          correct: 3,
          reward: 0.1875,
        },
      ],
    },
  ],
};
