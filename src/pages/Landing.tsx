import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Wifi, 
  Zap, 
  Plug, 
  Link as LinkIcon, 
  BarChart3, 
  Cloud, 
  Bolt, 
  Car, 
  Wind, 
  Sprout, 
  HardHat, 
  Shield, 
  Globe, 
  Cpu, 
  Database, 
  ArrowRight, 
  CheckCircle, 
  Star, 
  TrendingUp,
  Sparkles,
  Rocket,
  Users,
  Lock,
  GitBranch,
  Activity,
  Layers,
  Target,
  Award,
  ChevronRight
} from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-radial from-primary/30 to-transparent blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-radial from-secondary/30 to-transparent blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '60%', right: '10%' }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-radial from-accent/20 to-transparent blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ top: '40%', left: '50%' }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Status Badge */}
            <motion.div 
              className="inline-flex items-center space-x-3 bg-glass-gradient border border-primary/30 backdrop-blur-md rounded-full px-6 py-3 mb-8 shadow-glow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <span className="text-white font-semibold">Live on Creditcoin Testnet</span>
              <ChevronRight className="w-4 h-4 text-light/60" />
            </motion.div>

            {/* Main Headline */}
            <div className="relative mb-8">
              <motion.h1 
                className="text-6xl md:text-8xl font-display font-bold leading-tight mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="block text-white mb-2">Decentralized</span>
                <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Infrastructure Data
                </span>
              </motion.h1>
              <motion.div
                className="absolute -top-4 -right-4 text-primary/20"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-16 h-16" />
              </motion.div>
            </div>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Connect verified IoT devices with global data consumers. 
              <span className="text-cyan-400 font-bold"> Earn CTC</span> for contributing real-world data to the decentralized economy.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/register"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-light font-bold rounded-2xl transition-all duration-300 shadow-glow hover:shadow-glow-pink text-lg"
                >
                  <Rocket className="mr-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>Start Earning CTC</span>
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/marketplace"
                  className="group inline-flex items-center justify-center px-8 py-4 border-2 border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary font-bold rounded-2xl transition-all duration-300 backdrop-blur-sm text-lg"
                >
                  <Database className="mr-3 w-5 h-5" />
                  <span>Browse Data Feeds</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 backdrop-blur-md hover:border-primary/40 transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <Database className="w-6 h-6 text-primary mr-3" />
                    <div className="text-4xl font-bold text-white">3,247</div>
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">Active Devices</div>
                  <div className="flex items-center justify-center text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="font-medium">+18% this month</span>
                  </div>
                </div>
              </div>
              
              <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 backdrop-blur-md hover:border-secondary/40 transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-secondary mr-3" />
                    <div className="text-4xl font-bold text-white">127.4M</div>
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">Data Points</div>
                  <div className="flex items-center justify-center text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="font-medium">+42% this week</span>
                  </div>
                </div>
              </div>
              
              <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 backdrop-blur-md hover:border-accent/40 transition-all duration-500 hover:scale-105">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-accent mr-3" />
                    <div className="text-4xl font-bold text-white">$2.1M</div>
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">CTC Volume</div>
                  <div className="flex items-center justify-center text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="font-medium">+67% this month</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-primary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              How <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">CreditDePIN</span> Works
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A seamless ecosystem for IoT data monetization with blockchain verification
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div
              className="group relative p-10 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 backdrop-blur-lg hover:from-primary/15 hover:to-primary/10 transition-all duration-700 hover:scale-105 hover:shadow-card-hover"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-glow">
                  <Plug className="w-10 h-10 text-light" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">01</div>
                <h3 className="text-2xl font-bold mb-4 text-light">Device Registration</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Register IoT devices, stake CTC tokens, and start logging real-world data. Every data point is cryptographically verified and stored on-chain.
                </p>
                <div className="flex items-center text-primary font-bold">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>Start earning in minutes</span>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="group relative p-10 rounded-3xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 backdrop-blur-lg hover:from-secondary/15 hover:to-secondary/10 transition-all duration-700 hover:scale-105 hover:shadow-card-hover"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-secondary/30 to-accent/30 opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-glow-cyan">
                  <LinkIcon className="w-10 h-10 text-light" />
                </div>
                <div className="text-3xl font-bold text-secondary mb-2">02</div>
                <h3 className="text-2xl font-bold mb-4 text-light">Smart Settlement</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Creditcoin smart contracts handle all payments automatically. When consumers purchase data feeds, CTC tokens settle instantly with zero counterparty risk.
                </p>
                <div className="flex items-center text-secondary font-bold">
                  <Shield className="w-5 h-5 mr-2" />
                  <span>Trustless & secure</span>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="group relative p-10 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 backdrop-blur-lg hover:from-accent/15 hover:to-accent/10 transition-all duration-700 hover:scale-105 hover:shadow-card-hover"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/30 to-primary/30 opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-glow-pink">
                  <BarChart3 className="w-10 h-10 text-light" />
                </div>
                <div className="text-3xl font-bold text-accent mb-2">03</div>
                <h3 className="text-2xl font-bold mb-4 text-light">Data Consumption</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Access verified real-world data feeds from thousands of IoT devices. Pay per data point or subscribe monthly with flexible pricing options.
                </p>
                <div className="flex items-center text-accent font-bold">
                  <Star className="w-5 h-5 mr-2" />
                  <span>Premium quality data</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Platform <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Features</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built for the future of decentralized infrastructure
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Lock, title: 'Secure', desc: 'Bank-level encryption for all data transactions', color: 'from-primary to-primary/80' },
              { icon: Zap, title: 'Fast', desc: 'Instant settlement and real-time data processing', color: 'from-secondary to-secondary/80' },
              { icon: Users, title: 'Scalable', desc: 'Supports millions of devices and data points', color: 'from-accent to-accent/80' },
              { icon: GitBranch, title: 'Decentralized', desc: 'No single point of failure, truly distributed', color: 'from-green-500 to-green-500/80' },
              { icon: Activity, title: 'Reliable', desc: '99.9% uptime with redundant infrastructure', color: 'from-blue-500 to-blue-500/80' },
              { icon: Layers, title: 'Layered', desc: 'Multi-layer security and verification system', color: 'from-purple-500 to-purple-500/80' },
              { icon: Target, title: 'Precise', desc: 'Accurate data verification and integrity checks', color: 'from-red-500 to-red-500/80' },
              { icon: Rocket, title: 'Innovative', desc: 'Cutting-edge technology and continuous improvement', color: 'from-yellow-500 to-yellow-500/80' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-gray-800/50 backdrop-blur-lg hover:border-gray-700/50 transition-all duration-500 hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <feature.icon className="w-8 h-8 text-light" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-light">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Powered by <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">Real Data</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Supporting diverse IoT ecosystems across multiple industries
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { icon: Cloud, name: 'Weather', color: 'from-blue-500 to-cyan-500' },
              { icon: Bolt, name: 'Energy', color: 'from-yellow-500 to-orange-500' },
              { icon: Car, name: 'Fleet', color: 'from-purple-500 to-pink-500' },
              { icon: Wind, name: 'Air Quality', color: 'from-green-500 to-emerald-500' },
              { icon: Sprout, name: 'Agriculture', color: 'from-lime-500 to-green-500' },
              { icon: HardHat, name: 'Construction', color: 'from-red-500 to-orange-500' }
            ].map((useCase, index) => (
              <motion.div
                key={useCase.name}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-gray-800/50 backdrop-blur-lg text-center hover:border-gray-700/50 transition-all duration-500 hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${useCase.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <useCase.icon className="w-8 h-8 text-light" />
                  </div>
                  <div className="text-light font-bold">{useCase.name}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative p-12 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 backdrop-blur-lg text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/30 to-secondary/30 opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-light">
                Ready to Join the <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Future?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Start contributing to the decentralized data economy today. Earn CTC tokens while building the infrastructure of tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/register"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-light font-bold rounded-2xl transition-all duration-300 shadow-glow text-lg"
                  >
                    <Rocket className="mr-3 w-5 h-5" />
                    <span>Get Started Now</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/marketplace"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary font-bold rounded-2xl transition-all duration-300 backdrop-blur-sm text-lg"
                  >
                    <Database className="mr-3 w-5 h-5" />
                    <span>Explore Marketplace</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-gradient-to-t from-gray-900/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Cpu className="w-7 h-7 text-light" />
                </div>
                <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">CreditDePIN</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The decentralized infrastructure data network powered by Creditcoin blockchain. Building the future of real-world data monetization.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <Globe className="w-5 h-5 text-gray-400 hover:text-light" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                  <Wifi className="w-5 h-5 text-gray-400 hover:text-light" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-light font-bold mb-4">Platform</h4>
              <div className="space-y-3">
                <Link to="/marketplace" className="block text-gray-400 hover:text-light transition-colors">Marketplace</Link>
                <Link to="/leaderboard" className="block text-gray-400 hover:text-light transition-colors">Leaderboard</Link>
                <Link to="/dashboard" className="block text-gray-400 hover:text-light transition-colors">Dashboard</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-light font-bold mb-4">Resources</h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-400 hover:text-light transition-colors">Documentation</a>
                <a href="#" className="block text-gray-400 hover:text-light transition-colors">API</a>
                <a href="#" className="block text-gray-400 hover:text-light transition-colors">Support</a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-sm">
              © 2024 CreditDePIN. Building the future of decentralized infrastructure data on Creditcoin Network.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
