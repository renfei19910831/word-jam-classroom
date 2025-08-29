import React from 'react';

interface Word {
  id: string;
  text: string;
  size: number;
  x: number;
  y: number;
  color: string;
  submittedBy?: string;
}

interface WordCloudProps {
  words: Word[];
  onWordClick?: (word: Word) => void;
  interactive?: boolean;
}

const WordCloud: React.FC<WordCloudProps> = ({ words, onWordClick, interactive = false }) => {
  const colors = [
    'hsl(var(--education-blue))',
    'hsl(var(--education-green))',
    'hsl(var(--education-purple))',
    'hsl(var(--education-blue-light))',
    'hsl(var(--education-green-light))',
  ];

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const generateWordLayout = (words: Word[]) => {
    return words.map((word, index) => ({
      ...word,
      x: Math.random() * 80 + 10, // 10-90% of container width
      y: Math.random() * 80 + 10, // 10-90% of container height
      size: Math.max(12, Math.min(48, word.text.length * 2 + Math.random() * 20)),
      color: word.color || getRandomColor(),
    }));
  };

  const layoutedWords = React.useMemo(() => generateWordLayout(words), [words]);

  return (
    <div className="relative w-full h-96 bg-gradient-card rounded-xl overflow-hidden shadow-soft border border-border">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
      {layoutedWords.map((word) => (
        <div
          key={word.id}
          className={`absolute transition-all duration-500 hover:scale-110 ${
            interactive ? 'cursor-pointer' : ''
          }`}
          style={{
            left: `${word.x}%`,
            top: `${word.y}%`,
            fontSize: `${word.size}px`,
            color: word.color,
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => interactive && onWordClick && onWordClick(word)}
        >
          {word.text}
        </div>
      ))}
      {words.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground text-lg">词云将在这里显示...</p>
        </div>
      )}
    </div>
  );
};

export default WordCloud;