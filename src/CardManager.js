import React from 'react';
import SingleCard from './SingleCard';

class CardManager extends React.Component {

    constructor(props) {
        super(props);

        var unscrambledCards = [
            { id: 1, coveredImageSrc: "./img/cover.png", imageSrc: './img/apple.png', matched: false, covered: true },
            { id: 2, coveredImageSrc: "./img/cover.png", imageSrc: './img/apple.png', matched: false, covered: true },
            { id: 3, coveredImageSrc: "./img/cover.png", imageSrc: './img/bananas.png', matched: false, covered: true },
            { id: 4, coveredImageSrc: "./img/cover.png", imageSrc: './img/bananas.png', matched: false, covered: true },
            { id: 5, coveredImageSrc: "./img/cover.png", imageSrc: './img/cherries.png', matched: false, covered: true },
            { id: 6, coveredImageSrc: "./img/cover.png", imageSrc: './img/cherries.png', matched: false, covered: true },
            { id: 7, coveredImageSrc: "./img/cover.png", imageSrc: './img/lemon.png', matched: false, covered: true },
            { id: 8, coveredImageSrc: "./img/cover.png", imageSrc: './img/lemon.png', matched: false, covered: true },
            { id: 9, coveredImageSrc: "./img/cover.png", imageSrc: './img/strawberry.png', matched: false, covered: true },
            { id: 10, coveredImageSrc: "./img/cover.png", imageSrc: './img/strawberry.png', matched: false, covered: true },
            { id: 11, coveredImageSrc: "./img/cover.png", imageSrc: './img/watermelon.png', matched: false, covered: true },
            { id: 12, coveredImageSrc: "./img/cover.png", imageSrc: './img/watermelon.png', matched: false, covered: true }
        ]

        this.state = {
            cards: this.shuffleCards(unscrambledCards),
            wrongMatchTimeout: false,
            firstCard: null
        };
    }

    //function to randomize the order of the cards
    shuffleCards(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    }


    render() {
        const { cards } = this.state;

        return (
            <div>
                <div>
                    <h1>Card Matching Memory Game</h1>
                    <h2>Match the cards to win!</h2>
                    <p className="how-to-play"><b>How to play:</b> click on a card to flip it over. Try to find the matching card. If you find a match, the cards will stay flipped. If you don't find a match, the cards will flip back over after a short delay.</p>
                </div>
                <div className="controls">
                    <button onClick={() => window.location.reload()}>Restart</button>
                </div>
                <div className="card-manager">
                    {cards.map(card => (
                        <SingleCard
                            key={card.id}
                            id={card.id}
                            coveredImageSrc={card.coveredImageSrc}
                            imageSrc={card.imageSrc}
                            matched={card.matched}
                            covered={card.covered}
                            handleCardFlip={this.handleCardFlip}
                        />
                    ))}
                </div>
            </div>
        );
    }

    handleCardFlip = (InputCard) => {
        if (this.state.wrongMatchTimeout) {
            console.log("Wrong match, waiting for timeout to end");
            return;
        }

        if (InputCard.state.matched) {
            console.log("Card is already matched");
            return;
        }

        console.log(`Card with id ${InputCard.props.imageSrc} was clicked`);

        //Flips the card
        const Covered = InputCard.state.covered;
        InputCard.setState({ covered: !Covered });

        if (this.state.firstCard === null) {
            this.setState(prevState => ({ firstCard: InputCard }));
            //Flips the card
            const Covered = InputCard.state.covered;
            InputCard.setState({ covered: !Covered });
            return;
        }

        this.setState({ secondCard: InputCard });

        if (this.checkMatch(this.state.firstCard, InputCard)) {
            console.log("Match!");
            this.state.firstCard.setState({ matched: true });
            InputCard.setState({ matched: true });
            this.resetSelectedCards();
        } else {
            console.log("Wrong match!");
            this.startWrongMatchTimeout();
        }
    }

    //Check if its a match by comparing the imageSrc of the two cards
    checkMatch(firstCard, secondCard) {
        if (firstCard.props.imageSrc === secondCard.props.imageSrc) {
            return true;
        } else {
            return false;
        }
    }

    startWrongMatchTimeout() {
        console.log("Wrong match, starting timeout");
        this.setState({ wrongMatchTimeout: true });
        setTimeout(() => {
            this.setState({ wrongMatchTimeout: false });

            this.state.firstCard.setState({ covered: true });
            this.state.secondCard.setState({ covered: true });

            this.resetSelectedCards();
            console.log("Wrong match, ended timeout");
        }, 2000);
    }

    resetSelectedCards = () => {
        this.setState({ firstCard: null });
    }
}

export default CardManager;
