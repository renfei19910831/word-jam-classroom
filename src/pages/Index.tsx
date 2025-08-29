import React, { useState } from 'react';
import RoleSelector from '@/components/RoleSelector';
import TeacherDashboard from '@/components/TeacherDashboard';
import StudentInterface from '@/components/StudentInterface';

type AppState = 'selector' | 'teacher' | 'student';

const Index = () => {
  const [currentView, setCurrentView] = useState<AppState>('selector');

  const handleSelectRole = (role: 'teacher' | 'student') => {
    setCurrentView(role);
  };

  const handleBack = () => {
    setCurrentView('selector');
  };

  switch (currentView) {
    case 'teacher':
      return <TeacherDashboard onBack={handleBack} />;
    case 'student':
      return <StudentInterface onBack={handleBack} />;
    default:
      return <RoleSelector onSelectRole={handleSelectRole} />;
  }
};

export default Index;
