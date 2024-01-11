"use client";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";
import { Dispatch } from "react";

export default function InviteForm() {
  const formik = useFormik({
    initialValues: {
      value: "",
    },
    validate: (data) => {
      let errors: { [key: string]: string } = {};

      if (!data.value) {
        errors.value = "Spacename is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      console.log(data);
      formik.resetForm();
    },
  });

  const isFormFieldInvalid = (name: string) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: string) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : null;
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="card flex justify-content-center px-5 py-3">
        <div className="flex grow flex-col gap-1">
          <label className="text-sm text-gray-500 dark:text-gray-400">초대하기</label>
          <InputText
            className={classNames({ "p-invalid": isFormFieldInvalid("value") })}
            id="spacename"
            name="spacename"
            value={formik.values.value}
            onChange={(e) => {
              formik.setFieldValue("value", e.target.value);
            }}
          />
          <InputText />
          <InputText />
          {getFormErrorMessage("value")}
        </div>
      </div>
      <div className="flex grow flex-col px-5 py-3">
        <Button className="h-10" label="Sharemate에 접속하기" />
      </div>
    </form>
  );
}
