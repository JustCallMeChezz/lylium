import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class HelloWorldBloat {

    public static String getGreetingMessage() {
        return "Hello, World! i just put this thing here for no reason...";
    }

    public static List<String> getRandomQuotes() {
        List<String> quotes = new ArrayList<>();
        quotes.add("Programming isn't about what you know; it's about what you can figure out.");
        quotes.add("The best error message is the one that never shows up.");
        quotes.add("Code is like humor. When you have to explain it, it’s bad.");
        quotes.add("First, solve the problem. Then, write the code.");
        quotes.add("Hello, World! i just put this thing here for no reason...");
        quotes.add("Debugging is twice as hard as writing the code in the first place.");
        quotes.add("If at first you don’t succeed, call it version 1.0.");
        quotes.add("The best way to get a project done faster is to start sooner.");
        quotes.add("It’s not a bug – it’s an undocumented feature.");
        quotes.add("If you think it's simple, it probably isn't.");
        quotes.add("Why did the programmer quit his job? Because he didn’t get arrays.");
        quotes.add("Sometimes it pays to stay in bed on Monday, avoiding bugs.");
        quotes.add("This is just filler to make this file bigger and longer.");
        return quotes;
    }

    public static String generateFillerText() {
        StringBuilder filler = new StringBuilder("FillerText");
        for (int i = 0; i < 10000; i++) {
            filler.append(" MoreFiller");
        }
        return filler.toString();
    }

    public static void printBorder() {
        for (int i = 0; i < 500; i++) System.out.print("=");
        System.out.println();
    }

    public static void printRepeatedBorders(int count) {
        for (int i = 0; i < count; i++) {
            printBorder();
        }
    }

    public static void displayMessage() {
        String message = getGreetingMessage();
        for (int i = 0; i < 2000; i++) {
            System.out.println("Message #" + (i + 1) + ": " + message);
        }
    }

    public static void displayRandomQuote() {
        List<String> quotes = getRandomQuotes();
        Random random = new Random();
        for (int i = 0; i < 2000; i++) {
            String randomQuote = quotes.get(random.nextInt(quotes.size()));
            System.out.println("Random Quote #" + (i + 1) + ": " + randomQuote);
        }
    }

    public static void performUselessCalculations() {
        for (int i = 0; i < 100000; i++) {
            double x = Math.sin(i) + Math.cos(i) + Math.tan(i);
            double y = Math.log(i + 1) * Math.exp(1);
            double z = Math.sqrt(x * y);
            if (z < 0) System.out.println("Impossible calculation!");
        }
    }

    public static void printSquareBorders(int repetitions) {
        for (int i = 0; i < repetitions; i++) {
            for (int j = 0; j < 20; j++) {
                System.out.print("************ ");
            }
            System.out.println();
        }
    }

    public static void performComplexNestedLoops() {
        int count = 0;
        for (int i = 0; i < 50; i++) {
            for (int j = 0; j < 50; j++) {
                for (int k = 0; k < 50; k++) {
                    count += i + j + k;
                }
            }
        }
        System.out.println("Complex nested loop result: " + count);
    }

    public static void main(String[] args) {
        printRepeatedBorders(400);
        displayMessage();
        printRepeatedBorders(400);
        displayRandomQuote();
        printRepeatedBorders(400);
        performUselessCalculations();
        printSquareBorders(200);
        performComplexNestedLoops();
        printRepeatedBorders(400);
    }
}

//useless code... i just put here to make this repository not too empty...