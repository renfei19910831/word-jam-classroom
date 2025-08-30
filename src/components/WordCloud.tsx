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
  blurred?: boolean;
  isTeacher?: boolean;
}

const WordCloud: React.FC<WordCloudProps> = ({ 
  words, 
  onWordClick, 
  interactive = false, 
  blurred = false,
  isTeacher = false 
}) => {
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
      {/* 背景动画效果 */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-tl from-primary/10 via-transparent to-secondary/10 animate-pulse-soft" />
      
      {/* 浮动粒子背景 */}
      {isTeacher && (
        <>
          <div className="absolute top-4 left-4 w-2 h-2 bg-education-blue/30 rounded-full animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-16 right-8 w-1.5 h-1.5 bg-education-green/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-12 left-12 w-2.5 h-2.5 bg-education-purple/30 rounded-full animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-6 right-6 w-1 h-1 bg-primary/40 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
        </>
      )}
      
      {/* 词云内容 */}
      <div className={`relative w-full h-full transition-all duration-1000 ${
        blurred ? 'blur-sm hover:blur-none' : ''
      }`}>
        {layoutedWords.map((word, index) => (
          <div
            key={word.id}
            className={`absolute transition-all duration-700 hover:scale-110 ${
              interactive ? 'cursor-pointer' : ''
            } animate-slide-up`}
            style={{
              left: `${word.x}%`,
              top: `${word.y}%`,
              fontSize: `${word.size}px`,
              color: word.color,
              fontWeight: 'bold',
              textShadow: isTeacher 
                ? '3px 3px 8px rgba(0,0,0,0.2), 0 0 20px rgba(var(--primary-glow), 0.3)' 
                : '2px 2px 4px rgba(0,0,0,0.1)',
              transform: 'translate(-50%, -50%)',
              animationDelay: `${index * 0.1}s`,
              filter: isTeacher ? 'drop-shadow(0 0 8px rgba(var(--primary), 0.3))' : 'none',
            }}
            onClick={() => interactive && onWordClick && onWordClick(word)}
          >
            {word.text}
          </div>
        ))}
      </div>
      
      {/* 模糊提示层（仅学生端） */}
      {blurred && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-background/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-elegant">
            <p className="text-sm text-muted-foreground text-center">
              悬停查看词云，专注思考你的词语
            </p>
          </div>
        </div>
      )}
      
      {words.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center animate-pulse-soft">
              <div className="w-8 h-8 bg-white/20 rounded-full"></div>
            </div>
            <p className="text-muted-foreground text-lg">词云将在这里显示...</p>
            <p className="text-xs text-muted-foreground">等待学生提交词语</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordCloud;