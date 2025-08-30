import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import WordCloud from './WordCloud';
import { ArrowLeft, Download, RefreshCw, Trash2, Users, Eye, Maximize, Minimize, Heart, Circle, Star, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Word {
  id: string;
  text: string;
  size: number;
  x: number;
  y: number;
  color: string;
  submittedBy?: string;
}

interface TeacherDashboardProps {
  onBack: () => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [sessionCode] = useState('ABC123'); // 模拟会话代码
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wordCloudShape, setWordCloudShape] = useState<'random' | 'heart' | 'circle' | 'star' | 'logo'>('random');
  const [words, setWords] = useState<Word[]>([
    {
      id: '1',
      text: '学习',
      size: 32,
      x: 25,
      y: 30,
      color: 'hsl(var(--education-blue))',
      submittedBy: '张三'
    },
    {
      id: '2',
      text: '创新',
      size: 28,
      x: 65,
      y: 45,
      color: 'hsl(var(--education-green))',
      submittedBy: '李四'
    },
    {
      id: '3',
      text: '协作',
      size: 24,
      x: 45,
      y: 65,
      color: 'hsl(var(--education-purple))',
      submittedBy: '王五'
    }
  ]);

  const [connectedStudents] = useState([
    { id: '1', name: '张三', connected: true },
    { id: '2', name: '李四', connected: true },
    { id: '3', name: '王五', connected: false },
  ]);

  const handleDeleteWord = (wordId: string) => {
    setWords(prev => prev.filter(word => word.id !== wordId));
    toast({
      title: "词语已删除",
      description: "该词语已从词云中移除",
    });
  };

  const handleRefresh = () => {
    toast({
      title: "词云已刷新",
      description: "最新的词语已加载",
    });
  };

  const handleExport = () => {
    toast({
      title: "导出成功",
      description: "词云数据已导出到文件",
    });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    toast({
      title: isFullscreen ? "退出全屏" : "进入全屏",
      description: isFullscreen ? "词云已恢复正常显示" : "词云已全屏显示",
    });
  };

  const handleShapeChange = (shape: 'random' | 'heart' | 'circle' | 'star' | 'logo') => {
    setWordCloudShape(shape);
    toast({
      title: "形状已更改",
      description: `词云形状已切换为${shape === 'random' ? '随机' : shape === 'heart' ? '爱心' : shape === 'circle' ? '圆形' : shape === 'star' ? '星形' : '校徽'}`,
    });
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background p-4">
        <div className="h-full flex flex-col">
          {/* 全屏头部控制 */}
          <div className="flex items-center justify-between mb-4 bg-card/50 backdrop-blur-sm rounded-lg p-4 shadow-soft">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-foreground">词云全屏展示</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">形状:</span>
                <div className="flex gap-1">
                  <Button
                    variant={wordCloudShape === 'random' ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleShapeChange('random')}
                  >
                    随机
                  </Button>
                  <Button
                    variant={wordCloudShape === 'heart' ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleShapeChange('heart')}
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={wordCloudShape === 'circle' ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleShapeChange('circle')}
                  >
                    <Circle className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={wordCloudShape === 'star' ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleShapeChange('star')}
                  >
                    <Star className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={wordCloudShape === 'logo' ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleShapeChange('logo')}
                  >
                    <Building className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={toggleFullscreen}>
              <Minimize className="w-4 h-4" />
              退出全屏
            </Button>
          </div>
          
          {/* 全屏词云 */}
          <div className="flex-1">
            <WordCloud 
              words={words} 
              interactive={false}
              blurred={false}
              isTeacher={true}
              shape={wordCloudShape}
              fullscreen={true}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* 头部 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon"
                onClick={onBack}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">老师控制台</h1>
                <p className="text-muted-foreground">管理和查看实时词云</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">会话代码</p>
                <p className="text-2xl font-bold text-primary">{sessionCode}</p>
              </div>
              <Button variant="hero" onClick={handleRefresh}>
                <RefreshCw className="w-4 h-4" />
                刷新
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 词云展示区 */}
          <div className="lg:col-span-2">
            <Card className="shadow-elegant border-0 bg-gradient-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">实时词云</CardTitle>
                    <CardDescription>学生提交的词语实时展示</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1 mr-2">
                      <span className="text-xs text-muted-foreground">形状:</span>
                      <Button
                        variant={wordCloudShape === 'random' ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleShapeChange('random')}
                      >
                        随机
                      </Button>
                      <Button
                        variant={wordCloudShape === 'heart' ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleShapeChange('heart')}
                      >
                        <Heart className="w-3 h-3" />
                      </Button>
                      <Button
                        variant={wordCloudShape === 'circle' ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleShapeChange('circle')}
                      >
                        <Circle className="w-3 h-3" />
                      </Button>
                      <Button
                        variant={wordCloudShape === 'star' ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleShapeChange('star')}
                      >
                        <Star className="w-3 h-3" />
                      </Button>
                      <Button
                        variant={wordCloudShape === 'logo' ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleShapeChange('logo')}
                      >
                        <Building className="w-3 h-3" />
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                      <Maximize className="w-4 h-4" />
                      全屏
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExport}>
                      <Download className="w-4 h-4" />
                      导出
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <WordCloud 
                  words={words} 
                  interactive={false}
                  blurred={false}
                  isTeacher={true}
                  shape={wordCloudShape}
                  fullscreen={false}
                />
                <div className="mt-4 text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    当前词语数量: <span className="font-semibold text-primary">{words.length}</span>
                  </p>
                  <div className="flex justify-center items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-education-blue rounded-full"></div>
                      学习类
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-education-green rounded-full"></div>
                      创新类
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-education-purple rounded-full"></div>
                      协作类
                    </span>
                  </div>
                  <p className="text-xs text-education-blue">
                    💡 当前形状: {wordCloudShape === 'random' ? '随机分布' : wordCloudShape === 'heart' ? '爱心形状' : wordCloudShape === 'circle' ? '圆形分布' : wordCloudShape === 'star' ? '星形分布' : '校徽形状'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 侧边控制区 */}
          <div className="space-y-6">
            {/* 在线学生 */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-education-green" />
                  在线学生
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {connectedStudents.map(student => (
                  <div key={student.id} className="flex items-center justify-between">
                    <span className="text-sm">{student.name}</span>
                    <Badge 
                      variant={student.connected ? "default" : "secondary"}
                      className={student.connected ? "bg-education-green" : ""}
                    >
                      {student.connected ? "在线" : "离线"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 词语管理 */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-education-blue" />
                  词语管理
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {words.map(word => (
                    <div key={word.id} className="flex items-center justify-between p-2 rounded-lg bg-accent/50">
                      <div>
                        <p className="font-medium text-sm">{word.text}</p>
                        <p className="text-xs text-muted-foreground">
                          提交者: {word.submittedBy}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteWord(word.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
                {words.length === 0 && (
                  <p className="text-center text-muted-foreground text-sm py-8">
                    暂无词语提交
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;