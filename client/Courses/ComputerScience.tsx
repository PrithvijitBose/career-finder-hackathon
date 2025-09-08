import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { ChevronRight, ChevronDown, Building2, GraduationCap, Briefcase, TrendingUp, Award, Globe, Users, Code, Database, Shield, Cpu, Zap, Cloud, Brain, Smartphone, Monitor, Server, BookOpen, DollarSign, Trophy, Rocket } from 'lucide-react';

interface CareerPath {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  salaryRange: string;
  growthRate: string;
  skills: string[];
  examples: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeToStart: string;
}

interface PathCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  paths: CareerPath[];
  description: string;
}

const CSECareerMapping: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('private-jobs');
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [showFlowchart, setShowFlowchart] = useState(false);

  const careerCategories: PathCategory[] = [
    {
      id: 'govt-exams',
      title: 'Government & PSU Jobs',
      icon: <Building2 className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Secure government positions with excellent job security and benefits',
      paths: [
        {
          id: 'upsc-ias',
          title: 'UPSC Civil Services',
          description: 'IAS, IPS, IFS - Top administrative positions',
          icon: <Award className="w-5 h-5" />,
          salaryRange: '₹56K - ₹2.5L/month',
          growthRate: 'Lifetime progression',
          difficulty: 'Hard',
          timeToStart: '2-4 years prep',
          skills: ['General Studies', 'Current Affairs', 'Essay Writing', 'Optional Subject'],
          examples: ['District Collector', 'Police Commissioner', 'Ambassador']
        },
        {
          id: 'gate-psu',
          title: 'GATE → PSU Jobs',
          description: 'Technical roles in BHEL, ONGC, ISRO, DRDO',
          icon: <Cpu className="w-5 h-5" />,
          salaryRange: '₹40K - ₹1.2L/month',
          growthRate: 'Steady with security',
          difficulty: 'Medium',
          timeToStart: '1-2 years prep',
          skills: ['Engineering Subjects', 'Aptitude', 'Technical Knowledge'],
          examples: ['ISRO Scientist', 'BHEL Engineer', 'ONGC Systems Analyst']
        },
        {
          id: 'ssc-banking',
          title: 'SSC & Banking',
          description: 'Central govt clerical, PO positions in banks',
          icon: <DollarSign className="w-5 h-5" />,
          salaryRange: '₹25K - ₹85K/month',
          growthRate: 'Regular promotions',
          difficulty: 'Medium',
          timeToStart: '6-12 months prep',
          skills: ['Quantitative Aptitude', 'English', 'Reasoning', 'Banking Awareness'],
          examples: ['Bank PO', 'Income Tax Officer', 'Audit Officer']
        }
      ]
    },
    {
      id: 'private-jobs',
      title: 'Private Sector Careers',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      description: 'High-growth opportunities in technology companies',
      paths: [
        {
          id: 'software-dev',
          title: 'Software Development',
          description: 'Full-stack, Backend, Frontend, Mobile Development',
          icon: <Code className="w-5 h-5" />,
          salaryRange: '₹3.5L - ₹25L/year',
          growthRate: 'Very High',
          difficulty: 'Easy',
          timeToStart: 'Immediate',
          skills: ['Programming Languages', 'Frameworks', 'Database', 'Git'],
          examples: ['Software Engineer', 'Full Stack Developer', 'Mobile App Developer']
        },
        {
          id: 'data-ai',
          title: 'Data Science & AI/ML',
          description: 'Machine Learning, Data Analysis, AI Development',
          icon: <Brain className="w-5 h-5" />,
          salaryRange: '₹4L - ₹35L/year',
          growthRate: 'Exponential',
          difficulty: 'Medium',
          timeToStart: '3-6 months skills',
          skills: ['Python/R', 'Machine Learning', 'Statistics', 'SQL', 'Deep Learning'],
          examples: ['Data Scientist', 'ML Engineer', 'AI Researcher']
        },
        {
          id: 'cloud-devops',
          title: 'Cloud & DevOps',
          description: 'Cloud infrastructure, automation, deployment',
          icon: <Cloud className="w-5 h-5" />,
          salaryRange: '₹4.5L - ₹28L/year',
          growthRate: 'Very High',
          difficulty: 'Medium',
          timeToStart: '4-8 months',
          skills: ['AWS/Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
          examples: ['DevOps Engineer', 'Cloud Architect', 'Site Reliability Engineer']
        },
        {
          id: 'cybersecurity',
          title: 'Cybersecurity',
          description: 'Information security, ethical hacking, security analysis',
          icon: <Shield className="w-5 h-5" />,
          salaryRange: '₹4.5L - ₹30L/year',
          growthRate: 'Very High',
          difficulty: 'Medium',
          timeToStart: '6-12 months',
          skills: ['Network Security', 'Ethical Hacking', 'Risk Assessment', 'Compliance'],
          examples: ['Security Analyst', 'Penetration Tester', 'CISO']
        },
        {
          id: 'product-management',
          title: 'Product Management',
          description: 'Product strategy, user experience, business analysis',
          icon: <TrendingUp className="w-5 h-5" />,
          salaryRange: '₹6L - ₹45L/year',
          growthRate: 'High',
          difficulty: 'Medium',
          timeToStart: '1-2 years experience',
          skills: ['Product Strategy', 'Analytics', 'User Research', 'Communication'],
          examples: ['Product Manager', 'Business Analyst', 'Growth Manager']
        }
      ]
    },
    {
      id: 'entrepreneurship',
      title: 'Entrepreneurship & Startups',
      icon: <Rocket className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Build your own ventures and innovative solutions',
      paths: [
        {
          id: 'tech-startup',
          title: 'Tech Startup Founder',
          description: 'SaaS products, AI startups, fintech solutions',
          icon: <Zap className="w-5 h-5" />,
          salaryRange: '₹0 - Unlimited',
          growthRate: 'High Risk, High Reward',
          difficulty: 'Hard',
          timeToStart: '2-5 years skills',
          skills: ['Technical Skills', 'Business Strategy', 'Leadership', 'Fundraising'],
          examples: ['SaaS Founder', 'AI Startup', 'E-commerce Platform']
        },
        {
          id: 'freelancing',
          title: 'Freelance Developer',
          description: 'Independent projects, consulting, remote work',
          icon: <Monitor className="w-5 h-5" />,
          salaryRange: '₹2L - ₹15L/year',
          growthRate: 'Skill-dependent',
          difficulty: 'Medium',
          timeToStart: '1-2 years skills',
          skills: ['Programming', 'Client Management', 'Marketing', 'Time Management'],
          examples: ['Web Developer', 'App Developer', 'Technical Consultant']
        },
        {
          id: 'digital-services',
          title: 'Digital Agency',
          description: 'Web development, digital marketing, IT services',
          icon: <Globe className="w-5 h-5" />,
          salaryRange: '₹3L - ₹20L/year',
          growthRate: 'Moderate-High',
          difficulty: 'Medium',
          timeToStart: '1-3 years',
          skills: ['Web Technologies', 'Digital Marketing', 'Project Management'],
          examples: ['Digital Agency Owner', 'IT Services', 'Consulting Firm']
        }
      ]
    },
    {
      id: 'higher-studies',
      title: 'Higher Education Paths',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Advanced degrees and specialized certifications',
      paths: [
        {
          id: 'mtech-india',
          title: 'M.Tech in India',
          description: 'IITs, NITs, IIITs - Advanced technical specialization',
          icon: <Trophy className="w-5 h-5" />,
          salaryRange: '₹6L - ₹25L starting',
          growthRate: 'Higher starting salary',
          difficulty: 'Medium',
          timeToStart: 'After graduation',
          skills: ['GATE Preparation', 'Research Skills', 'Advanced Technical Knowledge'],
          examples: ['AI/ML Specialization', 'Cybersecurity', 'Data Science', 'Robotics']
        },
        {
          id: 'ms-abroad',
          title: 'MS Abroad',
          description: 'USA, Canada, Germany, Australia - Global opportunities',
          icon: <Globe className="w-5 h-5" />,
          salaryRange: '$60K - $150K/year',
          growthRate: 'International career',
          difficulty: 'Hard',
          timeToStart: '1-2 years prep',
          skills: ['GRE/IELTS', 'Research', 'Financial Planning', 'Visa Process'],
          examples: ['Silicon Valley Engineer', 'Research Scientist', 'Global Tech Lead']
        },
        {
          id: 'mba',
          title: 'MBA (Tech Background)',
          description: 'IIMs, top B-schools - Management with tech foundation',
          icon: <Users className="w-5 h-5" />,
          salaryRange: '₹8L - ₹50L/year',
          growthRate: 'Leadership track',
          difficulty: 'Hard',
          timeToStart: '2-4 years work exp',
          skills: ['CAT/GMAT', 'Leadership', 'Business Strategy', 'Communication'],
          examples: ['Technical Product Manager', 'IT Consultant', 'Tech Executive']
        },
        {
          id: 'certifications',
          title: 'Professional Certifications',
          description: 'AWS, Google Cloud, Azure, Cisco, Oracle',
          icon: <BookOpen className="w-5 h-5" />,
          salaryRange: '₹4L - ₹20L/year',
          growthRate: 'Skill-based increment',
          difficulty: 'Easy',
          timeToStart: '3-6 months',
          skills: ['Cloud Platforms', 'Networking', 'Databases', 'Security'],
          examples: ['AWS Solutions Architect', 'Google Cloud Engineer', 'Oracle DBA']
        }
      ]
    }
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setSelectedPath(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎓 CSE Career Pathway Navigator
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Comprehensive career mapping for Computer Science & Engineering students
          </p>
          
          {/* Degree Starting Points */}
          <div className="flex justify-center gap-6 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
              <GraduationCap className="w-12 h-12 mx-auto mb-2" />
              <h3 className="text-xl font-bold">CSE B.Tech/BE</h3>
              <p className="text-blue-100">4-Year Degree</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
              <GraduationCap className="w-12 h-12 mx-auto mb-2" />
              <h3 className="text-xl font-bold">CSE Diploma</h3>
              <p className="text-green-100">3-Year Polytechnic</p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowFlowchart(!showFlowchart)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {showFlowchart ? 'Show Interactive View' : 'Show Flowchart View'}
            </button>
          </div>
        </div>
      </div>

      {showFlowchart ? (
        /* Flowchart View */
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-center mb-8">CSE Career Flowchart</h2>
          
          {/* Central Starting Node */}
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg mb-8">
              <div className="text-center">
                <GraduationCap className="w-12 h-12 mx-auto mb-2" />
                <h3 className="text-xl font-bold">CSE Graduate</h3>
                <p className="text-indigo-100">B.Tech/BE/Diploma</p>
              </div>
            </div>

            {/* Main Branches */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
              {careerCategories.map((category) => (
                <div key={category.id} className="flex flex-col items-center">
                  {/* Category Header */}
                  <div className={`bg-gradient-to-r ${category.color} text-white p-4 rounded-xl shadow-lg mb-4 w-full`}>
                    <div className="text-center">
                      {category.icon}
                      <h3 className="font-bold mt-2">{category.title}</h3>
                    </div>
                  </div>

                  {/* Career Options */}
                  <div className="space-y-3 w-full">
                    {category.paths.map((path) => (
                      <div key={path.id} className={`${category.bgColor} p-3 rounded-lg border-l-4 border-gray-300`}>
                        <div className="flex items-center gap-2 mb-1">
                          {path.icon}
                          <h4 className="font-semibold text-sm">{path.title}</h4>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{path.salaryRange}</p>
                        <div className="flex gap-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(path.difficulty)}`}>
                            {path.difficulty}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Interactive View */
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Categories */}
          <div className="lg:col-span-1 space-y-4">
            {careerCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`w-full p-4 text-left bg-gradient-to-r ${category.color} text-white hover:opacity-90 transition-opacity`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {category.icon}
                      <div>
                        <h3 className="text-lg font-semibold">{category.title}</h3>
                        <p className="text-sm opacity-90">{category.description}</p>
                      </div>
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
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-800">{path.title}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(path.difficulty)}`}>
                                {path.difficulty}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{path.description}</p>
                            <div className="flex justify-between text-sm">
                              <span className="text-green-600 font-medium">{path.salaryRange}</span>
                              <span className="text-blue-600">{path.timeToStart}</span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Panel - Detailed Information */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            {selectedPath ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-blue-600">{selectedPath.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{selectedPath.title}</h3>
                    <p className="text-gray-600">{selectedPath.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedPath.difficulty)}`}>
                    {selectedPath.difficulty}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" /> Salary Range
                    </h4>
                    <p className="text-green-700 font-bold">{selectedPath.salaryRange}</p>
                    <p className="text-sm text-green-600 mt-1">{selectedPath.growthRate}</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Time to Start
                    </h4>
                    <p className="text-blue-700 font-bold">{selectedPath.timeToStart}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Key Skills Required
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPath.skills.map((skill, index) => (
                        <span key={index} className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                      <Briefcase className="w-4 h-4" /> Career Examples
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedPath.examples.map((example, index) => (
                        <div key={index} className="bg-orange-100 p-2 rounded text-orange-700 text-sm">
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Rocket className="w-4 h-4" /> Ready to Get Started?
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    Take the next step in your {selectedPath.title} journey. Get personalized guidance, 
                    resources, and connect with mentors in this field.
                  </p>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                    Start Your {selectedPath.title} Journey
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <TrendingUp className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Explore Your Career Path
                </h3>
                <p className="text-gray-500">
                  Select any career option from the categories to see detailed information, 
                  salary ranges, required skills, and actionable next steps.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Statistics */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-center mb-6">📊 CSE Career Market Insights</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">92%</div>
            <div className="text-sm text-gray-600">Job Placement Rate</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">₹5.2L</div>
            <div className="text-sm text-gray-600">Average Starting Salary</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">20+</div>
            <div className="text-sm text-gray-600">Career Specializations</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">15%</div>
            <div className="text-sm text-gray-600">Annual Salary Growth</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">2M+</div>
            <div className="text-sm text-gray-600">Job Openings Annually</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSECareerMapping;

 