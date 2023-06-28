'use client';

import type { ChangeEvent } from "react";
import { useState } from "react";

import type { FormikErrors, FormikTouched } from "formik";
import { Field, Form, Formik } from "formik";

import * as Yup from "yup";

import styles from "../styles/CardForm.module.scss";
import globalStyles from "../styles/global.module.scss";
import { C } from "vitest/dist/types-2b1c412e";

type CardFormTouched = FormikTouched<{
    cardHolderName: string;
    cardNumber: string;
    month: string;
    year: string;
    cvc: string;
}>;

type CardFormErrors = FormikErrors<{
    cardHolderName: string;
    cardNumber: string;
    month: string;
    year: string;
    cvc: string;
}>;

export const cardValidationSchema = Yup.object().shape({
    cardHolderName: Yup.string()
        .required("Card holder name is required")
        .matches(/^[a-zA-Z ]+$/, "Wrong format, letters only"),
    cardNumber: Yup.string()
        .matches(/^[0-9]+$/, "Wrong format, numbers only")
        .transform((value) => value.replace(/\s/g, ""))
        .min(16, "Card number must be at least 16 digits")
        .max(16, "Card number must be at most 16 digits")
        .required("Card number is required"),
    month: Yup.string()
        .required('Can\'t be blank')
        .max(2, 'Month must be a 2-digit number')
        .min(2, 'Month must be a 2-digit number')
        .matches(/^(0[1-9]|1[0-2])$/, "Wrong format, numbers only"),
    year: Yup.string()
        .required('Can\'t be blank')
        .max(2, 'Year must be a 2-digit number')
        .min(2, 'Year must be a 2-digit number')
        .matches(/^[0-9]+$/, "Wrong format, numbers only"),
    cvc: Yup.string()
        .required('Can\'t be blank')
        .max(3, "CVC must be a 3-digit number")
        .min(3, "CVC must be a 3-digit number")
        .matches(/^[0-9]+$/, "Wrong format, numbers only"),
});

