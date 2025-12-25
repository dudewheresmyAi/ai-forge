import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Zap, Target, TrendingUp, RefreshCw, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const questions = [
  {
    question: "What's your primary business challenge?",
    options: [
      { text: "Scaling customer acquisition", score: { automation: 3, strategy: 2, social: 1 } },
      { text: "Improving operational efficiency", score: { automation: 3, strategy: 1, social: 0 } },
      { text: "Enhancing customer engagement", score: { automation: 1, strategy: 2, social: 3 } },
      { text: "Data-driven decision making", score: { automation: 2, strategy: 3, social: 1 } },
    ],
  },
  {
    question: "How large is your team?",
    options: [
      { text: "1-10 employees", score: { automation: 3, strategy: 1, social: 2 } },
      { text: "11-50 employees", score: { automation: 2, strategy: 2, social: 2 } },
      { text: "51-200 employees", score: { automation: 2, strategy: 3, social: 2 } },
      { text: "200+ employees", score: { automation: 1, strategy: 3, social: 2 } },
    ],
  },
  {
    question: "What's your current marketing approach?",
    options: [
      { text: "Mostly manual processes", score: { automation: 3, strategy: 2, social: 1 } },
      { text: "Some automation tools", score: { automation: 2, strategy: 3, social: 2 } },
      { text: "Heavy social media focus", score: { automation: 1, strategy: 2, social: 3 } },
      { text: "Data-driven campaigns", score: { automation: 2, strategy: 3, social: 2 } },
    ],
  },
  {
    question: "What's your biggest growth goal for next year?",
    options: [
      { text: "Double revenue", score: { automation: 2, strategy: 3, social: 2 } },
      { text: "Expand to new markets", score: { automation: 2, strategy: 3, social: 2 } },
      { text: "Build brand awareness", score: { automation: 1, strategy: 2, social: 3 } },
      { text: "Improve customer retention", score: { automation: 3, strategy: 2, social: 2 } },
    ],
  },
];

const recommendations = {
  automation: {
    title: "AI Automation Pioneer",
    icon: Zap,
    color: "text-primary",
    bgColor: "bg-primary/20",
    description: "You're a perfect fit for our AI Automation suite! With your focus on efficiency and scale, our autonomous workflows can reduce manual tasks by up to 80%.",
    savings: "Potential savings: $150,000/year",
    cta: "Start Automating",
  },
  strategy: {
    title: "Strategic Visionary",
    icon: Target,
    color: "text-accent",
    bgColor: "bg-accent/20",
    description: "Our AI-Powered Strategy services are ideal for you! Data-driven insights and market intelligence will give you the competitive edge you need.",
    savings: "Potential ROI: 340% increase",
    cta: "Get Strategic Insights",
  },
  social: {
    title: "Social Media Maverick",
    icon: TrendingUp,
    color: "text-green-400",
    bgColor: "bg-green-400/20",
    description: "Our AI Social Media Management is your perfect match! Automate content creation, scheduling, and engagement across all platforms.",
    savings: "Potential reach: 5x growth",
    cta: "Boost Your Presence",
  },
};

const AIQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ automation: 0, strategy: 0, social: 0 });
  const [showResult, setShowResult] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    if (isAnimating) return;
    
    setSelectedOption(optionIndex);
    setIsAnimating(true);
    
    const option = questions[currentQuestion].options[optionIndex];
    setScores(prev => ({
      automation: prev.automation + option.score.automation,
      strategy: prev.strategy + option.score.strategy,
      social: prev.social + option.score.social,
    }));

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
      setIsAnimating(false);
    }, 500);
  };

  const getResult = () => {
    const maxScore = Math.max(scores.automation, scores.strategy, scores.social);
    if (scores.automation === maxScore) return recommendations.automation;
    if (scores.strategy === maxScore) return recommendations.strategy;
    return recommendations.social;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ automation: 0, strategy: 0, social: 0 });
    setShowResult(false);
    setSelectedOption(null);
  };

  const result = getResult();

  return (
    <section id="ai-quiz" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-[120px]"
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI Discovery Tool
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find Your Perfect <span className="text-primary">AI Solution</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Answer 4 quick questions and our AI will recommend the best solutions for your business.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={`question-${currentQuestion}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card p-8 md:p-10 rounded-2xl"
              >
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                    <span>{Math.round(progress)}% Complete</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Question */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                    {questions[currentQuestion].question}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(index)}
                      disabled={isAnimating}
                      className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group ${
                        selectedOption === index
                          ? "border-primary bg-primary/10"
                          : "border-border/50 bg-background/50 hover:border-primary/50 hover:bg-primary/5"
                      }`}
                    >
                      <span className="text-foreground font-medium">{option.text}</span>
                      <ChevronRight className={`w-5 h-5 transition-transform ${
                        selectedOption === index ? "text-primary translate-x-1" : "text-muted-foreground group-hover:translate-x-1"
                      }`} />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 md:p-10 rounded-2xl text-center"
              >
                <div className={`inline-flex p-4 rounded-2xl ${result.bgColor} mb-6`}>
                  <result.icon className={`w-12 h-12 ${result.color}`} />
                </div>
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Award className="w-4 h-4" />
                  Your AI Profile
                </div>

                <h3 className={`text-3xl font-bold ${result.color} mb-4`}>
                  {result.title}
                </h3>

                <p className="text-muted-foreground text-lg mb-6 max-w-md mx-auto">
                  {result.description}
                </p>

                <div className="inline-block px-6 py-3 rounded-xl bg-primary/10 text-primary font-semibold mb-8">
                  {result.savings}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="gap-2">
                    {result.cta}
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button size="lg" variant="outline" onClick={resetQuiz} className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Retake Quiz
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AIQuiz;
