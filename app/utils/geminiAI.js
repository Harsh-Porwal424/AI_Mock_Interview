export const generateQuestions = async (prompt) => {
  try {
    const result = await chatSession.sendMessage(prompt);
    let response = result.response.text();
    
    // Remove any "JSON" prefix and markdown code blocks
    response = response
      .replace(/^JSON\s+/, '')  // Remove "JSON" prefix
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .trim();

    // Ensure the response is a valid JSON array
    if (!response.startsWith('{') && !response.startsWith('[')) {
      throw new Error('Invalid JSON format');
    }

    return response;
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
}; 