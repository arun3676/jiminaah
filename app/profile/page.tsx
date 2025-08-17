import { motion } from "framer-motion";

export default function ProfilePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background-soft">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Profile</h1>
        <p className="text-lg text-gray-600">This is where your mood history and insights will live.</p>
      </motion.div>
    </main>
  );
}