export default function CardForm() {
    const [cardInputNumber, setCardInputNumber] = useState<string>("");
    const [cardNumber, setCardNumber] = useState<string>("");

    const getExpDateErrorMessage = (
        errors: CardFormErrors,
        touched: CardFormTouched,
    ) => {
        if (!errors.month) {
            return errors.year && touched.year ? errors.year : "";
        }
        return errors.month && touched.month ? errors.month : "";
    }

    const handleCardNumber = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s/g, '');
        const spacedValue = value.match(/.{1,4}/g)?.join(' ') || '';

        setCardInputNumber(spacedValue);
    }

    return (
        <div className={styles["flex-center"]}>
            <Formik
                initialValues={{
                    cardHolderName: "",
                    cardNumber: cardNumber,
                    month: "",
                    year: "",
                    cvc: ""
                }}
                validationSchema={cardValidationSchema}
                onSubmit={() => {
                    console.info("Submitted!")
                }}
                enableReinitialize={true}
            >
                {({ errors, touched }) => (
                    <div className={styles["card-form-container"]}>
                        <Form className={styles["card-form"]} method="post">
                            <div className={styles["card-form-inner"]}>
                                <div className={`${styles["card-block"]} ${styles["block-x-space"]}`}>
                                    <label htmlFor="cardHolderName">
                                        CARDHOLDER NAME
                                    </label>
                                    <Field
                                        id="cardHolderName"
                                        type="text"
                                        className={`${styles["under-label"]} ${styles["card-input"]} ${errors.cardHolderName && touched.cardHolderName ? styles["error-border"] : ""}`}
                                        name="cardHolderName"
                                        placeholder="e.g. Jane Appleseed"
                                        aria-errormessage={errors.cardHolderName && touched.cardHolderName ? errors.cardHolderName : ""}
                                        aria-invalid={errors.cardHolderName && touched.cardHolderName ? "true" : "false"}
                                        aria-required="true"
                                        required
                                    />
                                    <p
                                        className={`${styles["error-message"]} ${globalStyles["w-full"]}`}
                                        aria-hidden={errors.cardHolderName && touched.cardHolderName ? "false" : "true"}
                                    >
                                        {errors.cardHolderName && touched.cardHolderName ? errors.cardHolderName : ""}
                                    </p>
                                </div>
                                <div className={`${styles["card-block"]} ${styles["block-x-space"]}`}>
                                    <label htmlFor="cardNumber">CARD NUMBER</label>
                                    <Field
                                        id="cardNumber"
                                        type="text"
                                        className={`${styles["under-label"]} ${styles["card-input"]} ${errors.cardNumber && touched.cardNumber ? styles["error-border"] : ""}`}
                                        name="cardNumber"
                                        placeholder="e.g. 1234 5678 9123 0000"
                                        maxLength={19}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            handleCardNumber(e);
                                            setCardNumber(e.target.value);
                                        }}
                                        value={cardInputNumber}
                                        aria-errormessage={errors.cardNumber && touched.cardNumber ? errors.cardNumber : ""}
                                        aria-invalid={errors.cardNumber && touched.cardNumber ? "true" : "false"}
                                        aria-required="true"
                                        required
                                    />
                                    <p
                                        className={`${styles["error-message"]} ${globalStyles["w-full"]}`}
                                        aria-hidden={errors.cardNumber && touched.cardNumber ? "false" : "true"}
                                    >
                                        {errors.cardNumber && touched.cardNumber ? errors.cardNumber : ""}
                                    </p>
                                </div>
                                <div className={`${styles["card-block"]} ${styles["block-x-space"]}`}>
                                    <div className={`${styles["subblock"]} ${globalStyles["h-100"]}`}>
                                        <div
                                            className={`${globalStyles["w-half"]} ${styles["exp-date-wrapper"]}`}>
                                            <label htmlFor="exp-date">EXP. DATE (MM/YY)</label>
                                            <div
                                                id="exp-date"
                                                className={`${styles["exp-date"]}`}
                                            >
                                                <div className={styles["input-wrapper"]}>
                                                    <Field
                                                        name="month"
                                                        className={`${styles["card-input"]} ${errors.month && touched.month ? styles["error-border"] : ""}`}
                                                        placeholder="MM"
                                                        type="text"
                                                        maxLength={2}
                                                        minLength={2}
                                                        aria-required="true"
                                                        aria-errormessage={errors.month && touched.month ? errors.month : ""}
                                                        aria-invalid={errors.month && touched.month ? "true" : "false"}
                                                        required
                                                    />
                                                    <Field
                                                        name="year"
                                                        className={`${styles["card-input"]} ${errors.year && touched.year ? styles["error-border"] : ""}`}
                                                        placeholder="YY"
                                                        type="text"
                                                        maxLength={2}
                                                        minLength={2}
                                                        aria-errormessage={errors.year && touched.year ? errors.year : ""}
                                                        aria-invalid={errors.year && touched.year ? "true" : "false"}
                                                        aria-required="true"
                                                        required
                                                    />
                                                </div>
                                                <p
                                                    className={`${styles["error-message"]} ${globalStyles["w-full"]}`}
                                                    aria-hidden={(errors.year && touched.year) || (errors.month && touched.month) ? "true" : "false"}
                                                >
                                                    {getExpDateErrorMessage(errors, touched)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={`${styles["cvc"]} ${globalStyles["w-half"]}`}>
                                            <label htmlFor="cvc">CVC</label>
                                            <Field
                                                id="cvc"
                                                type="text"
                                                name="cvc"
                                                className={`${styles["card-input"]} ${errors.cvc && touched.cvc ? styles["error-border"] : ""}`}
                                                aria-required="true"
                                                aria-errormessage={errors.cvc && touched.cvc ? errors.cvc : ""}
                                                aria-invalid={errors.cvc && touched.cvc ? "true" : "false"}
                                                placeholder="eg. 123"
                                                maxLength={3}
                                                minLength={3}
                                                required
                                            />
                                            <p
                                                className={`${styles["error-message"]}`}
                                                aria-hidden={errors.cvc && touched.cvc ? "false" : "true"}
                                            >
                                                {errors.cvc && touched.cvc ? errors.cvc : ""}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className={`${globalStyles["w-full"]} ${styles["btn"]} ${globalStyles["btn-confirm"]}`}
                                    type="submit"
                                >
                                    Confirm
                                </button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    )
}