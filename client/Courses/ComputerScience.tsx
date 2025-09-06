import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Building2, GraduationCap, Briefcase, TrendingUp, Award, Globe, Users, Code, Database, Shield, Cpu } from 'lucide-react';

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

const CSECareerMapping: React.FC = () => {
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
          id: 'upsc-ias',
          title: 'UPSC (IAS/IPS/IFS)',
          description: 'Civil services for administrative roles in government',
          icon: <Award className="w-5 h-5" />,
          salaryRange: '₹56K - ₹2.5L per month',
          growthRate: 'High job security, lifetime growth',
          skills: ['General Studies', 'Current Affairs', 'Optional Subject'],
          examples: ['District Collector', 'IPS Officer', 'Foreign Service Officer']
        },
        {
          id: 'gate',
          title: 'GATE → PSU Jobs',
          description: 'Technical positions in Public Sector Undertakings',
          icon: <Cpu className="w-5 h-5" />,
          salaryRange: '₹40K - ₹1.2L per month',
          growthRate: 'Steady progression with job security',
          skills: ['Engineering Aptitude', 'Technical Knowledge', 'Problem Solving'],
          examples: ['BHEL Engineer', 'ONGC Systems Analyst', 'ISRO Scientist']
        },
        {
          id: 'ssc-cgl',
          title: 'SSC CGL/CHSL',
          description: 'Central government clerical and officer positions',
          icon: <Users className="w-5 h-5" />,
          salaryRange: '₹25K - ₹78K per month',
          growthRate: 'Regular promotions with security',
          skills: ['Quantitative Aptitude', 'English', 'General Awareness'],
          examples: ['Income Tax Officer', 'Audit Officer', 'Statistical Officer']
        },
        {
          id: 'banking',
          title: 'Banking Exams (SBI PO, IBPS)',
          description: 'Officer positions in public sector banks',
          icon: <TrendingUp className="w-5 h-5" />,
          salaryRange: '₹35K - ₹85K per month',
          growthRate: 'Fast track to management roles',
          skills: ['Banking Awareness', 'Quantitative Aptitude', 'Reasoning'],
          examples: ['Bank PO', 'Specialist Officer (IT)', 'Branch Manager']
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
          id: 'software-dev',
          title: 'Software Development',
          description: 'Full-stack, backend, frontend, mobile app development',
          icon: <Code className="w-5 h-5" />,
          salaryRange: '₹3.5L - ₹25L per annum',
          growthRate: 'Very High - Senior dev in 5-7 years',
          skills: ['Programming Languages', 'Frameworks', 'Database Management'],
          examples: ['Software Engineer at TCS/Infosys', 'Full Stack Developer', 'Mobile App Developer']
        },
        {
          id: 'data-science',
          title: 'Data Science & Analytics',
          description: 'Big data analysis, machine learning, AI development',
          icon: <Database className="w-5 h-5" />,
          salaryRange: '₹4L - ₹35L per annum',
          growthRate: 'Exponential - High demand field',
          skills: ['Python/R', 'Machine Learning', 'Statistics', 'SQL'],
          examples: ['Data Scientist', 'ML Engineer', 'Business Analyst']
        },
        {
          id: 'cybersecurity',
          title: 'Cybersecurity Specialist',
          description: 'Information security, ethical hacking, security analysis',
          icon: <Shield className="w-5 h-5" />,
          salaryRange: '₹4.5L - ₹30L per annum',
          growthRate: 'Very High - Critical skill shortage',
          skills: ['Network Security', 'Ethical Hacking', 'Risk Assessment'],
          examples: ['Security Analyst', 'Penetration Tester', 'Security Architect']
        },
        {
          id: 'product-management',
          title: 'Product Management',
          description: 'Managing software products, user experience, strategy',
          icon: <TrendingUp className="w-5 h-5" />,
          salaryRange: '₹6L - ₹45L per annum',
          growthRate: 'High - Path to executive roles',
          skills: ['Product Strategy', 'User Research', 'Analytics', 'Communication'],
          examples: ['Product Manager', 'Product Owner', 'Growth Manager']
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
          id: 'tech-startup',
          title: 'Tech Startup Founder',
          description: 'Building your own technology company or app',
          icon: <Code className="w-5 h-5" />,
          salaryRange: 'Variable - ₹0 to Unlimited',
          growthRate: 'High risk, High reward',
          skills: ['Technical Skills', 'Business Acumen', 'Leadership', 'Networking'],
          examples: ['SaaS Product', 'Mobile App Startup', 'E-commerce Platform']
        },
        {
          id: 'freelancing',
          title: 'Freelance Developer',
          description: 'Independent software development projects',
          icon: <Users className="w-5 h-5" />,
          salaryRange: '₹2L - ₹15L per annum',
          growthRate: 'Flexible - Skill & network dependent',
          skills: ['Programming', 'Client Management', 'Time Management'],
          examples: ['Web Development', 'App Development', 'Consulting']
        },
        {
          id: 'digital-agency',
          title: 'Digital Marketing Agency',
          description: 'Combining tech skills with marketing services',
          icon: <Globe className="w-5 h-5" />,
          salaryRange: '₹3L - ₹20L per annum',
          growthRate: 'Moderate to High',
          skills: ['Digital Marketing', 'Web Technologies', 'Analytics'],
          examples: ['SEO Services', 'Social Media Management', 'Website Development']
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
          id: 'mtech',
          title: 'M.Tech Specializations',
          description: 'Advanced technical education in specialized fields',
          icon: <GraduationCap className="w-5 h-5" />,
          salaryRange: '₹5L - ₹20L starting salary',
          growthRate: 'Higher starting salary, research opportunities',
          skills: ['Research Methodology', 'Advanced Technical Knowledge'],
          examples: ['AI/ML Specialization', 'Cybersecurity', 'Data Science', 'Robotics']
        },
        {
          id: 'mba',
          title: 'MBA (Tech Background)',
          description: 'Management education with technical foundation',
          icon: <TrendingUp className="w-5 h-5" />,
          salaryRange: '₹8L - ₹50L per annum',
          growthRate: 'Fast track to leadership positions',
          skills: ['Business Strategy', 'Leadership', 'Finance', 'Operations'],
          examples: ['Product Manager', 'Technical Consultant', 'Business Analyst']
        },
        {
          id: 'ms-abroad',
          title: 'MS Abroad',
          description: 'International education for global opportunities',
          icon: <Globe className="w-5 h-5" />,
          salaryRange: '$60K - $150K per annum',
          growthRate: 'International career opportunities',
          skills: ['GRE/GMAT', 'Research', 'Advanced Technical Skills'],
          examples: ['Software Engineer (Silicon Valley)', 'Research Scientist', 'Global Consultant']
        },
        {
          id: 'phd-research',
          title: 'PhD & Research',
          description: 'Academic and industrial research careers',
          icon: <Award className="w-5 h-5" />,
          salaryRange: '₹31K - ₹1L per month (fellowship + salary)',
          growthRate: 'Academic progression, research leadership',
          skills: ['Research Methodology', 'Publication', 'Grant Writing'],
          examples: ['Professor', 'Research Scientist', 'R&D Head']
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
          Computer Science Engineering
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Explore comprehensive career paths after your CSE degree
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Your Degree Options</h3>
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-lg mb-2">
                <GraduationCap className="w-8 h-8 text-blue-600 mx-auto" />
              </div>
              <p className="font-semibold">3-Year Diploma</p>
              <p className="text-sm text-gray-600">Polytechnic CSE</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-lg mb-2">
                <GraduationCap className="w-8 h-8 text-green-600 mx-auto" />
              </div>
              <p className="font-semibold">4-Year B.Tech</p>
              <p className="text-sm text-gray-600">Computer Science</p>
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
                <Briefcase className="w-16 h-16 mx-auto" />
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
        <h3 className="text-xl font-semibold text-center mb-6">CSE Career Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">85%</div>
            <div className="text-sm text-gray-600">Job Placement Rate</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">₹4.5L</div>
            <div className="text-sm text-gray-600">Average Starting Salary</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">15+</div>
            <div className="text-sm text-gray-600">Career Domains</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">95%</div>
            <div className="text-sm text-gray-600">Industry Demand Growth</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSECareerMapping;