const API_BASE_URL = 'https://opentdb.com/api.php';

export const fetchQuestions = async (difficulty = 'medium', amount = 10) => {
  try {
    console.log('Attempting to fetch questions from API...');
    const params = new URLSearchParams({
      amount: amount.toString(),
      difficulty: difficulty,
      type: 'multiple',
      encode: 'url3986'
    });

    const response = await fetch(`${API_BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.response_code !== 0) {
      throw new Error(`API error! Response code: ${data.response_code}`);
    }

    if (!data.results || data.results.length === 0) {
      throw new Error('No questions available');
    }

    console.log('Successfully fetched questions from API');
    return data.results;
  } catch (error) {
    console.error('Error fetching questions from API:', error);
    console.log('Using fallback questions instead');
    
    // Always use fallback questions for now to ensure the app works
    return getFallbackQuestions(difficulty);
  }
};

// Fallback questions in case API is unavailable
const getFallbackQuestions = (difficulty) => {
  const fallbackQuestions = {
    easy: [
      {
        question: "What is the capital of France?",
        correct_answer: "Paris",
        incorrect_answers: ["London", "Berlin", "Madrid"]
      },
      {
        question: "Which planet is known as the Red Planet?",
        correct_answer: "Mars",
        incorrect_answers: ["Venus", "Jupiter", "Saturn"]
      },
      {
        question: "What is 2 + 2?",
        correct_answer: "4",
        incorrect_answers: ["3", "5", "6"]
      },
      {
        question: "Who painted the Mona Lisa?",
        correct_answer: "Leonardo da Vinci",
        incorrect_answers: ["Pablo Picasso", "Vincent van Gogh", "Michelangelo"]
      },
      {
        question: "What is the largest ocean on Earth?",
        correct_answer: "Pacific Ocean",
        incorrect_answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"]
      },
      {
        question: "What color do you get when you mix red and blue?",
        correct_answer: "Purple",
        incorrect_answers: ["Green", "Orange", "Yellow"]
      },
      {
        question: "How many days are in a week?",
        correct_answer: "7",
        incorrect_answers: ["5", "6", "8"]
      },
      {
        question: "What is the fastest land animal?",
        correct_answer: "Cheetah",
        incorrect_answers: ["Lion", "Tiger", "Leopard"]
      },
      {
        question: "What do bees make?",
        correct_answer: "Honey",
        incorrect_answers: ["Milk", "Butter", "Cheese"]
      },
      {
        question: "What is the smallest country in the world?",
        correct_answer: "Vatican City",
        incorrect_answers: ["Monaco", "Liechtenstein", "San Marino"]
      }
    ],
    medium: [
      {
        question: "What is the chemical symbol for gold?",
        correct_answer: "Au",
        incorrect_answers: ["Go", "Gd", "Ag"]
      },
      {
        question: "Which programming language was created by Brendan Eich?",
        correct_answer: "JavaScript",
        incorrect_answers: ["Python", "Java", "C++"]
      },
      {
        question: "What is the smallest country in the world?",
        correct_answer: "Vatican City",
        incorrect_answers: ["Monaco", "Liechtenstein", "San Marino"]
      },
      {
        question: "Which year did World War II end?",
        correct_answer: "1945",
        incorrect_answers: ["1944", "1946", "1943"]
      },
      {
        question: "What is the speed of light in vacuum?",
        correct_answer: "299,792,458 m/s",
        incorrect_answers: ["300,000,000 m/s", "299,000,000 m/s", "301,000,000 m/s"]
      },
      {
        question: "What is the largest planet in our solar system?",
        correct_answer: "Jupiter",
        incorrect_answers: ["Saturn", "Neptune", "Earth"]
      },
      {
        question: "Who wrote 'Romeo and Juliet'?",
        correct_answer: "William Shakespeare",
        incorrect_answers: ["Charles Dickens", "Jane Austen", "Mark Twain"]
      },
      {
        question: "What is the currency of Japan?",
        correct_answer: "Yen",
        incorrect_answers: ["Won", "Dollar", "Euro"]
      },
      {
        question: "Which element has the atomic number 1?",
        correct_answer: "Hydrogen",
        incorrect_answers: ["Helium", "Lithium", "Carbon"]
      },
      {
        question: "What is the capital of Australia?",
        correct_answer: "Canberra",
        incorrect_answers: ["Sydney", "Melbourne", "Perth"]
      }
    ],
    hard: [
      {
        question: "What is the time complexity of binary search?",
        correct_answer: "O(log n)",
        incorrect_answers: ["O(n)", "O(n²)", "O(1)"]
      },
      {
        question: "Which theorem states that no three positive integers a, b, and c satisfy the equation aⁿ + bⁿ = cⁿ for any integer value of n greater than 2?",
        correct_answer: "Fermat's Last Theorem",
        incorrect_answers: ["Pythagorean Theorem", "Euler's Theorem", "Gauss's Theorem"]
      },
      {
        question: "What is the name of the process by which plants convert light energy into chemical energy?",
        correct_answer: "Photosynthesis",
        incorrect_answers: ["Respiration", "Transpiration", "Fermentation"]
      },
      {
        question: "Which algorithm is used to find the shortest path in a weighted graph?",
        correct_answer: "Dijkstra's algorithm",
        incorrect_answers: ["Bubble sort", "Binary search", "Quick sort"]
      },
      {
        question: "What is the Heisenberg uncertainty principle?",
        correct_answer: "It is impossible to simultaneously know both the position and momentum of a particle with absolute precision",
        incorrect_answers: ["Energy cannot be created or destroyed", "The speed of light is constant in all reference frames", "Matter and energy are equivalent"]
      },
      {
        question: "What is the derivative of x²?",
        correct_answer: "2x",
        incorrect_answers: ["x", "x²", "2x²"]
      },
      {
        question: "Which programming paradigm does Haskell primarily use?",
        correct_answer: "Functional programming",
        incorrect_answers: ["Object-oriented programming", "Procedural programming", "Logic programming"]
      },
      {
        question: "What is the name of the process where a star collapses into a black hole?",
        correct_answer: "Gravitational collapse",
        incorrect_answers: ["Nuclear fusion", "Supernova explosion", "Stellar evolution"]
      },
      {
        question: "Which data structure uses LIFO (Last In, First Out) principle?",
        correct_answer: "Stack",
        incorrect_answers: ["Queue", "Array", "Linked List"]
      },
      {
        question: "What is the name of the protein that carries oxygen in red blood cells?",
        correct_answer: "Hemoglobin",
        incorrect_answers: ["Myoglobin", "Collagen", "Keratin"]
      }
    ]
  };

  return fallbackQuestions[difficulty] || fallbackQuestions.medium;
};
