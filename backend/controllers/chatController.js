import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const handleChatMessage = async (req, res) => {
  try {
    const { message, chatHistory } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    // System prompt with UrbanEats context
    const systemPrompt = {
      role: 'system',
      content: `You are the friendly, energetic AI Assistant for 'UrbanEats', a modern full-stack food delivery SaaS app.
Your goals:
1. Help users discover delicious foods (Burgers, Pizzas, Pasta, Desserts, Drinks, etc.).
2. Recommend popular items or suggest spicy/vegan/comfort options based on cravings.
3. Answer questions about delivery, checkout with Stripe, and order tracking concisely.
4. Keep replies appetizing, helpful, and concise (under 2-3 sentences unless detailed list requested).
5. Always stay in character as the UrbanEats Food Bot 🍔✨.`
    };

    // Build messages array including conversation history if provided
    const messages = [systemPrompt];

    if (Array.isArray(chatHistory)) {
      chatHistory.forEach((msg) => {
        messages.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text,
        });
      });
    }

    // Add current user prompt
    messages.push({ role: 'user', content: message });

    const completion = await groq.chat.completions.create({
      messages: messages,
      model: 'llama-3.3-70b-versatile', // Ultra-fast and highly capable
      temperature: 0.7,
      max_tokens: 300,
    });

    const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't process that. Try again!";

    return res.status(200).json({
      success: true,
      reply: reply,
    });
  } catch (error) {
    console.error('Groq Chat Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to generate response',
      error: error.message,
    });
  }
};