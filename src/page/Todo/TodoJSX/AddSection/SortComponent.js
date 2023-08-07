import React from "react"; // Setup
import "../../TodoSCSS/AddSection/SortComponent.scss" // Self-style
// import FunctionComponent from "./functionComponent";

function FeaturesComponent(props) {
    return(<React.Fragment>
        <div className='features'>
            {/* <FunctionComponent
                type={'important'}
                functionClick = {props.functionClick}
            />

            <FunctionComponent
                type={'missed'}
                functionClick = {props.functionClick}
            />

            <FunctionComponent
                type={'finished'}
                functionClick = {props.functionClick}
            />
            <FunctionComponent
                type={'pending'}
                functionClick = {props.functionClick}
            />

            <FunctionComponent
                type={'time_on'}
                functionClick = {props.functionClick}
            /> */}
        </div>
    </React.Fragment>)
}

export default FeaturesComponent