import React from 'react';

class SingleCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            covered: true
        };
    }

    render() {
        const covered = this.state.covered;

        if (covered) {
            return (
                <div className="single-card" onClick={this.handleClick}>
                    <img src={this.props.coveredImageSrc} alt="CoveredCard" onDragStart={this.preventDrag} />
                </div>
            );
        } else {
            return (
                <div className="single-card" onClick={this.handleClick}>
                    <img src={this.props.imageSrc} alt="Card" onDragStart={this.preventDrag} />
                </div>
            );
        }
    }

    preventDrag = (e) => {
        e.preventDefault();
    }

    handleClick = () => {
        //invoke the handleCardFlip event
        this.props.handleCardFlip(this);
    }
}

export default SingleCard;
