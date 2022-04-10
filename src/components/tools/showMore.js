import React from "react";
import ShowMoreText from "react-show-more-text";
import Style from './showMore.module.css';
// ...

export default class ShowMore extends React.Component {

    executeOnClick(isExpanded) {
        console.log(isExpanded);
    }

    render() {
        return (
            <ShowMoreText
                /* Default options */
                lines={2}
                more="نمایش بیشتر"
                less="نمایش کم تر"
                className={Style.showMoreStyle}
                anchorClass={Style.showLessOrMore}
                onClick={this.executeOnClick}
                expanded={false}
                width={0}
                truncatedEndingComponent={"... "}
            >
                
                {this.props.text}
            </ShowMoreText>
        );
    }
}