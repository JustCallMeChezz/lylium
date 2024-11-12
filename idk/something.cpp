#include <iostream>
#include <string>
#include <vector>
#include <map>

struct APIConfiguration {
    std::string url;
    std::string model;
    bool requiresModel;
};

std::vector<APIConfiguration> apiConfigurations = {
    {"ai api", "llama-3.1-8b-turbo", true},
    {"ai api", "", false},
    {"ai api", "", false},
    {"ai api", "", false},
    {"ai api", "gpt-4o-mini", true},
    {"ai api", "", false},
    {"ai api", "", false}
};

std::string selectedPersonality = "chezz";
std::string conversationHistory;

std::string getPersonalityPrompt(const std::string& conversationPrompt) {
    if (selectedPersonality == "chezz") {
        return "You are Chezz. A character who is shy, sleepy, and introverted.";
    } else if (selectedPersonality == "chezzmy") {
        return "You are Chezz, who can only chat in Malay, with similar introverted traits.";
    }
    return "";
}

std::string construireUrlApi(const std::string& conversationPrompt, const APIConfiguration& config) {
    std::string apiKey = "API_KEY";
    std::string personalityPrompt = getPersonalityPrompt(conversationPrompt);
    std::string fullPrompt = personalityPrompt + " " + conversationHistory + " " + conversationPrompt;

    std::string url = config.url + "?prompt=" + fullPrompt + "&key=" + apiKey;
    if (config.requiresModel) {
        url += "&model=" + config.model;
    }
    return url;
}

std::string getAIResponse(const std::string& input) {
    std::string response = "umm... i didn't understand .-.";
    conversationHistory += "User: " + input + "\nAI: " + response + "\n";
    return response;
}

int main() {
    std::string input;
    std::cout << "Enter your message: ";
    std::getline(std::cin, input);

    std::string aiResponse = getAIResponse(input);
    std::cout << "AI: " << aiResponse << std::endl;

    return 0;
}

//this not a real code actually... its just a random useless cpp thing... just to make this repository not too empty lol...