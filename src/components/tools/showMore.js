import React, { useContext } from "react";
import ShowMoreText from "react-show-more-text";
import Language from "../../store/language";
import Style from './showMore.module.css';
// ...


export default class ShowMore extends React.Component {
    
    executeOnClick(isExpanded) {
    }

    render() {
        
        return (
            <ShowMoreText
                /* Default options */
                lines={2}
                more={this.props.showMore}
                less={this.props.showLess}
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