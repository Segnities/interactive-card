'use client';

import { Formik, Field, Form } from "formik";

import * as Yup from "yup";

import styles from "../styles/CardForm.module.scss";
import globalStyles from "../styles/global.module.scss";

export const cardValidationSchema = Yup.object().shape({
    cardHolderName: Yup.string()
        .required("Card holder name is required"),
    cardNumber: Yup.string()
        .matches(/^[0-9]+$/, "Wrong format, numbers only")
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
    return (
        <div className={styles["flex-center"]}>
            <Formik
                initialValues={{
                    cardHolderName: "",
                    cardNumber: "",
                    month: "",
                    year: "",
                    cvc: ""
                }}
                validationSchema={cardValidationSchema}
                onSubmit={() => {
                    console.info("Submitted!")
                }}
            >
                {({ errors, values }) => (
                    <div className={styles["card-form-container"]}>
                        <Form className={styles["card-form"]}>
                            <div className={styles["card-form-inner"]}>
                                <div className={`${styles["card-block"]} ${styles["block-x-space"]}`}>
                                    <label htmlFor="cardHolderName">
                                        CARDHOLDER NAME
                                    </label>
                                    <Field
                                        id="cardHolderName"
                                        type="text"
                                        className={`${styles["under-label"]} ${styles["card-input"]}`}
                                        name="cardHolderName"
                                        placeholder="e.g. Jane Appleseed"
                                        required
                                    />
                                </div>
                                <div className={`${styles["card-block"]} ${styles["block-x-space"]}`}>
                                    <label htmlFor="cardNumber">CARD NUMBER</label>
                                    <Field
                                        id="cardNumber"
                                        type="text"
                                        className={`${styles["under-label"]} ${styles["card-input"]}`}
                                        name="cardNumber"
                                        placeholder="e.g. 1234 5678 9123 0000"
                                        maxLength={16}
                                        required
                                    />
                                </div>
                                <div className={`${styles["card-block"]} ${styles["block-x-space"]}`}>
                                    <div className={styles["subblock"]}>
                                        <div 
                                            className={`${globalStyles["w-half"]} ${styles["exp-date-wrapper"]}`}>
                                            <label htmlFor="exp-date">EXP. DATE (MM/YY)</label>
                                            <div
                                                id="exp-date"
                                                className={`${styles["exp-date"]} ${styles["under-label"]}`}
                                            >
                                                <Field
                                                    name="month"
                                                    className={styles["card-input"]}
                                                    placeholder="MM"
                                                    type="text"
                                                    maxLength={2}
                                                    required
                                                />
                                                <Field
                                                    name="year"
                                                    className={styles["card-input"]}
                                                    placeholder="YY"
                                                    type="text"
                                                    maxLength={2}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className={`${styles["cvc"]} ${globalStyles["w-half"]}`}>
                                            <label htmlFor="cvc">CVC</label>
                                            <Field
                                                id="cvc"
                                                type="text"
                                                name="cvc"
                                                className={`${styles["under-label"]} ${styles["card-input"]}`}
                                                placeholder="eg. 123"
                                                maxLength={3}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className={`${styles["w-full"]} ${styles["btn"]} ${globalStyles["btn-confirm"]}`}
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