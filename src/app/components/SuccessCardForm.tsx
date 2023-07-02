'use client';

import Image from "next/image";

import styles from "../styles/CardForm.module.scss";
import globalStyles from "../styles/global.module.scss";

export default function SuccessCardForm() {
    return (
        <div className={styles["card-form-success"]}>
            <Image src="/icon-complete.svg" alt="Complete" width={80} height={80} />
            <h2 className={styles["card-form-success__title"]}>Thank you!</h2>
            <p className={styles["card-form-success__body"]}>We&apos;ve added your card details</p>
            <button className={`${styles["btn"]} ${globalStyles["btn-confirm"]} ${styles["card-form-success__btn"]}`}>Continue</button>
        </div>
    );

}