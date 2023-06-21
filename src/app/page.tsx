import CardForm from "./components/CardForm";
import LinearGradientBlock from "./components/UI/LinearGradientBlock";

import styles from './styles/InteractiveCard.module.scss';

export default function InterectiveCard() {
  return (
    <main>
      <div className={styles["grid-container"]}>
        <LinearGradientBlock />
        <CardForm />
      </div>
    </main>
  )
}
