const express = require('express');
const axios = require('axios');
const logger = require('./logger');
const expressPinoLogger = require('express-pino-logger');
const natural = require('natural');

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
app.use(expressPinoLogger({ logger: logger }));

// Task 8 Route: Analyze Sentiment
app.post('/api/sentiment', async (req, res) => {
    const { sentence } = req.body;

    if (!sentence) {
        logger.error('No sentence provided for sentiment analysis');
        return res.status(400).json({ error: 'No sentence provided' });
    }

    const Analyzer = natural.SentimentAnalyzer;
    const stemmer = natural.PorterStemmer;
    const analyzer = new Analyzer("English", stemmer, "afinn");

    try {
        // Tokenize the sentence into individual words
        const tokenizer = new natural.WordTokenizer();
        const tokens = tokenizer.tokenize(sentence);

        // Get the sentiment score
        const score = analyzer.getSentiment(tokens);
        let sentiment = "neutral";

        // Determine clear thresholds for sentiment status
        if (score < -0.25) {
            sentiment = "negative";
        } else if (score > 0.25) {
            sentiment = "positive";
        }

        logger.info(`Sentiment analysis completed. Score: ${score}, Sentiment: ${sentiment}`);
        res.status(200).json({ score: score, sentiment: sentiment });
    } catch (error) {
        logger.error(`Error performing sentiment analysis: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    logger.info(`Sentiment analysis service running on port ${port}`);
});