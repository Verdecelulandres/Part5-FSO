import { useState } from "react";

const Togglable = (props) => {

  const [visible, setVisible] = useState(false);

  return (
    <div>
      {!visible &&
        <button onClick={() => setVisible(true)}>
          {props.btnLabel}
        </button>
      }
      {visible &&
        <div>
          {props.children}
          <button onClick={() => setVisible(false)}>
            cancel
          </button>
        </div>
      }
    </div>
  );
}

export default Togglable;