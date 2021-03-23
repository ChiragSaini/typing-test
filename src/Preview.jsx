import { Box } from "@chakra-ui/react"


const Preview = ({ text, userInput }) => {
    const previewText = text.split('');
    return (
        <Box maxW='968px' width="100%" mt={8} justifyContent="center">
            {
                previewText.map((s, idx) => {
                    let color;
                    if (idx < userInput.length) {
                        color = s === userInput[idx] ? '#8bc34a' : '#ef6191';
                    }
                    return <span key={idx} style={{ backgroundColor: color }}>{s}</span>
                })
            }
        </Box>
    )
}

export default Preview
