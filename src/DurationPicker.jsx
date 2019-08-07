import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./DurationPicker.css";
import DurationPickerColumn from "./DurationPickerColumn";

DurationPicker.propTypes = {
  onChange: PropTypes.func,
  initialDuration: PropTypes.shape({
    hours: PropTypes.number,
    mins: PropTypes.number,
    secs: PropTypes.number,
  }),
  maxHours: PropTypes.number,
};

DurationPicker.defaultProps = {
  maxHours: 10,
  onChange: () => {},
  initialDuration: { hours: 0, mins: 0, secs: 0 },
};

function DurationPicker(props) {
  const { onChange, maxHours, initialDuration } = props;
  const [isSmallScreen, setIsSmallScreen] = useState(undefined);
  const [duration, setDuration] = useState(initialDuration);
  useEffect(() => {
    const resizeHandler = () => {
      if (window.innerWidth <= 400) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    onChange(duration);
  }, [duration, onChange]);

  return (
    <div className="picker">
      <DurationPickerColumn
        onChange={hours =>
          setDuration(prevDuration => ({ ...prevDuration, hours }))
        }
        unit="hours"
        maxHours={maxHours}
        isSmallScreen={isSmallScreen}
        initial={initialDuration.hours}
      />
      <DurationPickerColumn
        onChange={mins =>
          setDuration(prevDuration => ({ ...prevDuration, mins }))
        }
        unit="mins"
        isSmallScreen={isSmallScreen}
        initial={initialDuration.mins}
      />
      <DurationPickerColumn
        onChange={secs =>
          setDuration(prevDuration => ({ ...prevDuration, secs }))
        }
        unit="secs"
        isSmallScreen={isSmallScreen}
      />
    </div>
  );
}

export default DurationPicker;
