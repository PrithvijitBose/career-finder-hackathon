import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CSECareerMapping from '../Courses/ComputerScience'; // Your existing CSE component
import MechanicalEngineerMapping from '../Courses/MechanicalEngineer';

// Import other career mapping components as you create them
// import MechanicalCareerMapping from './MechanicalCareerMapping';
// import MBBSCareerMapping from './MBBSCareerMapping';

interface CareerMappingRouterProps {}

const CareerMappingRouter: React.FC<CareerMappingRouterProps> = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const handleBackToCourses = () => {
    navigate('/courses');
  };

  const renderCareerMapping = () => {
    switch (courseId) {
      case 'computer-science':
        return <CSECareerMapping />;
      
      // Add more cases as you create career mappings for other courses
      case 'mechanical-engineering':
        return <MechanicalEngineerMapping/>

      case 'mbbs':
        return (
          <div className="max-w-4xl mx-auto p-6 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
              <AlertCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                MBBS Career Mapping
              </h2>
              <p className="text-gray-600 mb-6">
                Medical career guidance is under development!
              </p>
              <Button onClick={handleBackToCourses} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course Explorer
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="max-w-4xl mx-auto p-6 text-center">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Career Mapping Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                We couldn't find career mapping for "{courseId}". Please check back soon as we're adding more courses!
              </p>
              <Button onClick={handleBackToCourses} className="bg-indigo-600 hover:bg-indigo-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course Explorer
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back button - only show for CSE since it doesn't have its own back button */}
      {courseId === 'computer-science' && (
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Button 
              onClick={handleBackToCourses}
              variant="ghost" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Course Explorer
            </Button>
          </div>
        </div>
      )}
      
      {/* Render the appropriate career mapping component */}
      {renderCareerMapping()}
    </div>
  );
};

export default CareerMappingRouter;