import { useState } from "react";
import data from "../data.json";

const Accordion = () => {
  const [selectedId, setSelecetdId] = useState(null);
  const [accordionData] = useState(data);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [multpleSelectedId, setMultpleSelectedId] = useState([]);

  function handleSingleSelect(id) {
    if (id === selectedId) {
      setSelecetdId(null);
    } else {
      setSelecetdId(id);
    }
  }

  function handleMultipleSelect(id) {
    const copyMultpleSelectedId = [...multpleSelectedId];
    const index = copyMultpleSelectedId.indexOf(id);
    if (index === -1) {
      copyMultpleSelectedId.push(id);
    } else {
      copyMultpleSelectedId.splice(index, 1);
    }

    setMultpleSelectedId(copyMultpleSelectedId);
  }

  function handleMultiSelectButton() {
    setIsMultiSelect(!isMultiSelect);
    setSelecetdId(null);
    setMultpleSelectedId([]);
  }

  return (
    <div>
      <div>
        <button
          onClick={handleMultiSelectButton}
          style={{
            width: "250px",
            height: "30px",
            border: "none",
            backgroundColor: "red",
            color: "white",
            fontFamily: "sans-serif",
            fontSize: "15px",
            marginBottom: "10px",
          }}
        >
          {`Enable ${isMultiSelect ? "Single" : "Multi"} Selection`}
        </button>
      </div>
      {accordionData.map((data) => (
        <div key={data.id}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: "red",
              color: "white",
              marginBottom: "10px",
            }}
            onClick={() =>
              isMultiSelect
                ? handleMultipleSelect(data.id)
                : handleSingleSelect(data.id)
            }
          >
            <p>{data.title}</p>
            <span style={{ alignContent: "center" }}>+</span>
          </div>
          {/* <div>
            {isMultiSelect ? (
              <>
                {multpleSelectedId.map((id, index) => (
                  <p key={index}>{id === data.id ? data.description : null}</p>
                ))}
              </>
            ) : (
              <>{selectedId === data.id ? <p>{data.description}</p> : null}</>
            )}
          </div> */}
          <div>
            {isMultiSelect ? (
              <>
                {multpleSelectedId.includes(data.id) ? (
                  <p style={{ margin: 0 }}>{data.description}</p>
                ) : null}
              </>
            ) : (
              <>
                {selectedId === data.id ? (
                  <p style={{ margin: 0 }}>{data.description}</p>
                ) : null}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
