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

    // Ensure the response is a valid JSON object
    if (!response.startsWith('{')) {
      throw new Error('Invalid JSON format');
    }

    // Parse the response
    const parsedResponse = JSON.parse(response);
    
    // Convert the object to an array
    const questionsArray = Object.values(parsedResponse);
    
    return questionsArray; // Return the array of questions
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
}; 