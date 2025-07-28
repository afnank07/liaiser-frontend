// This is a mock API route for Next.js. Replace with your Python endpoint when ready.

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { initialMessage, answers } = req.body
    // Simulate API response
    const finalContext = `Final Campaign Context:\n\nInitial: ${initialMessage}\nAnswers: ${answers.join(" | ")}`
    res.status(200).json({ finalContext })
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}
