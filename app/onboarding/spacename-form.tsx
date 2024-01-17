"use client";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";
import { useFormState } from "react-dom";
import { createSpace } from "./actions";
import { useEffect, useState } from "react";

export default function SpaceNameForm() {
  const [pending, setPending] = useState(false);
  const [state, formAction] = useFormState(createSpace, { message: "" });

  useEffect(() => {
    if (pending) {
      setPending(false);
    }
    if (state.code && state.code === "insert_err") {
      alert(state.message);
    }
  }, [state]);

  const formik = useFormik({
    initialValues: {
      value: "",
    },
    validate: (data) => {
      let errors: { [key: string]: string } = {};

      if (!data.value) {
        errors.value = "필수 입력 항목입니다.";
      }

      return errors;
    },
    onSubmit: (data) => {
      console.log(data);
      setPending(true);
      formik.resetForm();
    },
  });

  const isFormFieldInvalid = (name: string) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: string) => {
    if (state?.message !== "") {
      return <small className="p-error">{state?.message}</small>;
    }
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : null;
  };

  return (
    <form
      onSubmit={(e) => {
        formik.handleSubmit();
      }}
      action={formAction}>
      <div className="card flex justify-content-center px-5 py-3">
        <div className="flex grow flex-col gap-1">
          <label className="text-sm text-gray-500 dark:text-gray-400">쉐어스페이스 이름</label>
          <InputText
            className={classNames({ "p-invalid": isFormFieldInvalid("value") })}
            id="spacename"
            name="spacename"
            value={formik.values.value}
            onChange={(e) => {
              formik.setFieldValue("value", e.target.value);
            }}
          />
          <small className="text-sm text-gray-500 dark:text-gray-400">
            쉐어그룹 이름 또는 별칭
          </small>
          {getFormErrorMessage("value")}
        </div>
      </div>
      <div className="flex grow flex-col px-5 py-3">
        <Button
          type="submit"
          className="h-10"
          label={pending ? "처리 중" : "새 Space 생성"}
          disabled={pending}
        />
      </div>
    </form>
  );
}
