import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import WordCloud from './WordCloud';
import { ArrowLeft, Send, User, Wifi } from 'lucide-react';
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

interface StudentInterfaceProps {
  onBack: () => void;
}

const StudentInterface: React.FC<StudentInterfaceProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [sessionCode, setSessionCode] = useState('');
  const [newWord, setNewWord] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [submittedWords, setSubmittedWords] = useState<string[]>([]);
  
  // 模拟词云数据
  const [words] = useState<Word[]>([
    {
      id: '1',
      text: '学习',
      size: 32,
      x: 25,
      y: 30,
      color: 'hsl(var(--education-blue))',
    },
    {
      id: '2',
      text: '创新',
      size: 28,
      x: 65,
      y: 45,
      color: 'hsl(var(--education-green))',
    },
    {
      id: '3',
      text: '协作',
      size: 24,
      x: 45,
      y: 65,
      color: 'hsl(var(--education-purple))',
    }
  ]);

  const handleConnect = () => {
    if (!username.trim() || !sessionCode.trim()) {
      toast({
        title: "连接失败",
        description: "请输入用户名和会话代码",
        variant: "destructive",
      });
      return;
    }

    if (sessionCode.toUpperCase() !== 'ABC123') {
      toast({
        title: "连接失败",
        description: "会话代码不正确",
        variant: "destructive",
      });
      return;
    }

    setIsConnected(true);
    toast({
      title: "连接成功！",
      description: `欢迎 ${username}，已连接到词云会话`,
    });
  };

  const handleSubmitWord = () => {
    if (!newWord.trim()) {
      toast({
        title: "提交失败",
        description: "请输入要添加的词语",
        variant: "destructive",
      });
      return;
    }

    if (submittedWords.includes(newWord.trim())) {
      toast({
        title: "提交失败",
        description: "您已经提交过这个词语了",
        variant: "destructive",
      });
      return;
    }

    setSubmittedWords(prev => [...prev, newWord.trim()]);
    setNewWord('');
    toast({
      title: "词语已提交！",
      description: `"${newWord.trim()}" 已添加到词云中`,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!isConnected) {
        handleConnect();
      } else {
        handleSubmitWord();
      }
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* 头部 */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              size="icon"
              onClick={onBack}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">学生端</h1>
              <p className="text-muted-foreground">参与词云创建，贡献你的想法</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 词云展示区 */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <Card className="shadow-elegant border-0 bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Wifi className={`w-5 h-5 ${isConnected ? 'text-education-green' : 'text-muted-foreground'}`} />
                  实时词云
                  {isConnected && (
                    <span className="text-sm font-normal text-muted-foreground">
                      - 已连接
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  {isConnected ? '查看所有同学提交的词语' : '连接后即可查看词云'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isConnected ? (
                  <>
                    <WordCloud words={words} interactive={false} />
                    <div className="mt-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        你已提交 <span className="font-semibold text-primary">{submittedWords.length}</span> 个词语
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="h-96 flex items-center justify-center bg-muted/30 rounded-lg">
                    <p className="text-muted-foreground">请先连接到会话以查看词云</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 操作区 */}
          <div className="order-1 lg:order-2">
            {!isConnected ? (
              /* 连接界面 */
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-education-blue" />
                    加入会话
                  </CardTitle>
                  <CardDescription>
                    输入你的信息连接到词云会话
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">用户名</Label>
                    <Input
                      id="username"
                      placeholder="输入你的姓名"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionCode">会话代码</Label>
                    <Input
                      id="sessionCode"
                      placeholder="输入老师提供的代码"
                      value={sessionCode}
                      onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
                      onKeyPress={handleKeyPress}
                    />
                    <p className="text-xs text-muted-foreground">
                      提示：试试 ABC123
                    </p>
                  </div>
                  <Button 
                    onClick={handleConnect} 
                    className="w-full" 
                    variant="hero"
                  >
                    连接会话
                  </Button>
                </CardContent>
              </Card>
            ) : (
              /* 提交词语界面 */
              <div className="space-y-6">
                <Card className="shadow-soft bg-gradient-card">
                  <CardHeader>
                    <CardTitle className="text-lg">提交词语</CardTitle>
                    <CardDescription>
                      添加你的想法到共同词云中
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newWord">新词语</Label>
                      <Input
                        id="newWord"
                        placeholder="输入一个词语..."
                        value={newWord}
                        onChange={(e) => setNewWord(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                    <Button 
                      onClick={handleSubmitWord} 
                      className="w-full" 
                      variant="success"
                      disabled={!newWord.trim()}
                    >
                      <Send className="w-4 h-4" />
                      提交词语
                    </Button>
                  </CardContent>
                </Card>

                {/* 已提交的词语 */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="text-lg">我的提交</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {submittedWords.length > 0 ? (
                      <div className="space-y-2">
                        {submittedWords.map((word, index) => (
                          <div key={index} className="bg-accent/50 px-3 py-2 rounded-md">
                            <span className="text-sm font-medium">{word}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-muted-foreground text-sm py-4">
                        还没有提交任何词语
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* 用户信息 */}
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <p className="font-medium">{username}</p>
                      <p className="text-xs text-muted-foreground">会话: {sessionCode}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInterface;