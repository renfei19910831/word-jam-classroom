import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, BookOpen, PenTool } from 'lucide-react';

interface RoleSelectorProps {
  onSelectRole: (role: 'teacher' | 'student') => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelectRole }) => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      {/* 流光背景效果 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 主要流光 */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-l from-secondary/20 via-secondary/10 to-transparent rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_reverse]"></div>
        
        {/* 辅助流光 */}
        <div className="absolute top-1/4 -right-20 w-60 h-60 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent rounded-full blur-2xl animate-[float_10s_ease-in-out_infinite_alternate]"></div>
        <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-gradient-to-tr from-primary/15 via-primary/8 to-transparent rounded-full blur-2xl animate-[float_12s_ease-in-out_infinite_alternate-reverse]"></div>
        
        {/* 微光粒子 */}
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-xl animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-radial from-secondary/25 to-transparent rounded-full blur-lg animate-[pulse_6s_ease-in-out_infinite_alternate]"></div>
      </div>
      
      {/* 内容层 */}
      <div className="w-full max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-slide-up">
          <div className="flex flex-col items-center mb-8">
            <img 
              src="/lovable-uploads/d05ccbc2-63b0-4ad5-9b2d-7967e9568ac4.png" 
              alt="首都师范大学" 
              className="h-20 md:h-24 w-auto mb-6"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight">
            协作词云
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            实时协作的课堂词云工具，让师生互动更有趣
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mt-16">
          <Card className="bg-card border shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
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

          <Card className="bg-card border shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
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
          <p className="text-muted-foreground text-sm">
            无需注册，即开即用的课堂协作工具
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;