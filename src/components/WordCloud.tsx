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
  shape?: 'random' | 'heart' | 'circle' | 'star' | 'logo';
  fullscreen?: boolean;
}

const WordCloud: React.FC<WordCloudProps> = ({ 
  words, 
  onWordClick, 
  interactive = false, 
  blurred = false,
  isTeacher = false,
  shape = 'random',
  fullscreen = false
}) => {
  const colors = [
    'hsl(var(--education-blue))',
    'hsl(var(--education-green))',
    'hsl(var(--education-purple))',
    'hsl(var(--education-blue-light))',
    'hsl(var(--education-green-light))',
  ];

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  // Shape generation functions
  const getShapePoints = (shape: string, count: number) => {
    const points: { x: number; y: number }[] = [];
    
    switch (shape) {
      case 'heart':
        for (let i = 0; i < count; i++) {
          const t = (i / count) * 2 * Math.PI;
          const x = 16 * Math.pow(Math.sin(t), 3);
          const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
          points.push({
            x: 50 + (x * 1.5), // Center and scale
            y: 50 + (y * 1.2)
          });
        }
        break;
        
      case 'circle':
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * 2 * Math.PI;
          const radius = 25 + Math.random() * 15; // Varying radius
          points.push({
            x: 50 + radius * Math.cos(angle),
            y: 50 + radius * Math.sin(angle)
          });
        }
        break;
        
      case 'star':
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * 2 * Math.PI;
          const isOuter = i % 2 === 0;
          const radius = isOuter ? 30 : 15;
          points.push({
            x: 50 + radius * Math.cos(angle),
            y: 50 + radius * Math.sin(angle)
          });
        }
        break;
        
      case 'logo':
        // 简单的学校建筑轮廓
        const logoPoints = [
          { x: 30, y: 70 }, { x: 35, y: 60 }, { x: 40, y: 50 },
          { x: 45, y: 40 }, { x: 50, y: 30 }, { x: 55, y: 40 },
          { x: 60, y: 50 }, { x: 65, y: 60 }, { x: 70, y: 70 },
          { x: 25, y: 65 }, { x: 75, y: 65 }, { x: 35, y: 75 },
          { x: 45, y: 75 }, { x: 55, y: 75 }, { x: 65, y: 75 }
        ];
        for (let i = 0; i < count; i++) {
          const basePoint = logoPoints[i % logoPoints.length];
          points.push({
            x: basePoint.x + (Math.random() - 0.5) * 8,
            y: basePoint.y + (Math.random() - 0.5) * 8
          });
        }
        break;
        
      default: // random
        for (let i = 0; i < count; i++) {
          points.push({
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10
          });
        }
    }
    
    return points;
  };

  const generateWordLayout = (words: Word[]) => {
    const shapePoints = getShapePoints(shape, words.length);
    
    return words.map((word, index) => {
      const point = shapePoints[index] || { x: 50, y: 50 };
      return {
        ...word,
        x: Math.max(5, Math.min(95, point.x)), // Ensure within bounds
        y: Math.max(5, Math.min(95, point.y)),
        size: Math.max(12, Math.min(48, word.text.length * 2 + Math.random() * 20)),
        color: word.color || getRandomColor(),
      };
    });
  };

  const layoutedWords = React.useMemo(() => generateWordLayout(words), [words, shape]);

  return (
    <div className={`relative w-full bg-gradient-card rounded-xl overflow-hidden shadow-soft border border-border ${
      fullscreen ? 'h-screen' : 'h-96'
    }`}>
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
          {fullscreen && (
            <>
              <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-education-blue/20 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
              <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-education-green/20 rounded-full animate-float" style={{ animationDelay: '2.5s' }} />
            </>
          )}
        </>
      )}
      
      {/* 形状指示线（仅在教师端显示） */}
      {isTeacher && shape !== 'random' && (
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="pointer-events-none">
            {shape === 'heart' && (
              <path
                d="M50,30 C50,25 40,20 35,25 C30,30 50,50 50,50 C50,50 70,30 65,25 C60,20 50,25 50,30 Z"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                className="animate-pulse-soft"
                transform="scale(0.8) translate(10, 10)"
              />
            )}
            {shape === 'circle' && (
              <circle
                cx="50%"
                cy="50%"
                r="25%"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                className="animate-pulse-soft"
              />
            )}
          </svg>
        </div>
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
              fontSize: `${fullscreen ? word.size * 1.5 : word.size}px`,
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