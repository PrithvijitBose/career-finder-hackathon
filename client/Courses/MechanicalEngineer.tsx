import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Building2, GraduationCap, Briefcase, TrendingUp, Award, Globe, Users, Cog, Wrench, Factory, Zap } from 'lucide-react';

interface CareerPath {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  salaryRange: string;
  growthRate: string;
  skills: string[];
  examples: string[];
}

interface PathCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  paths: CareerPath[];
}

const MechanicalEngineerMapping: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('govt-exams');
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);

  const careerCategories: PathCategory[] = [
    {
      id: 'govt-exams',
      title: 'Government Exams & PSU Jobs',
      icon: <Building2 className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      paths: [
        {
          id: 'gate-psu',
          title: 'GATE → M.Tech / PSU Jobs',
          description: 'Graduate Aptitude Test for admission to M.Tech and PSU recruitment',
          icon: <Award className="w-5 h-5" />,
          salaryRange: '₹35K - ₹1.2L per month',
          growthRate: 'High job security with steady progression',
          skills: ['Engineering Mathematics', 'Thermodynamics', 'Fluid Mechanics', 'Machine Design'],
          examples: ['BHEL Engineer', 'ONGC Mechanical Engineer', 'NTPC Executive', 'ISRO Scientist']
        },
        {
          id: 'upsc-mechanical',
          title: 'UPSC → IAS / IES (Mechanical)',
          description: 'Civil services and Indian Engineering Services with Mechanical optional',
          icon: <Award className="w-5 h-5" />,
          salaryRange: '₹56K - ₹2.5L per month',
          growthRate: 'Prestigious roles with lifetime security',
          skills: ['General Studies', 'Mechanical Engineering Optional', 'Current Affairs'],
          examples: ['IAS Officer', 'IES (Mechanical)', 'Central Government Engineer', 'District Collector']
        },
        {
          id: 'ssc-je',
          title: 'SSC JE / State PSC',
          description: 'Junior Engineer positions in central and state governments',
          icon: <Cog className="w-5 h-5" />,
          salaryRange: '₹25K - ₹65K per month',
          growthRate: 'Regular promotions with job security',
          skills: ['Technical Knowledge', 'General Awareness', 'Quantitative Aptitude'],
          examples: ['Junior Engineer (PWD)', 'AEE (State Govt)', 'Technical Assistant', 'Project Engineer']
        },
        {
          id: 'defence-railways',
          title: 'Railways / Defence Technical Entry',
          description: 'Technical positions in Indian Railways and Defence organizations',
          icon: <Factory className="w-5 h-5" />,
          salaryRange: '₹30K - ₹85K per month',
          growthRate: 'Excellent growth opportunities with benefits',
          skills: ['Technical Aptitude', 'General Intelligence', 'Mechanical Concepts'],
          examples: ['Railway Engineer', 'Indian Army (Technical)', 'Navy Engineer', 'Air Force Technical Officer']
        }
      ]
    },
    {
      id: 'private-jobs',
      title: 'Private Sector Opportunities',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      paths: [
        {
          id: 'core-automotive',
          title: 'Core Automotive Companies',
          description: 'Design, manufacturing, and R&D roles in automotive industry',
          icon: <Cog className="w-5 h-5" />,
          salaryRange: '₹3.5L - ₹20L per annum',
          growthRate: 'High - Senior engineer in 5-8 years',
          skills: ['AutoCAD', 'SolidWorks', 'Manufacturing Processes', 'Quality Control'],
          examples: ['Design Engineer at Tata Motors', 'Production Engineer at Mahindra', 'R&D Engineer at Maruti', 'Quality Engineer at Bajaj']
        },
        {
          id: 'aerospace',
          title: 'Aerospace & Heavy Machinery',
          description: 'Aircraft design, space technology, and heavy industrial equipment',
          icon: <Zap className="w-5 h-5" />,
          salaryRange: '₹4L - ₹25L per annum',
          growthRate: 'Very High - Specialized and high-demand field',
          skills: ['CATIA', 'Aerospace Materials', 'Flight Dynamics', 'Project Management'],
          examples: ['Design Engineer at HAL', 'Systems Engineer at Boeing', 'Project Engineer at L&T', 'R&D at Cummins']
        },
        {
          id: 'design-simulation',
          title: 'Design & Simulation (CAD/CAM, Robotics)',
          description: 'Computer-aided design, robotics, and automation systems',
          icon: <Wrench className="w-5 h-5" />,
          salaryRange: '₹4L - ₹18L per annum',
          growthRate: 'High - Technology-driven growth',
          skills: ['SOLIDWORKS', 'ANSYS', 'MATLAB', 'Robotics Programming', 'Automation'],
          examples: ['CAD Engineer', 'Simulation Analyst', 'Robotics Engineer', 'Automation Consultant']
        },
        {
          id: 'energy-sector',
          title: 'Energy Sector (Oil, Gas, Power, Renewables)',
          description: 'Traditional and renewable energy systems, HVAC, power generation',
          icon: <Zap className="w-5 h-5" />,
          salaryRange: '₹4.5L - ₹30L per annum',
          growthRate: 'Very High - Growing renewable energy sector',
          skills: ['Thermodynamics', 'Heat Transfer', 'Power Systems', 'Renewable Energy'],
          examples: ['Power Plant Engineer', 'HVAC Design Engineer', 'Solar Project Engineer', 'Oil & Gas Engineer']
        }
      ]
    },
    {
      id: 'entrepreneurship',
      title: 'Entrepreneurship & Startups',
      icon: <Globe className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      paths: [
        {
          id: 'robotics-startup',
          title: 'Robotics / Automation Startups',
          description: 'Building robotics solutions and automation systems',
          icon: <Wrench className="w-5 h-5" />,
          salaryRange: 'Variable - ₹0 to Unlimited',
          growthRate: 'High potential in Industry 4.0',
          skills: ['Robotics', 'Programming', 'Business Development', 'IoT'],
          examples: ['Industrial Automation', 'Service Robotics', 'Agricultural Robotics', 'Healthcare Automation']
        },
        {
          id: 'manufacturing-units',
          title: 'Automotive Garages / Manufacturing Units',
          description: 'Setting up manufacturing, repair, or service businesses',
          icon: <Factory className="w-5 h-5" />,
          salaryRange: '₹2L - ₹15L per annum',
          growthRate: 'Moderate - Dependent on market and scale',
          skills: ['Business Management', 'Technical Expertise', 'Customer Relations'],
          examples: ['Auto Service Center', 'Component Manufacturing', 'Machine Shop', 'Technical Consultancy']
        },
        {
          id: 'cad-consulting',
          title: 'CAD Consulting / Technical Training',
          description: 'Freelance design services and technical training institutes',
          icon: <Users className="w-5 h-5" />,
          salaryRange: '₹3L - ₹12L per annum',
          growthRate: 'Flexible - Skill and network dependent',
          skills: ['Advanced CAD', 'Training & Development', 'Client Management'],
          examples: ['Design Consultant', 'CAD Training Institute', 'Technical Content Creator', 'Engineering Consultant']
        }
      ]
    },
    {
      id: 'higher-studies',
      title: 'Higher Education Paths',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      paths: [
        {
          id: 'mtech-specialization',
          title: 'M.Tech Specializations',
          description: 'Advanced technical education in specialized mechanical fields',
          icon: <GraduationCap className="w-5 h-5" />,
          salaryRange: '₹5L - ₹22L starting salary',
          growthRate: 'Higher starting salary, research opportunities',
          skills: ['Research Methodology', 'Advanced Technical Knowledge', 'Specialization Expertise'],
          examples: ['Thermal Engineering', 'Robotics & Automation', 'Automotive Engineering', 'Manufacturing Technology']
        },
        {
          id: 'ms-abroad',
          title: 'MS Abroad (Aerospace, Energy, Mechatronics)',
          description: 'International education for global opportunities in specialized fields',
          icon: <Globe className="w-5 h-5" />,
          salaryRange: '$65K - $120K per annum',
          growthRate: 'International career opportunities',
          skills: ['GRE/GMAT', 'Research', 'Advanced Mechanical Systems'],
          examples: ['Aerospace Engineer (NASA/SpaceX)', 'Energy Systems Engineer', 'Mechatronics Specialist', 'Automotive R&D']
        },
        {
          id: 'mba-operations',
          title: 'MBA (Operations, Supply Chain)',
          description: 'Management education with technical background advantage',
          icon: <TrendingUp className="w-5 h-5" />,
          salaryRange: '₹8L - ₹45L per annum',
          growthRate: 'Fast track to leadership positions',
          skills: ['Operations Management', 'Supply Chain', 'Leadership', 'Strategy'],
          examples: ['Operations Manager', 'Plant Head', 'Supply Chain Manager', 'Business Consultant']
        },
        {
          id: 'certifications',
          title: 'Professional Certifications',
          description: 'Industry certifications to enhance career prospects',
          icon: <Award className="w-5 h-5" />,
          salaryRange: '₹4L - ₹18L per annum (with experience)',
          growthRate: 'Skill-based advancement opportunities',
          skills: ['Specialized Software', 'Quality Management', 'Project Management'],
          examples: ['Six Sigma Black Belt', 'PMP Certified', 'HVAC Design Expert', 'CAD Specialist Certification']
        }
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setSelectedPath(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Mechanical Engineering
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Explore comprehensive career paths after your Mechanical Engineering degree
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Your Degree Options</h3>
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-lg mb-2">
                <GraduationCap className="w-8 h-8 text-blue-600 mx-auto" />
              </div>
              <p className="font-semibold">3-Year Diploma</p>
              <p className="text-sm text-gray-600">Mechanical Engineering</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-lg mb-2">
                <GraduationCap className="w-8 h-8 text-green-600 mx-auto" />
              </div>
              <p className="font-semibold">4-Year B.Tech</p>
              <p className="text-sm text-gray-600">Mechanical Engineering</p>
            </div>
          </div>
        </div>
      </div>

      {/* Career Path Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Panel - Categories */}
        <div className="space-y-4">
          {careerCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleCategory(category.id)}
                className={`w-full p-4 text-left bg-gradient-to-r ${category.color} text-white hover:opacity-90 transition-opacity`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {category.icon}
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                  </div>
                  {expandedCategory === category.id ? 
                    <ChevronDown className="w-5 h-5" /> : 
                    <ChevronRight className="w-5 h-5" />
                  }
                </div>
              </button>
              
              {expandedCategory === category.id && (
                <div className="p-4 space-y-3">
                  {category.paths.map((path) => (
                    <button
                      key={path.id}
                      onClick={() => setSelectedPath(path)}
                      className={`w-full p-3 text-left rounded-lg border-2 transition-all ${
                        selectedPath?.id === path.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-gray-600 mt-1">{path.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{path.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{path.description}</p>
                          <p className="text-sm font-medium text-green-600 mt-2">{path.salaryRange}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Panel - Detailed Path Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {selectedPath ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-blue-600">{selectedPath.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800">{selectedPath.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-6">{selectedPath.description}</p>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">💰 Salary Range</h4>
                  <p className="text-green-700">{selectedPath.salaryRange}</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">📈 Growth Prospects</h4>
                  <p className="text-blue-700">{selectedPath.growthRate}</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">🎯 Key Skills Required</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPath.skills.map((skill, index) => (
                      <span key={index} className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">🏢 Career Examples</h4>
                  <ul className="list-disc list-inside text-orange-700 space-y-1">
                    {selectedPath.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">📚 Next Steps</h4>
                <p className="text-gray-600 text-sm">
                  Ready to pursue this path? We'll help you find the best colleges, prepare for entrance exams, 
                  and connect with mentors in this field. Click "Get Started" to create your personalized roadmap.
                </p>
                <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Get Started with {selectedPath.title}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Cog className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Select a Career Path
              </h3>
              <p className="text-gray-500">
                Choose any career option from the left panel to see detailed information, 
                salary ranges, required skills, and next steps.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-center mb-6">Mechanical Engineering Career Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">78%</div>
            <div className="text-sm text-gray-600">Job Placement Rate</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">₹4.2L</div>
            <div className="text-sm text-gray-600">Average Starting Salary</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">12+</div>
            <div className="text-sm text-gray-600">Major Industries</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">85%</div>
            <div className="text-sm text-gray-600">Industry Demand Growth</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MechanicalEngineerMapping;