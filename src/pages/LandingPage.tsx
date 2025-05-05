import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Timer, 
  Users, 
  BarChart, 
  BookText, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  CheckCircle2,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-20" 
          style={{ 
            backgroundImage: `url('public/lovable-uploads/c94d6ccf-4b0f-42a3-8505-4d426c71a9d1.png')`,
            backgroundBlendMode: 'soft-light'
          }}
        ></div>
        
        <div className="container relative z-10 mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span className="block bg-gradient-to-r from-timerBlue to-timerPurple bg-clip-text text-transparent">
                Focentra
              </span>
            </h1>
            <p className="text-xl text-gray-600 sm:text-2xl">
              The key is not to prioritize what's on your schedule, but to schedule your priorities
            </p>
            <p className="mb-8 mt-2 text-lg italic text-gray-500">
              - Stephen Covey
            </p>
            
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full bg-timerBlue px-8 py-6 text-lg hover:bg-timerBlue/90" asChild>
                <Link to="/app">Get Started</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full border-timerBlue px-8 py-6 text-lg text-timerBlue hover:bg-timerBlue/10"
              >
                Learn More <ArrowRight className="ml-2 size-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">Features</h2>
            <p className="mt-4 text-lg text-gray-600">
              Tools designed to help you stay focused, organized, and productive
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Pomodoro Timers */}
            <Card className="group overflow-hidden rounded-2xl border-none bg-white/50 p-1 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-8">
                <div className="mb-6 size-14 rounded-full bg-timerBlue/10 p-3 text-timerBlue">
                  <Timer size={32} />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-gray-900">Pomodoro Timers</h3>
                <p className="text-gray-600">
                  Enhance your focus with customizable work/break intervals that adapt to your study habits and concentration patterns.
                </p>
              </CardContent>
            </Card>

            {/* Study Rooms */}
            <Card className="group overflow-hidden rounded-2xl border-none bg-white/50 p-1 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-8">
                <div className="mb-6 size-14 rounded-full bg-timerGreen/10 p-3 text-timerGreen">
                  <Users size={32} />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-gray-900">Study Rooms</h3>
                <p className="text-gray-600">
                  Collaborate with peers in virtual study environments designed to simulate the accountability and community of in-person sessions.
                </p>
              </CardContent>
            </Card>

            {/* Progress Tracking */}
            <Card className="group overflow-hidden rounded-2xl border-none bg-white/50 p-1 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-8">
                <div className="mb-6 size-14 rounded-full bg-timerOrange/10 p-3 text-timerOrange">
                  <BarChart size={32} />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-gray-900">Progress Tracking</h3>
                <p className="text-gray-600">
                  Visualize your productivity trends with detailed analytics that highlight your study patterns and help you continuously improve.
                </p>
              </CardContent>
            </Card>

            {/* Distraction Journal */}
            <Card className="group overflow-hidden rounded-2xl border-none bg-white/50 p-1 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-8">
                <div className="mb-6 size-14 rounded-full bg-timerPurple/10 p-3 text-timerPurple">
                  <BookText size={32} />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-gray-900">Distraction Journal</h3>
                <p className="text-gray-600">
                  Quickly log distracting thoughts during study sessions, clearing your mind without losing focus or dropping your productivity.
                </p>
              </CardContent>
            </Card>

            {/* Focus Mode */}
            <Card className="group overflow-hidden rounded-2xl border-none bg-white/50 p-1 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-8">
                <div className="mb-6 size-14 rounded-full bg-timerYellow/10 p-3 text-timerYellow">
                  <EyeOff size={32} />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-gray-900">Focus Mode</h3>
                <p className="text-gray-600">
                  Eliminate distractions with a minimalist interface that keeps only essential tools visible while you're in deep work mode.
                </p>
              </CardContent>
            </Card>

            {/* Role-Based Access - NEW */}
            <Card className="group relative overflow-hidden rounded-2xl border-none bg-white/50 p-1 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="absolute right-4 top-4 rounded-full bg-timerBlue px-3 py-1 text-xs font-semibold text-white">
                NEW
              </div>
              <CardContent className="p-8">
                <div className="mb-6 size-14 rounded-full bg-timerBlue/10 p-3 text-timerBlue">
                  <GraduationCap size={32} />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-gray-900">Role-Based Access</h3>
                <p className="text-gray-600">
                  Specialized features for professors to create and assign tasks, while students can manage both assigned work and personal tasks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Role-Based Features Section */}
      <section className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-timerBlue/10 px-4 py-2 text-sm font-medium text-timerBlue">
              <Sparkles className="mr-2 size-4" /> New Feature
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">Role-Based Learning</h2>
            <p className="mt-4 text-lg text-gray-600">
              Tailored features for both educators and students
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Professor Features */}
            <div className="rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm">
              <div className="mb-6 size-16 rounded-full bg-timerBlue/10 p-3 text-timerBlue">
                <GraduationCap size={40} />
              </div>
              <h3 className="mb-6 text-2xl font-semibold text-gray-900">For Professors</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="mr-3 mt-1 size-5 flex-shrink-0 text-timerBlue" />
                  <span className="text-gray-600">Create and assign tasks to individual students or entire classes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-3 mt-1 size-5 flex-shrink-0 text-timerBlue" />
                  <span className="text-gray-600">Track student progress and engagement with detailed analytics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-3 mt-1 size-5 flex-shrink-0 text-timerBlue" />
                  <span className="text-gray-600">Set deadlines and priority levels for assignments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-3 mt-1 size-5 flex-shrink-0 text-timerBlue" />
                  <span className="text-gray-600">Create study rooms for office hours or group discussions</span>
                </li>
              </ul>
              
              <Button className="mt-8 rounded-full bg-timerBlue px-6 py-2 text-white hover:bg-timerBlue/90">
                Professor Sign Up
              </Button>
            </div>

            {/* Student Features */}
            <div className="rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm">
              <div className="mb-6 size-16 rounded-full bg-timerGreen/10 p-3 text-timerGreen">
                <User size={40} />
              </div>
              <h3 className="mb-6 text-2xl font-semibold text-gray-900">For Students</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle2 className="mr-3 mt-1 size-5 flex-shrink-0 text-timerGreen" />
                  <span className="text-gray-600">Manage both professor-assigned tasks and personal to-dos in one place</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-3 mt-1 size-5 flex-shrink-0 text-timerGreen" />
                  <span className="text-gray-600">Schedule study sessions with optimized Pomodoro timers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-3 mt-1 size-5 flex-shrink-0 text-timerGreen" />
                  <span className="text-gray-600">Join virtual study rooms to collaborate with classmates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="mr-3 mt-1 size-5 flex-shrink-0 text-timerGreen" />
                  <span className="text-gray-600">Track your focus and productivity patterns with detailed analytics</span>
                </li>
              </ul>
              
              <Button className="mt-8 rounded-full bg-timerGreen px-6 py-2 text-white hover:bg-timerGreen/90">
                Student Sign Up
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">FAQs</h2>
            <p className="mt-4 text-lg text-gray-600">
              Commonly asked questions about Focentra
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-3xl space-y-8">
            <div className="rounded-xl bg-white/70 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">What is Focentra?</h3>
              <p className="mt-2 text-gray-600">
                A productivity sidekick for students and educators, blending AI-powered study tools, focus timers, and collaborative learning to crush deadlines and reduce burnout.
              </p>
            </div>
            
            <div className="rounded-xl bg-white/70 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">How does role-based access work?</h3>
              <p className="mt-2 text-gray-600">
                Professors can create accounts with educator privileges to create and assign tasks to students. Students can register and manage both assigned tasks and personal to-dos.
              </p>
            </div>
            
            <div className="rounded-xl bg-white/70 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">Is Focentra free for students?</h3>
              <p className="mt-2 text-gray-600">
                Yes! Students can use most features for free. Premium features are available for enhanced capabilities like advanced analytics and unlimited study rooms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-timerBlue/10 to-timerPurple/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Ready to enhance your learning experience?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of students and educators already improving their productivity with Focentra
            </p>
            
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full bg-timerBlue px-8 py-6 text-lg hover:bg-timerBlue/90" asChild>
                <Link to="/app">Get Started Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-timerBlue flex items-center justify-center mr-2">
                <Timer size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">Focentra</span>
            </div>
            
            <div className="mt-6 md:mt-0">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Focentra. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
