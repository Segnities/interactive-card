'use client';

import { useState, JSX } from "react";

import type { FormikErrors, FormikTouched } from "formik";

import * as Yup from "yup";

import styles from "../styles/CardForm.module.scss";
import IdleCardForm from "./IdleCardForm";
import SuccessCardForm from "./SuccessCardForm";

export type CardFormTouched = FormikTouched<{
    cardHolderName: string;
    cardNumber: string;
    month: string;
    year: string;
    cvc: string;
}>;

export type CardFormErrors = FormikErrors<{
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

    const [formStatus, setFormStatus] = useState<"error" | "success" | "idle">("idle");

    const getFormStatusUI = ():JSX.Element => {
        if (formStatus === "idle") {
            return <IdleCardForm setFormStatus={setFormStatus} />;
        } else if (formStatus === "success") {
            return <SuccessCardForm />;
        } else {
            return <div>Something went wrong...</div>
        } 
    } 

    return (
        <div className={styles["flex-center"]}>
            {
                getFormStatusUI()
            }

        </div>
    )
}