import React from 'react';
import ContentManagementSystem from '@/components/admin/ContentManagementSystem';

const ContentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <ContentManagementSystem token="" />
      </div>
    </div>
  );
};

export default ContentPage;
