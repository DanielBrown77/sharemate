"use client";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";

export default function OnBoarding() {
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
    <div>
      <div className="grid justify-items-center">
        <h4 className="text-2xl font-bold dark:text-white">쉐어스페이스 생성</h4>
        <p className="mb-3 text-gray-500 dark:text-gray-400">
          쉐어스페이스에 대한 상세 정보를 입력하세요.
        </p>
      </div>
      <form onSubmit={formik.handleSubmit}>
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
          <Button className="h-10" label="계속" />
        </div>
      </form>
    </div>
  );
}
