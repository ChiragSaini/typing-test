import React, { useState, useRef, useEffect } from 'react'
import { ChakraProvider, Box, Heading, Flex, Textarea, Button, CircularProgress } from "@chakra-ui/react";
import Preview from './Preview';
import Speed from './Speed';
import axios from 'axios';

const initialState = {
    text: '',
    userInput: '',
    symbols: 0,
}


const App = () => {
    const [appState, setAppState] = useState(initialState);
    const [testStatus, setTestStatus] = useState("NOT_STARTED");
    const [seconds, setSeconds] = useState(0);
    const [loading, setLoading] = useState(false);
    const timer = useRef();

    const getRandomString = async () => {
        setLoading(true);
        const result = await axios.get('https://api.quotable.io/random');
        try {
            console.log({ result })
            setAppState({ ...appState, text: result.data.content, userInput: '' })
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getRandomString();
    }, [])

    const onRestart = () => {
        clearInterval(timer.current);
        timer.current = null;
        setAppState(initialState);
        getRandomString();
        setSeconds(0);
        setTestStatus("NOT_STARTED");
    };

    const countCorrectSymbols = (userInput) => {
        const text = appState.text.replace(' ', '');
        return userInput.replace(' ', '').split('').filter((s, i) => s === text[i]).length;
    }

    const setTimer = () => {
        if (testStatus === 'NOT_STARTED') {
            setTestStatus('STARTED');
            timer.current = setInterval(() => {
                setSeconds(p => p + 1);
            }, 1000);
        }
    }

    const onFinish = (userInput) => {
        if (userInput === appState.text) {
            setTestStatus('FINISHED');
            clearInterval(timer.current);
            timer.current = null;
            setAppState(initialState);
        }
    }

    const onUserInputChange = (e) => {
        const v = e.target.value;
        setTimer();
        onFinish(v);
        setAppState({ ...appState, userInput: v, symbols: countCorrectSymbols(v) });
    }

    return (
        <ChakraProvider>
            <Flex alignItems="center" justifyContent="center">
                <Box maxW='968px' width="100%" mt={8} justifyContent="center">
                    <Heading textAlign="center">My Typing Speed Test</Heading>
                    <Box style={{ height: '50px', margin: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {loading && <CircularProgress isIndeterminate color="green.300" size="50px" thickness="10px" />}
                    </Box>
                    <Preview text={appState.text} userInput={appState.userInput} />
                    <Textarea mt={5} value={appState.userInput} onChange={onUserInputChange} placeholder="Enter Your text here" />
                    <Button mt={3} onClick={onRestart}>Restart</Button>
                    <Speed symbols={appState.symbols} seconds={seconds} testStatus={testStatus} />
                </Box>
            </Flex>
        </ChakraProvider>
    );
}

export default App;