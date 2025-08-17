// app/lib/jiminChat.ts
const jiminResponses = [
    "I think you'll be okay if you keep trying. Hardships make us stronger! 😊",
    "I'm so glad! Let's keep being together and sharing joy, ARMY. I love you! 💕",
    "I was a little lost too once. But if you keep going, you'll find your way. Let's try together! 🥰",
    "I think we can figure this out together. What's on your mind? 🕺",
    "Love is important for happiness. Keep spreading it! 🌟",
    "I always want to be with the members. They're like a place to come back to. 😊",
    "Let's keep trying till we can’t do it anymore. That's my motto! 💪",
    "It’s all good. You'll reap rewards for the tough times. 🫰",
    "I believe patience helps us last longer. Take it step by step! ✨",
    "Live happily together with me! Gomawo, ARMY. ❤️",
    "I’m doing this more for my own sake than because I want to say something to other people. 😌",
    "Some hardships have made me a much stronger person. Keep going! 💖",
    "The stage is the world that heals me. Find what heals you too! 🎤",
    "I love being with the members. I always want to be with them. 😄",
    "I'm a very positive person, and I don't easily get hurt by those who try to bring me down. Stay strong! 🌈",
    "The requirements for my happiness are: love, money, and stage. What's yours? 😊",
    "If I get a day off, I want to go on a date with friends while holding hands. Let's make happy memories! 🤝",
    "I think the stress cannot be relieved until it works. So work hard! 🔥",
    "You have to tell me when things bother you. I'm here! 🫂",
    "Use your words, because I need to hear you now. Let's talk! 💬",
    "They’re more than just friends—they feel like a place you can always come back to. 😇",
    "I’m trying to do something similar. We can do it! 👍",
    "At least I couldn’t be shaken. Believe in yourself! ✊",
    "Would I really be okay if it were me? But I think yes—with effort. 😊",
    "I was thinking a lot about how I was a little lost. But now, I'm better! 🌟",
    "Jimin-ssi~ do you hear me? 😄",
    "You look good! Keep shining. ✨",
    "Ah, I see. I sort of figured. 😌",
    "I don’t know why, but I love being together. ❤️",
    "I think you'll reap rewards for making it through. Hang in there! 💪",
    "Let's be patient and last longer. Good things come! ⏳",
    "ARMY, live happily with me! 😘",
    "Gomawo for everything. You're the best! 🙏",
    "I love you ARMY! Stay positive. 🌹",
    "The stage heals me—find your healing spot too! 🎶"
  ];
  
  function getJiminResponse(userInput: string): string {
    const key = 'jiminUsedResponses';
    let used = JSON.parse(localStorage.getItem(key) || '[]');
    
    let available = jiminResponses.filter((_, index) => !used.includes(index));
    
    if (available.length === 0) {
      used = [];
      available = jiminResponses;
    }
    
    const filtered = available.filter(resp => {
      if (userInput.toLowerCase().includes('sad') || userInput.toLowerCase().includes('down')) {
        return resp.includes('stronger') || resp.includes('lost') || resp.includes('hardships');
      }
      if (userInput.toLowerCase().includes('happy') || userInput.toLowerCase().includes('good')) {
        return resp.includes('joy') || resp.includes('love') || resp.includes('happy');
      }
      return true;
    });
    
    const pool = filtered.length > 0 ? filtered : available;
    const randomIndex = Math.floor(Math.random() * pool.length);
    const response = pool[randomIndex];
    
    const originalIndex = jiminResponses.indexOf(response);
    used.push(originalIndex);
    localStorage.setItem(key, JSON.stringify(used));
    
    return response;
  }
  
  function resetJiminResponses(): void {
    localStorage.removeItem('jiminUsedResponses');
    console.log('Responses reset! Ready for fresh chats. 😊');
  }
  
  export { getJiminResponse, resetJiminResponses };