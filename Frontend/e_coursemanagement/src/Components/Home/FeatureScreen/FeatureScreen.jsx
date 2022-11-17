import React from "react";
import "./FeatureScreen.css";
import books from "../../../Images/books.gif";
import discuss from "../../../Images/discuss.gif";
import result from "../../../Images/check.gif";
import task from "../../../Images/task.gif";
const FeatureScreen = () => {
  return (
    <div id="feature">
      <span className="feature2"></span>
      <div className="feature3">
        <div className="feature3A">
          <input
            type={"image"}
            className={"featureicon"}
            src={books}
            alt={"books"}
          />
          <span className={"featuretitle"}>Courses</span>
          <p className={"featurepara"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="feature3A">
          <input
            type={"image"}
            className={"featureicon"}
            src={task}
            alt={"books"}
          />
          <span className={"featuretitle"}>Task</span>
          <p className={"featurepara"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="feature3A">
          <input
            type={"image"}
            className={"featureicon"}
            src={discuss}
            alt={"books"}
          />
          <span className={"featuretitle"}>Disccusions</span>
          <p className={"featurepara"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="feature3A">
          <input
            type={"image"}
            className={"featureicon"}
            src={result}
            alt={"books"}
          />
          <span className={"featuretitle"}>Evaluation</span>
          <p className={"featurepara"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureScreen;
