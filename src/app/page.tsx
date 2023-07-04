import Card from "./components/Card";
import Form from "./components/Form";
import LinearGradientBlock from "./components/UI/LinearGradientBlock";
import InterceptionWrapper from "./components/UI/InterceptionWrapper";

import styles from './styles/InteractiveCard.module.scss';

export default function InterectiveCard() {
  return (
    <main>
      <div className={styles["grid-container"]}>
        <InterceptionWrapper>
          <LinearGradientBlock />
          <Card />
        </InterceptionWrapper>
        <Form />
      </div>
    </main>
  )
}
