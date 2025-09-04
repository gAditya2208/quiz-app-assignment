# Quiz App

A modern, responsive React quiz application with scoring, results tracking, and multiple difficulty levels.

## Features

### Core Features
- ✅ Interactive quiz with multiple-choice questions
- ✅ Real-time scoring and progress tracking
- ✅ Results page with detailed answer review
- ✅ Multiple difficulty levels (Easy, Medium, Hard)
- ✅ Responsive design for desktop and mobile
- ✅ Clean, modern UI with smooth animations

### Bonus Features
- ✅ Timer per question (30 seconds)
- ✅ Progress indicator with visual progress bar
- ✅ Difficulty level selection
- ✅ Persistent high scores using localStorage
- ✅ Fallback questions when API is unavailable
- ✅ Error handling and loading states
- ✅ Accessibility considerations

## Technology Stack

- **React 18** with functional components and hooks
- **React Router** for navigation
- **Open Trivia DB API** for question data
- **CSS3** with modern styling and animations
- **Local Storage** for high score persistence

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quiz-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── Home.js          # Landing page with difficulty selection
│   ├── Quiz.js          # Main quiz component with state management
│   ├── Question.js      # Individual question display component
│   └── Results.js       # Results page with score summary
├── services/
│   └── api.js           # API service for fetching questions
├── App.js               # Main app component with routing
├── index.js             # React app entry point
└── index.css            # Global styles and responsive design
```

## Features in Detail

### Quiz Flow
1. **Home Page**: Select difficulty level and start quiz
2. **Quiz Page**: Answer questions one by one with timer
3. **Results Page**: View score, review answers, and restart

### State Management
- Uses React hooks (useState, useEffect) for state management
- Tracks current question, selected answers, timer, and score
- Manages loading and error states

### API Integration
- Fetches questions from Open Trivia DB API
- Includes fallback questions for offline functionality
- Handles API errors gracefully

### Responsive Design
- Mobile-first approach
- Flexible layout that works on all screen sizes
- Touch-friendly buttons and interactions

### Accessibility
- Keyboard navigation support
- Clear visual feedback for interactions
- Semantic HTML structure
- High contrast colors for readability

## Customization

### Adding New Questions
Questions are fetched from the Open Trivia DB API. To add custom questions, modify the `getFallbackQuestions` function in `src/services/api.js`.

### Styling
The app uses CSS custom properties and modern CSS features. Main styles are in `src/index.css`.

### Difficulty Levels
Difficulty levels are handled by the Open Trivia DB API. The app supports 'easy', 'medium', and 'hard' levels.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized bundle size
- Lazy loading of components
- Efficient state updates
- Minimal re-renders

## Future Enhancements

- User authentication
- Question categories
- Multiplayer mode
- Advanced statistics
- Question difficulty adjustment based on performance

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For questions or support, please open an issue in the repository.
