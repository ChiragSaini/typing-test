import { Box, Heading, Flex } from "@chakra-ui/react"
import { motion } from 'framer-motion';
const Speed = ({ symbols, seconds, testStatus }) => {
    if (symbols === 0 || seconds === 0) {
        return null;
    }
    const scale = testStatus === 'FINISHED' ? 2 : 1
    const wpm = (symbols / 5) / (seconds / 60)
    return (
        <Box maxW='968px' width="100%" mt={8} justifyContent="center">
            <Flex height="200px" justifyContent="center" alignItems="center">
                <Heading className={`${testStatus === 'FINISHED' ? 'do-some-animation' : null}`}>
                    <motion.div animate={{ scale: scale, border: '1px solid #ccc', padding: '1rem' }}
                        transition={{ duration: 2 }}>
                        {
                            `${Math.round(wpm)} WPM`
                        }
                    </motion.div>
                </Heading>
            </Flex>
        </Box>
    )
}

export default Speed
