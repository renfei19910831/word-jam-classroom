import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, BookOpen, PenTool } from 'lucide-react';

interface RoleSelectorProps {
  onSelectRole: (role: 'teacher' | 'student') => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-card rounded-full shadow-glow mb-6 animate-float">
            <BookOpen className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            协作词云
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            实时协作的课堂词云工具，让师生互动更有趣
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <Card className="bg-card/95 backdrop-blur-sm shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 border-0">
            <CardHeader className="text-center pb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mx-auto mb-4 shadow-soft">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-foreground">老师端</CardTitle>
              <CardDescription className="text-muted-foreground">
                创建和管理词云，查看学生提交的内容
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-muted-foreground mb-6 space-y-2">
                <li>• 实时查看词云效果</li>
                <li>• 管理学生提交的词语</li>
                <li>• 控制词云展示</li>
              </ul>
              <Button 
                onClick={() => onSelectRole('teacher')} 
                className="w-full bg-gradient-primary hover:shadow-elegant transition-all duration-300"
                size="lg"
              >
                进入老师端
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/95 backdrop-blur-sm shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105 border-0">
            <CardHeader className="text-center pb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-secondary rounded-full mx-auto mb-4 shadow-soft">
                <PenTool className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-foreground">学生端</CardTitle>
              <CardDescription className="text-muted-foreground">
                提交词语，参与课堂互动
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-sm text-muted-foreground mb-6 space-y-2">
                <li>• 输入自定义用户名</li>
                <li>• 提交词语到词云</li>
                <li>• 实时查看词云更新</li>
              </ul>
              <Button 
                onClick={() => onSelectRole('student')} 
                className="w-full bg-gradient-secondary hover:shadow-elegant transition-all duration-300"
                size="lg"
              >
                进入学生端
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-white/60 text-sm">
            无需注册，即开即用的课堂协作工具
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;