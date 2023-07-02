'use client';

import { Field, Form, Formik } from "formik";
import { useState } from "react";

import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { CardFormErrors, CardFormTouched } from "./CardForm";

import { cardValidationSchema } from "./CardForm";

import styles from "../styles/CardForm.module.scss";
import globalStyles from "../styles/global.module.scss";

interface IdleCardFormProps {
    setFormStatus: Dispatch<SetStateAction<"error" | "success" | "idle">>
}

export default function IdleCardForm(props: IdleCardFormProps) {
    const {
        setFormStatus
    } = props;
    const [cardInputNumber, setCardInputNumber] = useState<string>("");

    const [cardNumber, setCardNumber] = useState<string>("");
    const [cardHolderName, setCardHolderName] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [cvc, setCvc] = useState<string>("");

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
        <Formik
            initialValues={{
                cardHolderName: cardHolderName,
                cardNumber: cardNumber,
                month: month,
                year: year,
                cvc: cvc
            }}
            validationSchema={cardValidationSchema}
            onSubmit={() => {
                setFormStatus("success");
                console.info("Submitted!")
            }}
            enableReinitialize={true}
        >
            {({ touched, errors }) => (
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
                                    value={cardHolderName}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCardHolderName(e.target.value)}
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
                                                    value={month}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setMonth(e.target.value)}
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
                                                    value={year}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setYear(e.target.value)}
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
                                            value={cvc}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCvc(e.target.value)}
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
    );
}