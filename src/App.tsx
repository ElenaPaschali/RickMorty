import { useState, useEffect, useCallback } from "react";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { getCharacter } from "rickmortyapi";
import { faker } from "@faker-js/faker";
import { ImgIcon, Layout } from "./components/styles";
import { lightTheme, darkTheme } from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, IconButton } from "@mui/material";
import lightmode from "./assets/lightmode.png";
import darkmode from "./assets/darkmode.png";

interface Question {
  question: string;
  options: string[];
  answer: string;
  image: string;
}

interface Character {
  name: string;
  image: string;
}

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  function shuffleArray(array: string[]): string[] {
    return [...array].sort(() => Math.random() - 0.5);
  }
  function createFakeOptions(correctName: string): string[] {
    const options: string[] = [];

    while (options.length < 4) {
      const name = faker.person.fullName();
      if (name !== correctName && !options.includes(name)) {
        options.push(name);
      }
    }

    return options;
  }

  const fetchData = useCallback(async () => {
    try {
      const randomIds = Array.from(
        { length: 5 },
        () => Math.floor(Math.random() * 826) + 1
      );
      const data: { data: Character[] } = await getCharacter(randomIds);

      const characters = Array.isArray(data) ? data : data.data;

      const formattedQuestions: Question[] = characters.map((char) => {
        const wrongOptions = createFakeOptions(char.name);
        const allOptions = shuffleArray([char.name, ...wrongOptions]);

        return {
          question: "Who's the character in the picture?",
          options: allOptions,
          answer: char.name,
          image: char.image,
        };
      });

      setQuestions(formattedQuestions);
      setIsFinished(false);
      setScore(0);
    } catch (error) {
      console.error("Failed to fetch characters:", error);
    }
  }, [setQuestions, setIsFinished, setScore]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFinish = (finalScore: number) => {
    setScore(finalScore);
    setIsFinished(true);
  };

  const handleRestart = () => {
    fetchData();
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline /> {/*reset του theme */}
      <IconButton
        style={{ position: "absolute", right: "10px" }}
        onClick={handleToggleTheme}
      >
        <ImgIcon src={darkMode ? lightmode : darkmode} alt="theme icon" />
      </IconButton>
      <Layout>
        {!isFinished ? (
          <Quiz questions={questions} onFinish={handleFinish} />
        ) : (
          <Result
            score={score}
            total={questions.length}
            onRestart={handleRestart}
          />
        )}
      </Layout>
    </ThemeProvider>
  );
}

export default App;
