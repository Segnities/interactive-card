import { Formik, Field, Form } from "formik";

import * as Yup from "yup";

import "../styles/CardForm.scss"

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
        <div className="flex-center">
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
                    console.info("submit")
                }}
            >
                {({ errors, values, resetForm }) => (
                    <Form>
                        <div>
                            <label htmlFor="cardHolderName">
                                CARDHOLDER NAME
                            </label>
                            <Field
                                id="cardHolderName"
                                type="text"
                                name="cardHolderName"
                                placeholder="e.g. Jane Appleseed"
                            />
                        </div>
                        <div>
                            <label htmlFor="cardNumber"></label>
                            <Field
                                id="cardNumber"
                                type="text"
                                name="cardNumber"
                                placeholder="e.g. 1234 5678 9123 0000"
                            />
                        </div>
                        <div>
                            <div>
                                <label htmlFor="exp-date">EXP. DATE (MM/YY)</label>
                                <div id="exp-date">
                                    <Field
                                        name="month"
                                        placeholder="MM"
                                        type="text"
                                    />
                                    <Field
                                        name="year"
                                        placeholder="YY"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="cvc">CVC</label>
                                <Field id="cvc" type="text" name="cvc" placeholder="CVC" />
                            </div>
                        </div>
                        <button>Confirm</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}