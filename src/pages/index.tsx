import { CSSProperties, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

import { setIngredient } from "@/redux/reducers/ingredientReducer";
import { setReceipts } from "@/redux/reducers/receiptReducer";
import { setSteps } from "@/redux/reducers/stepReducer";

import { DeleteIcon, EditIcon } from "../../public/assets/svg";

export default function Home() {
  const dispatch = useDispatch();

  const receipts = useSelector((state: RootState) => state.receipts.receipt);
  const steps = useSelector((state: RootState) => state.steps.steps);
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );

  const [selected, setSelected] = useState<string>();
  const [isShowEditButton, setIsShowEditButton] = useState<boolean>(false);
  const [inputValueReceipt, setInputValueReceipt] = useState<string>();
  const [inputValueStep, setInputValueStep] = useState<string>();
  const [isAddUnit, setIsAddUnit] = useState<boolean>(false);

  useEffect(() => {
    let payload = [
      "Apel",
      "Garam",
      "Tepung Terigu",
      "Ayam",
      "Daging Sapi",
      "Tepung Maizena",
    ];
    dispatch(setIngredient(payload));
  }, []);

  let selectedHandle = useCallback(
    (value: string) => {
      let selectIngredient = ingredients.filter((item) => item !== value);

      let payload = {
        name: value,
        unit: "",
      };

      dispatch(setIngredient(selectIngredient));
      dispatch(setReceipts([...receipts, payload]));
      setSelected(payload?.name);
      setIsAddUnit(true);
      setIsShowEditButton(true);
    },
    [ingredients, receipts, isAddUnit, isShowEditButton, dispatch]
  );

  let inputHandleChange = useCallback(
    (e: any, mode: string) => {
      if (mode === "receipt") {
        setInputValueReceipt(e?.target?.value ?? e);
      } else {
        setInputValueStep(e?.target?.value ?? e);
      }
    },
    [inputValueReceipt, inputValueStep]
  );

  let onEditedPressed = useCallback(
    (value: any, mode: string) => {
      setIsAddUnit(true);
      setIsShowEditButton(false);

      if (mode === "receipt") {
        setInputValueReceipt(value?.unit);
      } else {
        setInputValueStep(value);
      }
    },
    [selected, isAddUnit, isShowEditButton]
  );

  let onDeletedPressed = useCallback(
    (value: string, mode: string) => {
      if (mode === "receipt") {
        let selectReceipt = receipts.filter((item) => item?.name !== value);
        dispatch(setIngredient([...ingredients, value]));
        dispatch(setReceipts(selectReceipt));
      } else {
        let selectStep = steps.filter((item) => item !== value);
        dispatch(setSteps(selectStep));
      }
      setIsAddUnit(false);
      setIsShowEditButton(false);
    },
    [ingredients, receipts, isAddUnit, isShowEditButton]
  );

  function saveReceipt(data: any) {
    if (!data) {
      return;
    }
    let newData = [...receipts];
    let selectedIndex = receipts.findIndex((item) => selected === item.name);

    let payload = {
      name: selected?.toString() ?? "-",
      unit: data,
    };
    if (selectedIndex > -1) {
      let item = newData[selectedIndex];
      newData.splice(selectedIndex, 1, { ...item, ...payload });
      dispatch(setReceipts(newData));
    } else {
      let newArray = [...receipts, payload];
      dispatch(setReceipts(newArray));
    }

    setIsAddUnit(false);
    setSelected("");
    setInputValueReceipt("");
    setIsShowEditButton(false);
  }

  let enterReceipt = useCallback(
    (event: any) => {
      if (event.charCode == "13") {
        saveReceipt(event?.target?.value);
      }
    },
    [receipts, selected, isAddUnit, inputValueReceipt]
  );

  let onBlurReceipt = useCallback(
    (event: any) => {
      saveReceipt(event?.target?.value);
    },
    [receipts, selected, isAddUnit, inputValueReceipt]
  );

  function saveSteps(data: any) {
    if (!data) {
      return;
    }
    let newData = [...steps];
    let selectedIndex = steps.findIndex((item) => selected === item);

    if (selectedIndex > -1) {
      newData.splice(selectedIndex, 1, data);

      dispatch(setSteps(newData));
    } else {
      let newArray = [...steps, data];
      dispatch(setSteps(newArray));
    }

    setIsAddUnit(false);
    setSelected("");
    setInputValueStep("");
    setIsShowEditButton(false);
  }

  let enterSteps = useCallback(
    (event: any) => {
      if (!event?.target?.value) {
        setIsAddUnit(true);
      }
      if (event.charCode == "13") {
        saveSteps(event?.target?.value);
      }
    },
    [steps, selected, isAddUnit, inputValueStep]
  );

  let onBlurSteps = useCallback(
    (event: any) => {
      saveSteps(event?.target?.value);
    },
    [steps, selected, isAddUnit, inputValueStep]
  );

  return (
    <main className="flex min-h-screen flex-col p-52">
      <div className="items-center mb-5">
        <div className="text-5xl">Viding.Co</div>
        <div>Receipt maker</div>
      </div>

      {isAddUnit && (
        <div
          className="px-4 py-3 mb-3 leading-normal text-white bg-rose-600 rounded-lg"
          role="alert"
        >
          <p>Mohon untuk lengkapi form</p>
        </div>
      )}
      <div className="grid grid-cols-3 min-h-[700px] gap-4">
        <div
          className="flex min-w-full justify-center shadow-lg border-rose-600 bg-white"
          style={styles.card}
        >
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">List Bahan-bahan</div>
            {ingredients?.map((item, index) => {
              return (
                <div
                  className="text-center mt-2 text-gray-700 text-base"
                  style={styles.ingredientList}
                  key={`list-ingredient-${index + 1}`}
                  onClick={() => selectedHandle(item)}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="min-w-full col-span-2 shadow-lg border-rose-600 bg-white"
          style={styles.card}
        >
          <div className="px-6 py-4">
            <div className="flex font-bold text-xl mb-2 item-center">
              <input
                className="text-center min-w-full"
                placeholder="Nama Resep"
                required
              />
            </div>
            <p className="text-gray-700 text-base">Bahan:</p>
            {receipts?.length > 0 &&
              receipts?.map((item, index) => {
                let indexSelected = item?.name === selected;

                return (
                  <div
                    key={`receipt-select-${index + 1}`}
                    className="text-gray-700 text-base mt-2"
                  >
                    <div className="flex flex-row text-gray-700 text-base mt-2 justify-between items-center">
                      <div className="flex flex-row items-center">
                        {isAddUnit && indexSelected ? (
                          <input
                            className="h-[30px] w-[55px] mr-10 text-center border border-2 border-rose-600 rounded-lg"
                            placeholder="satuan"
                            name="unit"
                            value={inputValueReceipt}
                            onChange={(e: any) =>
                              inputHandleChange(e, "receipt")
                            }
                            onKeyPress={(e: any) => enterReceipt(e)}
                            onBlur={(e: any) => onBlurReceipt(e)}
                            required
                            defaultValue={item?.unit}
                          />
                        ) : (
                          <p className="w-[50px] mr-10 text-center">
                            {item?.unit ?? "-"}
                          </p>
                        )}
                        <p
                          className="items-center"
                          onClick={() => {
                            setSelected(item.name);
                            setIsShowEditButton(true);
                          }}
                        >
                          {item?.name}
                        </p>
                      </div>

                      {indexSelected && (
                        <div className="flex flex-row">
                          {isShowEditButton && (
                            <div className="flex flex-row justify-between">
                              <div
                                style={styles.pointer}
                                onClick={() => onEditedPressed(item, "receipt")}
                              >
                                <EditIcon />
                              </div>
                            </div>
                          )}
                          <div
                            style={styles.pointer}
                            onClick={() =>
                              onDeletedPressed(item?.name, "receipt")
                            }
                          >
                            <DeleteIcon />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

            <p className="mt-10 text-base">Tata Cara:</p>
            <div className="flex flex-col">
              {steps?.map((item, index) => {
                let indexSelected = item === selected;

                return (
                  <div
                    key={`receipt-select-${index + 1}`}
                    className="text-gray-700 text-base mt-2"
                  >
                    <div className="flex flex-row text-gray-700 text-base mt-2 items-center">
                      {indexSelected && isShowEditButton ? (
                        <div className="flex flex-row justify-between items-center">
                          {index + 1}.{" "}
                          {indexSelected && (
                            <>
                              <div>
                                <input
                                  placeholder="name"
                                  className="h-[30px] w-[800px] mr-10 border border-2 border-rose-600 rounded-lg"
                                  defaultValue={item}
                                  onChange={(e: any) =>
                                    inputHandleChange(e, "step")
                                  }
                                  onKeyPress={(e: any) => enterSteps(e)}
                                  onBlur={(e: any) => onBlurSteps(e)}
                                />
                              </div>
                              <div
                                style={styles.pointer}
                                onClick={() => onDeletedPressed(item, "steps")}
                              >
                                <DeleteIcon />
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            setSelected(item);
                            setIsShowEditButton(true);
                          }}
                        >
                          {index + 1}. {item}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {isShowEditButton === false && (
                <input
                  className="h-[30px] w-[800px] mr-10 border border-2 border-rose-600 rounded-lg"
                  placeholder="Input tata cara"
                  value={inputValueStep}
                  onChange={(e: any) => inputHandleChange(e, "step")}
                  onKeyPress={(e: any) => enterSteps(e)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const styles: ObjectKey<CSSProperties> = {
  card: {
    borderWidth: 2,
    borderRadius: "0.5rem",
  },
  ingredientList: {
    cursor: "pointer",
  },
  pointer: {
    cursor: "pointer",
  },
};
